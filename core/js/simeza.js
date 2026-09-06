// Helper for bulletproof DOM ready execution
function onDOMReady(fn) {
    if (document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

// 1. Theme Toggle - exposed globally
window.toggleTheme = function() {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    try {
        localStorage.setItem("theme", newTheme);
        document.cookie = `theme=${newTheme}; path=/; max-age=31536000`;
    } catch (e) {}
    const themeLogo = document.getElementById("themeLogo");
    if (themeLogo) {
        themeLogo.src = newTheme === "dark" ? "/core/img/simeza-logo-w.svg" : "/core/img/simeza-logo-b.svg";
    }
};

// Initialize theme immediately
(function initTheme() {
    try {
        const savedTheme = localStorage.getItem("theme") || (document.cookie.includes("theme=dark") ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", savedTheme);
        const themeLogo = document.getElementById("themeLogo");
        if (themeLogo) {
            themeLogo.src = savedTheme === "dark" ? "/core/img/simeza-logo-w.svg" : "/core/img/simeza-logo-b.svg";
        }
    } catch (e) {}
})();

// 2. Filter Modal Toggle
window.toggleFilterModal = function() {
    const modal = document.getElementById("filterModal");
    if (modal) {
        modal.classList.toggle("active");
    }
};

// 3. Desktop Layout Toggle (Normal 1200px row vs Fullscreen Grid)
window.toggleDesktopLayout = function() {
    const isMax = document.body.classList.toggle("layout-maximized");
    try {
        const settings = getSettings();
        settings.desktopLayout = isMax ? "panels" : "slider";
        localStorage.setItem("simezaSettings", JSON.stringify(settings));
    } catch (e) {}
    updateLayoutButtonIcon(isMax);
};

function updateLayoutButtonIcon(isMax) {
    const icon = document.getElementById("layoutGridIcon");
    const btn = document.getElementById("layoutGridBtn");
    if (icon) {
        icon.className = isMax ? "bi bi-view-stacked" : "bi bi-grid";
    }
    if (btn) {
        btn.title = isMax ? "Single Row Layout" : "Maximized Grid Layout";
    }
}

// 4. Mobile Menu
window.toggleMobileMenu = function() {
    const menu = document.getElementById("mobileMenu");
    if (menu) menu.classList.toggle("show");
};

window.closeMobileMenu = function() {
    const menu = document.getElementById("mobileMenu");
    if (menu) menu.classList.remove("show");
};

// 5. Language Handling
const SLUG_MAP = {
    "about.md": {"ro": "despre.md", "de": "ueber-uns.md", "fr": "a-propos.md", "es": "sobre-nosotros.md", "ru": "o-nas.md", "pt": "sobre.md", "hu": "rolunk.md", "it": "chi-siamo.md"},
    "media.md": {"ro": "media.md", "de": "media.md", "fr": "media.md", "es": "media.md", "ru": "media.md", "pt": "media.md", "hu": "media.md", "it": "media.md"},
    "authors.md": {"ro": "autori.md", "de": "autoren.md", "fr": "auteurs.md", "es": "autores.md", "ru": "avtory.md", "pt": "autores.md", "hu": "szerzok.md", "it": "autori.md"},
    "writings.md": {"ro": "scrieri.md", "de": "schriften.md", "fr": "ecrits.md", "es": "escritos.md", "ru": "stati.md", "pt": "escritos.md", "hu": "irasok.md", "it": "scritti.md"},
    "gallery.md": {"ro": "galerie.md", "de": "galerie.md", "fr": "galerie.md", "es": "galeria.md", "ru": "galereya.md", "pt": "galeria.md", "hu": "galeria.md", "it": "galleria.md"},
    "books.md": {"ro": "carti.md", "de": "buecher.md", "fr": "livres.md", "es": "libros.md", "ru": "knigi.md", "pt": "livros.md", "hu": "konyvek.md", "it": "libri.md"}
};

const languages = [
    { code: "en", flag: "https://flagcdn.com/gb.svg", name: "EN" },
    { code: "ro", flag: "https://flagcdn.com/ro.svg", name: "RO" },
    { code: "de", flag: "https://flagcdn.com/de.svg", name: "DE" },
    { code: "es", flag: "https://flagcdn.com/es.svg", name: "ES" },
    { code: "fr", flag: "https://flagcdn.com/fr.svg", name: "FR" },
    { code: "ru", flag: "https://flagcdn.com/ru.svg", name: "RU" },
    { code: "pt", flag: "https://flagcdn.com/pt.svg", name: "PT" },
    { code: "hu", flag: "https://flagcdn.com/hu.svg", name: "HU" },
    { code: "it", flag: "https://flagcdn.com/it.svg", name: "IT" }
];

window.setLang = function(lang) {
    try { localStorage.setItem("lang", lang); } catch (e) {}
    const currentPageMeta = document.querySelector("meta[name=\x27page-id\x27]");
    const currentPageFile = currentPageMeta ? currentPageMeta.content : "gallery.md";
    const targetSlug = SLUG_MAP[currentPageFile] ? (SLUG_MAP[currentPageFile][lang] || currentPageFile) : currentPageFile;
    const targetPath = "/" + lang + "/" + targetSlug.replace(".md", ".html");
    location.href = targetPath;
};

window.toggleLangMenu = function() {
    const menu = document.getElementById("langMenu");
    if (menu) menu.classList.toggle("show");
};

// Global settings reader
function getSettings() {
    try {
        const saved = localStorage.getItem("simezaSettings");
        if (saved) {
            const parsed = JSON.parse(saved);
            return {
                loopDelay: parseInt(parsed.loopDelay, 10) || 3,
                autoRotation: parsed.autoRotation === true || parsed.autoRotation === "true",
                desktopLayout: parsed.desktopLayout === "panels" ? "panels" : "slider",
                musicEnabled: parsed.musicEnabled === true || parsed.musicEnabled === "true"
            };
        }
    } catch (e) {}
    return { loopDelay: 3, autoRotation: true, desktopLayout: "slider", musicEnabled: false };
}

// Global DOM Ready Handlers
onDOMReady(() => {
window.toggleSettingsModal = function() {
    const modal = document.getElementById("settingsModal");
    if (modal) {
        modal.classList.toggle("active");
    }
};

onDOMReady(() => {
    // Theme Logo setup
    const themeLogo = document.getElementById("themeLogo");
    if (themeLogo) {
        themeLogo.style.cursor = "pointer";
        themeLogo.onclick = window.toggleTheme;
        const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
        themeLogo.src = currentTheme === "dark" ? "/core/img/simeza-logo-w.svg" : "/core/img/simeza-logo-b.svg";
    }

    // 2. Toolbar buttons visibility
    const pageId = document.querySelector("meta[name='page-id']")?.content || "";
    const pathname = window.location.pathname;
    const filterBtn = document.querySelector(".toolbar-btn[onclick*='toggleFilterModal']");
    const isGallery = pageId.includes("gallery.md") || pathname.includes("galerie");

    if (filterBtn) {
        filterBtn.parentElement.classList.toggle("gallery-only", !isGallery);
    }

    // 3. Apply shareable settings before restoring the desktop layout.
    const routeSettings = new URLSearchParams(window.location.search);
    if (routeSettings.has("loopDelay") || routeSettings.has("autoRotation") || routeSettings.has("desktopLayout") || routeSettings.has("musicEnabled")) {
        const settings = getSettings();
        settings.loopDelay = parseInt(routeSettings.get("loopDelay"), 10) || settings.loopDelay;
        if (routeSettings.has("autoRotation")) settings.autoRotation = routeSettings.get("autoRotation") === "true";
        if (routeSettings.has("desktopLayout")) settings.desktopLayout = routeSettings.get("desktopLayout") === "panels" ? "panels" : "slider";
        if (routeSettings.has("musicEnabled")) settings.musicEnabled = routeSettings.get("musicEnabled") === "true";
        try { localStorage.setItem("simezaSettings", JSON.stringify(settings)); } catch (e) {}
    }

    // 4. Desktop Layout restoration applies only to the gallery.
    const isGalleryPage = Boolean(document.querySelector('.gallery-container'));
    if (window.innerWidth >= 768 && isGalleryPage && getSettings().desktopLayout === "panels") {
        document.body.classList.add("layout-maximized");
        updateLayoutButtonIcon(true);
    } else if (!isGalleryPage) {
        document.body.classList.remove("layout-maximized");
    }

    // 4. Language UI Setup
    const pathParts = window.location.pathname.split("/");
    const urlLang = pathParts[1];
    const savedLang = localStorage.getItem("lang");
    const matchedUrlLang = urlLang && languages.find(l => l.code === urlLang);
    const lang = matchedUrlLang ? urlLang : (savedLang && languages.find(l => l.code === savedLang) ? savedLang : "en");
    try { localStorage.setItem("lang", lang); } catch (e) {}

    const activeLang = languages.find(l => l.code === lang) || languages[0];
    const langBtn = document.getElementById("langBtn");
    if (langBtn && activeLang) {
        langBtn.innerHTML = `<img class="language-flag" src="${activeLang.flag}" alt="${activeLang.name}"> ${activeLang.name}`;
    }

    const langMenu = document.getElementById("langMenu");
    if (langMenu && langMenu.children.length === 0) {
        languages.forEach(l => {
            langMenu.innerHTML += `<li class="language-option" onclick="setLang('${l.code}')"><img class="language-flag" src="${l.flag}" alt="${l.name}"> ${l.name}</li>`;
        });
    }

    // 5. Global click listeners for menus
    document.addEventListener("click", function(event) {
        const mobileMenu = document.getElementById("mobileMenu");
        const langMenu = document.getElementById("langMenu");
        const toggler = document.querySelector(".navbar-toggler");
        const langBtn = document.getElementById("langBtn");

        if (mobileMenu && mobileMenu.classList.contains("show") && mobileMenu.contains(event.target) && event.target.tagName === "A") {
            window.closeMobileMenu();
        } else if (mobileMenu && mobileMenu.classList.contains("show") && !mobileMenu.contains(event.target) && (!toggler || !toggler.contains(event.target))) {
            window.closeMobileMenu();
        }

        if (langMenu && langMenu.classList.contains("show") && !langMenu.contains(event.target) && (!langBtn || !langBtn.contains(event.target))) {
            window.toggleLangMenu();
        }
    });

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            window.closeMobileMenu();
            const langMenu = document.getElementById("langMenu");
            if (langMenu) langMenu.classList.remove("show");
        }
    });

    // 6. Social Footer
    const footer = document.getElementById("socialFooter");
    if (footer && footer.children.length === 0) {
        fetch('/content/footer-links.json')
            .then(response => response.ok ? response.json() : Promise.reject(new Error('Footer links unavailable')))
            .then(config => {
                const socialLinks = Array.isArray(config.links) ? config.links : [];
                const iconsWrapper = document.createElement("div");
                iconsWrapper.className = "social-icons-wrapper";
                socialLinks.filter(link => link.url).forEach(link => {
                    const anchor = document.createElement("a");
                    anchor.href = link.url;
                    anchor.title = link.name || '';
                    anchor.target = "_blank";
                    anchor.rel = "noopener noreferrer";
                    const icon = document.createElement("i");
                    icon.className = "bi " + (link.icon || '');
                    anchor.appendChild(icon);
                    iconsWrapper.appendChild(anchor);
                });
                if (iconsWrapper.children.length) footer.appendChild(iconsWrapper);
                const copyright = document.createElement("p");
                copyright.className = "copyright";
                copyright.textContent = config.copyright || 'Copyright (C) 2026 Sage-Code Laboratory.';
                footer.appendChild(copyright);
            })
            .catch(() => {
                const copyright = document.createElement("p");
                copyright.className = "copyright";
                copyright.textContent = 'Copyright (C) 2026 Sage-Code Laboratory.';
                footer.appendChild(copyright);
            });
    }
});

function initFullscreenViewer() {
    const viewer = document.createElement('div');
    viewer.id = 'imageFullscreenViewer';
    viewer.innerHTML = `
    <div id="viewerActions">
    <button id="fullscreenLoopBtn" class="fullscreen-btn"><i class="bi bi-arrow-repeat"></i></button>
    <button id="fullscreenCloseBtn" class="fullscreen-btn">&times;</button>

    </div>
    <img src="" alt="Fullscreen Image">
    `;
    document.body.appendChild(viewer);

    const viewerImg = viewer.querySelector('img');
    const closeBtn = document.getElementById('fullscreenCloseBtn');
    const loopBtn = document.getElementById('fullscreenLoopBtn');

    let filteredPanels = [];
    let currentIndex = 0;
    let loopTimeout = null;
    let isLooping = false;
    let isPaused = false;

    function closeViewer() {
        stopLoop();
        viewer.classList.remove('active');
    }

    closeBtn.addEventListener('click', closeViewer);
    viewer.addEventListener('click', (e) => {
        if (e.target === viewer) closeViewer();
    });

    function showImage(index) {
        if (index < 0) index = filteredPanels.length - 1;
        if (index >= filteredPanels.length) index = 0;
        currentIndex = index;
        const panel = filteredPanels[currentIndex];
        viewerImg.src = panel.dataset.image || panel.querySelector('img').src;
        updateRotation(viewerImg);
    }

    function showNext() { showImage(currentIndex + 1); }
    function showPrev() { showImage(currentIndex - 1); }

    function startLoop() {
        if (!isLooping) return;
        loopBtn.innerHTML = '<i class="bi bi-stop-fill"></i>';
        const settings = getSettings();
        loopTimeout = setTimeout(() => {
            showNext();
            startLoop();
        }, settings.loopDelay * 1000);
    }

    function stopLoop() {
        clearTimeout(loopTimeout);
        loopBtn.innerHTML = '<i class="bi bi-arrow-repeat"></i>';
    }

    loopBtn.addEventListener('click', () => {
        isLooping = !isLooping;
        if (isLooping) {
            startLoop();
        } else {
            stopLoop();
        }
    });


window.shareGallery = function() {
    const activeBtn = document.querySelector('.toolbar-btn.active') || document.querySelector('.sticky-bottom-bar .bottom-bar-btn.active');
    const params = new URLSearchParams({
        type: activeBtn?.dataset?.filter || 'painting',
        author: document.querySelector('select[name=\'filter-authors\']')?.value || '',
        category: document.querySelector('select[name=\'filter-categories\']')?.value || '',
        topic: document.querySelector('select[name=\'filter-topics\']')?.value || ''
    });
    
    // Remove empty params
    for (const [key, value] of params.entries()) {
        if (!value) params.delete(key);
    }
    
    const url = window.location.origin + window.location.pathname + '?' + params.toString();
    navigator.clipboard.writeText(url).then(() => {
        alert('Share link copied to clipboard!');
    });
};

window.applyRouteFilters = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const keys = ['type', 'author', 'category', 'topic'];
    if (!keys.some(key => urlParams.has(key))) return;
    const filters = {};
    keys.forEach(key => { filters[key] = urlParams.get(key) || ''; });
    try { localStorage.setItem('simezaFilters', JSON.stringify(filters)); } catch (e) {}
    window.applyFilters?.();
};

    // Touch/Mouse pause/resume
    viewerImg.addEventListener('mousedown', () => { if (isLooping) clearTimeout(loopTimeout); });
    viewerImg.addEventListener('mouseup', () => { if (isLooping) startLoop(); });
    viewerImg.addEventListener('touchstart', (e) => { e.preventDefault(); if (isLooping) clearTimeout(loopTimeout); });
    viewerImg.addEventListener('touchend', (e) => { e.preventDefault(); if (isLooping) startLoop(); });

    // Swipe navigation
    let startX = 0;
    viewer.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; });
    viewer.addEventListener('touchend', (e) => {
        const deltaX = e.changedTouches[0].clientX - startX;
        if (Math.abs(deltaX) > 50) {
            deltaX > 0 ? showPrev() : showNext();
            if (isLooping) {
                stopLoop();
                startLoop(); // Reset timer
            }
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeViewer();
        if (viewer.classList.contains('active')) {
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        }
    });

    function updateRotation(imgElement) {
        const isScreenPortrait = window.innerHeight >= window.innerWidth;
        const isImgPortrait = (imgElement.naturalHeight || imgElement.height) >= (imgElement.naturalWidth || imgElement.width);

        if ((isScreenPortrait && !isImgPortrait) || (!isScreenPortrait && isImgPortrait)) {
            imgElement.classList.add('rotated');
        } else {
            imgElement.classList.remove('rotated');
        }
    }

    // Double tap/click handler
    let lastTap = 0;
    document.addEventListener('dblclick', (e) => {
        // Only allow fullscreen viewer on mobile
        if (window.innerWidth > 767) return;

        const panel = e.target.closest('.panel');
        if (panel && !e.target.closest('#imageFullscreenViewer') && !e.target.closest('#galleryModal')) {
            filteredPanels = Array.from(document.querySelectorAll('.panel-wrapper[data-widget="gallery"] .panel'))
            .filter(p => p.offsetParent !== null && window.getComputedStyle(p).display !== 'none');
            currentIndex = filteredPanels.indexOf(panel);
            viewerImg.src = panel.dataset.image || panel.querySelector('img').src;
            viewer.classList.add('active');
            updateRotation(viewerImg);
        }
    });

    document.addEventListener('touchend', (e) => {
        // Only allow fullscreen viewer on mobile
        if (window.innerWidth > 767) return;

        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        const panel = e.target.closest('.panel');

        if (tapLength < 300 && tapLength > 0 && panel && !e.target.closest('#imageFullscreenViewer') && !e.target.closest('#galleryModal')) {
            filteredPanels = Array.from(document.querySelectorAll('.panel-wrapper[data-widget="gallery"] .panel'))
            .filter(p => p.offsetParent !== null && window.getComputedStyle(p).display !== 'none');
            currentIndex = filteredPanels.indexOf(panel);
            viewerImg.src = panel.dataset.image || panel.querySelector('img').src;
            viewer.classList.add('active');
            updateRotation(viewerImg);
            e.preventDefault();
        }
        lastTap = currentTime;
    });

    window.addEventListener('resize', () => {
        const isPortrait = window.innerHeight >= window.innerWidth;
        if (viewer.classList.contains('active')) {
            updateRotation(viewerImg);
        }
    });
}

