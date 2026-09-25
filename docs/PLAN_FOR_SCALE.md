# Plan for Scale Document
## Sentinel Unified Grid — Scaling from 30 Sandbox Cameras to ~80,000 Statewide Nodes
### Gujarat Police Innovation Challenge 2026 — Step 6 Technical Narrative

**Document Version:** 2.0  
**Authors:** Team CuriousClass (Harshit Mathur & Arin Harwani)  
**Target Scope:** State of Gujarat (196,024 km² • 33 Districts • 4 Police Commissionerates • 26 Government Departments)  
**Baseline System:** 30 Sandbox Camera PoC $\longrightarrow$ **Target System:** 80,000 Concurrent Surveillance Nodes  

---

## 1. The Scaling Challenge

Scaling a real-time surveillance intelligence grid from 30 cameras to **80,000 cameras** represents a **2,666$\times$ increase** in concurrent data ingest, video decoding, and spatial-temporal correlation. 

A naive centralized architecture—where all 80,000 video streams are pumped across the state WAN into a single datacenter in Gandhinagar—would create catastrophic bottlenecks:
- **Bandwidth Implosion:** 80,000 streams $\times$ 2.0 Mbps (standard H.264 1080p) = **160 Gbps** of sustained continuous ingress traffic.
- **Compute Gridlock:** Real-time decoding of 80,000 streams at 25 FPS produces **2,000,000 frames per second** requiring hundreds of high-density GPU servers.
- **Single Point of Failure:** WAN disruptions between remote districts (e.g., Kachchh, Banaskantha, or Dang) and Gandhinagar would completely blind local law enforcement.

To solve this, Sentinel Unified Grid adopts an **Edge-First, Hierarchical Three-Tier Compute Topology**.

---

## 2. Three-Tier Compute Topology

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ TIER 3: STATE CENTRAL COMMAND (Gandhinagar State Datacenter & State Police HQ)          │
│ - Master GIS Camera Registry & Statewide Topology Graph                                │
│ - Central Watchlist Synchronization & Multi-District Route Correlator                  │
│ - State Unified Command Web Dashboard (High-level Command & Law Enforcement Leadership) │
│ - Cold Storage Evidence Vault (Court-Admissible FIR Evidence Dossiers)                 │
└───────────────────────────────────────────▲────────────────────────────────────────────┘
                                            │ Lightweight JSON Metadata & Flagged Clips (<500 Mbps)
┌───────────────────────────────────────────┴────────────────────────────────────────────┐
│ TIER 2: REGIONAL AGGREGATION HUBS (4 Commissionerates: Ahmedabad, Surat, Vadodara, Rajkot)
│ - Regional Cluster Management & Kubernetes Ingestion Gateways                          │
│ - Sub-State Inter-District Route Stitching (e.g., Ahmedabad ↔ Gandhinagar Corridor)    │
│ - Regional Hot-Standby Cache & Ingress Load Balancers                                  │
└───────────────────────────────────────────▲────────────────────────────────────────────┘
                                            │ Extracted Plate Detections & Heartbeat Telemetry
┌───────────────────────────────────────────┴────────────────────────────────────────────┐
│ TIER 1: DISTRICT EDGE APPLIANCES (33 District Command Centers & Major Thana Clusters)   │
│ - Local Stream Pull & AES-128 In-Memory Decryption                                     │
│ - Hardware-Accelerated Video Decoding & Frame Extraction                               │
│ - YOLOv8 Plate Localization + EasyOCR Character Recognition                            │
│ - Local FIFO Rolling Frame Buffer (Zero Full-Footage Archival Footprint)               │
│ - Immediate Local PCR Patrol Dispatch for Critical Watchlist Hits (<300ms)             │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 2.1 Tier 1: District Edge Compute (37 Operational Hubs)
- **Deployment Location:** 33 District Police Headquarters (DPHQ / DCCC) + 4 Police Commissionerates (Ahmedabad City, Surat City, Vadodara City, Rajkot City).
- **Functionality:** 
  - Ingests regional feeds within the local district area network (average ~2,160 cameras per district hub).
  - Performs local stream health checks, RTSP/HLS decoding, and real-time YOLOv8 + OCR inference.
  - Cross-references incoming plates against a locally cached mirror of the Central Watchlist DB.
  - Upon a confirmed watchlist hit, triggers instant local Police Control Room (PCR) radio/mobile dispatch in $<300\text{ ms}$.
  - **Bandwidth Reduction:** Only JSON detection events and 5-second cropped evidence clips are sent upstream to Tier 2/3. Raw full-motion video remains local.

