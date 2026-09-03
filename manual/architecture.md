# Architecture
This is a static site generator built with Python and customized for multi-language support.

- **core/**: Shared JS, CSS, and assets.
- **pages/**: Source Markdown content files.
- **cache/**: Versioned, localized Markdown content and menu files (see `manual/build-process.md`).
- **layout/**: HTML templates and JSON menus per language.
- **script/**: Build and release logic.
- **local/**: Generated static output (ephemeral).
- **release/**: Release metadata.

## Page-Specific Asset Injection
To improve performance and maintainability, the build process decouples CSS and JavaScript assets from Markdown content.

1.  **Automatic Injection**: During the build process, the system automatically checks for the existence of CSS and JavaScript files in `core/` matching the name of the Markdown file.
    *   For `pages/gallery.md`, it looks for `core/css/gallery.css` and `core/js/gallery.js`.
2.  **Template Integration**:
    *   `layout/template.html` includes `{{page-css}}` and `{{page-js}}` placeholders.
    *   If the corresponding files exist, the build script injects the appropriate `<link>` and `<script>` tags.

## Adding Assets to a Page
If you create a new page `pages/my-page.md`:

1.  Create `core/css/my-page.css` for specific styles.
2.  Create `core/js/my-page.js` for specific JavaScript.
3.  Rebuild the site. The build script will automatically detect and include these files.

For details on the build pipeline and translation caching, see `manual/build-process.md`.
