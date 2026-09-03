---
title: Gallery - Simeza Art
description: A curated collection of photographic works and paintings from Simeza Art gallery.
keywords: simeza, art, gallery, paintings, pictures, photography, fine art
---

# Gallery

Welcome to the Simeza Gallery. Explore our collection of fine paintings and photographic works.

<div id="gallery-container" class="gallery-wrapper"></div>

<script>
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
        document.getElementById('gallery-container').innerHTML = '<p>Error loading gallery. Please try again later.</p>';
    });
</script>

<style>
.gallery-wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    overflow: auto;
    scroll-snap-type: y mandatory;
    height: 80vh;
}

@media (min-width: 768px) {
    .gallery-wrapper {
        flex-direction: row;
        scroll-snap-type: x mandatory;
        overflow-x: auto;
    }
}

.gallery-panel {
    display: flex;
    flex-direction: column;
    scroll-snap-align: start;
    min-width: 100%;
    border: 1px solid #ccc;
    background: #fff;
    padding: 10px;
}

@media (min-width: 768px) {
    .gallery-panel {
        flex-direction: row;
        min-width: 80%;
    }
}

.gallery-image img {
    width: 100%;
    height: auto;
    max-height: 400px;
    object-fit: contain;
}

.gallery-data {
    padding: 20px;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
    width: 12px;
    height: 12px;
}
::-webkit-scrollbar-track {
    background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
    background: #888;
}
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>

