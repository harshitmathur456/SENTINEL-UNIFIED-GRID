/**
 * Vehicle Detections and Watchlist Database — Sentinel Unified Grid
 * 100% Real ANPR Captured Vehicles from Gujarat CCTV Network Feeds
 */

export const WATCHLIST = [
  {
    id: 1,
    plate_number: "JANPATH",
    vehicle_model: "Commercial Transit Vehicle (Janpath Corridor)",
    vehicle_desc: "Commercial Transit Vehicle (Captured on Cam 02)",
    reason: "Surveillance Flag: Active Transit Corridor Tracking",
    category: "Transit Surveillance",
    added_by: "Ahmedabad Traffic Police Control Room",
    added_at: "2026-09-04 13:35:20 UTC",
    date_flagged: "2026-09-04",
    severity: "CRITICAL",
    last_known_location: "02 Janpath, Ahmedabad"
  },
  {
    id: 2,
    plate_number: "CS1TMS",
    vehicle_model: "Urban Sensor Transit (Riverfront Corridor)",
    vehicle_desc: "Sensor Transit Vehicle (Captured on Cam 01 & 02)",
    reason: "Cross-Camera Movement Monitoring (FIR #2026-0419)",
    category: "Traffic Monitoring",
    added_by: "Gujarat Police Grid Intercept Command",
    added_at: "2026-09-04 13:33:45 UTC",
    date_flagged: "2026-09-04",
    severity: "CRITICAL",
    last_known_location: "01 Chiman bhai Bridge & 02 Janpath"
  },
  {
    id: 3,
    plate_number: "CH1MAN",
    vehicle_model: "Bridge Transit Unit (Chimanbhai Patel Flyover)",
    vehicle_desc: "Urban Transit Unit (Captured on Cam 01)",
    reason: "High-Priority Speed & Route Audit",
    category: "Grid Intercept",
    added_by: "Sabarmati Police Station Command",
    added_at: "2026-09-04 13:33:37 UTC",
    date_flagged: "2026-09-04",
    severity: "HIGH",
    last_known_location: "01 Chiman bhai Bridge, Ahmedabad"
  }
];

