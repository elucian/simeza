import os
import shutil
import json

def is_romanian(text):
    # Words that are uniquely or highly likely Romanian
    romanian_unique_words = ['bujori', 'maci', 'tufanele', 'stergar', 'biserica', 'gradina', 'gura', 'leului', 'mesteceni', 'pasarea', 'plaja', 'soare', 'vine', 'cer', 'curtea', 'edy', 'garoafe', 'crizanteme', 'carmel', 'catalina', 'camp', 'satic', 'dambovitei', 'nămăiești', 'clopotniță']
    # Prepositions that are common but need to be combined with other evidence
    # Removed 'in' as it is a common English word
    romanian_prepositions = ['cu', 'de', 'pe', 'la', 'si']
    diacritics = ['ă', 'â', 'î', 'ș', 'ț', 'Ă', 'Â', 'Î', 'Ș', 'Ț']
    
    text_lower = text.lower()
    
    # 1. Check for diacritics
    for char in diacritics:
        if char in text:
            return True
            
    # 2. Check for unique Romanian words
    words = text_lower.split()
    unique_matches = 0
    prep_matches = 0
    
    for word in words:
        if word in romanian_unique_words:
            unique_matches += 1
        elif word in romanian_prepositions:
            prep_matches += 1
            
    # Return True if any unique word OR if at least two prepositions (reduces false positives)
    if unique_matches > 0 or prep_matches >= 2:
        return True
            
    return False

def process_and_copy(source_dir, dest_dir, gallery_data):
    if not os.path.exists(source_dir):
        return

    for filename in os.listdir(source_dir):
        if filename.endswith('.json'):
            src_file = os.path.join(source_dir, filename)
            dest_file = os.path.join(dest_dir, filename)
            
            with open(src_file, 'r', encoding='utf-8') as f:
                try:
                    data = json.load(f)
                    
                    # Fix Romanian content mislabeled as 'en'
                    if 'content' in data:
                        content = data['content']
                        if len(content) == 1 and 'en' in content:
                            text_to_check = content['en'].get('name', '') + ' ' + content['en'].get('description', '')
                            if is_romanian(text_to_check):
                                print(f"Fixing {filename}: EN -> RO")
                                content['ro'] = content.pop('en')
                                # Save the fix back to source
                                with open(src_file, 'w', encoding='utf-8') as f_fix:
                                    json.dump(data, f_fix, indent=2, ensure_ascii=False)
                    
                    gallery_data.append(data)
                    shutil.copy(src_file, dest_file)
                except Exception as e:
                    print(f"Error processing {filename}: {e}")
                    pass
        elif filename.endswith('.webp'):
            shutil.copy(os.path.join(source_dir, filename), os.path.join(dest_dir, filename))

def prepare_gallery():
    gallery_dir = os.path.join(os.getcwd(), 'content', 'gallery')
    garbage_dir = os.path.join(os.getcwd(), 'content', 'garbage')
    dest_dir = os.path.join(os.getcwd(), 'files', 'gallery')
    
    if not os.path.exists(dest_dir):
        os.makedirs(dest_dir)
        
    gallery_data = []
    
    # Process both directories
    process_and_copy(gallery_dir, dest_dir, gallery_data)
    process_and_copy(garbage_dir, dest_dir, gallery_data)
            
    with open(os.path.join(dest_dir, 'manifest.json'), 'w', encoding='utf-8') as f:
        json.dump(gallery_data, f, indent=2)
    print("Gallery prepared from gallery/ and garbage/.")

if __name__ == '__main__':
    prepare_gallery()
