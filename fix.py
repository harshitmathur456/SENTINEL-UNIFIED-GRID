import re

with open('src/data/cameras.js', 'r') as f:
    content = f.read()

lines = content.split('\n')
cid = 1
for i in range(len(lines)):
    if 'id:' in lines[i] and 'external_id' not in lines[i]:
        m = re.search(r'id:\s*(\d+)', lines[i])
        if m:
            cid = int(m.group(1))
    if 'hls_url:' in lines[i]:
        lines[i] = re.sub(r'hls_url:\s*.*', f'hls_url: "https://cctv.corp8.cloud/cam{cid:02d}/index.m3u8",', lines[i])

with open('src/data/cameras.js', 'w') as f:
    f.write('\n'.join(lines))
