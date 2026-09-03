# Architecture
This is a static site generator built with Python and customized for multi-language support.

- **core/**: Shared JS, CSS, and assets.
- **pages/**: Source Markdown content files.
- **cache/**: Versioned, localized Markdown content and menu files (see `manual/build-process.md`).
- **layout/**: HTML templates and JSON menus per language.
- **script/**: Build and release logic.
- **local/**: Generated static output (ephemeral).
- **release/**: Release metadata.

For details on the build pipeline and translation caching, see `manual/build-process.md`.
