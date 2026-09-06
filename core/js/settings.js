document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('settingsForm');
    const applyBtn = document.getElementById('applySettingsBtn');
    const cancelBtn = document.getElementById('cancelSettingsBtn');
    
    // Load settings
    const saved = localStorage.getItem('simezaSettings');
    const settings = saved ? JSON.parse(saved) : { loopDelay: 3, autoRotation: true, pillbarVisible: true };
    
    // Populate form
    if (form) {
        form.elements['loopDelay'].value = settings.loopDelay;
        form.querySelector(`input[name="autoRotation"][value="${settings.autoRotation}"]`).checked = true;
        form.querySelector(`input[name="pillbarVisible"][value="${settings.pillbarVisible}"]`).checked = true;
    }

    const redirectToGallery = () => {
        const lang = localStorage.getItem('lang') || 'en';
        const slugMap = {
            'ro': 'galerie.html',
            'de': 'galerie.html',
            'fr': 'galerie.html',
            'es': 'galeria.html',
            'ru': 'galereya.html',
            'pt': 'galeria.html',
            'hu': 'galeria.html',
            'it': 'galleria.html',
            'en': 'gallery.html'
        };
        location.href = '/' + lang + '/' + (slugMap[lang] || 'gallery.html');
    };
    
    // Apply settings
    applyBtn?.addEventListener('click', () => {
        const newSettings = {
            loopDelay: parseInt(form.elements['loopDelay'].value),
            autoRotation: form.elements['autoRotation'].value === 'true',
            pillbarVisible: form.elements['pillbarVisible'].value === 'true'
        };
        localStorage.setItem('simezaSettings', JSON.stringify(newSettings));
        redirectToGallery();
    });

    // Cancel
    cancelBtn?.addEventListener('click', () => {
        redirectToGallery();
    });
});