### 2.2 Tier 2: Regional Aggregation Hubs (4 Strategic Sectors)
- **Locations:** North Gujarat (Ahmedabad), South Gujarat (Surat), Central Gujarat (Vadodara), and Saurashtra-Kutch (Rajkot).
- **Functionality:**
  - Correlates multi-camera routes spanning adjacent districts (e.g., a stolen vehicle fleeing from Ahmedabad Rural into Anand/Kheda).
  - Manages WAN failover and stream transcoding for low-bandwidth mobile clients.

### 2.3 Tier 3: State Central Cloud / Datacenter (Gandhinagar)
- **Deployment:** State Datacenter (SDC) / Private Gov-Cloud.
- **Functionality:**
  - Aggregates statewide telemetry, manages user access control (RBAC), and serves the unified operator dashboard.
  - Maintains the master PostGIS registry of 80,000 cameras and 313+ police stations.
  - Archives encrypted digital evidence packets compliant with Section 65B of the Indian Evidence Act.

---

## 3. GPU & Hardware Accelerator Sizing at Scale

### 3.1 Inference Throughput Sizing Model
Evaluating 25 raw frames per second (FPS) for license plate recognition on stationary or semi-stationary cameras is computationally wasteful and unnecessary. A vehicle traversing a standard camera field-of-view (50m coverage radius at 60 km/h) remains in the scene for approximately **3.0 seconds**.

- **Optimized Sampling Strategy:** Sub-sample incoming feeds to **5 FPS** for vehicle and plate detection (1 frame every 200 ms).
- **Keyframe Triggering:** When vehicle motion is flagged in the 5 FPS stream, the worker temporarily triggers full-cadence evaluation across 10 frames to optimize character segmentation accuracy.

### 3.2 Back-of-Envelope Sizing Calculations

$$\text{Total Ingested Streams} = 80,000$$

$$\text{Processed FPS per Stream} = 5\text{ FPS}$$

$$\text{Statewide Ingestion Rate} = 80,000 \times 5 = 400,000\text{ frames per second}$$

Using **NVIDIA L4 Tensor Core GPUs** (24 GB GDDR6, optimized for high-throughput video analytics and TensorRT FP16/INT8 inference):
- A single NVIDIA L4 running YOLOv8n + INT8 quantization achieves **~450 FPS** for simultaneous bounding-box localization and batch plate cropping.
- Number of streams handled per NVIDIA L4 GPU:

$$\text{Streams per L4} = \frac{450\text{ FPS}}{5\text{ FPS/stream}} = 90\text{ concurrent streams per GPU}$$

- Total GPUs required across the State of Gujarat:

$$\text{Total GPUs Required} = \frac{80,000}{90} \approx 888\text{ GPUs}$$

- Adding a $15\%$ redundancy overhead for peak traffic surges and failover:

$$\text{Production Accelerator Fleet} \approx 1,020\text{ NVIDIA L4 GPUs}$$

### 3.3 Physical Hardware Distribution
Distributed across the 37 District Edge Hubs:
- Average GPUs per District Hub: $\frac{1,020}{37} \approx \mathbf{28\text{ GPUs per District Hub}}$ (typically housed in $4\times 2\text{U}$ edge rack servers, each equipped with $7\times\text{NVIDIA L4}$ accelerators).
- Power consumption per edge server: $\sim 1.4\text{ kW}$ (readily supported by standard DCCC server rooms with redundant UPS backup).

---

## 4. Network Bandwidth & Low-Bandwidth Fallback Strategy

### 4.1 Bandwidth Comparison: Centralized vs. Edge-First

| Metric | Centralized Architecture (Naive) | Sentinel Edge-First Architecture |
|---|---|---|
| **Raw Video Ingress** | 80,000 streams $\times$ 2 Mbps = **160 Gbps** | 0 Gbps across State WAN (Decoded locally at edge) |
| **Telemetry & Metadata** | Included in stream | 80,000 cameras $\times$ 1.2 KB/event $\approx$ **24 Mbps** |
| **Flagged Detection Clips** | N/A | $\sim 5,000$ detections/hour $\times$ 1.5 MB = **16.6 Mbps** |
| **Live Operator Previews** | High | On-demand WebRTC/HLS only when operator views camera ($\sim 50$ concurrent operators = **100 Mbps**) |
| **Total State WAN Uplink** | **$\mathbf{>160\text{ Gbps}}$ (Unviable)** | **$\mathbf{<300\text{ Mbps}}$ ($\mathbf{99.8\%}$ Bandwidth Reduction)** |

