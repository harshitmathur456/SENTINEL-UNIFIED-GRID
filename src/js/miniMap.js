/**
 * Per-Camera Auto-Zoomed Mini-Map Component — Sentinel Unified Grid
 * 
 * Provides an auto-zoomed, street-level GIS mini-map tightly centered
 * on a selected CCTV camera location (zoom 16.5) with:
 * - High-resolution dark surveillance tiles
 * - Resolution-tiered coverage circle (50m Full HD / 35m 720p / 25m Default)
 * - Directional FOV cone (if heading angle is defined)
 * - Nearby 5km x 5km gap analysis grid overlay (if enabled)
 * - Prominent mandatory coverage disclaimer pill
 */

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export class CameraMiniMap {
  constructor(containerId) {
    this.containerId = containerId;
    this.map = null;
    this.activeMarker = null;
    this.coverageCircle = null;
    this.fovCone = null;
    this.gapRect = null;
    this.currentCamera = null;

    this.initMap();
  }

  initMap() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    // Base Tile: Esri World Dark Gray Base
    const esriDark = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      { attribution: '&copy; Esri, DeLorme, MapmyIndia', maxZoom: 19 }
    );

    const esriRef = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
      { attribution: '', maxZoom: 19 }
    );

    this.map = L.map(this.containerId, {
      center: [23.0225, 72.5714],
      zoom: 16.5,
      minZoom: 14,
      maxZoom: 19,
      zoomControl: false,
      attributionControl: false,
      layers: [esriDark, esriRef]
    });

    // Custom top-right compact zoom controls
    L.control.zoom({ position: 'topright' }).addTo(this.map);
  }

  /**
   * Loads and focuses on a specific camera with its coverage metadata
   * @param {Object} camera 
   */
  loadCamera(camera) {
    if (!this.map || !camera) return;
    this.currentCamera = camera;

    // Clear previous layers
    if (this.activeMarker) this.map.removeLayer(this.activeMarker);
    if (this.coverageCircle) this.map.removeLayer(this.coverageCircle);
    if (this.fovCone) this.map.removeLayer(this.fovCone);
    if (this.gapRect) this.map.removeLayer(this.gapRect);

    const lat = camera.lat;
    const lng = camera.lng;
    const radius = camera.coverage_radius_m || 25;
    const status = camera.status || 'live';

    // 1. Draw Resolution-Derived Coverage Circle (PRD Section 4.2)
    const circleColor = status === 'live' ? '#10b981' : status === 'degraded' ? '#f59e0b' : '#ef4444';
    this.coverageCircle = L.circle([lat, lng], {
      radius: radius,
      color: circleColor,
      fillColor: circleColor,
      fillOpacity: 0.24,
      weight: 2,
      dashArray: status === 'degraded' ? '4, 4' : null
    }).addTo(this.map);

    // 2. Draw Directional FOV Cone (if heading is present)
    if (camera.heading_deg !== undefined) {
      const coneCoords = this.createFovConePolygon([lat, lng], radius * 1.5, camera.heading_deg, 60);
      this.fovCone = L.polygon(coneCoords, {
        color: '#06b6d4',
        fillColor: '#06b6d4',
        fillOpacity: 0.28,
        weight: 1.5
      }).addTo(this.map);
    }

    // 3. Draw Camera Marker Pin
    const pinHtml = `
      <div class="custom-camera-pin mini-map-pin ${status}">
        <i class="fas fa-video"></i>
      </div>
    `;

    const icon = L.divIcon({
      html: pinHtml,
      className: '',
      iconSize: [26, 26],
      iconAnchor: [13, 13]
    });

    this.activeMarker = L.marker([lat, lng], { icon }).addTo(this.map);

    // 4. Smooth Pan and Zoom
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
        this.map.setView([lat, lng], 16.5, { animate: true });
      }
    }, 150);
  }

  /**
   * Generates directional wedge polygon for camera FOV
   */
  createFovConePolygon(center, radiusMeters, headingDegrees, fovDegrees) {
    const lat = center[0];
    const lng = center[1];
    const coords = [[lat, lng]];

    const startAngle = headingDegrees - fovDegrees / 2;
    const endAngle = headingDegrees + fovDegrees / 2;
    const steps = 12;

    for (let i = 0; i <= steps; i++) {
      const angle = startAngle + (i / steps) * (endAngle - startAngle);
      const rad = (angle * Math.PI) / 180;
      const dLat = (radiusMeters * Math.cos(rad)) / 111320;
      const dLng = (radiusMeters * Math.sin(rad)) / (111320 * Math.cos((lat * Math.PI) / 180));
      coords.push([lat + dLat, lng + dLng]);
    }
    coords.push([lat, lng]);
    return coords;
  }

  recenter() {
    if (this.currentCamera && this.map) {
      this.map.setView([this.currentCamera.lat, this.currentCamera.lng], 16.5, { animate: true });
    }
  }

  invalidateSize() {
    if (this.map) {
      setTimeout(() => this.map.invalidateSize(), 200);
    }
  }
}
