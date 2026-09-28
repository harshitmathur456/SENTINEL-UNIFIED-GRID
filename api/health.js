export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    status: 'ONLINE',
    system: 'Sentinel Unified Grid (SUD)',
    model: 'Model 2 — Unified Viewing & Metadata Analytics',
    timestamp: new Date().toISOString(),
    ai_engine: 'YOLOv8 + EasyOCR',
    cctv_nodes_registered: 30
  });
}
