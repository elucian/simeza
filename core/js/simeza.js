    // Initialize filter button visibility
    document.addEventListener('DOMContentLoaded', () => {
        const pageId = document.querySelector('meta[name="page-id"]')?.content || '';
        const pathname = window.location.pathname;
        const filterBtn = document.getElementById('filterBtn');
        const isIndex = pageId.includes('index') || pathname.endsWith('/') || pathname.endsWith('index.html');
        if (filterBtn && !isIndex) {
            filterBtn.classList.add('is-visible');
        }
    });

    window.toggleFilterModal = function() {
        const modal = document.getElementById('filterModal');
        if (modal) {
            modal.classList.toggle('active');
        }
    };

    function toggleTheme() {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      document.cookie = `theme=${newTheme}; path=/; max-age=31536000`;
      document.getElementById('themeLogo').src = newTheme === 'dark' ? '/core/img/simeza-logo-w.svg' : '/core/img/simeza-logo-b.svg';
    }

    // Initialize theme from cookie/localStorage
    const savedTheme = localStorage.getItem('theme') || (document.cookie.includes('theme=dark') ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.getElementById('themeLogo').src = savedTheme === 'dark' ? '/core/img/simeza-logo-w.svg' : '/core/img/simeza-logo-b.svg';

    function toggleMobileMenu() {
        document.getElementById('mobileMenu').classList.toggle('show');
    }

    function closeMobileMenu() {
        document.getElementById('mobileMenu').classList.remove('show');
    }

    // Close mobile menu on link click
    document.addEventListener('click', function(event) {
        const mobileMenu = document.getElementById('mobileMenu');
        const langMenu = document.getElementById('langMenu');
        const toggler = document.querySelector('.navbar-toggler');
        const langBtn = document.getElementById('langBtn');
        
        // If clicked on a nav link in mobile menu, close it
        if (mobileMenu.classList.contains('show') && mobileMenu.contains(event.target) && event.target.tagName === 'A') {
            closeMobileMenu();
        } 
        // If clicked outside menu and not on toggler, close it
        else if (mobileMenu.classList.contains('show') && !mobileMenu.contains(event.target) && !toggler.contains(event.target)) {
            closeMobileMenu();
        }

        // Close lang menu if clicked outside
        if (langMenu.classList.contains('show') && !langMenu.contains(event.target) && !langBtn.contains(event.target)) {
            toggleLangMenu();
        }
    });

    // Handle Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeMobileMenu();
        }
    });

  const SLUG_MAP = {
    'about.md': {'ro': 'despre.md', 'de': 'ueber-uns.md', 'fr': 'a-propos.md', 'es': 'sobre-nosotros.md', 'ru': 'o-nas.md', 'pt': 'sobre.md', 'hu': 'rolunk.md', 'it': 'chi-siamo.md'}, 
    'media.md': {'ro': 'media.md', 'de': 'media.md', 'fr': 'media.md', 'es': 'media.md', 'ru': 'media.md', 'pt': 'media.md', 'hu': 'media.md', 'it': 'media.md'}, 
    'authors.md': {'ro': 'autori.md', 'de': 'autoren.md', 'fr': 'auteurs.md', 'es': 'autores.md', 'ru': 'avtory.md', 'pt': 'autores.md', 'hu': 'szerzok.md', 'it': 'autori.md'}, 
    'writings.md': {'ro': 'scrieri.md', 'de': 'schriften.md', 'fr': 'ecrits.md', 'es': 'escritos.md', 'ru': 'stati.md', 'pt': 'escritos.md', 'hu': 'irasok.md', 'it': 'scritti.md'}, 
    'gallery.md': {'ro': 'galerie.md', 'de': 'galerie.md', 'fr': 'galerie.md', 'es': 'galeria.md', 'ru': 'galereya.md', 'pt': 'galeria.md', 'hu': 'galeria.md', 'it': 'galleria.md'}, 
    'books.md': {'ro': 'carti.md', 'de': 'buecher.md', 'fr': 'livres.md', 'es': 'libros.md', 'ru': 'knigi.md', 'pt': 'livros.md', 'hu': 'konyvek.md', 'it': 'libri.md'}
  };

  function setLang(lang) {
    localStorage.setItem('lang', lang);
    const pathParts = window.location.pathname.split('/');
    const currentPageFile = document.querySelector('meta[name="page-id"]').content;
    const targetSlug = SLUG_MAP[currentPageFile] ? (SLUG_MAP[currentPageFile][lang] || currentPageFile) : currentPageFile;
    const targetPath = '/' + lang + '/' + targetSlug.replace('.md', '.html');
    location.href = targetPath;
  }

  function toggleLangMenu() {
    document.getElementById('langMenu').classList.toggle('show');
  }

  const languages = [
    { code: 'en', flag: 'https://flagcdn.com/gb.svg', name: 'EN' },
    { code: 'ro', flag: 'https://flagcdn.com/ro.svg', name: 'RO' },
    { code: 'de', flag: 'https://flagcdn.com/de.svg', name: 'DE' },
    { code: 'es', flag: 'https://flagcdn.com/es.svg', name: 'ES' },
    { code: 'fr', flag: 'https://flagcdn.com/fr.svg', name: 'FR' },
    { code: 'ru', flag: 'https://flagcdn.com/ru.svg', name: 'RU' },
    { code: 'pt', flag: 'https://flagcdn.com/pt.svg', name: 'PT' },
    { code: 'hu', flag: 'https://flagcdn.com/hu.svg', name: 'HU' },
    { code: 'it', flag: 'https://flagcdn.com/it.svg', name: 'IT' }
  ];

  // Detect language from URL path, then localStorage, then default 'en'
  const pathParts = window.location.pathname.split('/');
  const urlLang = pathParts[1];
  const lang = (urlLang && languages.find(l => l.code === urlLang)) ? urlLang : (localStorage.getItem('lang') || 'en');
  
  localStorage.setItem('lang', lang);

  const activeLang = languages.find(l => l.code === lang);
    document.getElementById('langBtn').innerHTML = `<img class="language-flag" src="${activeLang.flag}" alt="${activeLang.name}"> ${activeLang.name}`;

  const langMenu = document.getElementById('langMenu');
  languages.forEach(l => {
    langMenu.innerHTML += `<li class="language-option" onclick="setLang('${l.code}')"><img class="language-flag" src="${l.flag}" alt="${l.name}"> ${l.name}</li>`;
  });

  const socialLinks = [
    { name: "Google Groups", icon: "bi-google", url: "#" },
    { name: "Reddit", icon: "bi-reddit", url: "#" },
    { name: "Facebook", icon: "bi-facebook", url: "#" },
    { name: "Discord", icon: "bi-discord", url: "#" },
    { name: "WhatsApp", icon: "bi-whatsapp", url: "#" }
  ];
  
  const footer = document.getElementById('socialFooter');
  const pageId = document.querySelector('meta[name="page-id"]')?.content || '';
  
  if (footer && (pageId === 'index.md' || pageId === 'about.md')) {
      const iconsWrapper = document.createElement('div');
      iconsWrapper.className = 'social-icons-wrapper';
      
      socialLinks.forEach(link => {
        iconsWrapper.innerHTML += `<a href="${link.url}" class="mx-2" title="${link.name}"><i class="bi ${link.icon}"></i></a>`;
      });
      
      footer.appendChild(iconsWrapper);
      footer.innerHTML += `<p class="copyright">Copyright (C) 2026 Sage-Code Laboratory.</p>`;
  }


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
        loopTimeout = setTimeout(() => {
            showNext();
            startLoop();
        }, 3000);
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

document.addEventListener('DOMContentLoaded', initLandscapeAutoFullscreen);



