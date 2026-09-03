import json
import sys
import os
import datetime
import subprocess

RELEASE_FILE = os.path.join(os.getcwd(), 'release', 'releases.json')
RELEASE_LOG = os.path.join(os.getcwd(), 'release', 'release.log')

def get_next_version(current_version, is_rc=True):
    # Basic semver increment: 0.1.0 -> 0.1.1
    # If is_rc: 0.1.0 -> 0.1.1-rc.1, 0.1.1-rc.1 -> 0.1.1-rc.2
    parts = current_version.split('-')[0].split('.')
    major, minor, patch = map(int, parts)
    
    if is_rc:
        if '-' in current_version:
            # Already an RC, increment only the RC number
            base = f"{major}.{minor}.{patch}"
            rc_part = current_version.split('-')[1]
            rc_num = int(rc_part.replace('rc.', ''))
            return f"{base}-rc.{rc_num + 1}"
        else:
            # Promote to new RC (next patch)
            return f"{major}.{minor}.{patch+1}-rc.1"
    else:
        # Promote: 0.1.1-rc.2 -> 0.1.1
        return f"{major}.{minor}.{patch}"

def log_event(message):
    with open(RELEASE_LOG, 'a', encoding='utf-8') as f:
        timestamp = datetime.datetime.now().isoformat()
        f.write(f"[{timestamp}] {message}\n")

def bump_version(is_rc=True, commit_msg=""):
    if not os.path.exists(RELEASE_FILE):
        print("Release file not found.")
        sys.exit(1)
        
    with open(RELEASE_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    pub = data.get('published', {})
    current_version = pub.get('version', '0.1.0')
    
    cand = data.get('candidate', {})
    if cand.get('version'):
        current_version = cand['version']
    
    new_version = get_next_version(current_version, is_rc)
    
    if is_rc:
        data['candidate']['version'] = new_version
        data['candidate']['commit'] = commit_msg
        data['candidate']['date'] = datetime.datetime.now().isoformat()
        # Default status to pending, build will update it
        data['candidate']['notes'] = "pending"
    else:
        data['published']['version'] = new_version
        # Reset candidate
        data['candidate'] = {'version': '', 'commit': '', 'date': '', 'notes': ''}

    with open(RELEASE_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)
    
    print(f"Bumped version to {new_version}")
    log_event(f"Bumped version to {new_version}. Commit: {commit_msg}")

if __name__ == '__main__':
    is_rc = len(sys.argv) > 1 and sys.argv[1] == 'rc'
    commit_msg = sys.argv[2] if len(sys.argv) > 2 else "No message"
    bump_version(is_rc, commit_msg)
