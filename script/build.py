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
    "about.md": {"ro": "despre.md", "de": "ueber-uns.md", "fr": "a-propos.md", "es": "sobre-nosotros.md", "ru": "o-nas.md", "pt": "sobre.md", "hu": "rolunk.md", "it": "chi-siamo.md"}, 
    "gallery.md": {"ro": "galerie.md", "de": "galerie.md", "fr": "galerie.md", "es": "galeria.md", "ru": "galereya.md", "pt": "galeria.md", "hu": "galeria.md", "it": "galleria.md"},
    "settings.md": {"ro": "setari.md", "de": "einstellungen.md", "fr": "parametres.md", "es": "ajustes.md", "ru": "nastroyki.md", "pt": "configuracoes.md", "hu": "beallitasok.md", "it": "impostazioni.md"}
}

def render_gallery_html(gallery_data, lang):
    t = {
        'en': {'Name': 'Name', 'Author': 'Author', 'Year': 'Year', 'Status': 'Status', 'Desc': 'Description', 'Close': 'Close', 'Reset': 'Reset', 'Filter':'Filter', 'Loop': 'Loop', 'Stop': 'Stop'},
        'ro': {'Name': 'Nume', 'Author': 'Autor', 'Year': 'An', 'Status': 'Stare', 'Desc': 'Descriere', 'Close': 'Închide', 'Reset': 'Resetează', 'Filter':'Filtru', 'Loop': 'Redare', 'Stop': 'Oprește'},
        'de': {'Name': 'Name', 'Author': 'Autor', 'Year': 'Jahr', 'Status': 'Status', 'Desc': 'Beschreibung', 'Close': 'Schließen', 'Reset': 'Zurücksetzen', 'Filter': 'Filter', 'Loop': 'Schleife', 'Stop': 'Stopp'},
        'es': {'Name': 'Nombre', 'Author': 'Autor', 'Year': 'Año', 'Status': 'Estado', 'Desc': 'Descripción', 'Close': 'Cerrar', 'Reset': 'Reiniciar', 'Filter': 'Filtro', 'Loop': 'Bucle', 'Stop': 'Detener'},
        'fr': {'Name': 'Nom', 'Author': 'Auteur', 'Year': 'Année', 'Status': 'Statut', 'Desc': 'Description', 'Close': 'Fermer', 'Reset': 'Réinitialiser', 'Filter': 'Filtre', 'Loop': 'Boucle', 'Stop': 'Arrêt'},
        'ru': {'Name': 'Имя', 'Author': 'Автор', 'Year': 'Год', 'Status': 'Статус', 'Desc': 'Описание', 'Close': 'Закрыть', 'Reset': 'Сброс', 'Filter': 'Фильтр', 'Loop': 'Цикл', 'Stop': 'Стоп'},
        'pt': {'Name': 'Nome', 'Author': 'Autor', 'Year': 'Ano', 'Status': 'Status', 'Desc': 'Descrição', 'Close': 'Fechar', 'Reset': 'Redefinir', 'Filter': 'Filtro', 'Loop': 'Loop', 'Stop': 'Parar'},
        'hu': {'Name': 'Név', 'Author': 'Szerző', 'Year': 'Év', 'Status': 'Állapot', 'Desc': 'Leírás', 'Close': 'Bezár', 'Reset': 'Alaphelyzet', 'Filter': 'Szűrő', 'Loop': 'Hurok', 'Stop': 'Állj'},
        'it': {'Name': 'Nome', 'Author': 'Autore', 'Year': 'Anno', 'Status': 'Stato', 'Desc': 'Descrizione', 'Close': 'Chiudi', 'Reset': 'Ripristina', 'Filter': 'Filtro', 'Loop': 'Loop', 'Stop': 'Stop'}
    }
    trans = t.get(lang, t['en'])
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
        p = [f'  <div class="panel" data-type="{item_type}" data-author="{author}" data-category="{category}" data-topic="{topic}" data-image="/content/gallery/{file}" data-title="{html.escape(title)}" data-desc="{html.escape(desc)}" data-year="{year}" data-status="{status}">']
        if file:
            p.append(f'      <div class="panel-image"><img src="/content/gallery/{file}" alt="{html.escape(title)}" loading="lazy"></div>')
        p.append('      <div class="panel-data">')
        p.append(f'        <h3 class="panel-title">{html.escape(title)}</h3>')
        p.append('        <div class="panel-mobile-meta">')
        if author: p.append(f'          <div class="panel-author">{html.escape(str(author))}</div>')
        if year: p.append(f'          <div class="panel-year">{html.escape(str(year))}</div>')
        if status: p.append(f'          <div class="panel-status">{html.escape(str(status))}</div>')
        p.append('        </div>')
        p.append('      </div>')
        p.append('    </div>')
        panels.append('\n'.join(p))
    panels.append('</div>')
    panels.append('<button class="gallery-nav-btn gallery-nav-next" aria-label="Next">▶</button>')
    panels.extend([
        '<div class="gallery-empty-state" id="galleryEmptyState" hidden>',
        '  <div class="gallery-empty-state-card">',
        '    <h2>Filter is empty</h2>',
        '    <p>No pictures match the selected criteria.</p>',
        '    <dl id="galleryEmptyCriteria" class="gallery-empty-criteria"></dl>',
        '    <button type="button" id="rebuildFiltersBtn" class="gallery-empty-rebuild-btn">Rebuild</button>',
        '  </div>',
        '</div>'
    ])
    panels.append('</div>')
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
        f'          <button id="galleryModalLoopBtn" class="gallery-modal-btn-loop" data-loop-text="{trans["Loop"]}" data-stop-text="{trans["Stop"]}">',
        '            <i class="bi bi-arrow-repeat"></i> <span></span>',
        '          </button>',
        f'          <button id="galleryModalCloseBtn" class="gallery-modal-btn-close">{trans["Close"]}</button>',
        '        </div>',
        '      </div>',
        '    </div>',
        '  </div>',
        '</div>'
    ]

    panels.extend(modal)
    panels.append('</div>')
    return '\n'.join(panels)

