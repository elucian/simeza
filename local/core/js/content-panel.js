// Detect language using the same logic as core/js/simeza.js
const languages = ['en', 'ro', 'de', 'es', 'fr', 'ru', 'pt', 'hu', 'it'];
const pathParts = window.location.pathname.split('/');
const urlLang = pathParts[1];
const lang = (urlLang && languages.includes(urlLang)) ? urlLang : (localStorage.getItem('lang') || 'en');

// Get container and type
const container = document.getElementById('panel-container');
const type = container ? container.getAttribute('data-type') : 'gallery';

const manifestUrl = lang === 'en' ? `/files/${type}/manifest.json` : `/files/${type}/manifest_${lang}.json`;

fetch(manifestUrl)
    .then(response => {
        if (!response.ok) throw new Error('Manifest not found');
        return response.json();
    })
    .then(data => {
        if (!container) return;
        
        data.forEach(item => {
            const panel = document.createElement('div');
            panel.className = 'panel';
            
            // Get content for the detected language, fallback to EN if missing, or use first available
            const content = item.content[lang] || item.content['en'] || (item.content ? Object.values(item.content)[0] : {});
            
            // Simple generic construction - assumes file exists and has standard fields
            // For more complex types, we might need different template logic
            let html = '';
            if (item.file) {
                 html += `
                <div class="panel-image">
                    <img src="/files/${type}/${item.file}" alt="${content.name}">
                </div>`;
            }
            
            html += `
                <div class="panel-data">
                    <h3>${content.name}</h3>
                    <p>${content.description}</p>
                    ${item.status ? `<p>Status: ${item.status}</p>` : ''}
                    ${item.year ? `<p>Year: ${item.year}</p>` : ''}
                </div>
            `;
            
            panel.innerHTML = html;
            container.appendChild(panel);
        });
    })
    .catch(error => {
        console.error(`Error loading ${type}:`, error);
        if (container) {
            container.innerHTML = `<p>Error loading ${type}. Please try again later.</p>`;
        }
    });