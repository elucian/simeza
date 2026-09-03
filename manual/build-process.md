# Build Process & Cache Documentation

This project uses a deterministic, offline static site generation pipeline.

## 1. Translation & Cache Engine (`script/translate.py`)

- **Languages**: Supports `ro`, `en`, `de`, `es`, `fr`, `ru`, `pt`, `hu`, `it`.
- **Slug Mapping**: Uses `SLUG_MAP` for SEO-friendly, language-native URLs.
- **Menu Mapping**: Uses `MENU_MAP` for localized navigation.
- **Incremental Updates**: SHA-256 `source_hash` in cached frontmatter ensures only changed files trigger API translation.
- **Gemini Engine**: Uses `models/gemini-3.5-flash-lite`. Includes automatic fallback and retry logic.

## 2. Compilation Pipeline (`script/build.py`)

The build runs entirely offline:
1.  **Clean**: Purges `local/`.
2.  **Version**: Reads version from `release/releases.json`.
3.  **Data Loading**: Pre-loads `content/` entities.
4.  **Generation**: Iterates through languages, parses Markdown/Frontmatter, injects template placeholders, and applies widget rendering.
5.  **Sync**: Copies `core/` and `content/` assets.
6.  **Finalization**: Generates `CNAME` and `.nojekyll`.

## 3. Cache & Workspace Cleanup (`script/clean.py`)

- **Orphan Cleaner**: Run without arguments to automatically prune cached translations when source files or slugs are removed.
- **Targeted Purge**:
  - `./run.sh clean <lang>`: Removes specific language cache and local build.
  - `./run.sh clean all`: Purges all `local/` and `cache/` directories.

## 4. Developer CLI Reference

| Command | Description |
| :--- | :--- |
| `./run.sh setup` | Loads `.env` variables. |
| `./run.sh translate` | Incremental translation of changed pages. |
| `./run.sh build` | Full site compilation. |
| `./run.sh serve` | Starts a local web server on port 8000. |
| `./run.sh clean` | Prunes stale cache. |

