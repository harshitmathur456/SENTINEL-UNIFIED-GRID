import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const possiblePaths = [
    path.join(process.cwd(), 'public', 'data', 'detections.json'),
    path.join(process.cwd(), 'dist', 'data', 'detections.json'),
    path.join(process.cwd(), 'output', 'detections.json')
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      try {
        const content = fs.readFileSync(p, 'utf-8');
        return res.status(200).send(content);
      } catch (e) {}
    }
  }

  res.status(200).json([]);
}
