import os
import shutil
import sys
import argparse

# Append script directory to path to allow importing from other scripts
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from translate import LANGUAGES, SLUG_MAP

PAGES_DIR = 'pages'
CACHE_DIR = 'cache'
LOCAL_DIR = 'local'
RELEASE_DIR = 'release'
RELEASE_LOG = os.path.join(RELEASE_DIR, 'release.log')

def clean_logs():
    """Keep release.log and remove legacy releaseN.log files."""
    if not os.path.exists(RELEASE_DIR):
        return

    print("Cleaning up rotated log files...")
    
    # Remove all release*.log files except release.log
    for filename in os.listdir(RELEASE_DIR):
        if filename.startswith("release") and filename.endswith(".log") and filename != "release.log":
            filepath = os.path.join(RELEASE_DIR, filename)
            print(f"Removing {filepath}")
            os.remove(filepath)

def clean_notes():
    """Keep only the latest release note file."""
    if not os.path.exists(RELEASE_DIR):
        return
        
    notes = [f for f in os.listdir(RELEASE_DIR) if f.startswith("notes-") and f.endswith(".md")]
    if len(notes) <= 1:
        return
        
    # Sort notes based on filename (assuming timestamps or versions make them sortable)
    # If they are named notes-<version>.md, sorting might not be chronological.
    # We can sort by modification time.
    notes.sort(key=lambda f: os.path.getmtime(os.path.join(RELEASE_DIR, f)), reverse=True)
    
    # Keep the first (newest)
    to_remove = notes[1:]
    for note in to_remove:
        print(f"Removing old release note: {note}")
        os.remove(os.path.join(RELEASE_DIR, note))

def clean(target=None):
    clean_logs()
    clean_notes()
    
    # 1. Clean __pycache__ everywhere
    for root, dirs, files in os.walk('.'):
        if '__pycache__' in dirs:
            print(f"Removing {os.path.join(root, '__pycache__')}...")
            shutil.rmtree(os.path.join(root, '__pycache__'))

    if target == 'all':
        if os.path.exists(LOCAL_DIR):
            print(f"Removing entire {LOCAL_DIR}...")
            shutil.rmtree(LOCAL_DIR)
        if os.path.exists(CACHE_DIR):
            print(f"Removing entire {CACHE_DIR}...")
            shutil.rmtree(CACHE_DIR)
        print("All local builds and translation caches removed.")
        return

    if target in LANGUAGES:
        lang_local = os.path.join(LOCAL_DIR, target)
        if os.path.exists(lang_local):
            print(f"Removing local build for {target} ({lang_local})...")
            shutil.rmtree(lang_local)
        
        lang_cache = os.path.join(CACHE_DIR, target)
        if os.path.exists(lang_cache):
            print(f"Removing translation cache for {target} ({lang_cache})...")
            shutil.rmtree(lang_cache)
            
        print(f"Translations and build for {target} removed.")
        return

    # If no target specified, clean stale cache files (orphans)
    active_pages = [f for f in os.listdir(PAGES_DIR) if f.endswith('.md')]
    
    for lang in LANGUAGES:
        if lang == 'en': continue
        
        lang_cache = os.path.join(CACHE_DIR, lang)
        if not os.path.exists(lang_cache): continue
        
        valid_files = {'menu.json'}
        for page in active_pages:
            if page in SLUG_MAP:
                slug = SLUG_MAP[page].get(lang)
                if slug:
                    valid_files.add(slug)
            else:
                valid_files.add(page)
        
        for cached_file in os.listdir(lang_cache):
            if cached_file not in valid_files:
                file_path = os.path.join(lang_cache, cached_file)
                print(f"Removing stale cache file: {file_path}")
                if os.path.isdir(file_path):
                    shutil.rmtree(file_path)
                else:
                    os.remove(file_path)
    
    print("Cleanup completed.")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Clean translation cache and local builds.")
    parser.add_argument('target', nargs='?', help="Language code to clean (e.g. ro), 'all' to clean everything, or omit for stale files.")
    args = parser.parse_args()
    clean(args.target)
