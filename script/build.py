import os
import shutil
import json
import markdown
import sys
import re
import html
import time
import argparse
from PIL import Image

# Configuration
ROOT = os.getcwd()
PAGES_DIR = os.path.join(ROOT, 'pages')
CACHE_DIR = os.path.join(ROOT, 'cache')
LAYOUT_DIR = os.path.join(ROOT, 'layout')
LOCAL_DIR = os.path.join(ROOT, 'local')
RELEASE_FILE = os.path.join(ROOT, 'release', 'releases.json')
LANGUAGES = ['ro', 'en', 'de', 'es', 'fr', 'ru', 'pt', 'hu', 'it']

SLUG_MAP = {
    'about.md': {'ro': 'despre.md', 'de': 'ueber-uns.md', 'fr': 'a-propos.md', 'es': 'sobre-nosotros.md', 'ru': 'o-nas.md', 'pt': 'sobre.md', 'hu': 'rolunk.md', 'it': 'chi-siamo.md'}, 
    'events.md': {'ro': 'evenimente.md', 'de': 'veranstaltungen.md', 'fr': 'evenements.md', 'es': 'eventos.md', 'ru': 'sobytiya.md', 'pt': 'eventos.md', 'hu': 'esemenyek.md', 'it': 'eventi.md'}, 
    'authors.md': {'ro': 'autori.md', 'de': 'autoren.md', 'fr': 'auteurs.md', 'es': 'autores.md', 'ru': 'avtory.md', 'pt': 'autores.md', 'hu': 'szerzok.md', 'it': 'autori.md'}, 
    'writings.md': {'ro': 'scrieri.md', 'de': 'schriften.md', 'fr': 'ecrits.md', 'es': 'escritos.md', 'ru': 'stati.md', 'pt': 'escritos.md', 'hu': 'irasok.md', 'it': 'scritti.md'}, 
    'gallery.md': {'ro': 'galerie.md', 'de': 'galerie.md', 'fr': 'galerie.md', 'es': 'galeria.md', 'ru': 'galereya.md', 'pt': 'galeria.md', 'hu': 'galeria.md', 'it': 'galleria.md'}, 
    'books.md': {'ro': 'carti.md', 'de': 'buecher.md', 'fr': 'livres.md', 'es': 'libros.md', 'ru': 'knigi.md', 'pt': 'livros.md', 'hu': 'konyvek.md', 'it': 'libri.md'}
}

