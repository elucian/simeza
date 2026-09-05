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
    'media.md': {'ro': 'media.md', 'de': 'media.md', 'fr': 'media.md', 'es': 'media.md', 'ru': 'media.md', 'pt': 'media.md', 'hu': 'media.md', 'it': 'media.md'}, 
    'authors.md': {'ro': 'autori.md', 'de': 'autoren.md', 'fr': 'auteurs.md', 'es': 'autores.md', 'ru': 'avtory.md', 'pt': 'autores.md', 'hu': 'szerzok.md', 'it': 'autori.md'}, 
    'writings.md': {'ro': 'scrieri.md', 'de': 'schriften.md', 'fr': 'ecrits.md', 'es': 'escritos.md', 'ru': 'stati.md', 'pt': 'escritos.md', 'hu': 'irasok.md', 'it': 'scritti.md'}, 
    'gallery.md': {'ro': 'galerie.md', 'de': 'galerie.md', 'fr': 'galerie.md', 'es': 'galeria.md', 'ru': 'galereya.md', 'pt': 'galeria.md', 'hu': 'galeria.md', 'it': 'galleria.md'}, 
    'books.md': {'ro': 'carti.md', 'de': 'buecher.md', 'fr': 'livres.md', 'es': 'libros.md', 'ru': 'knigi.md', 'pt': 'livros.md', 'hu': 'konyvek.md', 'it': 'libri.md'}
}

def render_bottom_bar(page_id, lang, active_id=None):
    # Data for the bottom bar buttons per page
    config = {
        'gallery': [
            {'id': 'painting', 'icon': 'bi-palette', 'label': {'en': 'Paintings', 'ro': 'Picturi', 'de': 'Gemälde', 'es': 'Pinturas', 'fr': 'Peintures', 'ru': 'Картины', 'pt': 'Pinturas', 'hu': 'Festmények', 'it': 'Dipinti'}},
            {'id': 'drawing', 'icon': 'bi-pencil', 'label': {'en': 'Drawings', 'ro': 'Desene', 'de': 'Zeichnungen', 'es': 'Dibujos', 'fr': 'Dessins', 'ru': 'Рисунки', 'pt': 'Desenhos', 'hu': 'Rajzok', 'it': 'Disegni'}},
            {'id': 'photo', 'icon': 'bi-camera', 'label': {'en': 'Photos', 'ro': 'Fotografii', 'de': 'Fotos', 'es': 'Fotos', 'fr': 'Photos', 'ru': 'Фото', 'pt': 'Fotos', 'hu': 'Fotók', 'it': 'Foto'}}
        ],
        'media': [
            {'id': 'audio', 'label': {'en': 'Audio', 'ro': 'Audio', 'de': 'Audio', 'es': 'Audio', 'fr': 'Audio', 'ru': 'Аудио', 'pt': 'Audio', 'hu': 'Audio', 'it': 'Audio'}, 'icon': 'bi-soundwave'},
            {'id': 'video', 'label': {'en': 'Video', 'ro': 'Video', 'de': 'Video', 'es': 'Video', 'fr': 'Video', 'ru': 'Видео', 'pt': 'Video', 'hu': 'Video', 'it': 'Video'}, 'icon': 'bi-camera-video'},
            {'id': 'stream', 'label': {'en': 'Stream', 'ro': 'Stream', 'de': 'Stream', 'es': 'Stream', 'fr': 'Stream', 'ru': 'Стрим', 'pt': 'Stream', 'hu': 'Stream', 'it': 'Stream'}, 'icon': 'bi-broadcast'}
        ],
        'books': [
            {'id': 'monographs', 'label': {'en': 'Monographs'}, 'icon': 'bi-book'},
            {'id': 'rare-editions', 'label': {'en': 'Rare Editions'}, 'icon': 'bi-journal-bookmark'},
            {'id': 'essays', 'label': {'en': 'Essays'}, 'icon': 'bi-file-text'}
        ],
        'authors': [
            {'id': 'contemporary', 'label': {'en': 'Contemporary'}, 'icon': 'bi-person'},
            {'id': 'historical', 'label': {'en': 'Historical'}, 'icon': 'bi-person-lines-fill'},
            {'id': 'mentors', 'label': {'en': 'Mentors'}, 'icon': 'bi-award'}
        ],
        'writings': [
            {'id': 'essays', 'label': {'en': 'Essays'}, 'icon': 'bi-pen'},
            {'id': 'poetry', 'label': {'en': 'Poetry'}, 'icon': 'bi-feather'},
            {'id': 'articles', 'label': {'en': 'Articles'}, 'icon': 'bi-newspaper'}
        ]
    }
    
    buttons = config.get(page_id, [])
    if not buttons:
        return ''
        
    bar_html = ['<nav class="sticky-bottom-bar" id="bottomBar">']
    for i, btn in enumerate(buttons):
        btn_id = btn['id']
        label = btn['label'].get(lang, btn['label'].get('en'))
        icon = btn.get('icon')
        active_class = ' active' if (active_id and btn_id == active_id) or (not active_id and i == 0) else ''
        icon_html = f'<i class="bi {icon}"></i> ' if icon else ''
        bar_html.append(f'  <button class="bottom-bar-btn{active_class}" data-filter="{btn_id}">{icon_html}{label}</button>')
    bar_html.append('</nav>')
    return '\n'.join(bar_html)


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
        item_type = item.get('type', 'painting')
        
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
    panels.append(render_bottom_bar('gallery', lang, active_id='painting'))

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
        f'      <button class="gallery-modal-btn-close" onclick="applyFilters(true)">{trans["Filter"]}</button>',
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

def test_func():
    pass

