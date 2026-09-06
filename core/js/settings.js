document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('settingsForm');
    const applyBtn = document.getElementById('applySettingsBtn');
    const cancelBtn = document.getElementById('cancelSettingsBtn');
    
    // Load settings
    const getSavedSettings = () => {
        try {
            const saved = localStorage.getItem('simezaSettings');
            if (saved) {
                const parsed = JSON.parse(saved);
                return {
                    loopDelay: parseInt(parsed.loopDelay, 10) || 3,
                    autoRotation: parsed.autoRotation === true || parsed.autoRotation === 'true',
                    pillbarVisible: parsed.pillbarVisible !== false && parsed.pillbarVisible !== 'false'
                };
            }
        } catch (e) {}
        return { loopDelay: 3, autoRotation: true, pillbarVisible: true };
    };

    const settings = getSavedSettings();
    
    // Populate form
    if (form) {
        const delaySelect = form.querySelector('select[name="loopDelay"]');
        if (delaySelect) delaySelect.value = String(settings.loopDelay);

        const autoRadio = form.querySelector(`input[name="autoRotation"][value="${settings.autoRotation}"]`);
        if (autoRadio) autoRadio.checked = true;

        const pillRadio = form.querySelector(`input[name="pillbarVisible"][value="${settings.pillbarVisible}"]`);
        if (pillRadio) pillRadio.checked = true;
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
        const loopDelayVal = form ? form.querySelector('select[name="loopDelay"]')?.value : '3';
        const autoRotationVal = form ? form.querySelector('input[name="autoRotation"]:checked')?.value : 'true';
        const pillbarVisibleVal = form ? form.querySelector('input[name="pillbarVisible"]:checked')?.value : 'true';

        const newSettings = {
            loopDelay: parseInt(loopDelayVal, 10) || 3,
            autoRotation: autoRotationVal === 'true',
            pillbarVisible: pillbarVisibleVal === 'true'
        };
        localStorage.setItem('simezaSettings', JSON.stringify(newSettings));
        redirectToGallery();
    });

    // Cancel
    cancelBtn?.addEventListener('click', () => {
        redirectToGallery();
    });
});
