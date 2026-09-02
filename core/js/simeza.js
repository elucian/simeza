    function toggleTheme() {
      const isDark = document.body.classList.toggle('dark-mode');
      const theme = isDark ? 'dark' : 'light';
      document.cookie = `theme=${theme}; path=/; max-age=31536000`;
      localStorage.setItem('theme', theme);
      document.getElementById('themeLogo').src = isDark ? 'core/img/sage-logo-w.svg' : 'core/img/sage-logo-b.svg';
    }

    // Initialize theme from cookie/localStorage
    const savedTheme = localStorage.getItem('theme') || (document.cookie.includes('theme=light') ? 'light' : 'dark');
    if (savedTheme === 'light') {
      document.body.classList.remove('dark-mode');
      document.getElementById('themeLogo').src = 'core/img/sage-logo-b.svg';
    } else {
      document.body.classList.add('dark-mode');
      document.getElementById('themeLogo').src = 'core/img/sage-logo-w.svg';
    }

  function setLang(lang) {
    localStorage.setItem('lang', lang);
    location.reload();
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
    { code: 'ru', flag: 'https://flagcdn.com/ru.svg', name: 'RU' }
  ];

  const lang = localStorage.getItem('lang') || 'en';
  const activeLang = languages.find(l => l.code === lang);
  document.getElementById('langBtn').innerHTML = `<img src="${activeLang.flag}" alt="${activeLang.name}" style="width:31px; height:24px; object-fit:cover;"> ${activeLang.name}`;

  const langMenu = document.getElementById('langMenu');
  languages.forEach(l => {
    langMenu.innerHTML += `<li class="p-2 d-flex align-items-center gap-2" style="cursor:pointer" onclick="setLang('${l.code}')"><img src="${l.flag}" alt="${l.name}" style="width:31px; height:24px; object-fit:cover;"> ${l.name}</li>`;
  });

  fetch(lang + '/menu.json')
    .then(r => r.json())
    .then(data => {
      const list = document.getElementById('menuList');
      const mobileList = document.getElementById('mobileMenuList');
      // Clear existing menu items before appending new ones
      list.innerHTML = '';
      mobileList.innerHTML = '';
      Object.entries(data).forEach(([label, url]) => {
        const item = `<li class="nav-item"><a class="nav-link" href="${url}">${label}</a></li>`;
        list.innerHTML += item;
        mobileList.innerHTML += item;
      });
    });

  const socialLinks = [
    { name: "Google Groups", icon: "bi-google", url: "#" },
    { name: "Reddit", icon: "bi-reddit", url: "#" },
    { name: "Facebook", icon: "bi-facebook", url: "#" },
    { name: "Discord", icon: "bi-discord", url: "#" },
    { name: "WhatsApp", icon: "bi-whatsapp", url: "#" }
  ];
  
  const footer = document.getElementById('socialFooter');
  socialLinks.forEach(link => {
    footer.innerHTML += `<a href="${link.url}" class="mx-2" title="${link.name}"><i class="bi ${link.icon} fs-3"></i></a>`;
  });
