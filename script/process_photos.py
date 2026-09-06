import os
import json
import urllib.request
import urllib.error
from PIL import Image
import base64

# Load API Key and Config from .env
def load_config():
    env_path = os.path.join(os.getcwd(), '.env')
    config = {}
    if os.path.exists(env_path):
        with open(env_path, 'r', encoding='utf-8') as f:
            for line in f:
                if '=' in line:
                    k, v = line.split('=', 1)
                    config[k.strip()] = v.strip().strip("'\"")
    return config

config = load_config()
API_KEY = config.get('GEMINI_API_KEY')
MODEL = "models/gemini-3.6-flash"
GEMINI_API_URL = f'https://generativelanguage.googleapis.com/v1beta/{MODEL}:generateContent'

if not API_KEY:
    raise Exception("GEMINI_API_KEY not found in .env")

# Configuration
SOURCE_DIR = r"C:\Users\eluci\OneDrive\Pictures\Simeza\poze_pavi"
DEST_DIR = os.path.join(os.getcwd(), 'content', 'gallery')

def generate_metadata(image_path):
    with open(image_path, "rb") as image_file:
        encoded_image = base64.b64encode(image_file.read()).decode('utf-8')

    prompt = """
    Analyze this artwork. Provide:
    1. A short, creative title (as 'name').
    2. A brief, evocative description of the artwork (as 'description').
    Return the result strictly as a JSON object: {"name": "...", "description": "..."}
    """
    
    payload = {
        "contents": [{
            "parts": [
                {"text": prompt},
                {"inline_data": {"mime_type": "image/jpeg", "data": encoded_image}}
            ]
        }],
        "generationConfig": {"temperature": 0.2}
    }
    
    url = f"{GEMINI_API_URL}?key={API_KEY}"
    req = urllib.request.Request(
        url, 
        data=json.dumps(payload).encode('utf-8'), 
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    
    with urllib.request.urlopen(req) as response:
        result = json.loads(response.read().decode('utf-8'))
        text = result['candidates'][0]['content']['parts'][0]['text']
        text = text.replace('', '').strip()
        start = text.find('{')
        end = text.rfind('}') + 1
        return json.loads(text[start:end])

def process_photos():
    if not os.path.exists(DEST_DIR):
        os.makedirs(DEST_DIR)

    files = [f for f in os.listdir(SOURCE_DIR) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
    
    for i, filename in enumerate(files):
        file_id = f"pic-{101 + i}"
        source_path = os.path.join(SOURCE_DIR, filename)
        webp_filename = f"{file_id}.webp"
        webp_path = os.path.join(DEST_DIR, webp_filename)
        
        if os.path.exists(webp_path):
            print(f"Skipping {filename}, already processed.")
            continue

        with Image.open(source_path) as img:
            img.save(webp_path, "WEBP", quality=80)
            
        print(f"Analyzing {filename} with {MODEL}...")
        meta = generate_metadata(source_path)
        
        json_data = {
            "id": file_id,
            "file": webp_filename,
            "type": "painting",
            "content": {"en": meta}
        }
        
        with open(os.path.join(DEST_DIR, f"{file_id}.json"), 'w', encoding='utf-8') as f:
            json.dump(json_data, f, indent=2, ensure_ascii=False)
            
        print(f"Processed {filename} -> {file_id}")

if __name__ == "__main__":
    process_photos()
