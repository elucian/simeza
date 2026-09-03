import json
import sys
import os

RELEASE_FILE = os.path.join(os.getcwd(), 'release', 'releases.json')

def get_next_version(current_version, is_rc=True):
    # Basic semver increment: 0.1.0 -> 0.1.1
    # If is_rc, 0.1.1 -> 0.1.2-rc.1 or 0.1.1-rc.1 -> 0.1.1-rc.2
    parts = current_version.split('-')[0].split('.')
    major, minor, patch = map(int, parts)
    
    if is_rc:
        if '-' in current_version:
            rc_part = current_version.split('-')[1]
            rc_num = int(rc_part.replace('rc.', ''))
            return f"{major}.{minor}.{patch+1}-rc.{rc_num + 1}"
        else:
            return f"{major}.{minor}.{patch+1}-rc.1"
    else:
        # Promote: 0.1.1-rc.2 -> 0.1.1
        return f"{major}.{minor}.{patch}"

def bump_version(is_rc=True):
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
    else:
        data['published']['version'] = new_version
        data['candidate'] = {'version': '', 'commit': '', 'date': '', 'notes': ''}

    with open(RELEASE_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)
    print(f"Bumped version to {new_version}")

if __name__ == '__main__':
    is_rc = len(sys.argv) > 1 and sys.argv[1] == 'rc'
    bump_version(is_rc)
