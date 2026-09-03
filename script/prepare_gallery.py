import os
import shutil
import json

def prepare_gallery():
    source_dir = os.path.join(os.getcwd(), 'content', 'gallery')
    dest_dir = os.path.join(os.getcwd(), 'files', 'gallery')
    
    if not os.path.exists(dest_dir):
        os.makedirs(dest_dir)
        
    gallery_data = []
    
    for filename in os.listdir(source_dir):
        if filename.endswith('.json'):
            src_file = os.path.join(source_dir, filename)
            dest_file = os.path.join(dest_dir, filename)
            shutil.copy(src_file, dest_file)
            
            # Read and add to manifest
            with open(src_file, 'r', encoding='utf-8') as f:
                try:
                    data = json.load(f)
                    gallery_data.append(data)
                except:
                    pass
        elif filename.endswith('.webp'):
            shutil.copy(os.path.join(source_dir, filename), os.path.join(dest_dir, filename))
            
    with open(os.path.join(dest_dir, 'manifest.json'), 'w', encoding='utf-8') as f:
        json.dump(gallery_data, f)
    print("Gallery prepared.")

if __name__ == '__main__':
    prepare_gallery()
