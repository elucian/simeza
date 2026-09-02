import os
import shutil
import json
import markdown
import sys

# Configuration
ROOT = os.getcwd()
sys.path.append(os.path.join(ROOT, 'script'))
import translate as translate

PAGES_DIR = os.path.join(ROOT, 'pages')
LAYOUT_DIR = os.path.join(ROOT, 'layout')
PUBLIC_DIR = os.path.join(ROOT, 'public')
RELEASE_FILE = os.path.join(ROOT, 'release', 'releases.json')
LANGUAGES = ['ro', 'en', 'de', 'es', 'fr', 'ru', 'pt', 'hu']

# --- Build Logic ---
def render_menu(lang):
    menu_file = os.path.join(LAYOUT_DIR, 'menu.json')
    if not os.path.exists(menu_file): return ''
    with open(menu_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    html = ''
    cache = translate.load_cache()
    
    for label, url in data.items():
        if lang != 'en':
            cache_key = f'menu_{label}_{lang}'
            if cache_key not in cache:
                cache[cache_key] = translate.translate_markdown(label, lang)
                translate.save_cache(cache)
            label = cache[cache_key]
        
        link = f'/{lang}/{url}' if lang != 'en' else f'/{url}'
        html += f'<li class="nav-item"><a class="nav-link" href="{link}">{label}</a></li>'
    return html

def build():
    if os.path.exists(PUBLIC_DIR):
        shutil.rmtree(PUBLIC_DIR)
    os.makedirs(PUBLIC_DIR, exist_ok=True)

    with open(RELEASE_FILE, 'r') as f:
        releases = json.load(f)
    version = releases.get('candidate', {}).get('version') or ''

    with open(os.path.join(LAYOUT_DIR, 'template.html'), 'r', encoding='utf-8') as f:
        base_template = f.read()
    
    cache = translate.load_cache()

    for lang in LANGUAGES:
        lang_dir = os.path.join(PUBLIC_DIR, lang) if lang != 'en' else PUBLIC_DIR
        os.makedirs(lang_dir, exist_ok=True)
        
        shutil.copy(os.path.join(LAYOUT_DIR, 'menu.json'), os.path.join(lang_dir, 'menu.json'))
        
        for file in os.listdir(PAGES_DIR):
            if not file.endswith('.md'): continue
            
            filepath = os.path.join(PAGES_DIR, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if lang != 'en':
                file_hash = translate.get_file_hash(filepath)
                cache_key = f'{lang}/{file}'
                if cache.get(cache_key) != file_hash:
                    content = translate.translate_markdown(content, lang)
                    cache[cache_key] = file_hash
                    translate.save_cache(cache)

            md = markdown.Markdown(extensions=['meta', 'extra'])
            html_content = md.convert(content)
            
            meta = md.Meta
            title = meta.get('title', ['La Simeza'])[0]
            description = meta.get('description', ['Art gallery'])[0]
            keywords = meta.get('keywords', ['art'])[0]
            
            final_html = base_template.replace('{{lang}}', lang)
            final_html = final_html.replace('{{page-content}}', html_content)
            final_html = final_html.replace('{{menu}}', render_menu(lang))
            final_html = final_html.replace('{{mobile_menu}}', render_menu(lang))
            final_html = final_html.replace('{{version}}', version)
            final_html = final_html.replace('{{title}}', title)
            final_html = final_html.replace('{{description}}', description)
            final_html = final_html.replace('{{keywords}}', keywords)
            final_html = final_html.replace('href="core/', 'href="/core/')
            final_html = final_html.replace('src="core/', 'src="/core/')
            
            output_file = os.path.join(lang_dir, file.replace('.md', '.html'))
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(final_html)
            
            if file == 'index.md' and lang == 'en':
                with open(os.path.join(PUBLIC_DIR, 'index.html'), 'w', encoding='utf-8') as f:
                    f.write(final_html)

    shutil.copytree(os.path.join(ROOT, 'core'), os.path.join(PUBLIC_DIR, 'core'), dirs_exist_ok=True)
    if os.path.exists(os.path.join(ROOT, 'files')):
        shutil.copytree(os.path.join(ROOT, 'files'), os.path.join(PUBLIC_DIR, 'files'), dirs_exist_ok=True)

if __name__ == '__main__':
    build()