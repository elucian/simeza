import os
import shutil
import sys

# Append script directory to path to allow importing from other scripts
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from translate import LANGUAGES, SLUG_MAP

PAGES_DIR = 'pages'
CACHE_DIR = 'cache'
LOCAL_DIR = 'local'

def clean():
    # 1. Clean local/
    if os.path.exists(LOCAL_DIR):
        print(f"Removing {LOCAL_DIR}...")
        shutil.rmtree(LOCAL_DIR)
    
    # 2. Clean __pycache__
    for root, dirs, files in os.walk('.'):
        if '__pycache__' in dirs:
            print(f"Removing {os.path.join(root, '__pycache__')}...")
            shutil.rmtree(os.path.join(root, '__pycache__'))

    # 3. Clean orphans in cache/
    active_pages = [f for f in os.listdir(PAGES_DIR) if f.endswith('.md')]
    
    for lang in LANGUAGES:
        if lang == 'en': continue
        
        lang_cache = os.path.join(CACHE_DIR, lang)
        if not os.path.exists(lang_cache): continue
        
        # Valid files: menu.json + translated slugs
        valid_files = {'menu.json'}
        for page in active_pages:
            # If the page is in SLUG_MAP, add the mapped slug
            if page in SLUG_MAP:
                slug = SLUG_MAP[page].get(lang)
                if slug:
                    valid_files.add(slug)
            else:
                # If page not in SLUG_MAP, it uses the original filename
                valid_files.add(page)
        
        # Remove invalid files
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
    clean()