def render_gallery_html(gallery_data, lang):
    # Modal Translations
    t = {
        'en': {'Name': 'Name', 'Author': 'Author', 'Year': 'Year', 'Status': 'Status', 'Desc': 'Description', 'Close': 'Close', 'Reset': 'Reset', 'Filter': 'Filter'},
        'ro': {'Name': 'Nume', 'Author': 'Autor', 'Year': 'An', 'Status': 'Stare', 'Desc': 'Descriere', 'Close': 'Închide', 'Reset': 'Resetează', 'Filter': 'Filtru'},
        'de': {'Name': 'Name', 'Author': 'Autor', 'Year': 'Jahr', 'Status': 'Status', 'Desc': 'Beschreibung', 'Close': 'Schließen', 'Reset': 'Zurücksetzen', 'Filter': 'Filter'},
        'es': {'Name': 'Nombre', 'Author': 'Autor', 'Year': 'Año', 'Status': 'Estado', 'Desc': 'Descripción', 'Close': 'Cerrar', 'Reset': 'Reiniciar', 'Filter': 'Filtro'},
        'fr': {'Name': 'Nom', 'Author': 'Auteur', 'Year': 'Année', 'Status': 'Statut', 'Desc': 'Description', 'Close': 'Fermer', 'Reset': 'Réinitialiser', 'Filter': 'Filtre'},
        'ru': {'Name': 'Имя', 'Author': 'Автор', 'Year': 'Год', 'Status': 'Статус', 'Desc': 'Описание', 'Close': 'Закрыть', 'Reset': 'Сброс', 'Filter': 'Фильтр'},
        'pt': {'Name': 'Nome', 'Author': 'Autor', 'Year': 'Ano', 'Status': 'Status', 'Desc': 'Descrição', 'Close': 'Fechar', 'Reset': 'Redefinir', 'Filter': 'Filtro'},
        'hu': {'Name': 'Név', 'Author': 'Szerző', 'Year': 'Év', 'Status': 'Állapot', 'Desc': 'Leírás', 'Close': 'Bezár', 'Reset': 'Alaphelyzet', 'Filter': 'Szűrő'},
        'it': {'Name': 'Nome', 'Author': 'Autore', 'Year': 'Anno', 'Status': 'Stato', 'Desc': 'Descrizione', 'Close': 'Chiudi', 'Reset': 'Ripristina', 'Filter': 'Filtro'}
    }
    trans = t.get(lang, t['en'])
    # Load filter config
    filter_data = {}
    try:
        with open(os.path.join(ROOT, 'content', 'filter-gallery.json'), 'r', encoding='utf-8') as f:
            filter_data = json.load(f)
    except:
        pass


    panels = ['<div class="gallery-container">', '<button class="gallery-nav-btn gallery-nav-prev" aria-label="Previous">◀</button>', '<div class="panel-wrapper" data-widget="gallery">']
    for item in gallery_data:
        content = item.get('content', {})
        loc = content.get(lang) or content.get('en') or (list(content.values())[0] if content else {})
        title = loc.get('name') or item.get('id') or 'Untitled'
        desc = loc.get('description') or ''
        file = item.get('file', '')
        author = item.get('author', '')
        status = item.get('status', '') or ''
        year = item.get('year', '') or ''
        
        # Calculate aspect ratio
        aspect_ratio = "1/1"
        w, h = 1, 1
        if file:
            try:
                with Image.open(os.path.join(ROOT, 'content', 'gallery', file)) as img:
                    w, h = img.size
                    aspect_ratio = f"{w}/{h}"
            except:
                pass
        
        category = item.get('category', '')
        topic = item.get('topic', '')
        item_type = 'painting' if item.get('original') == 'yes' else 'photo'
        
        # Calculate width: Height is determined by CSS (100dvh - 180px - internal padding)
        # We need width = height * aspect_ratio
        
        p = [f'    <div class="panel" data-title="{html.escape(str(title))}" data-author="{html.escape(str(author))}" data-year="{html.escape(str(year))}" data-status="{html.escape(str(status))}" data-desc="{html.escape(str(desc))}" data-image="/content/gallery/{file}" data-type="{item_type}" data-category="{html.escape(str(category))}" data-topic="{html.escape(str(topic))}">']
        if file:
            p.append(f'      <div class="panel-image"><img src="/content/gallery/{file}" alt="{html.escape(title)}" loading="lazy"></div>')
        else:
            p.append('      <div class="panel-image"></div>')
        p.append('      <div class="panel-data">')
        p.append(f'        <div class="panel-title">{html.escape(title)}</div>')
        # Add a container for mobile specific metadata
        p.append(f'        <div class="panel-mobile-meta">')
        if author: p.append(f'          <div class="panel-author">{html.escape(str(author))}</div>')
        if year: p.append(f'          <div class="panel-year">{html.escape(str(year))}</div>')
        if status: p.append(f'          <div class="panel-status">{html.escape(str(status))}</div>')
        p.append('        </div>')
        p.append('      </div>')
        p.append('    </div>')
        panels.append('\n'.join(p))
    panels.append('</div>') # Close panel-wrapper
    panels.append('<button class="gallery-nav-btn gallery-nav-next" aria-label="Next">▶</button>')
    panels.append('</div>') # Close gallery-container
    
    # Modal
    modal = [
        '<div id="galleryModal" class="gallery-modal-overlay">',
        '  <div class="gallery-modal">',
        '    <button class="gallery-modal-close-x" aria-label="Close">&times;</button>',
        '    <div class="gallery-modal-body">',
        '      <div class="gallery-modal-image-col">',
        '        <img id="modalImg" src="" alt="">',
        '      </div>',
        '      <div class="gallery-modal-data-col">',
        '        <div class="gallery-modal-form-group">',
        f'          <label>{trans["Name"]}</label><input type="text" id="modalPicName" readonly>',
        '        </div>',
        '        <div class="gallery-modal-form-group">',
        f'          <label>{trans["Author"]}</label><input type="text" id="modalAuthor" readonly>',
        '        </div>',
        '        <div class="gallery-modal-form-row">',
        '          <div class="gallery-modal-form-group">',
        f'            <label>{trans["Year"]}</label><input type="text" id="modalYear" readonly>',
        '          </div>',
        '          <div class="gallery-modal-form-group">',
        f'            <label>{trans["Status"]}</label><input type="text" id="modalStatus" readonly>',
        '          </div>',
        '        </div>',
        '        <div class="gallery-modal-form-group gallery-modal-desc-group">',
        f'          <label>{trans["Desc"]}</label><textarea id="modalDesc" readonly rows="5"></textarea>',
        '        </div>',
        '        <div class="gallery-modal-footer">',
        f'          <button class="gallery-modal-btn-close">{trans["Close"]}</button>',
        '        </div>',
        '      </div>',
        '    </div>',
        '  </div>',
        '</div>'
    ]
    # --- Types (outside modal) ---
    types_html = ['<div class="filter-types-container">']
    for entry in filter_data.get('types', []):
        entry_id = entry.get('id')
        label_dict = entry.get('label', {})
        label_text = label_dict.get(lang) or label_dict.get('en') or entry_id
        types_html.append(f'  <label class="type-checkbox"><input type="checkbox" name="filter-types" value="{entry_id}" onchange="applyFilters()"> {label_text}</label>')
    types_html.append('</div>')
    panels.append('\n'.join(types_html))

    # --- Filter Modal (with dropdowns) ---
    filter_modal = [
        '<div id="filterModal" class="gallery-modal-overlay">',
        '  <div class="gallery-modal gallery-filter-modal">',
        '    <button class="gallery-modal-close-x" onclick="toggleFilterModal()" aria-label="Close">&times;</button>',
        f'    <h3 class="filter-modal-title">{trans["Filter"]}</h3>',
        '    <div class="filter-modal-body">'
    ]
    
    # Authors, Categories, Topics as select dropdowns
    for section_key, title_label in [('authors', 'Author'), ('categories', 'Category'), ('topics', 'Topic')]:
        items = filter_data.get(section_key, [])
        if items:
            filter_modal.append(f'      <div class="filter-group"><strong>{title_label}</strong>')
            filter_modal.append(f'        <select name="filter-{section_key}">')
            filter_modal.append('          <option value="">All</option>')
            for entry in items:
                entry_id = entry.get('id')
                label_dict = entry.get('label', {})
                label_text = label_dict.get(lang) or label_dict.get('en') or entry_id
                filter_modal.append(f'          <option value="{entry_id}">{label_text}</option>')
            filter_modal.append('        </select>')
            filter_modal.append('      </div>')

    filter_modal.extend([
        '    </div>',
        '    <div class="gallery-modal-footer filter-modal-footer">',
        f'      <button class="gallery-modal-btn-close filter-reset-btn" onclick="resetFilters()">{trans["Reset"]}</button>',
        f'      <button class="gallery-modal-btn-close" onclick="applyFilters()">{trans["Filter"]}</button>',
        '    </div>',
        '  </div>',
        '</div>'
    ])
    # Add Gallery Modal
    panels.extend(modal)
    # Add Filter Modal
    panels.extend(filter_modal)
    
    panels.append('</div>')
    return '\n'.join(panels)

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
    menu_file = os.path.join(LAYOUT_DIR, 'menu.json')
    if lang != 'en':
        lang_menu = os.path.join(CACHE_DIR, lang, 'menu.json')
        if os.path.exists(lang_menu):
            menu_file = lang_menu
    if not os.path.exists(menu_file): return ''
    with open(menu_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    html = ''
    for label, url in data.items():
        link = f'/{lang}/{url}'
        html += f'<li class="nav-item"><a class="nav-link" href="{link}">{label}</a></li>'
    return html

def build(target_lang=None):
    start_time = time.time()
    active_languages = [target_lang] if target_lang else LANGUAGES
    print(f'Starting build at {time.ctime()} for: {", ".join(active_languages)}')
    if not target_lang and os.path.exists(LOCAL_DIR):
        shutil.rmtree(LOCAL_DIR)
    os.makedirs(LOCAL_DIR, exist_ok=True)
    with open(RELEASE_FILE, 'r') as f:
        data = json.load(f)
        version = data.get('candidate', {}).get('version')
        if not version:
            version = data.get('published', {}).get('version', '0.1.0')
    # Pre-load gallery data
    gallery_data = []
    gallery_source_dir = os.path.join(ROOT, 'content', 'gallery')
    if os.path.exists(gallery_source_dir):
        for filename in os.listdir(gallery_source_dir):
            if filename.endswith('.json'):
                with open(os.path.join(gallery_source_dir, filename), 'r', encoding='utf-8') as f:
                    try:
                        gallery_data.append(json.load(f))
                    except:
                        pass

    summary = []
    for lang in active_languages:
        lang_dir = os.path.join(LOCAL_DIR, lang)
        os.makedirs(lang_dir, exist_ok=True)
        base_template_path = os.path.join(LAYOUT_DIR, 'template.html')
        with open(base_template_path, 'r', encoding='utf-8') as f:
            base_template = f.read()
        files = os.listdir(PAGES_DIR)
        pages_count = 0
        for file in files:
            if not file.endswith('.md'): continue
            md_file = SLUG_MAP.get(file, {}).get(lang, file) if lang != "en" else file
            if lang == "en":
                source_filepath = os.path.join(PAGES_DIR, file)
                output_filename = file.replace(".md", ".html")
            else:
                source_filepath = os.path.join(CACHE_DIR, lang, md_file)
                output_filename = md_file.replace(".md", ".html")
# Removing duplicate line

            if not os.path.exists(source_filepath):
                source_filepath = os.path.join(PAGES_DIR, file)
                output_filename = file.replace('.md', '.html')
            with open(source_filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            meta, body = parse_frontmatter(content)
            name_no_ext = os.path.splitext(file)[0]
            css_path = os.path.join(ROOT, 'core', 'css', f'{name_no_ext}.css')
            js_path = os.path.join(ROOT, 'core', 'js', f'{name_no_ext}.js')
            page_css = f'<link rel="stylesheet" href="/core/css/{name_no_ext}.css">' if os.path.exists(css_path) else ''
            page_js = f'<script src="/core/js/{name_no_ext}.js"></script>' if os.path.exists(js_path) else ''
            
            md = markdown.Markdown(extensions=['extra', 'md_in_html'])
            
            # Gallery injection
            if '{{widget:gallery}}' in body:
                body = body.replace('{{widget:gallery}}', render_gallery_html(gallery_data, lang))
                
            html_content = md.convert(body)
            
            title = meta.get('title', 'La Simeza')
            final_html = base_template.replace('{{lang}}', lang).replace('{{page-id}}', file).replace('{{page-content}}', html_content).replace('{{menu}}', render_menu(lang)).replace('{{mobile_menu}}', render_menu(lang)).replace('{{version}}', version).replace('{{title}}', title).replace('{{description}}', meta.get('description', 'Art gallery')).replace('{{keywords}}', meta.get('keywords', 'art')).replace('{{page-css}}', page_css).replace('{{page-js}}', page_js).replace('href="core/', 'href="/core/').replace('src="core/', 'src="/core/')
            with open(os.path.join(lang_dir, output_filename), 'w', encoding='utf-8') as f:
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
    shutil.copytree(os.path.join(ROOT, 'content'), os.path.join(LOCAL_DIR, 'content'), dirs_exist_ok=True)
    # Manifest generation moved to start of build()
    pass

    shutil.copytree(os.path.join(ROOT, 'core'), os.path.join(LOCAL_DIR, 'core'), dirs_exist_ok=True)
    duration = time.time() - start_time
    print(f'\nBuild completed in {duration:.2f} seconds.')
    summary.append(f'\n**Build completed in {duration:.2f} seconds.**')
    if not target_lang:
        write_summary('\n'.join(summary))

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Static site generator build script")
    parser.add_argument('--lang', '-l', help="Target specific language (e.g. 'en' for fast dev build)")
    args = parser.parse_args()
    build(target_lang=args.lang)
