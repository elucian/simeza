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

# Slug map to ensure URL-friendly filenames.
# If a file is not in this map, it will use the original filename (untranslated).
# This provides stable URLs.
SLUG_MAP = {
    'about.md': {'ro': 'despre.md', 'de': 'ueber-uns.md', 'fr': 'a-propos.md', 'es': 'sobre-nosotros.md', 'ru': 'o-nas.md', 'pt': 'sobre.md', 'hu': 'rolunk.md'},
    'events.md': {'ro': 'evenimente.md', 'de': 'veranstaltungen.md', 'fr': 'evenements.md', 'es': 'eventos.md', 'ru': 'sobytiya.md', 'pt': 'eventos.md', 'hu': 'esemenyek.md'},
    'authors.md': {'ro': 'autori.md', 'de': 'autoren.md', 'fr': 'auteurs.md', 'es': 'autores.md', 'ru': 'avtory.md', 'pt': 'autores.md', 'hu': 'szerzok.md'},
    'writings.md': {'ro': 'scrieri.md', 'de': 'schriften.md', 'fr': 'ecrits.md', 'es': 'escritos.md', 'ru': 'stati.md', 'pt': 'escritos.md', 'hu': 'irasok.md'},
    'gallery.md': {'ro': 'galerie.md', 'de': 'galerie.md', 'fr': 'galerie.md', 'es': 'galeria.md', 'ru': 'galereya.md', 'pt': 'galeria.md', 'hu': 'galeria.md'},
    'books.md': {'ro': 'carti.md', 'de': 'buecher.md', 'fr': 'livres.md', 'es': 'libros.md', 'ru': 'knigi.md', 'pt': 'livros.md', 'hu': 'konyvek.md'}
}

# Menu label map
MENU_MAP = {
    'About': {'ro': 'Despre', 'de': 'Über', 'fr': 'À propos', 'es': 'Acerca de', 'ru': 'О нас', 'pt': 'Sobre', 'hu': 'Rólunk'},
    'Events': {'ro': 'Evenimente', 'de': 'Veranstaltungen', 'fr': 'Événements', 'es': 'Eventos', 'ru': 'События', 'pt': 'Eventos', 'hu': 'Események'},
    'Authors': {'ro': 'Autori', 'de': 'Autoren', 'fr': 'Auteurs', 'es': 'Autores', 'ru': 'Авторы', 'pt': 'Autores', 'hu': 'Szerzők'},
    'Writings': {'ro': 'Scrieri', 'de': 'Schriften', 'fr': 'Écrits', 'es': 'Obras', 'ru': 'Статьи', 'pt': 'Escritos', 'hu': 'Írások'},
    'Gallery': {'ro': 'Galerie', 'de': 'Galerie', 'fr': 'Galerie', 'es': 'Galería', 'ru': 'Галерея', 'pt': 'Galeria', 'hu': 'Galéria'},
    'Books': {'ro': 'Cărți', 'de': 'Bücher', 'fr': 'Livres', 'es': 'Libros', 'ru': 'Книги', 'pt': 'Livros', 'hu': 'Könyvek'}
}

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

def translate_text(text, target_lang):
    """Translate text using MyMemory API."""
    if not text.strip():
        return text
    
    # Simple rate limiting/delay
    time.sleep(1)
    
    params = {'q': text, 'langpair': f'en|{target_lang}'}
    url = f"https://api.mymemory.translated.net/get?{urllib.parse.urlencode(params)}"
    
    try:
        with urllib.request.urlopen(url) as resp:
            res_data = json.loads(resp.read().decode("utf-8"))
            if res_data['responseStatus'] == 200:
                return res_data['responseData']['translatedText']
    except Exception as e:
        print(f"Translation error: {e}")
    return text # Fallback

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
            
            slug = SLUG_MAP.get(file, {}).get(lang, file)
            lang_dir = os.path.join(CACHE_DIR, lang)
            os.makedirs(lang_dir, exist_ok=True)
            target_path = os.path.join(lang_dir, slug)
            
            # Check if translation exists and hash matches
            if os.path.exists(target_path):
                with open(target_path, 'r', encoding='utf-8') as f:
                    cached_content = f.read()
                    cached_meta, _ = parse_frontmatter(cached_content)
                if cached_meta.get('source_hash') == en_hash:
                    continue
            
            print(f"Translating {file} -> {lang}/{slug}...")
            
            # Translate body
            trans_body = translate_text(body, lang)
            # Translate meta
            trans_meta = meta.copy()
            for k, v in meta.items():
                trans_meta[k] = translate_text(v, lang)
            
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
        
        # Translate menu labels and update URLs to use translated slugs
        translated_menu = {}
        for label, url in menu_data.items():
            # Use MENU_MAP if available, otherwise translate
            trans_label = MENU_MAP.get(label, {}).get(lang, translate_text(label, lang))
            
            # Find the original filename (e.g., 'about.html') to match with SLUG_MAP
            original_filename = url.replace('.html', '.md')
            
            # Get translated filename
            translated_filename = SLUG_MAP.get(original_filename, {}).get(lang, original_filename).replace('.md', '.html')
            
            translated_menu[trans_label] = translated_filename
            
        with open(os.path.join(CACHE_DIR, lang, 'menu.json'), 'w', encoding='utf-8') as f:
            json.dump(translated_menu, f, indent=2)

if __name__ == '__main__':
    translate_all()
