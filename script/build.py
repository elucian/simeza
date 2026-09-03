import os
import shutil
import json
import markdown
import sys
import re
import time

import time

# Configuration
ROOT = os.getcwd()
PAGES_DIR = os.path.join(ROOT, 'pages')
CACHE_DIR = os.path.join(ROOT, 'cache')
LAYOUT_DIR = os.path.join(ROOT, 'layout')
LOCAL_DIR = os.path.join(ROOT, 'local')
RELEASE_FILE = os.path.join(ROOT, 'release', 'releases.json')
LANGUAGES = ['ro', 'en', 'de', 'es', 'fr', 'ru', 'pt', 'hu', 'it']
def write_summary(summary_text):
    """Write summary to GITHUB_STEP_SUMMARY if available."""
    if 'GITHUB_STEP_SUMMARY' in os.environ:
        with open(os.environ['GITHUB_STEP_SUMMARY'], 'a') as f:
            f.write(summary_text + "\n")



# Slug map (must match translate.py)
SLUG_MAP = {
    'about.md': {'ro': 'despre.md', 'de': 'ueber-uns.md', 'fr': 'a-propos.md', 'es': 'sobre-nosotros.md', 'ru': 'o-nas.md', 'pt': 'sobre.md', 'hu': 'rolunk.md', 'it': 'chi-siamo.md'},
    'events.md': {'ro': 'evenimente.md', 'de': 'veranstaltungen.md', 'fr': 'evenements.md', 'es': 'eventos.md', 'ru': 'sobytiya.md', 'pt': 'eventos.md', 'hu': 'esemenyek.md', 'it': 'eventi.md'},
    'authors.md': {'ro': 'autori.md', 'de': 'autoren.md', 'fr': 'auteurs.md', 'es': 'autores.md', 'ru': 'avtory.md', 'pt': 'autores.md', 'hu': 'szerzok.md', 'it': 'autori.md'},
    'writings.md': {'ro': 'scrieri.md', 'de': 'schriften.md', 'fr': 'ecrits.md', 'es': 'escritos.md', 'ru': 'stati.md', 'pt': 'escritos.md', 'hu': 'irasok.md', 'it': 'scritti.md'},
    'gallery.md': {'ro': 'galerie.md', 'de': 'galerie.md', 'fr': 'galerie.md', 'es': 'galeria.md', 'ru': 'galereya.md', 'pt': 'galeria.md', 'hu': 'galeria.md', 'it': 'galleria.md'},
    'books.md': {'ro': 'carti.md', 'de': 'buecher.md', 'fr': 'livres.md', 'es': 'libros.md', 'ru': 'knigi.md', 'pt': 'livros.md', 'hu': 'konyvek.md', 'it': 'libri.md'}
}

def write_summary(summary_text):
    if 'GITHUB_STEP_SUMMARY' in os.environ:
        with open(os.environ['GITHUB_STEP_SUMMARY'], 'a') as f:
            f.write(summary_text + '\n')

def parse_frontmatter(content):
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