def render_media_html(media_data, lang):
    # Translations
    t = {
        'en': {'Close': 'Close', 'All': 'All'},
        'ro': {'Close': 'Închide', 'All': 'Toate'},
        'de': {'Close': 'Schließen', 'All': 'Alle'},
        'es': {'Close': 'Cerrar', 'All': 'Todos'},
        'fr': {'Close': 'Fermer', 'All': 'Tous'},
        'ru': {'Close': 'Закрыть', 'All': 'Все'},
        'pt': {'Close': 'Fechar', 'All': 'Todos'},
        'hu': {'Close': 'Bezár', 'All': 'Összes'},
        'it': {'Close': 'Chiudi', 'All': 'Tutti'}
    }
    trans = t.get(lang, t['en'])
    
    # Grid
    html_output = ['<div class="media-container">', '<div class="media-grid" data-widget="media">']
    for item in media_data:
        content = item.get('content', {})
        loc = content.get(lang) or content.get('en') or (list(content.values())[0] if content else {})
        title = loc.get('title') or item.get('id') or 'Untitled'
        desc = loc.get('description') or ''
        file = item.get('file', '')
        item_type = item.get('type', 'audio')
        
        # Panel
        p = [f'  <div class="media-panel" data-title="{html.escape(str(title))}" data-type="{item_type}" data-desc="{html.escape(str(desc))}">']
        if file:
            p.append(f'    <div class="media-panel-image"><img src="/content/media/{file}" alt="{html.escape(title)}" loading="lazy"><span class="media-type-badge">{item_type}</span></div>')
        else:
            p.append(f'    <div class="media-panel-image"><span class="media-type-badge">{item_type}</span></div>')
        p.append('    <div class="media-panel-content">')
        p.append(f'      <h3 class="media-panel-title">{html.escape(title)}</h3>')
        p.append(f'      <p class="media-panel-desc">{html.escape(desc)}</p>')
        p.append('    </div>')
        p.append('  </div>')
        html_output.append('\n'.join(p))
    html_output.append('</div>') # Close media-grid
    
    # Filter Bar
    html_output.append(render_bottom_bar('media', lang, active_id='audio'))
    
    # Modal
    modal = f'''
<dialog id="mediaModalDialog" class="media-modal-dialog">
  <div class="media-modal-wrapper">
    <button class="media-modal-close" aria-label="{trans["Close"]}">&times;</button>
    <div class="media-modal-content">
      <h3 id="modalMediaTitle"></h3>
      <p id="modalMediaDesc"></p>
    </div>
  </div>
</dialog>
'''
    html_output.append(modal)
    html_output.append('</div>') # Close media-container
    
    return '\n'.join(html_output)



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

    # Pre-load media data
    media_data = []
    media_source_dir = os.path.join(ROOT, 'content', 'media')
    if os.path.exists(media_source_dir):
        for filename in os.listdir(media_source_dir):
            if filename.endswith('.json'):
                with open(os.path.join(media_source_dir, filename), 'r', encoding='utf-8') as f:
                    try:
                        media_data.append(json.load(f))
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
            
            # Determine source
            source_filepath = os.path.join(CACHE_DIR, lang, md_file)
            output_filename = md_file.replace(".md", ".html")
            
            if not os.path.exists(source_filepath):
                source_filepath = os.path.join(PAGES_DIR, file)
                output_filename = file.replace('.md', '.html')
            
            with open(source_filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                
            meta, body = parse_frontmatter(content)
            
            # Bottom Bar injection
            if '{{widget:bottom_bar}}' in body:
                page_id = os.path.splitext(file)[0]
                body = body.replace('{{widget:bottom_bar}}', render_bottom_bar(page_id, lang))
            name_no_ext = os.path.splitext(file)[0]
            css_path = os.path.join(ROOT, 'core', 'css', f'{name_no_ext}.css')
            js_path = os.path.join(ROOT, 'core', 'js', f'{name_no_ext}.js')
            page_css = f'<link rel="stylesheet" href="/core/css/{name_no_ext}.css">' if os.path.exists(css_path) else ''
            page_js = f'<script src="/core/js/{name_no_ext}.js"></script>' if os.path.exists(js_path) else ''
            
            md = markdown.Markdown(extensions=['extra', 'md_in_html'])
            
            # Gallery injection
            if '{{widget:gallery}}' in body:
                body = body.replace('{{widget:gallery}}', render_gallery_html(gallery_data, lang))
                

            # Media injection
            if '{{widget:media}}' in body:
                body = body.replace('{{widget:media}}', render_media_html(media_data, lang))

            html_content = md.convert(body)
            
            title = meta.get('title', 'La Simeza')
            final_html = base_template.replace('{{lang}}', lang).replace('{{page-id}}', file).replace('{{page-content}}', html_content).replace('{{menu}}', render_menu(lang)).replace('{{mobile_menu}}', render_menu(lang)).replace('{{version}}', version).replace('{{title}}', title).replace('{{description}}', meta.get('description', 'Art gallery')).replace('{{keywords}}', meta.get('keywords', 'art')).replace('{{page-css}}', page_css).replace('{{page-js}}', page_js).replace('href="core/', 'href="/core/').replace('src="core/', 'src="/core/')
            
            # Global image protection
            protection = """
<style>
  img { -webkit-user-drag: none; user-drag: none; -webkit-user-select: none; user-select: none; }
</style>
<script>
  document.addEventListener('contextmenu', (e) => {
      if (e.target.tagName === 'IMG') {
          e.preventDefault();
      }
  }, true);
</script>
"""
            final_html = final_html.replace('</body>', protection + '</body>')
            
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
