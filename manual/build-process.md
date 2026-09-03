# Build Process & Cache Documentation

## 1. Architecture Overview

This project uses a decoupled Static Site Generation (SSG) pipeline designed for speed, reliability, and robust multi-language support.

- **`pages/`**: Contains the Source of Truth (English markdown).
- **`cache/`**: Contains the versioned, translated, human-editable localized markdown and menu files.
- **`layout/`**: Shared templates and global base menu.
- **`local/`**: Ephemeral output directory (generated files, not versioned in Git).
- **`script/`**: Contains translation automation and offline build logic.

## 2. The Cache System (`cache/`)

To keep builds offline and reliable, all translated content is stored in the `cache/` directory.

### Structure
```text
cache/
├── ro/
│   ├── menu.json          # Translated menu with localized links
│   ├── despre.md          # Translated About page (about.md -> despre.md)
│   └── index.md           # Translated homepage
├── de/
├── fr/
└── ...
```

### Key Mechanics
- **Slug Mapping (`SLUG_MAP`)**: `translate.py` uses a mapping to ensure URLs are localized (e.g., `about.md` translates to `despre.md` in Romanian). This ensures SEO-friendly, language-native URLs.
- **Versioned & Editable**: Unlike traditional build caches, these files are plain text, human-readable, and versioned in Git. This allows for manual polishing of machine translations.
- **Hash Invalidation**: Every file in `cache/` contains a `source_hash` in its frontmatter. The translation script compares this against the source `pages/` file hash to perform incremental updates. Only changed files are re-translated via the API.

## 3. The Build Pipeline (`script/build.py`)

The build process is **100% offline** and runs in milliseconds.

### Workflow
1. **Source Parsing**: Reads `pages/*.md` for English and `cache/<lang>/*.md` for other languages.
2. **Metadata & Content**: Parses YAML frontmatter (title, description, keywords) and converts Markdown body to HTML.
3. **Template Injection**: Injects data into `layout/template.html` (replaces `{{title}}`, `{{menu}}`, `{{page-content}}`, etc.).
4. **Static Generation**: Writes the resulting HTML files to `local/<lang>/<slug>.html`.
5. **Asset Sync**: Copies `core/` (JS/CSS) and `files/` assets to `local/`.

## 4. Operational Commands (`run.sh`)

- **`./run.sh translate`**: Scans for changes in `pages/`, calls the translation API (if needed), and updates `cache/<lang>/`.
- **`./run.sh build`**: Runs the offline compilation pipeline to generate the `local/` directory.
- **`./run.sh serve`**: Serves the generated `local/` folder on `http://localhost:8000`.
- **`./run.sh clean`**: Deletes the `local/` directory.
