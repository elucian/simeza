import json
import os
import urllib.request
from html.parser import HTMLParser
from urllib.parse import urljoin

# Config
HTML_FILE = 'art_gallery.html'
GALLERY_DIR = 'content/gallery'
BASE_URL = 'https://www.pavybeloiu.com'
USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'

class ArtParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.art_items = []

    def handle_starttag(self, tag, attrs):
        if tag == 'button':
            attrs_dict = dict(attrs)
            if 'data-softbox-trigger' in attrs_dict and 'data-art' in attrs_dict:
                self.art_items.append({
                    'data-art': attrs_dict['data-art'],
                    'data-full-src': attrs_dict.get('data-full-src')
                })

def import_art():
    if not os.path.exists(GALLERY_DIR):
        os.makedirs(GALLERY_DIR)

    with open(HTML_FILE, 'r', encoding='utf-8') as f:
        html_content = f.read()

    parser = ArtParser()
    parser.feed(html_content)
    
    for item in parser.art_items:
        data = json.loads(item['data-art'])
        
        name = data.get('name', 'Unknown')
        slug = name.lower().replace(' ', '-').replace('×', 'x').replace('?', '')
        
        # Download image
        full_src = item.get('data-full-src')
        if not full_src: continue
        
        image_url = urljoin(BASE_URL, full_src)
        image_filename = f"{slug}.webp"
        image_path = os.path.join(GALLERY_DIR, image_filename)
        
        if not os.path.exists(image_path):
            print(f"Downloading {image_url}...")
            try:
                req = urllib.request.Request(image_url, headers={'User-Agent': USER_AGENT})
                with urllib.request.urlopen(req) as response, open(image_path, 'wb') as out_file:
                    out_file.write(response.read())
            except Exception as e:
                print(f"Failed to download {image_url}: {e}")
                continue

        # Generate JSON manifest
        manifest = {
            "id": slug,
            "file": image_filename,
            "status": data.get('status', 'Available'),
            "author": data.get('author', 'Pavy Beloiu'),
            "category": data.get('medium', 'Art'),
            "topic": data.get('medium', 'Art'),
            "year": data.get('year', 0),
            "original": "yes",
            "content": {
                "en": {
                    "name": name,
                    "description": data.get('text', '')
                }
            }
        }
        
        with open(os.path.join(GALLERY_DIR, f"{slug}.json"), 'w', encoding='utf-8') as f:
            json.dump(manifest, f, indent=2, ensure_ascii=False)
        
        print(f"Created manifest for {name}")

if __name__ == '__main__':
    import_art()