### 4.2 Low-Bandwidth Fallback for Remote Rural Thanas
For cameras connected over constrained cellular (4G/5G) or legacy leased lines ($<1\text{ Mbps}$):
1. **Dual-Stream RTSP Ingestion:**
   - Ingestion workers pull the camera's secondary `sub-stream` (CIF / 640x360 @ 10 FPS, $\sim 300\text{ kbps}$) for continuous background motion and vehicle localization.
   - Only when a plate candidate is confirmed does the worker trigger a momentary snapshot request from the high-definition `main-stream` (1080p / 4K) to execute high-precision character segmentation.
2. **Adaptive Bitrate (ABR) HLS:** For operator dashboard previews, stream transcoding automatically downshifts from 1080p to 480p or drops framerate from 25 FPS to 12.5 FPS if browser telemetry detects packet jitter $>150\text{ ms}$.

---

## 5. Storage Tiering & Retention Architecture

Department retention requirements vary between **7 to 15+ days** depending on jurisdictional mandates. Archiving 80,000 continuous streams for 15 days would require over **207 Petabytes** of storage—a massive and unnecessary capital expenditure.

Sentinel Unified Grid implements a compliant **Three-Tier Lifecycle Storage Hierarchy**:

```
┌───────────────────────────────────────────────────────────────────────────────────────┐
│ HOT TIER (0 – 48 Hours) • Local Edge NVMe Ring-Buffer                                  │
│ - Rolling FIFO buffer storing the last 48 hours of video per camera locally.           │
│ - Unflagged footage is automatically overwritten in a ring cycle (Zero central footprint).│
│ - Capacity per District Hub: ~30 TB NVMe arrays (Local to each DCCC).                │
└──────────────────────────────────────────┬────────────────────────────────────────────┘
                                           │ Trigger: Watchlist Hit / Vehicle Search Match
┌──────────────────────────────────────────▼────────────────────────────────────────────┐
│ WARM TIER (3 – 15+ Days) • Regional Clustered SSD Object Storage                      │
│ - Stores 5-second cropped evidence clips and plate bounding box thumbnails.          │
│ - Retains structured passage logs (PTS, location, confidence, speed estimation).      │
│ - Fast retrieval index for operator route reconstruction queries (<3 seconds).       │
│ - Capacity Statewide: ~180 TB distributed across 4 Regional Hubs.                    │
└──────────────────────────────────────────┬────────────────────────────────────────────┘
                                           │ Trigger: FIR Registration / Court Case Evidence
┌──────────────────────────────────────────▼────────────────────────────────────────────┐
│ COLD TIER (15 Days – 7+ Years) • Immutable Central Evidence Archive                   │
│ - Court-admissible cryptographic evidence dossiers (PDF + JSON + Video Clips).       │
│ - Complies with Section 65B of the Indian Evidence Act (Tamper-proof SHA-256 hashes). │
│ - Stored on low-cost object storage (AWS S3 Glacier / Google Cloud Archive / SDC SAN). │
│ - Estimated Statewide Storage: ~25 TB / year (Only active case evidence).            │
└───────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Horizontal Scaling, Load Balancing & Observability

### 6.1 Container Orchestration & Ingress
- **Kubernetes (K8s) Worker Fleet:** Stream ingestion pods are managed via Kubernetes DaemonSets at District Hubs.
- **Horizontal Pod Autoscaling (HPA):** Pods autoscale dynamically based on:
  1. Stream decoding latency ($>250\text{ ms}$ triggers worker pod spin-up).
  2. Ingestion buffer queue depth in Apache Kafka.
- **Ingress Traffic Routing:** Envoy proxy clusters distribute incoming operator viewing requests, load-balancing HLS and WebRTC sessions across healthy streaming nodes.

### 6.2 Telemetry, Health Checks & Synthetic Probes
- **Prometheus & Grafana:** Monitors per-camera ingestion metrics: FPS, frame drop rate, RTSP disconnects, and GPU temperature.
- **Automated Health Classification:**
  - 🟢 **Live (Online):** Stream actively delivering frames with valid PTS timestamps within the last 5 seconds.
  - 🟡 **Degraded:** Stream alive but missing resolution/codec metadata or experiencing $>20\%$ packet drop.
  - 🔴 **Offline:** Stream unresponsive for $>30$ seconds (triggers automatic reconnection with exponential backoff).

---

## 7. High Availability, Disaster Recovery & Cybersecurity

### 7.1 High Availability (HA) & Fault Tolerance
- **$N+1$ Cluster Redundancy:** Edge inference servers operate in an $N+1$ active-passive configuration. If an edge worker crashes, sibling nodes immediately claim its stream assignment list from the local Redis registry.
- **Active-Active Disaster Recovery (DR):** The State Central Datacenter in Gandhinagar is mirrored to a secondary Disaster Recovery Center in a distinct seismic zone (e.g., Vadodara). RPO (Recovery Point Objective) $< 1\text{ second}$; RTO (Recovery Time Objective) $< 60\text{ seconds}$.

### 7.2 Cybersecurity Controls
1. **Network Segmentation:** Surveillance streams operate on dedicated, air-gapped Gujarat State Wide Area Network (GSWAN) VLANs with strict firewall rules blocking external public internet routing.
2. **Mutual TLS (mTLS):** All inter-service communications between Edge Hubs, Regional Nodes, and Central Cloud enforce mutual certificate authentication (TLS 1.3).
3. **Audit Trail & Non-Repudiation:** Every search query, watchlist modification, and video playback event is cryptographically recorded in an append-only audit log, preventing unauthorized tracking or privacy violations.

---

## 8. Estimated Implementation & Operational Costs (3-Year TCO)

*Rough order-of-magnitude estimates based on industry benchmarks for enterprise public-safety deployments:*

### 8.1 Capital Expenditure (CAPEX) — Year 1

| Component | Specification / Quantity | Estimated Unit Cost (₹) | Total Cost (₹ Crores) | Total Cost (USD) |
|---|---|---|---|---|
| **District Edge Servers** | 150 Enterprise $2\text{U}$ Rack Servers (4 per DCCC) | ₹8,50,000 | ₹12.75 Cr | ~$1.53M |
| **GPU Accelerators** | 1,020 NVIDIA L4 24GB Tensor Core GPUs | ₹2,80,000 | ₹28.56 Cr | ~$3.43M |
| **Edge NVMe Storage** | 37 Hubs $\times$ 32 TB Enterprise NVMe arrays | ₹4,50,000 | ₹1.66 Cr | ~$0.20M |
| **Network & Switch Upgrades** | 10GbE SFP+ Core Switches & Routers | ₹3,00,000 | ₹1.11 Cr | ~$0.13M |
| **Central Datacenter Cluster**| 8 High-Density Application & DB Servers | ₹15,00,000 | ₹1.20 Cr | ~$0.14M |
| **Total Initial CAPEX** | — | — | **₹45.28 Cr** | **~$5.43M** |

### 8.2 Operational Expenditure (OPEX) — Annual (Years 1–3)

| Component | Scope / Description | Annual Cost (₹ Crores) |
|---|---|---|
| **Cloud & Bandwidth Leased Lines** | GSWAN connectivity maintenance & SDC cloud hosting | ₹3.80 Cr / yr |
| **Software Support & Maintenance** | 24/7 SLA maintenance, security patching, driver updates | ₹4.50 Cr / yr |
| **Data Storage (Cold Tier Archive)** | Court evidence archiving & disaster recovery sync | ₹0.60 Cr / yr |
| **Total Annual OPEX** | — | **₹8.90 Cr / yr (~$1.07M / yr)** |

### 8.3 3-Year Total Cost of Ownership (TCO)
$$\text{Total 3-Year TCO} = \text{CAPEX (₹45.28 Cr)} + [3 \times \text{OPEX (₹8.90 Cr)}] = \mathbf{₹71.98\text{ Crores}}\text{ (~}\mathbf{\$8.64\text{M USD}}\text{)}$$

At **₹71.98 Crores over 3 years**, the operational cost works out to approximately **₹25 per camera per day**—delivering extraordinary economic value compared to traditional proprietary VMS licensing which typically exceeds ₹120–₹180 per camera per day.

---

## 9. Conclusion

Scaling Sentinel Unified Grid to 80,000 cameras is neither a theoretical puzzle nor a simple hardware brute-force exercise. By deploying an **Edge-First 3-Tier topology**, sampling at **5 FPS with keyframe escalation**, implementing a **strict Zero-Bulk-Archival rolling buffer**, and adopting **open-standard microservices**, Gujarat Police can achieve statewide real-time vehicle interception and route reconstruction at a fraction of traditional infrastructure costs.
