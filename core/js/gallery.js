// Detect language using the same logic as core/js/simeza.js
const languages = ['en', 'ro', 'de', 'es', 'fr', 'ru', 'pt', 'hu', 'it'];
const pathParts = window.location.pathname.split('/');
const urlLang = pathParts[1];
const lang = (urlLang && languages.includes(urlLang)) ? urlLang : (localStorage.getItem('lang') || 'en');

const manifestUrl = lang === 'en' ? '/files/gallery/manifest.json' : `/files/gallery/manifest_${lang}.json`;

fetch(manifestUrl)
    .then(response => {
        if (!response.ok) throw new Error('Manifest not found');
        return response.json();
    })
    .then(data => {
        const container = document.getElementById('gallery-container');
        if (!container) return;
        
        data.forEach(item => {
            const panel = document.createElement('div');
            panel.className = 'gallery-panel';
            
            // Get content for the detected language, fallback to EN if missing
            const content = item.content[lang] || item.content['en'];
            
            panel.innerHTML = `
                <div class="gallery-image">
                    <img src="/files/gallery/${item.file}" alt="${content.name}">
                </div>
                <div class="gallery-data">
                    <h3>${content.name}</h3>
                    <p>${content.description}</p>
                    <p>Status: ${item.status}</p>
                    <p>Year: ${item.year}</p>
                </div>
            `;
            container.appendChild(panel);
        });
    })
    .catch(error => {
        console.error('Error loading gallery:', error);
        const container = document.getElementById('gallery-container');
        if (container) {
            container.innerHTML = '<p>Error loading gallery. Please try again later.</p>';
        }
    });