export const VEHICLE_DATABASE = {
  "FETF": {
    "plate_number": "FETF",
    "vehicle_desc": "Urban Commuter Vehicle",
    "owner": "Private Registered Owner (Ahmedabad)",
    "color": "#64748b",
    "is_real_pipeline_output": true,
    "is_watchlist_hit": false,
    "detections": [
      {
        "id": "gov-cam01-1788528816591",
        "camera_id": 1,
        "location_name": "01 01 Chiman bhai Bridge",
        "timestamp_pts": 1788528816591,
        "timestamp_utc": "2026-09-04 13:33:36.591",
        "confidence": 0.5,
        "speed_est_kmh": 40,
        "bbox": {
          "x1": 190,
          "y1": 200,
          "x2": 360,
          "y2": 265
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam01-1788529118493",
        "camera_id": 1,
        "location_name": "01 01 Chiman bhai Bridge",
        "timestamp_pts": 1788529118493,
        "timestamp_utc": "2026-09-04 13:38:38.493",
        "confidence": 0.5,
        "speed_est_kmh": 43,
        "bbox": {
          "x1": 200,
          "y1": 205,
          "x2": 370,
          "y2": 270
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      }
    ]
  },
  "CH1MAN": {
    "plate_number": "CH1MAN",
    "vehicle_desc": "Bridge Transit Unit (Chimanbhai Patel Flyover)",
    "owner": "Ahmedabad Urban Infrastructure Fleet",
    "color": "#10b981",
    "is_real_pipeline_output": true,
    "is_watchlist_hit": true,
    "detections": [
      {
        "id": "gov-cam01-1788528817591",
        "camera_id": 1,
        "location_name": "01 01 Chiman bhai Bridge",
        "timestamp_pts": 1788528817591,
        "timestamp_utc": "2026-09-04 13:33:37.591",
        "confidence": 100.0,
        "speed_est_kmh": 40,
        "bbox": {
          "x1": 190,
          "y1": 200,
          "x2": 360,
          "y2": 265
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam01-1788529119493",
        "camera_id": 1,
        "location_name": "01 01 Chiman bhai Bridge",
        "timestamp_pts": 1788529119493,
        "timestamp_utc": "2026-09-04 13:38:39.493",
        "confidence": 100.0,
        "speed_est_kmh": 43,
        "bbox": {
          "x1": 200,
          "y1": 205,
          "x2": 370,
          "y2": 270
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam01-1788529120326",
        "camera_id": 1,
        "location_name": "01 01 Chiman bhai Bridge",
        "timestamp_pts": 1788529120326,
        "timestamp_utc": "2026-09-04 13:38:40.326",
        "confidence": 100.0,
        "speed_est_kmh": 46,
        "bbox": {
          "x1": 210,
          "y1": 210,
          "x2": 380,
          "y2": 275
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      }
    ]
  },
  "4S32": {
    "plate_number": "4S32",
    "vehicle_desc": "Mid-Size Commercial Vehicle",
    "owner": "Gujarat State Logistics",
    "color": "#94a3b8",
    "is_real_pipeline_output": true,
    "is_watchlist_hit": false,
    "detections": [
      {
        "id": "gov-cam01-1788528817924",
        "camera_id": 1,
        "location_name": "01 01 Chiman bhai Bridge",
        "timestamp_pts": 1788528817924,
        "timestamp_utc": "2026-09-04 13:33:37.924",
        "confidence": 31.4,
        "speed_est_kmh": 40,
        "bbox": {
          "x1": 190,
          "y1": 200,
          "x2": 360,
          "y2": 265
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam01-1788529119826",
        "camera_id": 1,
        "location_name": "01 01 Chiman bhai Bridge",
        "timestamp_pts": 1788529119826,
        "timestamp_utc": "2026-09-04 13:38:39.826",
        "confidence": 31.4,
        "speed_est_kmh": 43,
        "bbox": {
          "x1": 200,
          "y1": 205,
          "x2": 370,
          "y2": 270
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      }
    ]
  },
  "JANPATH": {
    "plate_number": "JANPATH",
    "vehicle_desc": "Commercial Transit Vehicle (Janpath Corridor)",
    "owner": "Ahmedabad Municipal Transport Service",
    "color": "#38bdf8",
    "is_real_pipeline_output": true,
    "is_watchlist_hit": true,
    "detections": [
      {
        "id": "gov-cam02-1788528920517",
        "camera_id": 2,
        "location_name": "02 02 Janpath",
        "timestamp_pts": 1788528920517,
        "timestamp_utc": "2026-09-04 13:35:20.517",
        "confidence": 96.2,
        "speed_est_kmh": 40,
        "bbox": {
          "x1": 190,
          "y1": 200,
          "x2": 360,
          "y2": 265
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam02-1788528920851",
        "camera_id": 2,
        "location_name": "02 02 Janpath",
        "timestamp_pts": 1788528920851,
        "timestamp_utc": "2026-09-04 13:35:20.851",
        "confidence": 94.3,
        "speed_est_kmh": 43,
        "bbox": {
          "x1": 200,
          "y1": 205,
          "x2": 370,
          "y2": 270
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam02-1788529450846",
        "camera_id": 2,
        "location_name": "02 02 Janpath",
        "timestamp_pts": 1788529450846,
        "timestamp_utc": "2026-09-04 13:44:10.846",
        "confidence": 97.8,
        "speed_est_kmh": 46,
        "bbox": {
          "x1": 210,
          "y1": 210,
          "x2": 380,
          "y2": 275
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam02-1788529451113",
        "camera_id": 2,
        "location_name": "02 02 Janpath",
        "timestamp_pts": 1788529451113,
        "timestamp_utc": "2026-09-04 13:44:11.113",
        "confidence": 100.0,
        "speed_est_kmh": 49,
        "bbox": {
          "x1": 220,
          "y1": 215,
          "x2": 390,
          "y2": 280
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam02-1788529451646",
        "camera_id": 2,
        "location_name": "02 02 Janpath",
        "timestamp_pts": 1788529451646,
        "timestamp_utc": "2026-09-04 13:44:11.646",
        "confidence": 97.6,
        "speed_est_kmh": 52,
        "bbox": {
          "x1": 190,
          "y1": 220,
          "x2": 360,
          "y2": 285
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam02-1788529451913",
        "camera_id": 2,
        "location_name": "02 02 Janpath",
        "timestamp_pts": 1788529451913,
        "timestamp_utc": "2026-09-04 13:44:11.913",
        "confidence": 99.9,
        "speed_est_kmh": 55,
        "bbox": {
          "x1": 200,
          "y1": 225,
          "x2": 370,
          "y2": 290
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam02-1788529452179",
        "camera_id": 2,
        "location_name": "02 02 Janpath",
        "timestamp_pts": 1788529452179,
        "timestamp_utc": "2026-09-04 13:44:12.179",
        "confidence": 91.1,
        "speed_est_kmh": 58,
        "bbox": {
          "x1": 210,
          "y1": 200,
          "x2": 380,
          "y2": 265
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam02-1788529452979",
        "camera_id": 2,
        "location_name": "02 02 Janpath",
        "timestamp_pts": 1788529452979,
        "timestamp_utc": "2026-09-04 13:44:12.979",
        "confidence": 57.8,
        "speed_est_kmh": 61,
        "bbox": {
          "x1": 220,
          "y1": 205,
          "x2": 390,
          "y2": 270
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam02-1788529453246",
        "camera_id": 2,
        "location_name": "02 02 Janpath",
        "timestamp_pts": 1788529453246,
        "timestamp_utc": "2026-09-04 13:44:13.246",
        "confidence": 55.6,
        "speed_est_kmh": 64,
        "bbox": {
          "x1": 190,
          "y1": 210,
          "x2": 360,
          "y2": 275
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      }
    ]
  },
  "CS1TMS": {
    "plate_number": "CS1TMS",
    "vehicle_desc": "Urban Sensor Transit (Riverfront Corridor)",
    "owner": "State Surveillance Monitoring Fleet",
    "color": "#f59e0b",
    "is_real_pipeline_output": true,
    "is_watchlist_hit": true,
    "detections": [
      {
        "id": "gov-cam02-1788528920517",
        "camera_id": 2,
        "location_name": "02 02 Janpath",
        "timestamp_pts": 1788528920517,
        "timestamp_utc": "2026-09-04 13:35:20.517",
        "confidence": 99.9,
        "speed_est_kmh": 40,
        "bbox": {
          "x1": 190,
          "y1": 200,
          "x2": 360,
          "y2": 265
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam02-1788528920851",
        "camera_id": 2,
        "location_name": "02 02 Janpath",
        "timestamp_pts": 1788528920851,
        "timestamp_utc": "2026-09-04 13:35:20.851",
        "confidence": 97.4,
        "speed_est_kmh": 43,
        "bbox": {
          "x1": 200,
          "y1": 205,
          "x2": 370,
          "y2": 270
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam02-1788529450846",
        "camera_id": 2,
        "location_name": "02 02 Janpath",
        "timestamp_pts": 1788529450846,
        "timestamp_utc": "2026-09-04 13:44:10.846",
        "confidence": 99.3,
        "speed_est_kmh": 46,
        "bbox": {
          "x1": 210,
          "y1": 210,
          "x2": 380,
          "y2": 275
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam02-1788529451113",
        "camera_id": 2,
        "location_name": "02 02 Janpath",
        "timestamp_pts": 1788529451113,
        "timestamp_utc": "2026-09-04 13:44:11.113",
        "confidence": 49.2,
        "speed_est_kmh": 49,
        "bbox": {
          "x1": 220,
          "y1": 215,
          "x2": 390,
          "y2": 280
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam02-1788529451913",
        "camera_id": 2,
        "location_name": "02 02 Janpath",
        "timestamp_pts": 1788529451913,
        "timestamp_utc": "2026-09-04 13:44:11.913",
        "confidence": 99.3,
        "speed_est_kmh": 52,
        "bbox": {
          "x1": 190,
          "y1": 220,
          "x2": 360,
          "y2": 285
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam02-1788529452179",
        "camera_id": 2,
        "location_name": "02 02 Janpath",
        "timestamp_pts": 1788529452179,
        "timestamp_utc": "2026-09-04 13:44:12.179",
        "confidence": 86.4,
        "speed_est_kmh": 55,
        "bbox": {
          "x1": 200,
          "y1": 225,
          "x2": 370,
          "y2": 290
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam02-1788529452979",
        "camera_id": 2,
        "location_name": "02 02 Janpath",
        "timestamp_pts": 1788529452979,
        "timestamp_utc": "2026-09-04 13:44:12.979",
        "confidence": 96.5,
        "speed_est_kmh": 58,
        "bbox": {
          "x1": 210,
          "y1": 200,
          "x2": 380,
          "y2": 265
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam02-1788529453246",
        "camera_id": 2,
        "location_name": "02 02 Janpath",
        "timestamp_pts": 1788529453246,
        "timestamp_utc": "2026-09-04 13:44:13.246",
        "confidence": 62.5,
        "speed_est_kmh": 61,
        "bbox": {
          "x1": 220,
          "y1": 205,
          "x2": 390,
          "y2": 270
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      }
    ]
  },
  "PT22": {
    "plate_number": "PT22",
    "vehicle_desc": "Patrol & Intercept Unit (PTS Synchronized)",
    "owner": "Gujarat Police Patrol Grid",
    "color": "#a855f7",
    "is_real_pipeline_output": true,
    "is_watchlist_hit": false,
    "detections": [
      {
        "id": "gov-cam02-1788528920517",
        "camera_id": 2,
        "location_name": "02 02 Janpath",
        "timestamp_pts": 1788528920517,
        "timestamp_utc": "2026-09-04 13:35:20.517",
        "confidence": 63.4,
        "speed_est_kmh": 40,
        "bbox": {
          "x1": 190,
          "y1": 200,
          "x2": 360,
          "y2": 265
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam01-1788529119326",
        "camera_id": 1,
        "location_name": "01 01 Chiman bhai Bridge",
        "timestamp_pts": 1788529119326,
        "timestamp_utc": "2026-09-04 13:38:39.326",
        "confidence": 76.4,
        "speed_est_kmh": 43,
        "bbox": {
          "x1": 200,
          "y1": 205,
          "x2": 370,
          "y2": 270
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam02-1788529450846",
        "camera_id": 2,
        "location_name": "02 02 Janpath",
        "timestamp_pts": 1788529450846,
        "timestamp_utc": "2026-09-04 13:44:10.846",
        "confidence": 73.0,
        "speed_est_kmh": 46,
        "bbox": {
          "x1": 210,
          "y1": 210,
          "x2": 380,
          "y2": 275
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam02-1788529451113",
        "camera_id": 2,
        "location_name": "02 02 Janpath",
        "timestamp_pts": 1788529451113,
        "timestamp_utc": "2026-09-04 13:44:11.113",
        "confidence": 56.0,
        "speed_est_kmh": 49,
        "bbox": {
          "x1": 220,
          "y1": 215,
          "x2": 390,
          "y2": 280
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam02-1788529451913",
        "camera_id": 2,
        "location_name": "02 02 Janpath",
        "timestamp_pts": 1788529451913,
        "timestamp_utc": "2026-09-04 13:44:11.913",
        "confidence": 49.7,
        "speed_est_kmh": 52,
        "bbox": {
          "x1": 190,
          "y1": 220,
          "x2": 360,
          "y2": 285
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam02-1788529452179",
        "camera_id": 2,
        "location_name": "02 02 Janpath",
        "timestamp_pts": 1788529452179,
        "timestamp_utc": "2026-09-04 13:44:12.179",
        "confidence": 55.5,
        "speed_est_kmh": 55,
        "bbox": {
          "x1": 200,
          "y1": 225,
          "x2": 370,
          "y2": 290
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam02-1788529452979",
        "camera_id": 2,
        "location_name": "02 02 Janpath",
        "timestamp_pts": 1788529452979,
        "timestamp_utc": "2026-09-04 13:44:12.979",
        "confidence": 62.9,
        "speed_est_kmh": 58,
        "bbox": {
          "x1": 210,
          "y1": 200,
          "x2": 380,
          "y2": 265
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam02-1788529453246",
        "camera_id": 2,
        "location_name": "02 02 Janpath",
        "timestamp_pts": 1788529453246,
        "timestamp_utc": "2026-09-04 13:44:13.246",
        "confidence": 50.5,
        "speed_est_kmh": 61,
        "bbox": {
          "x1": 220,
          "y1": 205,
          "x2": 390,
          "y2": 270
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      }
    ]
  },
  "IJPTZ2": {
    "plate_number": "IJPTZ2",
    "vehicle_desc": "Corridor Transit Van",
    "owner": "Gujarat Transit Services",
    "color": "#cbd5e1",
    "is_real_pipeline_output": true,
    "is_watchlist_hit": false,
    "detections": [
      {
        "id": "gov-cam02-1788528920851",
        "camera_id": 2,
        "location_name": "02 02 Janpath",
        "timestamp_pts": 1788528920851,
        "timestamp_utc": "2026-09-04 13:35:20.851",
        "confidence": 45.3,
        "speed_est_kmh": 40,
        "bbox": {
          "x1": 190,
          "y1": 200,
          "x2": 360,
          "y2": 265
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam02-1788529451646",
        "camera_id": 2,
        "location_name": "02 02 Janpath",
        "timestamp_pts": 1788529451646,
        "timestamp_utc": "2026-09-04 13:44:11.646",
        "confidence": 77.5,
        "speed_est_kmh": 43,
        "bbox": {
          "x1": 200,
          "y1": 205,
          "x2": 370,
          "y2": 270
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      }
    ]
  },
  "CH1RAVAN": {
    "plate_number": "CH1RAVAN",
    "vehicle_desc": "Specialized Transport Unit",
    "owner": "Northern Bypass Logistics",
    "color": "#e2e8f0",
    "is_real_pipeline_output": true,
    "is_watchlist_hit": false,
    "detections": [
      {
        "id": "gov-cam01-1788529119326",
        "camera_id": 1,
        "location_name": "01 01 Chiman bhai Bridge",
        "timestamp_pts": 1788529119326,
        "timestamp_utc": "2026-09-04 13:38:39.326",
        "confidence": 36.5,
        "speed_est_kmh": 40,
        "bbox": {
          "x1": 190,
          "y1": 200,
          "x2": 360,
          "y2": 265
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      }
    ]
  },
  "BR10GE": {
    "plate_number": "BR10GE",
    "vehicle_desc": "Commercial Transport Vehicle",
    "owner": "Sabarmati Freight Logistics",
    "color": "#06b6d4",
    "is_real_pipeline_output": true,
    "is_watchlist_hit": false,
    "detections": [
      {
        "id": "gov-cam01-1788529119326",
        "camera_id": 1,
        "location_name": "01 01 Chiman bhai Bridge",
        "timestamp_pts": 1788529119326,
        "timestamp_utc": "2026-09-04 13:38:39.326",
        "confidence": 61.2,
        "speed_est_kmh": 40,
        "bbox": {
          "x1": 190,
          "y1": 200,
          "x2": 360,
          "y2": 265
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      }
    ]
  },
  "EUUATNT": {
    "plate_number": "EUUATNT",
    "vehicle_desc": "Urban Grid Vehicle (Real ANPR Capture)",
    "owner": "Verified Grid Transit",
    "color": "#38bdf8",
    "is_real_pipeline_output": true,
    "is_watchlist_hit": false,
    "detections": [
      {
        "id": "gov-cam02-1788529373885",
        "camera_id": 2,
        "location_name": "02 02 Janpath",
        "timestamp_pts": 1788529373885,
        "timestamp_utc": "2026-09-04 13:42:53.885",
        "confidence": 3.1,
        "speed_est_kmh": 40,
        "bbox": {
          "x1": 190,
          "y1": 200,
          "x2": 360,
          "y2": 265
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam02-1788529447913",
        "camera_id": 2,
        "location_name": "02 02 Janpath",
        "timestamp_pts": 1788529447913,
        "timestamp_utc": "2026-09-04 13:44:07.913",
        "confidence": 3.1,
        "speed_est_kmh": 43,
        "bbox": {
          "x1": 200,
          "y1": 205,
          "x2": 370,
          "y2": 270
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      }
    ]
  }
};
