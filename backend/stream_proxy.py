"""
Sentinel Unified Grid — Authenticated HLS Stream Proxy
Proxies live HLS streams from cctv.corp8.cloud to the web browser and CV workers,
handling Cloudflare session cookies, automatic 403 re-authentication, AES-128 decryption keys,
manifest caching, and fast in-memory segment delivery.
"""

import os
import time
import re
import threading
from collections import OrderedDict
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
from fastapi import APIRouter, HTTPException, Response

stream_router = APIRouter(prefix="/api/stream", tags=["stream"])

# Sentinel Sandbox Credentials
AUTH_EMAIL = os.getenv("SENTINEL_AUTH_EMAIL", "olly2015aarav@gmail.com")
AUTH_CODE = os.getenv("SENTINEL_AUTH_CODE", "RW5U-WGXD-VR4X")
BASE_URL = "https://cctv.corp8.cloud"

class LRUCache:
    def __init__(self, capacity: int = 150):
        self.capacity = capacity
        self.cache = OrderedDict()
        self.lock = threading.Lock()

    def get(self, key):
        with self.lock:
            if key in self.cache:
                self.cache.move_to_end(key)
                return self.cache[key]
            return None

    def put(self, key, value):
        with self.lock:
            if key in self.cache:
                self.cache.move_to_end(key)
            self.cache[key] = value
            if len(self.cache) > self.capacity:
                self.cache.popitem(last=False)

segment_cache = LRUCache(capacity=200)
manifest_cache = {}  # slug -> (manifest_text, timestamp)
manifest_lock = threading.Lock()

class StreamProxySession:
    def __init__(self):
        self.session = requests.Session()
        adapter = HTTPAdapter(
            pool_connections=100,
            pool_maxsize=200,
            max_retries=Retry(total=2, backoff_factor=0.2)
        )
        self.session.mount("https://", adapter)
        self.session.mount("http://", adapter)
        self.last_login_time = 0
        self.login_ttl = 900  # Refresh every 15 minutes
        self.cached_key = None
        self.lock = threading.Lock()
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Referer": "https://cctv.corp8.cloud/",
            "Origin": "https://cctv.corp8.cloud",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "Accept": "*/*"
        }
        self.session.headers.update(self.headers)

    def ensure_authenticated(self, force: bool = False) -> bool:
        """Authenticates with the CCTV portal with thread-safety and auto-recovery."""
        now = time.time()
        if not force and (now - self.last_login_time < self.login_ttl) and ("sentinel" in self.session.cookies):
            return True

        with self.lock:
            now = time.time()
            if not force and (now - self.last_login_time < self.login_ttl) and ("sentinel" in self.session.cookies):
                return True

            try:
                print("[PROXY] Authenticating with Sentinel Sandbox (cctv.corp8.cloud)...")
                self.session.cookies.clear()
                login_url = f"{BASE_URL}/auth/login"
                resp = self.session.post(
                    login_url,
                    data={"email": AUTH_EMAIL, "password": AUTH_CODE},
                    headers=self.headers,
                    timeout=10
                )
                if resp.status_code in (200, 302) and "sentinel" in self.session.cookies:
                    self.last_login_time = time.time()
                    print(f"[PROXY] Authentication successful! Cookie received: {list(self.session.cookies.keys())}")
                    self.fetch_and_cache_key()
                    return True
                else:
                    print(f"[PROXY] Login failed with status {resp.status_code}: {resp.text[:150]}")
                    return False
            except Exception as e:
                print(f"[PROXY] Auth error: {e}")
                return False

    def fetch_and_cache_key(self):
        """Fetches and caches the 16-byte AES-128 decryption key."""
        try:
            r = self.session.get(f"{BASE_URL}/enc.key", headers=self.headers, timeout=5)
            if r.status_code == 200 and len(r.content) == 16:
                self.cached_key = r.content
                print("[PROXY] Decryption key successfully pre-cached (16 bytes).")
        except Exception as e:
            print(f"[PROXY] Failed to pre-cache enc.key: {e}")

proxy_manager = StreamProxySession()

def format_cam_slug(cam_id: str) -> str:
    """Standardizes camera identifiers (e.g. 1 -> cam01, cam1 -> cam01, cam01 -> cam01)."""
    raw = str(cam_id).lower().strip()
    digits = "".join(c for c in raw if c.isdigit())
    if digits:
        num = int(digits)
        return f"cam{num:02d}"
    return raw