document.addEventListener('DOMContentLoaded', initFullscreenViewer);



onDOMReady(initFullscreenViewer);

function initLandscapeAutoFullscreen() {
    const enterFullscreen = () => {
        if (!document.fullscreenElement && window.innerHeight < window.innerWidth && window.innerWidth <= 900) {
            const elem = document.documentElement;
            if (elem.requestFullscreen) {
                elem.requestFullscreen({ navigationUI: 'hide' }).catch(() => {});
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            }
        }
    };

    const exitFullscreen = () => {
        if (document.fullscreenElement) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    };

    // Trigger on resize (rotation)
    window.addEventListener('resize', () => {
        if (window.innerHeight < window.innerWidth && window.innerWidth <= 900) {
            enterFullscreen();
        } else {
            exitFullscreen();
        }
    });

    // Touch gesture fallback (one-time)
    const handleTouch = () => {
        if (window.innerHeight < window.innerWidth && window.innerWidth <= 900) {
            enterFullscreen();
        }
        document.removeEventListener('touchstart', handleTouch);
    };
    document.addEventListener('touchstart', handleTouch, { once: true });
}


onDOMReady(initLandscapeAutoFullscreen);

window.toggleSettingsModal = function() {
    const modal = document.getElementById("settingsModal");
    if (modal) {
        modal.classList.toggle("active");
    }
};

});
