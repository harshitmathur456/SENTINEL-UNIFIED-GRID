# Plan for Scale Document
## Sentinel Unified Grid — Scaling from 30 Sandbox Cameras to ~80,000 Statewide Nodes
### Gujarat Police Innovation Challenge 2026 — Step 6 Technical Narrative

> Note: The primary copy of this document is maintained at [`docs/PLAN_FOR_SCALE.md`](file:///d:/Gujarat/docs/PLAN_FOR_SCALE.md).

See [`docs/PLAN_FOR_SCALE.md`](file:///d:/Gujarat/docs/PLAN_FOR_SCALE.md) for the complete, unabridged technical scaling narrative covering:
- Hierarchical 3-Tier Compute Topology (District Edge Hubs, Regional Commissionerate Nodes, State Central Datacenter)
- GPU & Accelerator needs sizing (NVIDIA L4 Tensor Core GPUs, 5 FPS keyframe sampling rate, 1,020 GPU fleet)
- Expected network bandwidth (160 Gbps centralized reduced to <300 Mbps edge-first) and low-bandwidth fallback strategies (dual-stream RTSP, adaptive HLS)
- Three-tier storage hierarchy: Hot (0–48h NVMe rolling ring-buffer), Warm (3–15+ days regional SSD clips), Cold (15 days–7+ years S3 Glacier/court evidence archive)
- Horizontal pod autoscaling, Envoy ingress load balancing, Prometheus/Grafana observability
- High availability ($N+1$ cluster redundancy, active-active disaster recovery) and Section 65B tamper-evident cybersecurity controls
- Comprehensive Capital Expenditure (CAPEX), Operational Expenditure (OPEX), and 3-Year Total Cost of Ownership (₹71.98 Crores / ~$25 per camera per day).
