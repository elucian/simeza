// Content Widget functionality
document.addEventListener('DOMContentLoaded', () => {
    const rightPanel = document.querySelector('.right-panel');
    const splitter = document.querySelector('.content-splitter');
    const leftPanel = document.querySelector('.left-panel');
    const galleryWrapper = document.querySelector('.content-gallery-wrapper');

    if (!galleryWrapper || !splitter || !rightPanel || !leftPanel) return;

    // Constants
    const RIGHT_MIN = 300;
    const LEFT_MIN = 165; 
    const STORAGE_KEY = 'contentRightWidth';

    // Clamp right width to valid bounds
    const getValidRightWidth = (width) => {
        const containerWidth = galleryWrapper.offsetWidth;
        const maxRight = containerWidth - LEFT_MIN;
        return Math.max(RIGHT_MIN, Math.min(width, maxRight));
    };

    // Apply width
    const applyRightWidth = (width) => {
        const validWidth = getValidRightWidth(width);
        rightPanel.style.flex = `0 0 ${validWidth}px`;
        localStorage.setItem(STORAGE_KEY, validWidth);
    };

    // Load saved width or default
    const savedWidth = parseFloat(localStorage.getItem(STORAGE_KEY));
    applyRightWidth(isNaN(savedWidth) ? 360 : savedWidth);

    // Resize handler to keep right panel in view
    const resizeObserver = new ResizeObserver(() => {
        const currentWidth = parseFloat(rightPanel.style.flex.split(' ')[2]);
        applyRightWidth(isNaN(currentWidth) ? 360 : currentWidth);
    });
    resizeObserver.observe(galleryWrapper);

    // Preview interaction (same)
    const panels = document.querySelectorAll('.content-panel');
    const previewImgContainer = document.getElementById('preview-image-container');
    const previewTitle = document.getElementById('preview-title');
    const previewDesc = document.getElementById('preview-desc');

    const updatePreview = (panel) => {
        const image = panel.dataset.image;
        const title = panel.dataset.title;
        const desc = panel.dataset.desc;
        previewImgContainer.innerHTML = image ? `<img src="${image}" alt="${title}">` : '';
        previewTitle.textContent = title;
        previewDesc.textContent = desc;
    };

    if (panels.length > 0) updatePreview(panels[0]);
    panels.forEach(panel => {
        panel.addEventListener('click', () => updatePreview(panel));
    });

    // Draggable Splitter
    let isDragging = false;
    splitter.addEventListener('mousedown', (e) => {
        isDragging = true;
        document.body.style.cursor = 'col-resize';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        // Calculate distance from right edge
        const wrapperRect = galleryWrapper.getBoundingClientRect();
        const mouseX = e.clientX;
        const newRightWidth = wrapperRect.right - mouseX;
        
        applyRightWidth(newRightWidth);
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        document.body.style.cursor = 'default';
    });
});
