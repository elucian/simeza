import os
import json
import sys
import subprocess
import shutil

# Paths
ROOT = os.getcwd()
RELEASE_FILE = os.path.join(ROOT, 'release', 'releases.json')
# Assuming build.py is in script/
sys.path.append(os.path.join(ROOT, 'script'))
import build

def release():
    if not os.path.exists(RELEASE_FILE):
        print("Release file not found.")
        sys.exit(1)

    with open(RELEASE_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)

    pub = data.get('published', {})
    cand = data.get('candidate', {})

    if not cand.get('version') or cand.get('version') == pub.get('version'):
        print("Published version matches candidate. Nothing to release.")
        sys.exit(0)

    print(f"Releasing version {cand['version']}...")

    # 1. Promote candidate to published
    data['published'] = cand
    data['candidate'] = {'version': '', 'commit': '', 'date': '', 'notes': ''}

    with open(RELEASE_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)

    # 2. Build
    build.build()
    
    print("Release completed successfully.")

if __name__ == '__main__':
    release()
