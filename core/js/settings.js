document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('settingsForm');
    const saveBtn = document.getElementById('saveSettingsBtn');
    
    // Load settings
    const saved = localStorage.getItem('simezaSettings');
    const settings = saved ? JSON.parse(saved) : { loopDelay: 3, autoRotation: true, pillbarVisible: true };
    
    // Populate form
    if (form) {
        form.elements['loopDelay'].value = settings.loopDelay;
        form.elements['autoRotation'].value = settings.autoRotation.toString();
        form.elements['pillbarVisible'].value = settings.pillbarVisible.toString();
    }
    
    // Save settings
    saveBtn?.addEventListener('click', () => {
        const newSettings = {
            loopDelay: parseInt(form.elements['loopDelay'].value),
            autoRotation: form.elements['autoRotation'].value === 'true',
            pillbarVisible: form.elements['pillbarVisible'].value === 'true'
        };
        localStorage.setItem('simezaSettings', JSON.stringify(newSettings));
        
        // Return to gallery
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
    });
});
