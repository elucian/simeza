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
                    desktopLayout: parsed.desktopLayout === 'panels' ? 'panels' : 'slider'
                };
            }
        } catch (e) {}
        return { loopDelay: 3, autoRotation: true, desktopLayout: 'slider' };
    };

    const settings = getSavedSettings();
    
    // Populate form
    if (form) {
        const delaySelect = form.querySelector('select[name="loopDelay"]');
        if (delaySelect) delaySelect.value = String(settings.loopDelay);

        const autoRadio = form.querySelector(`input[name="autoRotation"][value="${settings.autoRotation}"]`);
        if (autoRadio) autoRadio.checked = true;

        const layoutRadio = form.querySelector(`input[name="desktopLayout"][value="${settings.desktopLayout}"]`);
        if (layoutRadio) layoutRadio.checked = true;
    }

    const getGalleryUrl = (settings) => {
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
        const params = new URLSearchParams({
            loopDelay: String(settings.loopDelay),
            autoRotation: String(settings.autoRotation),
            desktopLayout: settings.desktopLayout
        });
        return '/' + lang + '/' + (slugMap[lang] || 'gallery.html') + '?' + params.toString();
    };

    const updateShareLink = () => {
        if (!form) return;
        const previewSettings = {
            loopDelay: parseInt(form.querySelector('select[name="loopDelay"]')?.value, 10) || 3,
            autoRotation: form.querySelector('input[name="autoRotation"]:checked')?.value === 'true',
            desktopLayout: form.querySelector('input[name="desktopLayout"]:checked')?.value || 'slider'
        };
        const shareLink = document.getElementById('settingsShareLink');
        if (shareLink) shareLink.value = window.location.origin + getGalleryUrl(previewSettings);
    };

    form?.addEventListener('change', updateShareLink);
    updateShareLink();

    document.getElementById('copySettingsLinkBtn')?.addEventListener('click', async () => {
        const shareLink = document.getElementById('settingsShareLink');
        if (!shareLink) return;
        await navigator.clipboard.writeText(shareLink.value);
    });
    
    // Apply settings
    applyBtn?.addEventListener('click', () => {
        const loopDelayVal = form ? form.querySelector('select[name="loopDelay"]')?.value : '3';
        const autoRotationVal = form ? form.querySelector('input[name="autoRotation"]:checked')?.value : 'true';
        const desktopLayoutVal = form ? form.querySelector('input[name="desktopLayout"]:checked')?.value : 'slider';

        const newSettings = {
            loopDelay: parseInt(loopDelayVal, 10) || 3,
            autoRotation: autoRotationVal === 'true',
            desktopLayout: desktopLayoutVal === 'panels' ? 'panels' : 'slider'
        };
        localStorage.setItem('simezaSettings', JSON.stringify(newSettings));
        location.href = getGalleryUrl(newSettings);
    });

    // Cancel
    cancelBtn?.addEventListener('click', () => {
        location.href = getGalleryUrl(settings);
    });
});
