# Architecture

This project is a static site generator (SSG) customized for multi-language support, built with Python.

## 1. Directory Structure

- `pages/`: Source of truth (English Markdown files with YAML frontmatter).
- `cache/`: Versioned, localized Markdown and menu JSON files.
- `content/`: Structured data entities and media assets:
  - `authors/`: JSON entities for authors.
  - `events/`: JSON entities for events.
  - `gallery/`: JSON entities and images for gallery items.
  - `books/`: JSON entities for books.
  - `writings/`: JSON entities for writings.
  - *Polymorphic `original` field*: Indicates original language (text) or origin status (visuals).
- `layout/`: Base template (`template.html`), global navigation (`menu.json`), and backups.
- `core/`: Global styles (`style.css`), per-page stylesheets/scripts, and assets.
- `script/`: Automation tools (`build.py`, `translate.py`, `version.py`, `release.py`, `clean.py`, etc.).
- `release/`: Metadata (`releases.json`, `release.log`, `notes-*.md`).
- `local/`: Ephemeral output (compiled HTML, static assets).

## 2. Template System & Placeholders

The build engine uses `template.html` with placeholders for dynamic injection:
- `{{lang}}`: Current language code.
- `{{page-id}}`: Identifier of the current page.
- `{{page-content}}`: HTML body.
- `{{menu}}`, `{{mobile_menu}}`: Localized navigation.
- `{{version}}`: Current build version.
- `{{title}}`, `{{description}}`, `{{keywords}}`: Meta tags from frontmatter.
- `{{page-css}}`, `{{page-js}}`: Automated per-page asset injection.

## 3. Dynamic Widget Subsystem

The system supports custom widgets like `{{widget:gallery}}`:
- **Gallery Engine**: `script/build.py` scans `content/gallery/`, calculates image aspect ratios via Pillow, and renders responsive panels.
- **Localization**: Gallery modals are dynamically localized using language-specific dictionaries.

## 4. Styling & Layout Standards

- **Container Strategy**: Every page must use a single `<main class="container main p-0">` wrapper.
- **Containment**: 1000px max-width with `margin: 24px auto` for desktop, 100% width for mobile.
- **Grid Centering**: Header components must use `grid-template-columns: 1fr auto 1fr` for mathematical title centering.
- **CSS Policy**: Zero inline CSS allowed. All styles must reside in `core/css/style.css` or per-page files.

