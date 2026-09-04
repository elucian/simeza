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
    'events.md': {'ro': 'evenimente.md', 'de': 'veranstaltungen.md', 'fr': 'evenements.md', 'es': 'eventos.md', 'ru': 'sobytiya.md', 'pt': 'eventos.md', 'hu': 'esemenyek.md', 'it': 'eventi.md'}, 
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
  const iconsWrapper = document.createElement('div');
  iconsWrapper.className = 'social-icons-wrapper';
  
  socialLinks.forEach(link => {
    iconsWrapper.innerHTML += `<a href="${link.url}" class="mx-2" title="${link.name}"><i class="bi ${link.icon}"></i></a>`;
  });
  
  footer.appendChild(iconsWrapper);
  footer.innerHTML += `<p class="copyright">Copyright (C) 2026 Sage-Code Laboratory.</p>`;


function initFullscreenViewer() {
    const viewer = document.createElement('div');
    viewer.id = 'imageFullscreenViewer';
    viewer.innerHTML = `
        <button class="gallery-modal-close-x" aria-label="Close">&times;</button>
        <img src="" alt="Fullscreen Image">
    `;
    document.body.appendChild(viewer);

    const viewerImg = viewer.querySelector('img');
    const closeBtn = viewer.querySelector('.gallery-modal-close-x');
    
    function closeViewer() {
        viewer.classList.remove('active');
    }

    closeBtn.addEventListener('click', closeViewer);
    viewer.addEventListener('click', (e) => {
        if (e.target === viewer) closeViewer();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeViewer();
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
        const panel = e.target.closest('.panel');
        if (panel && !e.target.closest('#imageFullscreenViewer') && !e.target.closest('#galleryModal')) {
            const img = panel.querySelector('img');
            if (img) {
                viewerImg.src = panel.dataset.image || img.src;
                viewer.classList.add('active');
                updateRotation(viewerImg);
            }
        }
    });

    // Touch support for double tap
    document.addEventListener('touchend', (e) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        const panel = e.target.closest('.panel');
        
        if (tapLength < 300 && tapLength > 0 && panel && !e.target.closest('#imageFullscreenViewer') && !e.target.closest('#galleryModal')) {
            const img = panel.querySelector('img');
            if (img) {
                viewerImg.src = panel.dataset.image || img.src;
                viewer.classList.add('active');
                updateRotation(viewerImg);
                e.preventDefault();
            }
        }
        lastTap = currentTime;
    });

    window.addEventListener('resize', () => {
        const isPortrait = window.innerHeight >= window.innerWidth;
        if (viewer.classList.contains('active')) {
            if (!isPortrait) {
                viewer.classList.remove('active');
            } else {
                updateRotation(viewerImg);
            }
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



