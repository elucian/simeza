import os
import json
import sys
import subprocess
import datetime
import build

# Paths
ROOT = os.getcwd()
RELEASE_FILE = os.path.join(ROOT, 'release', 'releases.json')
RELEASE_DIR = os.path.join(ROOT, 'release')

def generate_release_notes(version, prev_commit, curr_commit):
    """Automatically generate release notes markdown file based on git history."""
    try:
        if prev_commit:
            log_output = subprocess.check_output(['git', 'log', f'{prev_commit}..{curr_commit}', '--oneline'], encoding='utf-8', errors='ignore').strip()
            files_output = subprocess.check_output(['git', 'diff', '--name-only', prev_commit, curr_commit], encoding='utf-8', errors='ignore').strip()
        else:
            log_output = subprocess.check_output(['git', 'log', '-n', '15', '--oneline'], encoding='utf-8', errors='ignore').strip()
            files_output = subprocess.check_output(['git', 'ls-files'], encoding='utf-8', errors='ignore').strip()
    except Exception as e:
        log_output = f"Could not retrieve git log: {e}"
        files_output = ""

    date_str = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    
    notes_content = f"""# Release Notes: {version}
 
- **Release Date**: {date_str}
- **Current Commit**: `{curr_commit}`
- **Previous Commit**: `{prev_commit or 'None'}`

## Summary of Commits
```text
{log_output}
```

## Affected Files
```text
{files_output}
```
"""
    os.makedirs(RELEASE_DIR, exist_ok=True)
    safe_version = version.replace('/', '-').replace('\\', '-')
    notes_filename = f"notes-{safe_version}.md"
    notes_filepath = os.path.join(RELEASE_DIR, notes_filename)
    
    with open(notes_filepath, 'w', encoding='utf-8') as f:
        f.write(notes_content)
    
    print(f"Generated release notes at {notes_filepath}")
    return f"release/{notes_filename}"

def release():
    if not os.path.exists(RELEASE_FILE):
        print("Release file not found.")
        sys.exit(1)

    with open(RELEASE_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # 1. Promote candidate to published
    cand = data.get('candidate', {})
    if not cand.get('version'):
        print("No candidate found to release.")
        sys.exit(0)
    
    pub = data.get('published', {})
    version = cand['version']
    print(f"Releasing version {version}...")

    prev_commit = pub.get('commit', '')
    try:
        curr_commit = subprocess.check_output(['git', 'rev-parse', 'HEAD'], encoding='utf-8').strip()
    except:
        curr_commit = cand.get('commit', '')

    # Automatically generate release notes file
    notes_path = generate_release_notes(version, prev_commit, curr_commit)
    cand['notes'] = notes_path
    if not cand.get('commit'):
        cand['commit'] = curr_commit

    # Promote
    data['published'] = cand
    data['candidate'] = {'version': '', 'commit': '', 'date': '', 'notes': ''}

    with open(RELEASE_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)

    # 2. Build
    build.build()
    
    print("Release completed successfully.")

if __name__ == '__main__':
    release()
