import os
import shutil
import json
from PIL import Image

GALLERY_DIR = 'content/gallery'
GARBAGE_DIR = 'content/garbage'

def prescreen():
    if not os.path.exists(GARBAGE_DIR):
        os.makedirs(GARBAGE_DIR)

    # Gather all images
    images = [f for f in os.listdir(GALLERY_DIR) if f.endswith('.webp')]
    
    to_garbage = []
    candidates = []
    
    print("Analyzing gallery...")
    for img_name in images:
        img_path = os.path.join(GALLERY_DIR, img_name)
        json_path = img_path.replace('.webp', '.json')
        
        # Check size (KB)
        size_kb = os.path.getsize(img_path) / 1024
        
        # Check dimensions/ratio
        try:
            with Image.open(img_path) as img:
                w, h = img.size
                ratio = max(w, h) / min(w, h)
        except Exception:
            ratio = 1 # Assume safe if error
            
        # Criteria: Small size (< 50KB) or highly imbalanced (ratio > 2.5)
        # These are considered 'ugly' by technical metrics
        if size_kb < 50 or ratio > 2.5:
            to_garbage.append((img_name, json_path))
        else:
            candidates.append({'img': img_name, 'json': json_path, 'size': os.path.getsize(img_path)})

    # Move technical garbage
    for img, json_f in to_garbage:
        shutil.move(os.path.join(GALLERY_DIR, img), os.path.join(GARBAGE_DIR, img))
        if os.path.exists(json_f):
            shutil.move(json_f, os.path.join(GARBAGE_DIR, os.path.basename(json_f)))
        print(f"Moved technical garbage: {img}")

    # Retain 42 best (by file size descending, assuming higher size = better quality)
    candidates.sort(key=lambda x: x['size'], reverse=True)
    
    if len(candidates) > 42:
        to_remove = candidates[42:]
        for item in to_remove:
            img = item['img']
            json_f = item['json']
            shutil.move(os.path.join(GALLERY_DIR, img), os.path.join(GARBAGE_DIR, img))
            if os.path.exists(json_f):
                shutil.move(json_f, os.path.join(GARBAGE_DIR, os.path.basename(json_f)))
            print(f"Moved excess: {img}")
    
    print(f"Prescreen complete. Retained {min(len(candidates), 42)} items.")

if __name__ == '__main__':
    prescreen()