def render_filter_html(lang):
    labels = {'en': {'title': 'Filter Collection', 'all': 'All', 'type': 'Type', 'author': 'Author', 'category': 'Category', 'topic': 'Topic', 'reset': 'Reset', 'apply': 'View Collection'}}
    text = labels['en']
    with open(os.path.join(ROOT, 'content', 'filter-gallery.json'), 'r', encoding='utf-8') as f:
        filter_data = json.load(f)

    sections = [('types', 'type', text['type']), ('authors', 'author', text['author']), ('categories', 'category', text['category']), ('topics', 'topic', text['topic'])]
    parts = ['<div class="filter-page-dialog">', f'  <h2>{text["title"]}</h2>', '  <form id="filterForm">']
    for source_key, field_name, label in sections:
        parts.extend([f'    <div class="filter-group">', f'      <label for="filter-{field_name}">{label}</label>', f'      <select id="filter-{field_name}" name="{field_name}">', f'        <option value="">{text["all"]}</option>'])
        for entry in filter_data.get(source_key, []):
            entry_id = entry.get('id', '')
            entry_label = entry.get('label', {}).get(lang) or entry.get('label', {}).get('en') or entry_id
            parts.append(f'        <option value="{html.escape(entry_id)}">{html.escape(entry_label)}</option>')
        parts.extend(['      </select>', '    </div>'])
    parts.extend(['  </form>', '  <div class="filter-page-actions">', f'    <button type="button" class="filter-reset-btn" id="resetFiltersBtn">{text["reset"]}</button>', f'    <button type="button" class="filter-apply-btn" id="applyFiltersBtn">{text["apply"]}</button>', '  </div>', '</div>'])
    return '\n'.join(parts)

def render_about_html(lang):
    authors_dir = os.path.join(ROOT, 'content', 'authors')
    author_files = ['self-portrait-pavy.json', 'self-portrait-eluchn.json']
    portraits = []
    for filename in author_files:
        with open(os.path.join(authors_dir, filename), 'r', encoding='utf-8') as f:
            author = json.load(f)
        content = author.get('content', {}).get(lang) or author.get('content', {}).get('en', {})
        portraits.append({
            'name': content.get('name', author.get('author', '')),
            'description': content.get('description', ''),
            'file': author.get('file', ''),
            'contact': author.get('contact', ''),
            'author': author.get('author', '')
        })

    parts = ['<section class="about-portrait-panels" aria-label="Contacts">']
    for portrait in portraits:
        name = html.escape(portrait['name'])
        description = html.escape(portrait['description'])
        image = html.escape(portrait['file'])
        contact = html.escape(portrait['contact'])
        label = html.escape(portrait['author'])
        parts.extend([
            '    <article class="about-portrait-panel">',
            f'      <img src="/content/authors/{image}" alt="{name}">',
            f'      <h3>{name}</h3>',
            f'      <p>{description}</p>',
            f'      <a class="about-contact-btn" href="mailto:{contact}">Contact {label}</a>',
            '    </article>'
        ])
    parts.append('</section>')
    return '\n'.join(parts)

def parse_frontmatter(content):
    m = re.match(r'^---\s*\n(.*?)\n---\s*\n', content, re.DOTALL)
    if not m: return {}, content
    meta_block = m.group(1)
    body = content[m.end():]
    meta = {}
    for line in meta_block.splitlines():
        if ':' in line:
            k, v = line.split(':', 1)
            meta[k.strip().lower()] = v.strip()
    return meta, body

