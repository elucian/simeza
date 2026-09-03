---
title: Galerie - Simeza Art
description: Une collection organisée d'œuvres photographiques et de peintures de la galerie Simeza Art.
keywords: simeza, art, galerie, peintures, images, photographie, beaux-arts
source_hash: 5e803a42b8eed81fca764073260264fbbba57972baaa0ab27a5eb9c0e70d55ba
---
# Galerie

Bienvenue à la Galerie Simeza. Explorez notre collection de peintures et d'œuvres photographiques.

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
                    <img src="/files/gallery/${item.file}" alt="${item.content.fr.name}">
                </div>
                <div class="gallery-data">
                    <h3>${item.content.fr.name}</h3>
                    <p>${item.content.fr.description}</p>
                    <p>Statut : ${item.status}</p>
                    <p>Année : ${item.year}</p>
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