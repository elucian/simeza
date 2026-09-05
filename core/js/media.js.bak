// Content Gallery functionality
document.addEventListener('DOMContentLoaded', () => {
    const panels = document.querySelectorAll('.content-panel');
    const rightPanel = document.querySelector('.right-panel');
    const previewImgContainer = document.getElementById('preview-image-container');
    const previewTitle = document.getElementById('preview-title');
    const previewDesc = document.getElementById('preview-desc');
    const splitter = document.querySelector('.content-splitter');
    const leftPanel = document.querySelector('.left-panel');
    const galleryWrapper = document.querySelector('.content-gallery-wrapper');

    // Retrieve saved width
    const savedWidth = localStorage.getItem('contentSplitWidth');
    if (savedWidth) {
        leftPanel.style.flex = `0 0 ${savedWidth}px`;
    }

    // Update preview
    const updatePreview = (panel) => {
        const image = panel.dataset.image;
        const title = panel.dataset.title;
        const desc = panel.dataset.desc;

        previewImgContainer.innerHTML = image ? `<img src="${image}" alt="${title}">` : '';
        previewTitle.textContent = title;
        previewDesc.textContent = desc;
    };

    // Set default (first)
    if (panels.length > 0) {
        updatePreview(panels[0]);
    }

    panels.forEach(panel => {
        panel.addEventListener('click', () => {
            updatePreview(panel);
        });
    });

    // Draggable Splitter
    let isDragging = false;
    splitter.addEventListener('mousedown', (e) => {
        isDragging = true;
        document.body.style.cursor = 'col-resize';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const containerWidth = galleryWrapper.offsetWidth;
        const newLeftWidth = e.clientX - galleryWrapper.getBoundingClientRect().left;
        
        if (newLeftWidth > 100 && newLeftWidth < containerWidth - 100) {
            leftPanel.style.flex = `0 0 ${newLeftWidth}px`;
            rightPanel.style.flex = `1`;
            localStorage.setItem('contentSplitWidth', newLeftWidth);
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        document.body.style.cursor = 'default';
    });
});
