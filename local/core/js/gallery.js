// Detect language using the same logic as core/js/simeza.js
const languages = ['en', 'ro', 'de', 'es', 'fr', 'ru', 'pt', 'hu', 'it'];
const pathParts = window.location.pathname.split('/');
const urlLang = pathParts[1];
const lang = (urlLang && languages.includes(urlLang)) ? urlLang : (localStorage.getItem('lang') || 'en');

// Find all containers
const containers = document.querySelectorAll('.widget-placeholder, #panel-container, #gallery-container');

containers.forEach(container => {
    // Only process gallery widgets
    const widgetType = container.getAttribute('data-widget');
    if (widgetType !== 'gallery') return;
    
    // Add wrapper class if not present
    if (!container.classList.contains('panel-wrapper')) {
        container.classList.add('panel-wrapper');
    }

    // Always fetch the main manifest
    const manifestUrl = '/content/gallery/manifest.json';

    fetch(manifestUrl)
        .then(response => {
            if (!response.ok) throw new Error('Manifest not found');
            return response.json();
        })
        .then(data => {
            container.innerHTML = ''; // Clear placeholder
            
            data.forEach(item => {
                const panel = document.createElement('div');
                panel.className = 'panel';
                
                // Get content for the detected language, fallback to EN if missing, or use first available
                const content = (item.content && (item.content[lang] || item.content['en'] || Object.values(item.content)[0])) || {};
                
                const title = content.name || item.id || 'Untitled';
                const description = content.description || '';
                
                let html = `
                    <div class="panel-image">
                        <img src="/content/gallery/${item.file}" alt="${title.replace(/"/g, '&quot;')}">
                    </div>
                    <div class="panel-data">
                        <h3>${title}</h3>
                        <p>${description}</p>
                        ${item.status ? `<p>Status: ${item.status}</p>` : ''}
                        ${item.year ? `<p>Year: ${item.year}</p>` : ''}
                    </div>
                `;
                
                panel.innerHTML = html;
                container.appendChild(panel);
            });
        })
        .catch(error => {
            console.error('Error loading gallery:', error);
            container.innerHTML = `<p>Error loading gallery. Please try again later.</p>`;
        });
});

