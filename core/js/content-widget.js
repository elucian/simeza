// Content Widget functionality
document.addEventListener('DOMContentLoaded', () => {
    const panels = document.querySelectorAll('.content-panel');
    const rightPanel = document.querySelector('.right-panel');
    const splitter = document.querySelector('.content-splitter');
    const leftPanel = document.querySelector('.left-panel');
    const galleryWrapper = document.querySelector('.content-gallery-wrapper');
    const previewImgContainer = document.getElementById('preview-image-container');
    const previewTitle = document.getElementById('preview-title');
    const previewDesc = document.getElementById('preview-desc');
    const layoutToggleBtn = document.getElementById('layoutToggleBtn');
    
    // Modal elements
    const contentModal = document.getElementById('contentModal');
    const modalImg = document.getElementById('modalContentImg');
    const modalName = document.getElementById('modalContentName');
    const modalDesc = document.getElementById('modalContentDesc');
    const closeBtn = document.getElementById('contentModalCloseBtn');

    if (!galleryWrapper || !splitter || !rightPanel || !leftPanel) return;

    // Filter Buttons
    const filterBtns = document.querySelectorAll('.bottom-bar-btn');
    
    // Constants
    const RIGHT_MIN = 300;
    const LEFT_MIN = 165; 
    const STORAGE_KEY = 'contentRightWidth';
    const VISIBLE_KEY = 'contentPanelVisible';

    // Toggle Layout
    const togglePanelVisibility = (visible) => {
        if (visible) {
            rightPanel.style.display = 'flex';
            splitter.style.display = 'block';
            layoutToggleBtn.classList.add('active');
        } else {
            rightPanel.style.display = 'none';
            splitter.style.display = 'none';
            layoutToggleBtn.classList.remove('active');
        }
        localStorage.setItem(VISIBLE_KEY, visible);
    };

    layoutToggleBtn?.addEventListener('click', () => {
        const isVisible = rightPanel.style.display !== 'none';
        togglePanelVisibility(!isVisible);
    });

    // Load initial state
    const isVisible = localStorage.getItem(VISIBLE_KEY) !== 'false';
    togglePanelVisibility(isVisible);

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

    // Update preview
    const updatePreview = (panel) => {
        if (!panel) return;
        const image = panel.dataset.image;
        const title = panel.dataset.title;
        const desc = panel.dataset.desc;
        previewImgContainer.innerHTML = image ? `<img src="${image}" alt="${title}">` : '';
        previewTitle.textContent = title;
        previewDesc.textContent = desc;
    };

    // Modal logic
    const openContentModal = (panel) => {
        modalImg.src = panel.dataset.image;
        modalName.value = panel.dataset.title;
        modalDesc.value = panel.dataset.desc;
        contentModal.classList.add('active');
    };

    const closeContentModal = () => {
        contentModal.classList.remove('active');
    };

    closeBtn?.addEventListener('click', closeContentModal);
    contentModal?.addEventListener('click', (e) => {
        if (e.target === contentModal) closeContentModal();
    });

    // Interaction handlers
    panels.forEach(panel => {
        panel.addEventListener('click', () => updatePreview(panel));
        panel.addEventListener('dblclick', () => openContentModal(panel));
    });

    // Preview panel dblclick
    document.querySelector('.preview-panel')?.addEventListener('dblclick', () => {
        // Find current panel or just use preview data
        const title = previewTitle.textContent;
        const desc = previewDesc.textContent;
        const img = previewImgContainer.querySelector('img')?.src;
        
        modalImg.src = img || '';
        modalName.value = title;
        modalDesc.value = desc;
        contentModal.classList.add('active');
    });

    // Filtering logic
    filterBtns.forEach(btn => {
        if(btn.id === 'layoutToggleBtn') return;
        btn.addEventListener('click', () => {
            const wasActive = btn.classList.contains('active');
            filterBtns.forEach(b => {
                if(b.id !== 'layoutToggleBtn') b.classList.remove('active');
            });
            
            let filter = 'all';
            if (!wasActive) {
                btn.classList.add('active');
                filter = btn.dataset.filter;
            }

            let firstVisible = null;
            panels.forEach(panel => {
                const isMatch = filter === 'all' || panel.dataset.type === filter;
                panel.style.display = isMatch ? 'flex' : 'none';
                if (isMatch && !firstVisible) firstVisible = panel;
            });

            if (firstVisible) {
                updatePreview(firstVisible);
            } else {
                // Clear preview if nothing matches
                previewImgContainer.innerHTML = '';
                previewTitle.textContent = '';
                previewDesc.textContent = '';
            }
        });
    });

    // Initial item selection
    if (panels.length > 0) updatePreview(panels[0]);

    // Draggable Splitter
    let isDragging = false;
    splitter.addEventListener('mousedown', (e) => {
        isDragging = true;
        document.body.style.cursor = 'col-resize';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const wrapperRect = galleryWrapper.getBoundingClientRect();
        const newRightWidth = wrapperRect.right - e.clientX;
        applyRightWidth(newRightWidth);
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        document.body.style.cursor = 'default';
    });
});
