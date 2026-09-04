# Content Directory Documentation

This directory uses a symmetric data structure. All content metadata is managed centrally within each subfolder using individual JSON files for each entity.

## Directory Structure
Each subfolder contains multiple JSON files, where each file represents a single entity.

```text
/content
├── /authors
│   ├── author-1.json
│   └── ...
├── /media
│   ├── media-1.json
│   └── ...
└── /gallery
    ├── item-1.json
    └── ...
```

## Schema per Entity Type

### Authors (`/authors/*.json`)
```json
{
  "id": "author-id",
  "file": "photo.jpg",
  "name": "Full Name",
  "birth_year": 1980,
  "original": "en", 
  "content": {
    "en": { "bio": "...", "role": "..." },
    "it": { "bio": "...", "role": "..." }
  }
}
```

### Media (`/media/*.json`)
```json
{
  "id": "media-id",
  "type": "audio",
  "file": "file.mp3",
  "date": "2026-10-01",
  "location": "Venue Name",
  "original": "en",
  "content": {
    "en": { "title": "...", "description": "..." },
    "it": { "title": "...", "description": "..." }
  }
}
```

### Gallery / Items (`/gallery/*.json` or `/paintings/*.json`)
```json
{
  "id": "item-id",
  "file": "picture.jpg",
  "status": "available",
  "author": "Author Name",
  "category": "Fine Art",
  "topic": "Abstract",
  "year": 2026,
  "original": "yes", 
  "content": {
    "en": { "name": "Title", "description": "..." },
    "it": { "name": "Titolo", "description": "..." }
  }
}
```

## The `original` Field
The `original` field behaves polymorphically depending on the content type:
- **For Paintings/Visuals**: Use `"yes"` if it is an original work, or `"no"` if it is a copy/print.
- **For Books/Writings/Authors/Media**: Use the language code (e.g., `"en"`, `"ro"`, `"it"`) to indicate the original language in which the work was created.

## Translation Workflow
- The `content` object contains nested translations.
- To add a new language, simply add a new key inside the `content` object for each item.
- Ensure that the structure remains symmetric across all supported languages.
