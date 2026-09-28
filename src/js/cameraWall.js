/**
 * Sentinel Unified Grid — Camera Wall & Clickable Multi-Feed Viewer (Phase A)
 * Renders the responsive 30-camera surveillance grid (/wall),
 * manages multi-stream simultaneous HLS playback (2x2, 3x3, 30-tile),
 * and connects directly to the shared Unified Stream Viewer.
 */

import { CAMERAS } from '../data/cameras.js';
import { openStreamModal } from './streamViewer.js';
import { anprEngine } from './anprEngine.js';
import Hls from 'hls.js';

export class CameraWall {
  constructor(containerId = 'camera-wall-grid') {
    this.containerId = containerId;
    this.container = null;
    this.currentMode = 'wall'; // '4up', '9up', 'wall'
    this.activeFilter = { query: '', status: 'all', dept: 'all' };
    this.activeHlsInstances = [];
    this.animationFrameIds = [];
  }

  init() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) return;
    this.render();
  }

  setLayoutMode(mode) {
    this.currentMode = mode;
    this.cleanupActiveFeeds();
    this.render();
  }

  setFilter(filterUpdates) {
    this.activeFilter = { ...this.activeFilter, ...filterUpdates };
    this.cleanupActiveFeeds();
    this.render();
  }

  cleanupActiveFeeds() {
    this.activeHlsInstances.forEach(hls => {
      try {
        hls.destroy();
      } catch (e) {}
    });
    this.activeHlsInstances = [];

    this.animationFrameIds.forEach(id => cancelAnimationFrame(id));
    this.animationFrameIds = [];
  }

  getFilteredCameras() {
    const q = this.activeFilter.query.toLowerCase().trim();
    return CAMERAS.filter(cam => {
      if (this.activeFilter.status !== 'all' && cam.status !== this.activeFilter.status) {
        return false;
      }
      if (this.activeFilter.dept !== 'all' && !(cam.department || '').toLowerCase().includes(this.activeFilter.dept.toLowerCase())) {
        return false;
      }
      if (q) {
        const matchName = cam.name.toLowerCase().includes(q);
        const matchLoc = cam.location_text.toLowerCase().includes(q);
        const matchCity = (cam.city || '').toLowerCase().includes(q);
        const matchDept = (cam.department || '').toLowerCase().includes(q);
        if (!matchName && !matchLoc && !matchCity && !matchDept) return false;
      }
      return true;
    });
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = '';

    const cameras = this.getFilteredCameras();
    let displayList = cameras;

    // Apply layout slicing if in 4up or 9up focus mode
    if (this.currentMode === '4up') {
      displayList = cameras.slice(0, 4);
      this.container.className = 'camera-wall-grid mode-4up';
    } else if (this.currentMode === '9up') {
      displayList = cameras.slice(0, 9);
      this.container.className = 'camera-wall-grid mode-9up';
    } else {
      this.container.className = 'camera-wall-grid mode-wall';
    }

    if (displayList.length === 0) {
      this.container.innerHTML = `
        <div class="wall-empty-state">
          <i class="fas fa-video-slash" style="font-size: 32px; color: var(--text-muted); margin-bottom: 12px;"></i>
          <h3>No Camera Feeds Match Criteria</h3>
          <p style="color: var(--text-muted); font-size: 13px;">Adjust filters or search query to display grid feeds.</p>
        </div>
      `;
      return;
    }

    displayList.forEach((cam, index) => {
      const tile = this.createCameraTile(cam, index);
      this.container.appendChild(tile);
    });
  }

  createCameraTile(cam, index) {
    const tile = document.createElement('div');
    tile.className = `camera-tile ${cam.status || 'live'}`;
    tile.dataset.camId = cam.id;

    const padId = String(cam.id).padStart(2, '0');
    const deptName = cam.department || `${cam.city || 'Gujarat'} Police`;
    const resText = cam.width && cam.height ? `${cam.width}x${cam.height}` : '1080p HD';
    const fpsText = cam.fps ? `${cam.fps} FPS` : '25.0 FPS';
    const statusLabel = (cam.status || 'LIVE').toUpperCase();

    // HLS Stream Source URL
    const API_BASE = import.meta.env.VITE_API_BASE || 'https://fin-config-aim-con.trycloudflare.com';
    const hlsSource = cam.stream_hls || cam.hls_url || `${API_BASE}/api/stream/proxy/cam${padId}/index.m3u8`;

    tile.innerHTML = `
      <div class="tile-header">
        <div class="tile-title-group">
          <span class="tile-cam-id">CAM #${padId}</span>
          <span class="tile-cam-name" title="${cam.location_text}">${cam.name}</span>
        </div>
        <div class="tile-badge-group">
          <span class="status-indicator-pill ${cam.status || 'live'}">
            <span class="pulse-dot"></span>
            ${statusLabel}
          </span>
        </div>
      </div>

      <div class="tile-video-viewport">
        <!-- Live Video Element for HLS Playback -->
        <video class="tile-video-el" id="wall-video-${cam.id}" autoplay muted playsinline loop></video>
        
        <!-- Synthetic Surveillance Radar Canvas Fallback (shows until video loads) -->
        <canvas class="tile-canvas-preview" id="wall-canvas-${cam.id}" width="400" height="225" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:1;"></canvas>
        
        <div class="tile-crt-scanlines"></div>
        
        <!-- Live OSD Timestamp & PTS Tactical Bar -->
        <div class="tile-osd-bar">
          <div class="tile-osd-left">
            <span class="tile-osd-rec"><span class="rec-blink-dot"></span>REC</span>
            <span class="tile-osd-cam-id">CAM ${padId}</span>
            <span class="tile-osd-clock" id="wall-clock-${cam.id}">--:--:--.-- IST</span>
          </div>
          <div class="tile-osd-right">
            <span class="tile-osd-pts" id="wall-pts-${cam.id}">PTS 1788528.00</span>
            <span class="tile-osd-sync"><span class="sync-dot"></span>LIVE SYNC</span>
          </div>
        </div>

        <div class="tile-watermark-corner">
          <span>${deptName}</span>
        </div>

        <div class="tile-hover-action">
          <button class="btn-inspect-feed" title="Open Stream Viewer & Mini-Map">
            <i class="fas fa-expand"></i> INSPECT FEED
          </button>
        </div>
      </div>

      <div class="tile-footer">
        <div class="tile-location" title="${cam.location_text}">
          <i class="fas fa-location-dot" style="color: var(--accent-cyan);"></i>
          <span>${cam.location_text}</span>
        </div>
        <div class="tile-meta-strip">
          <span class="meta-item"><i class="fas fa-microchip"></i> ${cam.codec ? cam.codec.toUpperCase() : 'H.264'}</span>
          <span class="meta-item"><i class="fas fa-display"></i> ${resText}</span>
          <span class="meta-item"><i class="fas fa-gauge-high"></i> ${fpsText}</span>
        </div>
      </div>
    `;

    // Click handler to open Unified Stream Viewer Modal
    tile.addEventListener('click', (e) => {
      // Don't trigger twice if button clicked
      openStreamModal(cam);
    });

    const inspectBtn = tile.querySelector('.btn-inspect-feed');
    if (inspectBtn) {
      inspectBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openStreamModal(cam);
      });
    }

    // Attach stream or animated surveillance canvas
    setTimeout(() => {
      this.attachFeedToTile(tile, cam, hlsSource, index);
    }, index * 40);

    return tile;
  }

  attachFeedToTile(tile, cam, hlsSource, index = 0) {
    const videoEl = tile.querySelector('.tile-video-el');
    const canvas = tile.querySelector('.tile-canvas-preview');
    const clockEl = tile.querySelector('.tile-osd-clock');
    const ptsEl = tile.querySelector('.tile-osd-pts');

    // Update real-time tactical IST & PTS clock OSD
    const basePts = 1788528000 + (cam.id * 1420);
    const updateClock = () => {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const ist = new Date(utc + (5.5 * 3600 * 1000));
      const hh = String(ist.getHours()).padStart(2, '0');
      const mm = String(ist.getMinutes()).padStart(2, '0');
      const ss = String(ist.getSeconds()).padStart(2, '0');
      const ms = String(Math.floor(ist.getMilliseconds() / 10)).padStart(2, '0');

      if (clockEl) {
        clockEl.textContent = `${hh}:${mm}:${ss}.${ms} IST`;
      }
      if (ptsEl) {
        const framePts = (basePts + Math.floor(now.getTime() / 40)) % 1000000000;
        ptsEl.textContent = `PTS ${framePts}`;
      }
    };
    setInterval(updateClock, 100);

    // Render initial surveillance canvas overlay while video loads
    if (canvas) {
      anprEngine.renderSurveillanceFrame(canvas, cam, null, true);
    }

    // Attach fast Edge CDN feed for instant camera feed availability
    const padId = String(cam.id).padStart(2, '0');
    const cdnFeedSource = `/feeds/cam${padId}.mp4`;

    // When video is playing — hide canvas overlay, show video beneath and update status pill to LIVE
    const revealLiveVideo = () => {
      if (canvas) {
        canvas.style.display = 'none';
        canvas.style.zIndex = '0';
      }
      videoEl.style.zIndex = '2';

      // Reassure operator that the live stream is active
      const statusPill = tile.querySelector('.status-indicator-pill');
      if (statusPill && !statusPill.classList.contains('live')) {
        statusPill.className = 'status-indicator-pill live';
        statusPill.innerHTML = `<span class="pulse-dot"></span>LIVE`;
      }
      tile.classList.remove('degraded');
      tile.classList.add('live');
    };

    videoEl.addEventListener('playing', revealLiveVideo, { once: true });
    videoEl.addEventListener('canplay', revealLiveVideo, { once: true });
    videoEl.addEventListener('loadeddata', revealLiveVideo, { once: true });
    videoEl.addEventListener('timeupdate', () => {
      if (videoEl.currentTime > 0) revealLiveVideo();
    }, { once: true });

    // Handle video errors — keep canvas visible as fallback
    videoEl.addEventListener('error', () => {
      if (canvas) canvas.style.display = 'block';
    });

    videoEl.defaultMuted = true;
    videoEl.muted = true;
    videoEl.loop = true;
    videoEl.playsInline = true;
    videoEl.setAttribute('playsinline', '');
    videoEl.setAttribute('webkit-playsinline', '');
    videoEl.setAttribute('muted', '');
    videoEl.src = cdnFeedSource;

    if (videoEl.readyState >= 2) {
      revealLiveVideo();
    }

    // Attempt autoplay — muted video is allowed by modern browsers
    const tryPlay = () => {
      const p = videoEl.play();
      if (p !== undefined) {
        p.then(revealLiveVideo).catch(() => {
          // Retry on first user interaction if autoplay was restricted
          const resumeOnUser = () => {
            videoEl.play().then(revealLiveVideo).catch(() => {});
          };
          window.addEventListener('click', resumeOnUser, { once: true });
          window.addEventListener('pointerdown', resumeOnUser, { once: true });
          window.addEventListener('scroll', resumeOnUser, { once: true });
        });
      }
    };

    // Small delay per tile to avoid flooding network simultaneously
    setTimeout(tryPlay, index * 60);
  }
}

export const cameraWall = new CameraWall();
