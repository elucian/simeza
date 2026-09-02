import os
import shutil
import json
import markdown

# Paths
ROOT = os.getcwd()
PAGES_DIR = os.path.join(ROOT, 'pages')
LAYOUT_DIR = os.path.join(ROOT, 'layout')
PUBLIC_DIR = os.path.join(ROOT, 'public')
RELEASE_FILE = os.path.join(ROOT, 'release', 'releases.json')

LANGUAGES = ['ro', 'en', 'de', 'es', 'fr', 'ru', 'pt', 'hu']

def render_menu(lang):
    menu_file = os.path.join(LAYOUT_DIR, lang, 'menu.json')
    if not os.path.exists(menu_file):
        return ""
    with open(menu_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    html = ""
    for label, url in data.items():
        # Ensure URL is root-relative for consistent navigation
        link = url if url.startswith('/') else '/' + url
        html += f'<li class="nav-item"><a class="nav-link" href="{link}">{label}</a></li>'
    return html

def build():
    # 1. Clean Public
    if os.path.exists(PUBLIC_DIR):
        for item in os.listdir(PUBLIC_DIR):
            item_path = os.path.join(PUBLIC_DIR, item)
            if item_path == os.path.join(PUBLIC_DIR, '.git'): continue
            if os.path.isfile(item_path):
                os.remove(item_path)
            elif os.path.isdir(item_path):
                shutil.rmtree(item_path)

    # Load Release Info
    with open(RELEASE_FILE, 'r') as f:
        releases = json.load(f)
    # Use candidate version, fallback to published version if candidate is empty
    version = releases.get('candidate', {}).get('version') or releases.get('published', {}).get('version') or ''

    # 2. Build Pages
    # Base layout
    with open(os.path.join(LAYOUT_DIR, 'index.html'), 'r', encoding='utf-8') as f:
        base_template = f.read()

    # Process Pages (Simple recursive walk)
    for root, dirs, files in os.walk(PAGES_DIR):
        for file in files:
            if file.endswith('.md'):
                rel_path = os.path.relpath(os.path.join(root, file), PAGES_DIR)
                
                # Determine language (first directory)
                path_parts = rel_path.split(os.sep)
                lang = path_parts[0] if path_parts[0] in LANGUAGES else 'en'
                
                # Read Content
                with open(os.path.join(root, file), 'r', encoding='utf-8') as f:
                    md_content = f.read()
                
                # Parse Markdown with Metadata
                md = markdown.Markdown(extensions=['meta'])
                html_content = md.convert(md_content)
                
                # Metadata
                meta = md.Meta
                title = meta.get('title', ['La Simeza'])[0]
                description = meta.get('description', ['Art gallery and community'])[0]
                keywords = meta.get('keywords', ['art, simeza, community'])[0]
                
                # Select template
                template = base_template
                lang_template = os.path.join(LAYOUT_DIR, lang, 'index.html')
                if os.path.exists(lang_template):
                     with open(lang_template, 'r', encoding='utf-8') as f:
                        template = f.read()
                
                # Render Menu
                menu_html = render_menu(lang)
                
                # Expand
                final_html = template.replace('{{page-content}}', html_content)
                final_html = final_html.replace('{{menu}}', menu_html)
                final_html = final_html.replace('{{mobile_menu}}', menu_html)
                final_html = final_html.replace('{{version}}', version)
                final_html = final_html.replace('{{title}}', title)
                final_html = final_html.replace('{{description}}', description)
                final_html = final_html.replace('{{keywords}}', keywords)
                
                # Fix relative assets to root-relative
                final_html = final_html.replace('href="core/', 'href="/core/')
                final_html = final_html.replace('src="core/', 'src="/core/')
                
                # Write to Public
                target_path = os.path.join(PUBLIC_DIR, rel_path.replace('.md', '.html'))
                os.makedirs(os.path.dirname(target_path), exist_ok=True)
                with open(target_path, 'w', encoding='utf-8') as f:
                    f.write(final_html)

    # 3. Copy Assets
    os.makedirs(os.path.join(PUBLIC_DIR, 'core'), exist_ok=True)
    shutil.copytree(os.path.join(ROOT, 'core'), os.path.join(PUBLIC_DIR, 'core'), dirs_exist_ok=True)
    
    # Copy menu.json files for dynamic switching
    for lang in LANGUAGES:
        lang_dir = os.path.join(PUBLIC_DIR, lang)
        os.makedirs(lang_dir, exist_ok=True)
        menu_src = os.path.join(LAYOUT_DIR, lang, 'menu.json')
        if os.path.exists(menu_src):
            shutil.copy(menu_src, os.path.join(lang_dir, 'menu.json'))

    if os.path.exists(os.path.join(ROOT, 'files')):
         shutil.copytree(os.path.join(ROOT, 'files'), os.path.join(PUBLIC_DIR, 'files'), dirs_exist_ok=True)

if __name__ == '__main__':
    build()
