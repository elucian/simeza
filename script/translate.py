import os
import json
import urllib.request
import urllib.parse
import time
import re
import hashlib
import shutil

# Configuration
LANGUAGES = ['ro', 'en', 'de', 'es', 'fr', 'ru', 'pt', 'hu']
PAGES_DIR = 'pages'
CACHE_DIR = 'cache'
LAYOUT_DIR = 'layout'

def get_file_hash(filepath):
    """Calculate SHA-256 hash of a file."""
    sha256 = hashlib.sha256()
    with open(filepath, 'rb') as f:
        while chunk := f.read(8192):
            sha256.update(chunk)
    return sha256.hexdigest()

def parse_frontmatter(content):
    # Regex to capture the YAML block
    m = re.match(r'^---\s*\n(.*?)\n---\s*\n', content, re.DOTALL)
    if not m:
        return {}, content
    
    meta_block = m.group(1)
    body = content[m.end():]
    
    meta = {}
    for line in meta_block.splitlines():
        if ':' in line:
            k, v = line.split(':', 1)
            meta[k.strip().lower()] = v.strip()
    return meta, body

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
    time.sleep(1)
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
    # 1. Translate Pages
    for file in os.listdir(PAGES_DIR):
        if not file.endswith('.md'): continue
        
        filepath = os.path.join(PAGES_DIR, file)
        en_hash = get_file_hash(filepath)
        
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        meta, body = parse_frontmatter(content)
        
        for lang in LANGUAGES:
            if lang == 'en': continue
            
            lang_dir = os.path.join(CACHE_DIR, lang)
            os.makedirs(lang_dir, exist_ok=True)
            target_path = os.path.join(lang_dir, file)
            
            # Check if translation exists and hash matches
            if os.path.exists(target_path):
                with open(target_path, 'r', encoding='utf-8') as f:
                    cached_content = f.read()
                    cached_meta, _ = parse_frontmatter(cached_content)
                if cached_meta.get('source_hash') == en_hash:
                    continue
            
            print(f"Translating {file} to {lang}...")
            
            # Translate body
            trans_body = translate_markdown(body, lang)
            # Translate meta
            trans_meta = meta.copy()
            for k, v in meta.items():
                trans_meta[k] = translate_markdown(v, lang)
            
            trans_meta['source_hash'] = en_hash
            
            # Reconstruct content
            meta_str = "---\n" + "\n".join([f"{k}: {v}" for k, v in trans_meta.items()]) + "\n---\n"
            with open(target_path, 'w', encoding='utf-8') as f:
                f.write(meta_str + trans_body)
    
    # 2. Translate Menu
    menu_file = os.path.join(LAYOUT_DIR, 'menu.json')
    with open(menu_file, 'r', encoding='utf-8') as f:
        menu_data = json.load(f)
        
    for lang in LANGUAGES:
        if lang == 'en': continue
        
        # Simple translation for menu
        translated_menu = {}
        for label, url in menu_data.items():
            translated_menu[translate_markdown(label, lang)] = url
            
        with open(os.path.join(CACHE_DIR, lang, 'menu.json'), 'w', encoding='utf-8') as f:
            json.dump(translated_menu, f, indent=2)

if __name__ == '__main__':
    translate_all()