@stream_router.get("/{cam_id}/index.m3u8")
def get_hls_manifest(cam_id: str):
    """
    Fetches and rewrites the HLS manifest for a given camera,
    redirecting AES-128 key requests to the local authenticated proxy.
    Caches manifest for 2 seconds to absorb concurrent player bursts.
    """
    slug = format_cam_slug(cam_id)

    # Check 2-second cache
    now = time.time()
    with manifest_lock:
        if slug in manifest_cache:
            content, ts = manifest_cache[slug]
            if now - ts < 2.0:
                return Response(
                    content=content,
                    media_type="application/vnd.apple.mpegurl",
                    headers={
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, OPTIONS",
                        "Cache-Control": "no-cache, no-store, must-revalidate"
                    }
                )

    if not proxy_manager.ensure_authenticated():
        raise HTTPException(status_code=503, detail="Sandbox stream authentication unavailable")

    manifest_url = f"{BASE_URL}/{slug}/index.m3u8"

    try:
        r = proxy_manager.session.get(manifest_url, headers=proxy_manager.headers, timeout=8)
        
        # If upstream session expired or returned 401/403, immediately re-auth and retry once
        if r.status_code in (401, 403):
            print(f"[PROXY] Got {r.status_code} for manifest {slug}, re-authenticating...")
            if proxy_manager.ensure_authenticated(force=True):
                r = proxy_manager.session.get(manifest_url, headers=proxy_manager.headers, timeout=8)

        if r.status_code != 200:
            print(f"[PROXY] Remote manifest returned {r.status_code} for {slug}")
            raise HTTPException(status_code=r.status_code, detail=f"Remote feed returned {r.status_code}")

        content = r.text

        # Rewrite URI="/enc.key" or URI="enc.key" to point to local proxy endpoint
        content = re.sub(
            r'URI="(/enc\.key|enc\.key)"',
            rf'URI="/api/stream/{slug}/enc.key"',
            content
        )

        with manifest_lock:
            manifest_cache[slug] = (content, now)

        return Response(
            content=content,
            media_type="application/vnd.apple.mpegurl",
            headers={
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, OPTIONS",
                "Cache-Control": "no-cache, no-store, must-revalidate"
            }
        )
    except HTTPException:
        raise
    except Exception as e:
        print(f"[PROXY] Manifest fetch exception for {slug}: {e}")
        raise HTTPException(status_code=502, detail=str(e))

@stream_router.get("/{cam_id}/enc.key")
def get_encryption_key(cam_id: str):
    """Serves the AES-128 key needed by Hls.js to decrypt surveillance segments."""
    if proxy_manager.cached_key:
        return Response(
            content=proxy_manager.cached_key,
            media_type="application/octet-stream",
            headers={
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "public, max-age=86400"
            }
        )

    if not proxy_manager.ensure_authenticated():
        raise HTTPException(status_code=503, detail="Sandbox authentication unavailable")

    try:
        r = proxy_manager.session.get(f"{BASE_URL}/enc.key", headers=proxy_manager.headers, timeout=5)
        if r.status_code in (401, 403):
            if proxy_manager.ensure_authenticated(force=True):
                r = proxy_manager.session.get(f"{BASE_URL}/enc.key", headers=proxy_manager.headers, timeout=5)

        if r.status_code != 200:
            raise HTTPException(status_code=r.status_code, detail="Key fetch error")

        proxy_manager.cached_key = r.content
        return Response(
            content=r.content,
            media_type="application/octet-stream",
            headers={
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "public, max-age=86400"
            }
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))

@stream_router.get("/{cam_id}/{segment_file}")
def get_video_segment(cam_id: str, segment_file: str):
    """
    Serves .ts video chunks to the browser player with memory caching
    and non-blocking immediate response delivery.
    """
    slug = format_cam_slug(cam_id)
    cache_key = f"{slug}/{segment_file}"

    cached_data = segment_cache.get(cache_key)
    if cached_data:
        return Response(
            content=cached_data,
            media_type="video/mp2t",
            headers={
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "public, max-age=86400"
            }
        )

    if not proxy_manager.ensure_authenticated():
        raise HTTPException(status_code=503, detail="Sandbox authentication unavailable")

    seg_url = f"{BASE_URL}/{slug}/{segment_file}"

    try:
        r = proxy_manager.session.get(seg_url, headers=proxy_manager.headers, timeout=10)
        if r.status_code in (401, 403):
            print(f"[PROXY] Got {r.status_code} for segment {cache_key}, re-authenticating...")
            if proxy_manager.ensure_authenticated(force=True):
                r = proxy_manager.session.get(seg_url, headers=proxy_manager.headers, timeout=10)

        if r.status_code != 200:
            print(f"[PROXY] Segment fetch status {r.status_code} for {seg_url}")
            raise HTTPException(status_code=r.status_code, detail="Segment fetch error")

        segment_cache.put(cache_key, r.content)

        return Response(
            content=r.content,
            media_type="video/mp2t",
            headers={
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "public, max-age=86400"
            }
        )
    except HTTPException:
        raise
    except Exception as e:
        print(f"[PROXY] Segment error for {cache_key}: {e}")
        raise HTTPException(status_code=502, detail=str(e))
