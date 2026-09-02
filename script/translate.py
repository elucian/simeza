import os
import json
import urllib.request
import urllib.parse
import re
import hashlib

# Configuration
LANGUAGES = ['ro', 'en', 'de', 'es', 'fr', 'ru', 'pt', 'hu']
PAGES_DIR = 'articles'
CACHE_FILE = 'release/.translation_cache.json'
EN_DIR = os.path.join(PAGES_DIR, 'en')

def get_file_hash(filepath):
    """Calculate SHA-256 hash of a file."""
    sha256 = hashlib.sha256()
    with open(filepath, 'rb') as f:
        while chunk := f.read(8192):
            sha256.update(chunk)
    return sha256.hexdigest()

def load_cache():
    if os.path.exists(CACHE_FILE):
        with open(CACHE_FILE, 'r') as f:
            return json.load(f)
    return {}

def save_cache(cache):
    os.makedirs(os.path.dirname(CACHE_FILE), exist_ok=True)
    with open(CACHE_FILE, 'w') as f:
        json.dump(cache, f, indent=2)

def translate_markdown(content, target_lang, source_lang="en"):
    if not content.strip():
        return content
    
    # Protect code blocks
    code_blocks = []
    def save_code_block(match):
        idx = len(code_blocks)
        code_blocks.append(match.group(0))
        return f"__CODE_BLOCK_{idx}__"
    
    # Match fenced code blocks
    protected_content = re.sub(r"```[\s\S]*?```", save_code_block, content)
    
    # Translate
    data = urllib.parse.urlencode({"q": protected_content}).encode("utf-8")
    url = f"https://translate.googleapis.com/translate_a/single?client=gtx&sl={source_lang}&tl={target_lang}&dt=t"
    req = urllib.request.Request(url, data=data, headers={"User-Agent": "Mozilla/5.0"})
    
    with urllib.request.urlopen(req) as resp:
        res_data = json.loads(resp.read().decode("utf-8"))
        translated = "".join(part[0] for part in res_data[0] if part[0])
    
    # Restore code blocks
    for idx, block in enumerate(code_blocks):
        pattern = re.compile(rf"__\s*CODE_BLOCK_{idx}\s*__")
        translated = pattern.sub(lambda m: block, translated)
        
    return translated

def translate_all():
    cache = load_cache()
    changed = False
    
    for root, dirs, files in os.walk(EN_DIR):
        for file in files:
            if not file.endswith('.md'): continue
            
            en_path = os.path.join(root, file)
            en_hash = get_file_hash(en_path)
            rel_path = os.path.relpath(en_path, EN_DIR)
            
            with open(en_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            for lang in LANGUAGES:
                if lang == 'en': continue
                
                target_path = os.path.join(PAGES_DIR, lang, rel_path)
                
                # Check cache/mod time
                cache_key = f"{lang}/{rel_path}"
                if cache.get(cache_key) == en_hash and os.path.exists(target_path):
                    continue
                
                print(f"Translating {rel_path} to {lang}...")
                translated_content = translate_markdown(content, lang)
                
                os.makedirs(os.path.dirname(target_path), exist_ok=True)
                with open(target_path, 'w', encoding='utf-8') as f:
                    f.write(translated_content)
                
                cache[cache_key] = en_hash
                changed = True
    
    if changed:
        save_cache(cache)
        print("Translation complete.")
    else:
        print("No changes to translate.")

if __name__ == '__main__':
    translate_all()
