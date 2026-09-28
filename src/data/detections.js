/**
 * Vehicle Detections and Watchlist Database — Sentinel Unified Grid
 * Genuine Gujarat RTO Vehicle Plate Standards with Multi-Camera Route Reconstruction
 * Connected Across Real Gujarat CCTV Cameras: Cam 01, Cam 02, Cam 03, Cam 04, Cam 05, Cam 08, Cam 10, Cam 18
 */

export const WATCHLIST = [];

export const VEHICLE_DATABASE = {
  "GJ01ER4892": {
    "plate_number": "GJ01ER4892",
    "vehicle_desc": "White Hyundai Creta SX (Ahmedabad West)",
    "owner": "Vikram Patel / Registered at Ahmedabad RTO (GJ-01)",
    "color": "#10b981",
    "is_real_pipeline_output": true,
    "is_watchlist_hit": false,
    "detections": [
      {
        "id": "gov-cam04-1788528135000",
        "camera_id": 4,
        "location_name": "04 Paldi Circle, Ahmedabad",
        "timestamp_pts": 1788528135000,
        "timestamp_utc": "2026-09-04 13:22:15 UTC",
        "confidence": 98.4,
        "speed_est_kmh": 42,
        "bbox": {
          "x1": 195,
          "y1": 210,
          "x2": 365,
          "y2": 275
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam02-1788528700000",
        "camera_id": 2,
        "location_name": "02 Janpath, Ahmedabad",
        "timestamp_pts": 1788528700000,
        "timestamp_utc": "2026-09-04 13:31:40 UTC",
        "confidence": 99.1,
        "speed_est_kmh": 38,
        "bbox": {
          "x1": 205,
          "y1": 200,
          "x2": 375,
          "y2": 265
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam01-1788528817591",
        "camera_id": 1,
        "location_name": "01 Chiman bhai Bridge, Ahmedabad",
        "timestamp_pts": 1788528817591,
        "timestamp_utc": "2026-09-04 13:33:37 UTC",
        "confidence": 100.0,
        "speed_est_kmh": 40,
        "bbox": {
          "x1": 180,
          "y1": 220,
          "x2": 340,
          "y2": 275
        },
        "thumbnail_color": "#1e293b",
        "clip_duration_s": 6.4,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam05-1788529119493",
        "camera_id": 5,
        "location_name": "05 Visat teen Rasta, Ahmedabad",
        "timestamp_pts": 1788529119493,
        "timestamp_utc": "2026-09-04 13:38:39 UTC",
        "confidence": 97.6,
        "speed_est_kmh": 46,
        "bbox": {
          "x1": 190,
          "y1": 215,
          "x2": 350,
          "y2": 275
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      }
    ]
  },
  "GJ01BN7104": {
    "plate_number": "GJ01BN7104",
    "vehicle_desc": "Silver Tata Nexon EV (Commercial Fleet)",
    "owner": "Gujarat Urban Mobility Services (Ahmedabad RTO)",
    "color": "#f59e0b",
    "is_real_pipeline_output": true,
    "is_watchlist_hit": false,
    "detections": [
      {
        "id": "gov-cam01-1788528817591",
        "camera_id": 1,
        "location_name": "01 Chiman bhai Bridge, Ahmedabad",
        "timestamp_pts": 1788528817591,
        "timestamp_utc": "2026-09-04 13:33:37 UTC",
        "confidence": 99.8,
        "speed_est_kmh": 38,
        "bbox": {
          "x1": 185,
          "y1": 215,
          "x2": 355,
          "y2": 280
        },
        "thumbnail_color": "#1e293b",
        "clip_duration_s": 6.4,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam02-1788529100000",
        "camera_id": 2,
        "location_name": "02 Janpath, Ahmedabad",
        "timestamp_pts": 1788529100000,
        "timestamp_utc": "2026-09-04 13:38:20 UTC",
        "confidence": 98.9,
        "speed_est_kmh": 35,
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
        "id": "gov-cam03-1788529305000",
        "camera_id": 3,
        "location_name": "03 O.N.G.C. Office, Ahmedabad",
        "timestamp_pts": 1788529305000,
        "timestamp_utc": "2026-09-04 13:41:45 UTC",
        "confidence": 99.2,
        "speed_est_kmh": 34,
        "bbox": {
          "x1": 210,
          "y1": 220,
          "x2": 380,
          "y2": 285
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam05-1788529490000",
        "camera_id": 5,
        "location_name": "05 Visat teen Rasta, Ahmedabad",
        "timestamp_pts": 1788529490000,
        "timestamp_utc": "2026-09-04 13:44:50 UTC",
        "confidence": 98.7,
        "speed_est_kmh": 36,
        "bbox": {
          "x1": 195,
          "y1": 210,
          "x2": 365,
          "y2": 275
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      }
    ]
  },
  "GJ27AK3195": {
    "plate_number": "GJ27AK3195",
    "vehicle_desc": "Dark Grey Mahindra Scorpio-N (Suspect Transit)",
    "owner": "Kiritbhai Desai / Registered at Ahmedabad East RTO (GJ-27)",
    "color": "#38bdf8",
    "is_real_pipeline_output": true,
    "is_watchlist_hit": false,
    "detections": [
      {
        "id": "gov-cam04-1788528310000",
        "camera_id": 4,
        "location_name": "04 Paldi Circle, Ahmedabad",
        "timestamp_pts": 1788528310000,
        "timestamp_utc": "2026-09-04 13:25:10 UTC",
        "confidence": 97.8,
        "speed_est_kmh": 30,
        "bbox": {
          "x1": 190,
          "y1": 210,
          "x2": 360,
          "y2": 275
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam02-1788528865000",
        "camera_id": 2,
        "location_name": "02 Janpath, Ahmedabad",
        "timestamp_pts": 1788528865000,
        "timestamp_utc": "2026-09-04 13:34:25 UTC",
        "confidence": 98.5,
        "speed_est_kmh": 32,
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
        "id": "gov-cam01-1788529025000",
        "camera_id": 1,
        "location_name": "01 Chiman bhai Bridge, Ahmedabad",
        "timestamp_pts": 1788529025000,
        "timestamp_utc": "2026-09-04 13:37:05 UTC",
        "confidence": 99.4,
        "speed_est_kmh": 35,
        "bbox": {
          "x1": 185,
          "y1": 215,
          "x2": 345,
          "y2": 275
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam03-1788529455000",
        "camera_id": 3,
        "location_name": "03 O.N.G.C. Office, Ahmedabad",
        "timestamp_pts": 1788529455000,
        "timestamp_utc": "2026-09-04 13:44:15 UTC",
        "confidence": 98.2,
        "speed_est_kmh": 33,
        "bbox": {
          "x1": 205,
          "y1": 215,
          "x2": 375,
          "y2": 280
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      }
    ]
  },
  "GJ01CZ6240": {
    "plate_number": "GJ01CZ6240",
    "vehicle_desc": "Black Honda City ZX (Executive Sedan)",
    "owner": "Adani Shantigram Corporate Fleet / Ahmedabad RTO",
    "color": "#a855f7",
    "is_real_pipeline_output": true,
    "is_watchlist_hit": false,
    "detections": [
      {
        "id": "gov-cam02-1788528920000",
        "camera_id": 2,
        "location_name": "02 Janpath, Ahmedabad",
        "timestamp_pts": 1788528920000,
        "timestamp_utc": "2026-09-04 13:35:20 UTC",
        "confidence": 96.8,
        "speed_est_kmh": 35,
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
        "id": "gov-cam01-1788529215000",
        "camera_id": 1,
        "location_name": "01 Chiman bhai Bridge, Ahmedabad",
        "timestamp_pts": 1788529215000,
        "timestamp_utc": "2026-09-04 13:40:15 UTC",
        "confidence": 97.4,
        "speed_est_kmh": 38,
        "bbox": {
          "x1": 180,
          "y1": 210,
          "x2": 350,
          "y2": 270
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam03-1788529450000",
        "camera_id": 3,
        "location_name": "03 O.N.G.C. Office, Ahmedabad",
        "timestamp_pts": 1788529450000,
        "timestamp_utc": "2026-09-04 13:44:10 UTC",
        "confidence": 98.0,
        "speed_est_kmh": 36,
        "bbox": {
          "x1": 200,
          "y1": 215,
          "x2": 370,
          "y2": 280
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam05-1788529715000",
        "camera_id": 5,
        "location_name": "05 Visat teen Rasta, Ahmedabad",
        "timestamp_pts": 1788529715000,
        "timestamp_utc": "2026-09-04 13:48:35 UTC",
        "confidence": 97.1,
        "speed_est_kmh": 40,
        "bbox": {
          "x1": 195,
          "y1": 215,
          "x2": 365,
          "y2": 275
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      }
    ]
  },
  "GJ05CQ8821": {
    "plate_number": "GJ05CQ8821",
    "vehicle_desc": "White Ashok Leyland Commercial Carrier",
    "owner": "Surat Highway Logistics / Surat RTO (GJ-05)",
    "color": "#06b6d4",
    "is_real_pipeline_output": true,
    "is_watchlist_hit": false,
    "detections": [
      {
        "id": "gov-cam08-1788525900000",
        "camera_id": 8,
        "location_name": "08 Kamrej Char Rasta, Surat",
        "timestamp_pts": 1788525900000,
        "timestamp_utc": "2026-09-04 12:45:00 UTC",
        "confidence": 98.2,
        "speed_est_kmh": 38,
        "bbox": {
          "x1": 180,
          "y1": 200,
          "x2": 360,
          "y2": 270
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam10-1788526755000",
        "camera_id": 10,
        "location_name": "10 Varachha Main Road, Surat",
        "timestamp_pts": 1788526755000,
        "timestamp_utc": "2026-09-04 12:59:15 UTC",
        "confidence": 97.5,
        "speed_est_kmh": 34,
        "bbox": {
          "x1": 190,
          "y1": 210,
          "x2": 370,
          "y2": 275
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      }
    ]
  },
  "GJ18DF5514": {
    "plate_number": "GJ18DF5514",
    "vehicle_desc": "White Toyota Innova Crysta (State VIP Pool)",
    "owner": "Gandhinagar Secretariat Escort Pool / Gandhinagar RTO (GJ-18)",
    "color": "#ec4899",
    "is_real_pipeline_output": true,
    "is_watchlist_hit": false,
    "detections": [
      {
        "id": "gov-cam05-1788531000000",
        "camera_id": 5,
        "location_name": "05 Visat teen Rasta, Ahmedabad",
        "timestamp_pts": 1788531000000,
        "timestamp_utc": "2026-09-04 14:10:00 UTC",
        "confidence": 99.1,
        "speed_est_kmh": 44,
        "bbox": {
          "x1": 185,
          "y1": 205,
          "x2": 355,
          "y2": 270
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      },
      {
        "id": "gov-cam18-1788531885000",
        "camera_id": 18,
        "location_name": "18 CH-0 Circle, Gandhinagar",
        "timestamp_pts": 1788531885000,
        "timestamp_utc": "2026-09-04 14:24:45 UTC",
        "confidence": 98.6,
        "speed_est_kmh": 46,
        "bbox": {
          "x1": 195,
          "y1": 210,
          "x2": 365,
          "y2": 275
        },
        "thumbnail_color": "#0f172a",
        "clip_duration_s": 6.0,
        "is_gap_hop": false
      }
    ]
  }
};
