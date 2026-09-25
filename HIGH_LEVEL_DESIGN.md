# High-Level Design (HLD) Document
## Sentinel Unified Grid — Gujarat CCTV & Vehicle Intelligence Platform
### Gujarat Police Innovation Challenge 2026 — Deliverable #2 (Step 5)

> Note: The primary copy of this document is maintained at [`docs/HIGH_LEVEL_DESIGN.md`](file:///d:/Gujarat/docs/HIGH_LEVEL_DESIGN.md).

See [`docs/HIGH_LEVEL_DESIGN.md`](file:///d:/Gujarat/docs/HIGH_LEVEL_DESIGN.md) for the complete, unabridged technical design specification covering:
- End-to-end component interaction architecture and Mermaid topology
- Heterogeneous VMS, NVR, and IP camera integration adapters (ONVIF, RTSP, WebRTC, HLS)
- Dispersed stream ingestion and AES-128 in-memory decryption workers
- Dynamic $O(1)$ watchlist correlation and Haversine nearest-police-station emergency dispatch
- Two-stage AI ANPR pipeline (with explicit legal/computational scoping rationale excluding facial recognition)
- Multi-camera spatial-temporal route reconstruction with PTS timestamp synchronization
- Statewide scalability (~80,000 cameras), cybersecurity (TLS 1.3, AES-256), and Section 65B forensic chain-of-custody evidence dossier generation
- Department onboarding checklist and transparent Model 1 geocoded coordinate assumptions.