def render_menu(lang):
    # Default to English menu file
    menu_file = os.path.join(LAYOUT_DIR, 'menu.json')
    
    # Try language specific if not 'en'
    if lang != 'en':
        lang_menu = os.path.join(CACHE_DIR, lang, 'menu.json')
        if os.path.exists(lang_menu):
            menu_file = lang_menu
        
    if not os.path.exists(menu_file): return ''
    with open(menu_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    html = ''
    for label, url in data.items():
        # Ensure we construct the link correctly
        # If we use English menu, the url is English (e.g., about.html)
        # If we use Translated menu, the url is Translated (e.g., despre.html)
        link = f'/{lang}/{url}'
        html += f'<li class="nav-item"><a class="nav-link" href="{link}">{label}</a></li>'
    return html

def build():
    start_time = time.time()
    print(f'Starting build at {time.ctime()}')
    
    if os.path.exists(LOCAL_DIR):
        shutil.rmtree(LOCAL_DIR)
    os.makedirs(LOCAL_DIR, exist_ok=True)

    with open(RELEASE_FILE, 'r') as f:
        releases = json.load(f)
    version = releases.get('candidate', {}).get('version') or ''

    with open(os.path.join(LAYOUT_DIR, 'template.html'), 'r', encoding='utf-8') as f:
        base_template = f.read()
    
    summary = ['# Build Report', f'**Version**: {version}', '| Language | Code | Pages Compiled | Status |', '| :--- | :--- | :--- | :--- |']
    
    for lang in LANGUAGES:
        lang_dir = os.path.join(LOCAL_DIR, lang)
        os.makedirs(lang_dir, exist_ok=True)
        pages_count = 0
        
        print(f'\nBuilding language: {lang}')
        
        for file in os.listdir(PAGES_DIR):
            if not file.endswith('.md'): continue
            
            if lang == 'en':
                source_filepath = os.path.join(PAGES_DIR, file)
                output_filename = file.replace('.md', '.html')
            else:
                slug = SLUG_MAP.get(file, {}).get(lang, file)
                source_filepath = os.path.join(CACHE_DIR, lang, slug)
                output_filename = slug.replace('.md', '.html')
            
            if not os.path.exists(source_filepath):
                source_filepath = os.path.join(PAGES_DIR, file)
                output_filename = file.replace('.md', '.html')
                
            print(f'  - Compiling {os.path.basename(source_filepath)} -> {output_filename}')
                
            with open(source_filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            meta, body = parse_frontmatter(content)
            
            # Handle assets (CSS/JS)
            name_no_ext = os.path.splitext(file)[0]
            css_path = os.path.join(ROOT, 'core', 'css', f'{name_no_ext}.css')
            js_path = os.path.join(ROOT, 'core', 'js', f'{name_no_ext}.js')
            
            page_css = f'<link rel="stylesheet" href="/core/css/{name_no_ext}.css">' if os.path.exists(css_path) else ''
            page_js = f'<script src="/core/js/{name_no_ext}.js"></script>' if os.path.exists(js_path) else ''
            
            md = markdown.Markdown(extensions=['extra'])
            html_content = md.convert(body)
            
            title = meta.get('title', 'La Simeza')
            
            final_html = base_template.replace('{{lang}}', lang)
            final_html = final_html.replace('{{page-content}}', html_content)
            final_html = final_html.replace('{{menu}}', render_menu(lang))
            final_html = final_html.replace('{{mobile_menu}}', render_menu(lang))
            final_html = final_html.replace('{{version}}', version)
            final_html = final_html.replace('{{title}}', title)
            final_html = final_html.replace('{{description}}', meta.get('description', 'Art gallery'))
            final_html = final_html.replace('{{keywords}}', meta.get('keywords', 'art'))
            final_html = final_html.replace('{{page-css}}', page_css)
            final_html = final_html.replace('{{page-js}}', page_js)
            final_html = final_html.replace('href="core/', 'href="/core/')
            final_html = final_html.replace('src="core/', 'src="/core/')
            
            output_file = os.path.join(lang_dir, output_filename)
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(final_html)
            
            if file == 'index.md' and lang == 'en':
                with open(os.path.join(LOCAL_DIR, 'index.html'), 'w', encoding='utf-8') as f:
                    f.write(final_html)
            pages_count += 1
            
        summary.append(f'| {lang.upper()} |  | {pages_count} pages | ✅ Ready |')

    if os.path.exists(os.path.join(ROOT, 'CNAME')):
        shutil.copy(os.path.join(ROOT, 'CNAME'), os.path.join(LOCAL_DIR, 'CNAME'))
    with open(os.path.join(LOCAL_DIR, '.nojekyll'), 'w') as f:
        f.write('')

    shutil.copytree(os.path.join(ROOT, 'core'), os.path.join(LOCAL_DIR, 'core'), dirs_exist_ok=True)
    if os.path.exists(os.path.join(ROOT, 'files')):
        shutil.copytree(os.path.join(ROOT, 'files'), os.path.join(LOCAL_DIR, 'files'), dirs_exist_ok=True)
    
    duration = time.time() - start_time
    print(f'\nBuild completed in {duration:.2f} seconds.')
    summary.append(f'\n**Build completed in {duration:.2f} seconds.**')
    write_summary('\n'.join(summary))

if __name__ == '__main__':
    build()