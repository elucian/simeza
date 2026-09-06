document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('filterForm');
    const applyButton = document.getElementById('applyFiltersBtn');
    const resetButton = document.getElementById('resetFiltersBtn');
    const closeButton = document.getElementById('closeFilterBtn');
    if (!form) return;

    const getSavedFilters = () => {
        try {
            return JSON.parse(localStorage.getItem('simezaFilters')) || {};
        } catch (e) {
            return {};
        }
    };

    const getGalleryPath = () => {
        const lang = localStorage.getItem('lang') || 'en';
        return '/' + lang + '/gallery.html';
    };

    closeButton?.addEventListener('click', () => {
        location.href = getGalleryPath();
    });

    const savedFilters = getSavedFilters();
    ['type', 'author', 'category', 'topic'].forEach(name => {
        const field = form.elements[name];
        if (field && savedFilters[name]) field.value = savedFilters[name];
    });

    applyButton?.addEventListener('click', () => {
        const filters = Object.fromEntries(new FormData(form).entries());
        localStorage.setItem('simezaFilters', JSON.stringify(filters));
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.set(key, value);
        });
        location.href = getGalleryPath() + (params.size ? '?' + params.toString() : '');
    });

    resetButton?.addEventListener('click', () => {
        form.reset();
        localStorage.removeItem('simezaFilters');
    });
});
