import os
import requests
import re
import json

session = requests.Session()
login_url = 'https://cctv.corp8.cloud/auth/login'
username = os.environ.get('SENTINEL_EMAIL', '')
password = os.environ.get('SENTINEL_PASSWORD', '')

if not password:
    print('WARNING: SENTINEL_PASSWORD environment variable not set. Running unauthenticated.')
    res = session.get('https://cctv.corp8.cloud/', headers={'User-Agent': 'Mozilla/5.0'})
else:
    res = session.post(login_url, json={'username': username, 'password': password}, headers={'User-Agent': 'Mozilla/5.0'})
    print('Login status:', res.status_code)

dash_res = session.get('https://cctv.corp8.cloud/', headers={'User-Agent': 'Mozilla/5.0'})
print('Dash status:', dash_res.status_code)
html = dash_res.text

with open('output/control_room.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Saved output/control_room.html, length:', len(html))

# Look for m3u8 or video URLs
m3u8_matches = re.findall(r'[\'"][^\'"]*\.m3u8[^\'"]*[\'"]', html)
print('m3u8 matches:', m3u8_matches)

stream_matches = re.findall(r'[\'"][^\'"]*(?:stream|live|camera|rtsp|hls|webrtc)[^\'"]*[\'"]', html, re.IGNORECASE)
print('stream matches count:', len(stream_matches))
print('sample stream matches:', stream_matches[:15])

# Print scripts or HTML structure
lines = html.splitlines()
print(f'Total HTML lines: {len(lines)}')
for idx, line in enumerate(lines):
    if any(k in line.lower() for k in ['hls', 'video', 'stream', 'camera', 'fetch(', 'api', 'source']):
        print(f'{idx+1}: {line.strip()[:140]}')