def render_toolbar(lang):
    toolbar_file = os.path.join(LAYOUT_DIR, 'toolbar.json')
    if lang != 'en':
        lang_toolbar = os.path.join(CACHE_DIR, lang, 'toolbar.json')
        if os.path.exists(lang_toolbar): toolbar_file = lang_toolbar
    if not os.path.exists(toolbar_file): return ''
    with open(toolbar_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    html = ''
    for item_id, config in data.items():
        icon = config.get("icon", "bi-circle")
        action = config.get("action")
        slug = config.get("slug")
        gallery_only = config.get("galleryOnly", False)
        label = config.get("label", {}).get(lang, config.get("label", {}).get('en', ''))
        
        btn_class = "toolbar-btn"
        if gallery_only:
            btn_class += " gallery-only"
        
        if action:
            html += f'<li><button class="{btn_class}" onclick="{action}" title="{label}"><i class="bi {icon}"></i><span class="btn-label">{label}</span></button></li>'
        else:
            link = f'/{lang}/{slug}.html'
            html += f'<li><a href="{link}" class="{btn_class}" title="{label}"><i class="bi {icon}"></i><span class="btn-label">{label}</span></a></li>'
            
    return html

def build(target_lang=None):
    start_time = time.time()
    active_languages = [target_lang] if target_lang else LANGUAGES
    print(f'Starting build at {time.ctime()} for: {", ".join(active_languages)}')
    if not target_lang and os.path.exists(LOCAL_DIR): shutil.rmtree(LOCAL_DIR)
    os.makedirs(LOCAL_DIR, exist_ok=True)
    with open(RELEASE_FILE, 'r') as f:
        data = json.load(f)
        version = data.get('candidate', {}).get('version')
        if not version: version = data.get('published', {}).get('version', '0.1.0')
    gallery_data = []
    gallery_source_dir = os.path.join(ROOT, 'content', 'gallery')
    if os.path.exists(gallery_source_dir):
        for filename in os.listdir(gallery_source_dir):
            if filename.endswith('.json'):
                with open(os.path.join(gallery_source_dir, filename), 'r', encoding='utf-8') as f:
                    try: gallery_data.append(json.load(f))
                    except: pass
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
            source_filepath = os.path.join(CACHE_DIR, lang, md_file)
            output_filename = md_file.replace(".md", ".html")
            if not os.path.exists(source_filepath):
                source_filepath = os.path.join(PAGES_DIR, file)
                output_filename = file.replace('.md', '.html')
            with open(source_filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            meta, body = parse_frontmatter(content)
            if '{{widget:bottom_bar}}' in body:
                page_id = os.path.splitext(file)[0]
                body = body.replace('{{widget:bottom_bar}}', render_bottom_bar(page_id, lang))
            name_no_ext = os.path.splitext(file)[0]
            css_path = os.path.join(ROOT, 'core', 'css', f'{name_no_ext}.css')
            js_path = os.path.join(ROOT, 'core', 'js', f'{name_no_ext}.js')
            page_css = f'<link rel="stylesheet" href="/core/css/{name_no_ext}.css">' if os.path.exists(css_path) else ''
            if name_no_ext != 'index': page_css += '<link rel="stylesheet" href="/core/css/filter-modal.css">'
            page_js = f'<script src="/core/js/{name_no_ext}.js?v={version}-page-2"></script>' if os.path.exists(js_path) else ''
            md = markdown.Markdown(extensions=['extra', 'md_in_html'])
            if '{{widget:gallery}}' in body:
                body = body.replace('{{widget:gallery}}', render_gallery_html(gallery_data, lang))
            if '{{widget:filter}}' in body:
                body = body.replace('{{widget:filter}}', render_filter_html(lang))
            if '{{widget:about}}' in body:
                body = body.replace('{{widget:about}}', render_about_html(lang))
            html_content = md.convert(body)
            title = meta.get('title', 'La Simeza')
            final_html = base_template.replace('{{lang}}', lang).replace('{{page-id}}', file).replace('{{page-content}}', html_content).replace('{{menu}}', render_toolbar(lang)).replace('{{version}}', version).replace('{{title}}', title).replace('{{description}}', meta.get('description', 'Art gallery')).replace('{{keywords}}', meta.get('keywords', 'art')).replace('{{page-css}}', page_css).replace('{{page-js}}', page_js).replace('href="core/', 'href="/core/').replace('src="core/', 'src="/core/')
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
    shutil.copytree(os.path.join(ROOT, 'core'), os.path.join(LOCAL_DIR, 'core'), dirs_exist_ok=True)
    duration = time.time() - start_time
    print(f'\nBuild completed in {duration:.2f} seconds.')
    summary.append(f'\n**Build completed in {duration:.2f} seconds.**')
    if not target_lang:
        write_summary('\n'.join(summary))

def write_summary(summary_text):
    if 'GITHUB_STEP_SUMMARY' in os.environ:
        with open(os.environ['GITHUB_STEP_SUMMARY'], 'a') as f:
            f.write(summary_text + '\n')

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Static site generator build script")
    parser.add_argument('--lang', '-l', help="Target specific language (e.g. 'en' for fast dev build)")
    args = parser.parse_args()
    build(target_lang=args.lang)
