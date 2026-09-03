---
title: Galerie - Simeza Art
description: Eine kuratierte Sammlung fotografischer Arbeiten und Gemälde der Simeza Art Galerie.
keywords: simeza, kunst, galerie, gemälde, bilder, fotografie, bildende kunst
source_hash: 5e803a42b8eed81fca764073260264fbbba57972baaa0ab27a5eb9c0e70d55ba
---
# Galerie

Willkommen in der Simeza Galerie. Entdecken Sie unsere Sammlung an erlesenen Gemälden und fotografischen Arbeiten.

<div id="gallery-container" class="gallery-wrapper"></div>

<script>
fetch('/files/gallery/manifest.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('gallery-container');
        data.forEach(item => {
            const panel = document.createElement('div');
            panel.className = 'gallery-panel';
            panel.innerHTML = `
                <div class="gallery-image">
                    <img src="/files/gallery/${item.file}" alt="${item.content.de.name}">
                </div>
                <div class="gallery-data">
                    <h3>${item.content.de.name}</h3>
                    <p>${item.content.de.description}</p>
                    <p>Status: ${item.status}</p>
                    <p>Jahr: ${item.year}</p>
                </div>
            `;
            container.appendChild(panel);
        });
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