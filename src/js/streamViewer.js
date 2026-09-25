/**
 * Camera Live Stream Viewer & GIS Mini-Map Theatre — Sentinel Unified Grid
 * 
 * Features:
 * 1. Embedded Inline Live HLS / WebRTC Player: Streams directly inside the site via Hls.js
 * 2. Instant Failover to High-Definition Synthetic Surveillance OSD Canvas (if stream unreachable)
 * 3. Integrated Per-Camera Mini-Map: Auto-zoomed to 16.5 street-level with resolution-tiered coverage circle (50m/35m/25m)
 * 4. Real-time Telemetry Readout & Nearest Police Station Dispatch Integration
 */

import { anprEngine } from './anprEngine.js';
import { CameraMiniMap } from './miniMap.js';
import { findNearestPoliceStation } from './dispatch.js';

let activeHls = null;
let streamMiniMap = null;
let currentModalCamera = null;

export function initStreamViewer() {
  // Initialize MiniMap once DOM container is ready
  if (!streamMiniMap && document.getElementById('stream-mini-map')) {
    streamMiniMap = new CameraMiniMap('stream-mini-map');
  }

  // Recenter button listener
  const btnRecenter = document.getElementById('btn-mini-recenter');
  if (btnRecenter && streamMiniMap) {
    btnRecenter.addEventListener('click', () => {
      streamMiniMap.recenter();
    });
  }
}

