document.addEventListener("DOMContentLoaded", function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Define mapping for titles and button IDs
    const pageData = {
        'index.html': { title: 'La Simeza - [Intro]', label: 'Intro', buttonHref: 'index.html' },
        'arta.html': { title: 'La Simeza - [Artă]', label: 'Artă', buttonHref: 'arta.html' },
        'scrieri.html': { title: 'La Simeza - [Scrieri]', label: 'Scrieri', buttonHref: 'scrieri.html' },
        'matematica.html': { title: 'La Simeza - [Matematică]', label: 'Matematică', buttonHref: 'matematica.html' },
        'spiritualitate.html': { title: 'La Simeza - [Spiritualitate]', label: 'Spiritualitate', buttonHref: 'spiritualitate.html' },
        'poezie.html': { title: 'La Simeza - [Poezie]', label: 'Poezie', buttonHref: 'poezie.html' },
        'carti.html': { title: 'La Simeza - [Cărți]', label: 'Cărți', buttonHref: 'carti.html' }
    };

    const currentData = pageData[currentPage] || { title: 'La Simeza', label: '', buttonHref: null };

    // Update Browser Tab Title
    document.title = currentData.title;

    const layoutHTML = `
    <header class="fixed-header">
        <div>
            <a href="index.html">
                <img src="img/sage-logo.svg" id="sage-logo" alt="La Simeza Logo" style="width: 56px; height: 56px; border-radius: 50%;" class="image-responsive">
            </a>
        </div>
        <h1 id="dynamic-page-title">La Simeza</h1>
        <div class="d-flex align-items-center justify-content-end gap-3">
            <button id="themeToggle" class="btn btn-outline-secondary rounded-circle p-2" style="width: 48px; height: 48px; display: flex; align-items: center; justify-content: center;">
                <img src="img/switch-theme.svg" id="themeIcon" style="width: 40px; height: 40px;" alt="Switch Theme">
            </button>
            <div class="d-flex gap-2">
                <img src="img/en-flag.svg" alt="English" id="lang-en" style="width: 40px; cursor: pointer;">
                <img src="img/ro-flag.svg" alt="Romanian" id="lang-ro" style="width: 40px; cursor: pointer;">
            </div>
        </div>
    </header>
    <nav class="nav-bar-container navbar navbar-expand-lg navbar-light py-2">
        <ul class="nav navbar-nav justify-content-center w-100">
            <li class="nav-item mx-2"><a class="nav-link btn btn-primary ${currentData.buttonHref === 'index.html' ? 'active' : ''}" href="index.html">Intro <i class="bi bi-house"></i></a></li>
            <li class="nav-item mx-2"><a class="nav-link btn btn-primary ${currentData.buttonHref === 'arta.html' ? 'active' : ''}" href="arta.html">Artă <i class="bi bi-palette"></i></a></li>
            <li class="nav-item mx-2"><a class="nav-link btn btn-primary ${currentData.buttonHref === 'scrieri.html' ? 'active' : ''}" href="scrieri.html">Scrieri <i class="bi bi-pen"></i></a></li>
            <li class="nav-item mx-2"><a class="nav-link btn btn-primary ${currentData.buttonHref === 'matematica.html' ? 'active' : ''}" href="matematica.html">Matematică <i class="bi bi-calculator"></i></a></li>
            <li class="nav-item mx-2"><a class="nav-link btn btn-primary ${currentData.buttonHref === 'spiritualitate.html' ? 'active' : ''}" href="spiritualitate.html">Spiritualitate <i class="bi bi-bell"></i></a></li>
            <li class="nav-item mx-2"><a class="nav-link btn btn-primary ${currentData.buttonHref === 'poezie.html' ? 'active' : ''}" href="poezie.html">Poezie <i class="bi bi-book"></i></a></li>
            <li class="nav-item mx-2"><a class="nav-link btn btn-primary ${currentData.buttonHref === 'carti.html' ? 'active' : ''}" href="carti.html">Cărți <i class="bi bi-bookmark"></i></a></li>
        </ul>
    </nav>
    `;

    // Create a container and prepend it to body
    const layoutContainer = document.createElement('div');
    layoutContainer.innerHTML = layoutHTML;
    document.body.prepend(layoutContainer);

    // Update Header Title with dynamic content
    const pageTitle = document.getElementById('dynamic-page-title');
    if (pageTitle) {
        pageTitle.textContent = currentData.title;
    }

    // Apply content wrapper class to the existing main container if it exists
    const main = document.querySelector('main');
    if (main) {
        main.classList.add('content-wrapper');
    }

    // Trigger theme initialization
    if (typeof initTheme === 'function') {
        initTheme();
    }

    // Add language selection functionality
    document.getElementById('lang-en')?.addEventListener('click', () => {
        localStorage.setItem('lang', 'en');
        alert('Limba selectată: Engleză');
        location.reload();
    });

    document.getElementById('lang-ro')?.addEventListener('click', () => {
        localStorage.setItem('lang', 'ro');
        alert('Limba selectată: Română');
        location.reload();
    });
});
