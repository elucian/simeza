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

LANGUAGES = ['ro', 'en', 'de', 'es', 'fr', 'ru']

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
    version = releases['candidate']['version']

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
                
                html_content = markdown.markdown(md_content)
                
                # Select template (fallback to base if not exists)
                template = base_template
                lang_template = os.path.join(LAYOUT_DIR, lang, 'template.html')
                if os.path.exists(lang_template):
                     with open(lang_template, 'r', encoding='utf-8') as f:
                        template = f.read()
                
                # Expand
                final_html = template.replace('{{page-content}}', html_content)
                final_html = final_html.replace('{{version}}', version)
                
                # Write to Public
                target_path = os.path.join(PUBLIC_DIR, rel_path.replace('.md', '.html'))
                os.makedirs(os.path.dirname(target_path), exist_ok=True)
                with open(target_path, 'w', encoding='utf-8') as f:
                    f.write(final_html)

    # 3. Copy Assets
    shutil.copytree(os.path.join(ROOT, 'core'), os.path.join(PUBLIC_DIR, 'core'))
    if os.path.exists(os.path.join(ROOT, 'files')):
         shutil.copytree(os.path.join(ROOT, 'files'), os.path.join(PUBLIC_DIR, 'files'))

if __name__ == '__main__':
    build()
