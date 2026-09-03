// Theme Initialization and Logic
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeLogo = document.getElementById('themeLogo');
    
    if (!themeToggle || !themeIcon || !themeLogo) return;

    // Load preference from localStorage or use system default
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const activeTheme = savedTheme || systemTheme;

    // Apply Theme
    document.documentElement.setAttribute('data-theme', activeTheme);
    updateUI(activeTheme, themeIcon, themeLogo);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme); // Cache preference
        updateUI(newTheme, themeIcon, themeLogo);
    });
}

function updateUI(theme, iconElement, logoElement) {
    // Logo update: Dark theme (black background) -> use white logo (simeza-logo-w.svg)
    // Light theme (white background) -> use black logo (simeza-logo-b.svg)
    logoElement.src = theme === 'dark' ? '/core/img/simeza-logo-w.svg' : '/core/img/simeza-logo-b.svg';
    
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

