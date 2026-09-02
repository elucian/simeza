// Theme Initialization and Logic
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const sageLogo = document.getElementById('sage-logo');
    
    if (!themeToggle || !themeIcon || !sageLogo) return;

    // Load preference from localStorage or use system default
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const activeTheme = savedTheme || systemTheme;

    // Apply Theme
    document.documentElement.setAttribute('data-theme', activeTheme);
    updateUI(activeTheme, themeIcon, sageLogo);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme); // Cache preference
        updateUI(newTheme, themeIcon, sageLogo);
    });
}

function updateUI(theme, iconElement, logoElement) {
    const isRo = window.location.pathname.includes('/ro/');
    const base = isRo ? '../' : '';

    // Logo update remains the same
    logoElement.src = theme === 'dark' ? `${base}img/sage-logo-b.svg` : `${base}img/sage-logo-w.svg`;
    
    // Theme toggle icon update using the switch-theme.svg
    iconElement.style.filter = theme === 'dark' ? 'invert(1)' : 'invert(0)';
}

// Translation Logic
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'ro',
    includedLanguages: 'en,ro',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}

