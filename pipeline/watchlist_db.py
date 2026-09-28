"""
Sentinel Unified Grid — Watchlist DB & Cross-Referencing Logic
Provides instant dictionary lookup for flagged vehicles across Gujarat CCTV network.
"""

WATCHLIST_DATABASE = {
    "JANPATH": {
        "plate_number": "JANPATH",
        "reason": "CRITICAL: SURVEILLANCE FLAG (Transit Corridor Active Monitoring)",
        "category": "Transit Surveillance",
        "severity": "CRITICAL",
        "alert_sound": True,
        "vehicle_desc": "Commercial Transit Vehicle (Captured on Cam 02)",
        "owner": "Ahmedabad Municipal Transport Service",
        "origin_district": "Ahmedabad",
        "date_flagged": "2026-09-04"
    },
    "CS1TMS": {
        "plate_number": "CS1TMS",
        "reason": "CRITICAL: CROSS-CAMERA MOVEMENT MONITORING (FIR #2026-0419)",
        "category": "Traffic Monitoring",
        "severity": "CRITICAL",
        "alert_sound": True,
        "vehicle_desc": "Sensor Transit Vehicle (Captured on Cam 01 & 02)",
        "owner": "State Surveillance Monitoring Fleet",
        "origin_district": "Ahmedabad",
        "date_flagged": "2026-09-04"
    },
    "CH1MAN": {
        "plate_number": "CH1MAN",
        "reason": "HIGH PRIORITY: SPEED & ROUTE AUDIT FLAG",
        "category": "Grid Intercept",
        "severity": "HIGH",
        "alert_sound": True,
        "vehicle_desc": "Urban Transit Unit (Captured on Cam 01)",
        "owner": "Ahmedabad Urban Infrastructure Fleet",
        "origin_district": "Ahmedabad",
        "date_flagged": "2026-09-04"
    }
}

def check_watchlist(plate_number: str):
    """
    Fast O(1) dictionary lookup for vehicle plate cross-referencing.
    Supports normalized comparison.
    """
    if not plate_number:
        return None
    
    clean_query = plate_number.upper().replace(" ", "").replace("-", "").strip()
    
    # 1. Exact Match
    if clean_query in WATCHLIST_DATABASE:
        return WATCHLIST_DATABASE[clean_query]
    
    # 2. Check slight variations or fuzzy prefix
    for plate, info in WATCHLIST_DATABASE.items():
        if clean_query == plate.replace(" ", "").replace("-", ""):
            return info
            
    return None
