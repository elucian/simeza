import os
import json

def get_all_unique_values(gallery_dir):
    authors = set()
    categories = set()
    topics = set()
    
    for filename in os.listdir(gallery_dir):
        if filename.endswith('.json'):
            with open(os.path.join(gallery_dir, filename), 'r', encoding='utf-8') as f:
                try:
                    data = json.load(f)
                    if 'author' in data and data['author']: authors.add(data['author'])
                    if 'category' in data and data['category']: categories.add(data['category'])
                    if 'topic' in data and data['topic']: topics.add(data['topic'])
                except Exception as e:
                    print(f"Error reading {filename}: {e}")
    return sorted(list(authors)), sorted(list(categories)), sorted(list(topics))

def update_filter_file(filter_file, authors, categories, topics):
    if not os.path.exists(filter_file):
        print(f"Filter file {filter_file} not found.")
        return

    with open(filter_file, 'r', encoding='utf-8') as f:
        filter_data = json.load(f)
    
    # Helper to update list, preserving existing translations
    def update_list(current_list, new_values):
        existing_ids = {item['id'] for item in current_list}
        updated_list = current_list
        for val in new_values:
            if val not in existing_ids and val: # skip empty/null
                # Create default entry
                new_entry = {
                    "id": val,
                    "label": {lang: val for lang in ["en", "ro", "de", "es", "fr", "ru", "pt", "hu", "it"]}
                }
                updated_list.append(new_entry)
        return updated_list

    filter_data['authors'] = update_list(filter_data.get('authors', []), authors)
    filter_data['categories'] = update_list(filter_data.get('categories', []), categories)
    filter_data['topics'] = update_list(filter_data.get('topics', []), topics)
    
    with open(filter_file, 'w', encoding='utf-8') as f:
        json.dump(filter_data, f, indent=2, ensure_ascii=False)
    
    print(f"Filter gallery synced: {filter_file}")

def sync_filters():
    gallery_dir = 'content/gallery'
    
    authors, categories, topics = get_all_unique_values(gallery_dir)
    
    # Sync main
    update_filter_file('content/filter-gallery.json', authors, categories, topics)
    
    # Sync local if exists
    if os.path.exists('local/content/filter-gallery.json'):
        update_filter_file('local/content/filter-gallery.json', authors, categories, topics)

if __name__ == '__main__':
    sync_filters()
