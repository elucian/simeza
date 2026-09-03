import os
import json
import urllib.request
import urllib.error
import time
import re
import hashlib
import shutil
import sys
import argparse

# --- .env loading ---
def load_env():
    env_path = os.path.join(os.getcwd(), '.env')
    if os.path.exists(env_path):
        with open(env_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    k, v = line.split('=', 1)
                    os.environ.setdefault(k.strip(), v.strip().strip("'\""))

load_env()
# --------------------

# Configuration
LANGUAGES = ['ro', 'en', 'de', 'es', 'fr', 'ru', 'pt', 'hu', 'it']
PAGES_DIR = 'pages'
CACHE_DIR = 'cache'
LAYOUT_DIR = 'layout'
GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta'
GEMINI_MODEL = os.environ.get('GEMINI_MODEL', 'models/gemini-3.5-flash-lite')

LANGUAGE_NAMES = {
    'ro': 'Romanian',
    'de': 'German',
    'es': 'Spanish',
    'fr': 'French',
    'ru': 'Russian',
    'pt': 'Portuguese',
    'hu': 'Hungarian',
    'it': 'Italian',
    'en': 'English'
}

# Slug map to ensure URL-friendly filenames.
# If a file is not in this map, it will use the original filename (untranslated).
# This provides stable URLs.
SLUG_MAP = {
    'about.md': {'ro': 'despre.md', 'de': 'ueber-uns.md', 'fr': 'a-propos.md', 'es': 'sobre-nosotros.md', 'ru': 'o-nas.md', 'pt': 'sobre.md', 'hu': 'rolunk.md', 'it': 'chi-siamo.md'},
    'events.md': {'ro': 'evenimente.md', 'de': 'veranstaltungen.md', 'fr': 'evenements.md', 'es': 'eventos.md', 'ru': 'sobytiya.md', 'pt': 'eventos.md', 'hu': 'esemenyek.md', 'it': 'eventi.md'},
    'authors.md': {'ro': 'autori.md', 'de': 'autoren.md', 'fr': 'auteurs.md', 'es': 'autores.md', 'ru': 'avtory.md', 'pt': 'autores.md', 'hu': 'szerzok.md', 'it': 'autori.md'},
    'writings.md': {'ro': 'scrieri.md', 'de': 'schriften.md', 'fr': 'ecrits.md', 'es': 'escritos.md', 'ru': 'stati.md', 'pt': 'escritos.md', 'hu': 'irasok.md', 'it': 'scritti.md'},
    'gallery.md': {'ro': 'galerie.md', 'de': 'galerie.md', 'fr': 'galerie.md', 'es': 'galeria.md', 'ru': 'galereya.md', 'pt': 'galeria.md', 'hu': 'galeria.md', 'it': 'galleria.md'},
    'books.md': {'ro': 'carti.md', 'de': 'buecher.md', 'fr': 'livres.md', 'es': 'libros.md', 'ru': 'knigi.md', 'pt': 'livros.md', 'hu': 'konyvek.md', 'it': 'libri.md'}
}

# Menu label map
MENU_MAP = {
    'About': {'ro': 'Despre', 'de': 'Über', 'fr': 'À propos', 'es': 'Acerca de', 'ru': 'О нас', 'pt': 'Sobre', 'hu': 'Rólunk', 'it': 'Chi siamo'},
    'Events': {'ro': 'Evenimente', 'de': 'Veranstaltungen', 'fr': 'Événements', 'es': 'Eventos', 'ru': 'События', 'pt': 'Eventos', 'hu': 'Események', 'it': 'Eventi'},
    'Authors': {'ro': 'Autori', 'de': 'Autoren', 'fr': 'Auteurs', 'es': 'Autores', 'ru': 'Авторы', 'pt': 'Autores', 'hu': 'Szerzők', 'it': 'Autori'},
    'Writings': {'ro': 'Scrieri', 'de': 'Schriften', 'fr': 'Écrits', 'es': 'Obras', 'ru': 'Статьи', 'pt': 'Escritos', 'hu': 'Írások', 'it': 'Scritti'},
    'Gallery': {'ro': 'Galerie', 'de': 'Galerie', 'fr': 'Galerie', 'es': 'Galería', 'ru': 'Галерея', 'pt': 'Galeria', 'hu': 'Galéria', 'it': 'Galleria'},
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

def normalize_gemini_model(model):
    """Accept the common flash-light typo, but call the API with flash-lite."""
    if model.endswith('-light'):
        return f'{model[:-len("-light")]}-lite'
    return model

def format_translation_error(error):
    if isinstance(error, urllib.error.HTTPError):
        detail = error.read().decode('utf-8', errors='replace')[:500]
        return f'HTTP {error.code}: {detail}'
    if isinstance(error, urllib.error.URLError):
        return f'URL error: {error.reason}'
    return f'{type(error).__name__}: {error}'

def translate_text(text, target_lang, source_lang='en'):
    """Translate text using the Gemini API."""
    if not text.strip():
        return text

    api_key = os.environ.get('GEMINI_API_KEY')
    if not api_key:
        raise RuntimeError('GEMINI_API_KEY environment variable is required')

    # Simple rate limiting/delay
    time.sleep(1)

    source_language = LANGUAGE_NAMES.get(source_lang, source_lang)
    language = LANGUAGE_NAMES.get(target_lang, target_lang)
    
    prompt = (
        f'Translate the following text from {source_language} into {language}. '
        'Return only the translation. Preserve all Markdown formatting, '
        'links and their URLs, HTML tags, code, and line breaks exactly.\n\n'
        f'{text}'
    )
    payload = {
        'contents': [{'parts': [{'text': prompt}]}],
        'generationConfig': {'temperature': 0.2}
    }
    url = f'{GEMINI_API_URL}/{normalize_gemini_model(GEMINI_MODEL)}:generateContent'
    
    request = urllib.request.Request(
        f'{url}?key={api_key}',
        data=json.dumps(payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'},
        method='POST'
    )

    try:
        with urllib.request.urlopen(request) as resp:
            res_data = json.loads(resp.read().decode("utf-8"))
            return res_data['candidates'][0]['content']['parts'][0]['text'].strip()
    except (urllib.error.HTTPError, urllib.error.URLError, KeyError, IndexError, json.JSONDecodeError) as e:
        raise RuntimeError(f'Translation failed for {target_lang}: {format_translation_error(e)}') from e

def translate_pages(target_langs):
    # 1. Translate Pages
    for file in os.listdir(PAGES_DIR):
        if not file.endswith('.md'): continue
        
        filepath = os.path.join(PAGES_DIR, file)
        en_hash = get_file_hash(filepath)
        
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        meta, body = parse_frontmatter(content)
        
        for lang in target_langs:
            if lang == 'en': continue
            if lang not in LANGUAGES: continue
            
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
                    print(f"Skipping {file} ({lang}/{slug}), already up to date.")
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
    
def translate_menu(target_langs):
    # 2. Translate Menu
    menu_file = os.path.join(LAYOUT_DIR, 'menu.json')
    with open(menu_file, 'r', encoding='utf-8') as f:
        menu_data = json.load(f)
        
    for lang in target_langs:
        if lang == 'en': continue
        if lang not in LANGUAGES: continue
        
        print(f"Translating menu for {lang}...")
        
        # Prepare labels that need translation
        labels_to_translate = {}
        translated_menu = {}
        
        for label, url in menu_data.items():
            # Use MENU_MAP if available
            trans_label = MENU_MAP.get(label, {}).get(lang)
            
            # Find the original filename (e.g., 'about.html') to match with SLUG_MAP
            original_filename = url.replace('.html', '.md')
            # Get translated filename
            translated_filename = SLUG_MAP.get(original_filename, {}).get(lang, original_filename).replace('.md', '.html')
            
            if trans_label:
                translated_menu[trans_label] = translated_filename
            else:
                labels_to_translate[label] = translated_filename
        
        # If there are labels to translate, do it in bulk
        if labels_to_translate:
            prompt = f"Translate the following menu labels to {LANGUAGE_NAMES.get(lang, lang)}. Return ONLY a JSON object mapping the original label to the translated label. Do not include markdown formatting.\n{json.dumps(list(labels_to_translate.keys()))}"
            bulk_translation_json = translate_text(prompt, lang)
            try:
                bulk_translation = json.loads(bulk_translation_json)
                for label, translated_label in bulk_translation.items():
                    translated_menu[translated_label] = labels_to_translate[label]
            except:
                # Fallback to individual
                for label, filename in labels_to_translate.items():
                    trans_label = translate_text(label, lang)
                    translated_menu[trans_label] = filename
            
        os.makedirs(os.path.join(CACHE_DIR, lang), exist_ok=True)
        with open(os.path.join(CACHE_DIR, lang, 'menu.json'), 'w', encoding='utf-8') as f:
            json.dump(translated_menu, f, indent=2, ensure_ascii=False)


def translate_content_jsons(target_langs):
    content_root = os.path.join(os.getcwd(), 'content')
    skip_dirs = ['archive', 'garbage']
    
    for root, dirs, files in os.walk(content_root):
        # Skip archive/garbage
        dirs[:] = [d for d in dirs if d not in skip_dirs]
        
        for file in files:
            if not file.endswith('.json'): continue
            
            filepath = os.path.join(root, file)
            print(f"\nProcessing {filepath}...")
            
            with open(filepath, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            if 'content' not in data:
                print(f"  Skipping: No 'content' key.")
                continue
            
            content = data['content']
            if not content:
                print(f"  Skipping: Empty 'content'.")
                continue
            
            # 1. First entry in content is the initial language that must remain original & first
            # We get the keys as a list to keep order, assuming insertion order (Python 3.7+)
            content_keys = list(content.keys())
            source_lang = content_keys[0]
            source_data = content[source_lang]
            print(f"  Source language (original/primary): {source_lang}")
            
            # Compute hash of source data to detect changes
            current_source_hash = hashlib.sha256(json.dumps(source_data, sort_keys=True).encode('utf-8')).hexdigest()
            stored_source_hash = data.get('source_hash', '')
            source_changed = (current_source_hash != stored_source_hash)
            
            if source_changed:
                print(f"  Source content changed. Will re-translate target languages.")
            
            # Determine targets
            targets = target_langs
            if not targets: # No parameter, default to English if missing
                targets = ['en']
            
            # Build ordered content dict with source_lang first
            # We use OrderedDict or just re-insert to ensure order
            new_content = {source_lang: source_data}
            
            # Add existing translations, re-translating if source changed
            modified = source_changed
            
            # We must process all targets (either explicitly requested or all languages)
            # Actually user said "translate parameter OR all if parameter specify all"
            # And "Or in english if parameter specify nothing and english is missing"
            # This is slightly contradictory if targets are set to ['en'] by default.
            
            # Revised logic based on "add new content entries for translations":
            # 1. Preserve ALL existing languages in content.
            # 2. Add/Re-translate target languages if they are missing or source changed.
            
            # Collect all known language keys
            all_known_langs = set(content.keys())
            if targets:
                all_known_langs.update(targets)
            
            for lang in sorted(list(all_known_langs)):
                if lang == source_lang: continue
                
                # Check if translation is needed: missing or source changed
                needs_translation = (lang not in content) or source_changed
                
                if needs_translation:
                    # If it's not a targeted language, skip re-translation unless it's missing (shouldn't happen for existing)
                    if targets and lang not in targets: continue
                    
                    print(f"  Translating to {lang} from {source_lang}...")
                    trans_content = {}
                    for key, val in source_data.items():
                        if isinstance(val, str):
                            trans_content[key] = translate_text(val, lang, source_lang=source_lang)
                        else:
                            trans_content[key] = val
                    new_content[lang] = trans_content
                    modified = True
                else:
                    # Keep existing translation
                    new_content[lang] = content[lang]
            
            data['content'] = new_content
            data['source_hash'] = current_source_hash
            
            if modified:
                with open(filepath, 'w', encoding='utf-8') as f:
                    json.dump(data, f, indent=2, ensure_ascii=False)
                print(f"  Successfully updated and saved {filepath}")
            else:
                print(f"  No changes needed for {filepath}")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Translate content.")
    parser.add_argument('lang', nargs='?', default=None, help="Language code to translate, 'all', or None (default to English).")
    args = parser.parse_args()
    
    if args.lang == 'all':
        target_langs = LANGUAGES
    elif args.lang:
        target_langs = [args.lang] if args.lang in LANGUAGES else []
    else:
        target_langs = [] # None implies just fill English if missing
    
    if args.lang and not target_langs:
        print(f"Invalid language: {args.lang}. Available: {', '.join(LANGUAGES)}")
        sys.exit(1)

    try:
        translate_pages(target_langs)
        translate_menu(target_langs)
        translate_content_jsons(target_langs)
        # Keep translate_gallery just in case, but it might not be needed if content/gallery/*.json are translated.
        # Actually user said "except atchive and garbage", so gallery/ is processed by this new function.
        # I'll comment it out or leave it if manifest needs special handling. 
        # User said "edit not fully replace the json manifest files". 
        # The individual json files are now the source. 
        # So I will remove translate_gallery.
        # translate_gallery(target_langs)
    except RuntimeError as e:
        print(f"Error: {e}", file=sys.stderr)
        print("Run 'source ./run.sh setup' first, or put GEMINI_API_KEY in .env and use './run.sh translate'.", file=sys.stderr)
        sys.exit(1)
    except KeyboardInterrupt:
        print("Translation interrupted; no in-progress file was written.", file=sys.stderr)
        sys.exit(130)

