import os
import json

def add_type_to_gallery():
    gallery_dir = os.path.join(os.getcwd(), 'content', 'gallery')
    updated_count = 0
    
    for filename in os.listdir(gallery_dir):
        if filename.endswith('.json'):
            filepath = os.path.join(gallery_dir, filename)
            
            with open(filepath, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            # Check if 'type' key already exists
            if 'type' not in data:
                # Default to 'painting' for existing items unless it is a known drawing
                # Current logic in build.py suggests drawing/photo/painting
                # The user wants to support filtering.
                # Based on previous analysis, 'painting' is the safest default.
                data['type'] = 'painting'
                
                # Re-save with consistent ordering
                # It's nice to put 'type' after 'original'
                new_data = {}
                for k, v in data.items():
                    new_data[k] = v
                    if k == 'original':
                        new_data['type'] = data['type']
                
                with open(filepath, 'w', encoding='utf-8') as f:
                    json.dump(new_data, f, indent=2, ensure_ascii=False)
                
                print(f"Updated {filename}: set type to 'painting'")
                updated_count += 1
            else:
                print(f"Skipped {filename}: already has type '{data['type']}'")
                
    print(f"Total files updated: {updated_count}")

if __name__ == '__main__':
    add_type_to_gallery()
