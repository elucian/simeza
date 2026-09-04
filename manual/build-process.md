# Build Process & Cache Documentation

This project uses a deterministic, offline static site generation pipeline.

## 1. Translation & Cache Engine (`script/translate.py`)

- **Languages**: Supports `ro`, `en`, `de`, `es`, `fr`, `ru`, `pt`, `hu`, `it`.
- **Slug Mapping**: Uses `SLUG_MAP` for SEO-friendly, language-native URLs.
- **Menu Mapping**: Uses `MENU_MAP` for localized navigation.
- **Incremental Updates**: SHA-256 `source_hash` in cached frontmatter ensures only changed files trigger API translation.

## 2. Compilation Pipeline (`script/build.py`)

The build runs entirely offline:
1.  **Clean**: Purges `local/` (on full builds).
2.  **Version**: Reads version from `release/releases.json`.
3.  **Data Loading**: Pre-loads `content/` entities.
4.  **Generation**: Iterates through active languages (`--lang` target or all 9 languages), parses Markdown/Frontmatter with `extra` and `md_in_html`, injects template placeholders, and applies widget rendering.
5.  **Sync**: Copies `core/` and `content/` assets.
6.  **Finalization**: Generates `CNAME` and `.nojekyll`.

### Rapid Development vs. Production Compilation

- **Fast English Build**:
  ```bash
  ./run.sh build en
  # or
  python script/build.py --lang en
  ```
  Only compiles `pages/*.md` to `local/en/` and `local/index.html` in sub-second time (<0.5s).
- **Fast Dev Server**:
  ```bash
  ./run.sh dev
  ```
  Executes the fast English build and starts the local server at `http://localhost:8000/en/`.
- **Full Production Build**:
  ```bash
  ./run.sh build
  ```
  Increments release candidate, commits, and compiles all 9 languages.

## 3. Two-Stage Development Lifecycle

To maintain high development velocity, avoid token waste, and keep context clean:
1. **Stage 1 (English Rapid Iteration)**:
   - Edit exclusively in `pages/`, `core/css/`, or `layout/`.
   - Never manually modify `cache/<lang>/` files.
   - Run `./run.sh build en` and test at `http://localhost:8000/en/`.
2. **Stage 2 (Translation & Full Site Propagation)**:
   - Once the English structure and styling are approved, execute `./run.sh translate`.
   - The translation engine automatically creates/updates localized Markdown in `cache/` and updates localized navigation slugs.
   - Run `./run.sh build` to produce the multi-language production bundle.

## 4. Cache & Workspace Cleanup (`script/clean.py`)

- **Orphan Cleaner**: Run without arguments to automatically prune cached translations when source files or slugs are removed.
- **Targeted Purge**:
  - `./run.sh clean <lang>`: Removes specific language cache and local build.
  - `./run.sh clean all`: Purges all `local/` and `cache/` directories.

## 5. Developer CLI Reference

| Command | Description |
| :--- | :--- |
| `./run.sh setup` | Loads `.env` variables. |
| `./run.sh dev` | Fast English build + starts local web server on port 8000. |
| `./run.sh build en` | Fast single-language English compilation (<0.5s). |
| `./run.sh build` | Full site compilation (all 9 languages, bumps RC). |
| `./run.sh translate` | Incremental translation of changed pages via Gemini. |
| `./run.sh serve` | Starts a local web server on port 8000. |
| `./run.sh clean` | Prunes stale cache. |
| `./run.sh kill` | Terminates hanging background terminal sessions. |