export function openStreamModal(camera, detection = null) {
  const modal = document.getElementById('stream-modal');
  if (!modal || !camera) return;
  currentModalCamera = camera;

  // 1. Camera Information & Headers
  const camNameEl = document.getElementById('modal-cam-name');
  if (camNameEl) camNameEl.textContent = `${camera.name} — ${camera.location_text}`;

  const camDeptEl = document.getElementById('modal-cam-dept');
  if (camDeptEl) camDeptEl.textContent = camera.department || `${camera.city} Police Department`;

  const camResEl = document.getElementById('modal-cam-res');
  if (camResEl) camResEl.textContent = camera.width && camera.height ? `${camera.width}x${camera.height} (${camera.width >= 1920 ? 'Full HD' : 'HD'})` : '1920x1080 (HD CCTV)';

  const camCodecEl = document.getElementById('modal-cam-codec');
  if (camCodecEl) camCodecEl.textContent = camera.codec ? camera.codec.toUpperCase() : 'H.264 (Auto)';

  const camFpsEl = document.getElementById('modal-cam-fps');
  if (camFpsEl) camFpsEl.textContent = camera.fps ? `${camera.fps} FPS` : '25.0 FPS';

  const camBitrateEl = document.getElementById('modal-cam-bitrate');
  if (camBitrateEl) camBitrateEl.textContent = camera.bitrate_kbps ? `${camera.bitrate_kbps} kbps` : '1920 kbps';

  const camStatusEl = document.getElementById('modal-cam-status');
  if (camStatusEl) {
    camStatusEl.textContent = camera.status ? camera.status.toUpperCase() : 'LIVE';
    camStatusEl.className = `status-tag ${camera.status || 'live'}`;
  }

  const camRtspEl = document.getElementById('modal-cam-rtsp');
  if (camRtspEl) camRtspEl.textContent = camera.rtsp_url || `rtsp://live.corp8.cloud:8554/stream/${camera.id}`;

  const camHlsEl = document.getElementById('modal-cam-hls');
  if (camHlsEl) camHlsEl.textContent = camera.hls_url || `/live/stream/${camera.id}/index.m3u8`;

  const camCoordsEl = document.getElementById('modal-cam-coords');
  if (camCoordsEl) camCoordsEl.textContent = `${camera.lat.toFixed(4)}° N, ${camera.lng.toFixed(4)}° E`;

  // 2. Resolution Coverage Tier Badge
  const tierBadgeEl = document.getElementById('modal-cam-coverage-tier');
  if (tierBadgeEl) {
    let tierText = '25m Tier (Conservative Default)';
    let tierClass = 'tier-default';
    if (camera.coverage_radius_m >= 50) {
      tierText = '50m Tier (Full HD ≥1080p)';
      tierClass = 'tier-fhd';
    } else if (camera.coverage_radius_m >= 35) {
      tierText = '35m Tier (HD 720p)';
      tierClass = 'tier-hd';
    }
    tierBadgeEl.textContent = tierText;
    tierBadgeEl.className = `coverage-tier-badge ${tierClass}`;
  }

  // 3. Nearest Police Station Dispatch Card
  const nearestPsEl = document.getElementById('modal-nearest-ps-info');
  const nearestPsBtn = document.getElementById('btn-modal-dispatch-ps');
  const nearest = findNearestPoliceStation(camera.lat, camera.lng);
  if (nearestPsEl && nearest && nearest.station) {
    nearestPsEl.innerHTML = `
      <div style="font-weight: 600; color: #fff;">${nearest.station.name} (${nearest.station.district})</div>
      <div style="color: var(--text-muted); font-size: 11px;">Distance: <strong style="color: var(--accent-cyan);">${nearest.distanceKm} km</strong> &bull; Patrol ETA: <strong style="color: #34d399;">~${nearest.etaMinutes} mins</strong></div>
      <div style="color: var(--text-muted); font-size: 10px; font-family: var(--font-mono); margin-top: 2px;"><i class="fas fa-phone"></i> ${nearest.station.phone || '100'}</div>
    `;
    if (nearestPsBtn) {
      nearestPsBtn.onclick = () => {
        alert(`🚨 DISPATCH ISSUED FROM CAMERA LIVE FEED!\n\nDispatched Unit: ${nearest.station.name}\nTarget Camera: ${camera.name} (${camera.location_text})\nPatrol Unit Intercept ETA: ~${nearest.etaMinutes} mins.`);
      };
    }
  }

  // 4. Embedded Live Video Player / Fallback Canvas
  const videoEl = document.getElementById('stream-hls-video');
  const canvas = document.getElementById('stream-canvas-preview');
  const liveStatusBadge = document.getElementById('stream-live-indicator-badge');
  const loadingSpinner = document.getElementById('stream-loading-spinner');

  if (loadingSpinner) loadingSpinner.style.display = 'flex';

  let hlsAttached = false;

  // Cleanup prior HLS session
  if (activeHls) {
    activeHls.destroy();
    activeHls = null;
  }

  // Attempt live HLS stream loading if Hls.js is loaded in browser
  if (videoEl && window.Hls && window.Hls.isSupported() && camera.hls_url) {
    try {
      activeHls = new window.Hls({
        enableWorker: true,
        lowLatencyMode: true,
        maxBufferLength: 5,
        maxMaxBufferLength: 10
      });

      activeHls.loadSource(camera.hls_url);
      activeHls.attachMedia(videoEl);

      activeHls.on(window.Hls.Events.MANIFEST_PARSED, () => {
        if (loadingSpinner) loadingSpinner.style.display = 'none';
        videoEl.play().then(() => {
          videoEl.style.display = 'block';
          if (canvas) canvas.style.display = 'none';
          if (liveStatusBadge) {
            liveStatusBadge.innerHTML = `<i class="fas fa-circle-dot" style="color: #10b981;"></i> LIVE HLS STREAM`;
            liveStatusBadge.className = 'stream-mode-badge live';
          }
          hlsAttached = true;
        }).catch(e => {
          console.log('[HLS] Autoplay deferred, showing canvas backup:', e);
          fallbackToSurveillanceCanvas();
        });
      });

      activeHls.on(window.Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          console.warn('[HLS] Live stream offline/unreachable, falling back to simulated OSD canvas:', data.type);
          fallbackToSurveillanceCanvas();
        }
      });
    } catch (e) {
      console.warn('[HLS] Stream init error:', e);
      fallbackToSurveillanceCanvas();
    }
  } else {
    fallbackToSurveillanceCanvas();
  }

  function fallbackToSurveillanceCanvas() {
    if (loadingSpinner) loadingSpinner.style.display = 'none';
    if (videoEl) {
      videoEl.style.display = 'none';
      videoEl.pause();
    }
    if (canvas) {
      canvas.style.display = 'block';
      anprEngine.renderSurveillanceFrame(canvas, camera, detection, true);
    }
    if (liveStatusBadge) {
      liveStatusBadge.innerHTML = `<i class="fas fa-satellite-dish" style="color: #38bdf8;"></i> SIMULATED OSD FEED (SANDBOX RUNNER)`;
      liveStatusBadge.className = 'stream-mode-badge simulation';
    }
  }

  // 5. Open Modal
  modal.classList.add('active');

  // 6. Initialize & Auto-Zoom Per-Camera Mini-Map
  if (!streamMiniMap) {
    streamMiniMap = new CameraMiniMap('stream-mini-map');
  }
  if (streamMiniMap) {
    streamMiniMap.loadCamera(camera);
  }
}

export function closeStreamModal() {
  const modal = document.getElementById('stream-modal');
  if (modal) {
    modal.classList.remove('active');
  }

  const videoEl = document.getElementById('stream-hls-video');
  if (videoEl) {
    videoEl.pause();
    videoEl.src = '';
  }

  if (activeHls) {
    activeHls.destroy();
    activeHls = null;
  }
}
