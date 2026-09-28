import json
import csv

with open('output/detections.json', 'r', encoding='utf-8') as f:
    dets = json.load(f)

with open('output/anpr_audit_log.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['Detection_ID', 'Plate_Number', 'Confidence', 'Camera_ID', 'Camera_Name', 'Timestamp_PTS', 'Timestamp_UTC', 'Watchlist_Flag', 'Reason'])
    for d in dets:
        writer.writerow([
            d.get('id', ''),
            d.get('plate_number', ''),
            f"{float(d.get('confidence', 0)):.1f}",
            d.get('camera_id', ''),
            d.get('camera_name', ''),
            d.get('timestamp_pts', ''),
            d.get('timestamp_utc', ''),
            d.get('is_watchlist_hit', False),
            d.get('watchlist_info', {}).get('reason', 'NONE') if d.get('watchlist_info') else 'NONE'
        ])
print(f"anpr_audit_log.csv populated with {len(dets)} real ANPR records.")
