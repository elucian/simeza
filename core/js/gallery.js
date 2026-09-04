// Gallery functionality

// Persistence
const saveFilters = () => {
    const filters = {
        types: Array.from(document.querySelectorAll('input[name=\'filter-types\']:checked')).map(el => el.value),
        author: document.querySelector('select[name=\'filter-authors\']')?.value,
        category: document.querySelector('select[name=\'filter-categories\']')?.value,
        topic: document.querySelector('select[name=\'filter-topics\']')?.value
    };
    localStorage.setItem('simezaFilters', JSON.stringify(filters));
};

const loadFilters = () => {
    const saved = localStorage.getItem('simezaFilters');
    const filters = JSON.parse(saved);
    
    // Set types (default all checked if empty)
    const typeInputs = document.querySelectorAll('input[name=\'filter-types\']');
    if (filters.types && filters.types.length > 0) {
        typeInputs.forEach(cb => cb.checked = filters.types.includes(cb.value));
    } else {
        typeInputs.forEach(cb => cb.checked = true);
    }
    
    // Set selects
    const authorSelect = document.querySelector('select[name=\'filter-authors\']');
    const categorySelect = document.querySelector('select[name=\'filter-categories\']');
    const topicSelect = document.querySelector('select[name=\'filter-topics\']');
    
    if (authorSelect && filters.author) authorSelect.value = filters.author;
    if (categorySelect && filters.category) categorySelect.value = filters.category;
    if (topicSelect && filters.topic) topicSelect.value = filters.topic;
};

// Global Filter functions
window.applyFilters = function(shouldCloseModal = false) {
    const wrappers = document.querySelectorAll('.panel-wrapper[data-widget=\'gallery\']');
    const filterModal = document.getElementById('filterModal');
    const types = Array.from(document.querySelectorAll('input[name=\'filter-types\']:checked')).map(el => el.value);
    const authorSelect = document.querySelector('select[name=\'filter-authors\']');
    const categorySelect = document.querySelector('select[name=\'filter-categories\']');
    const topicSelect = document.querySelector('select[name=\'filter-topics\']');

    const authors = authorSelect && authorSelect.value ? [authorSelect.value] : [];
    const categories = categorySelect && categorySelect.value ? [categorySelect.value] : [];
    const topics = topicSelect && topicSelect.value ? [topicSelect.value] : [];

    saveFilters();

    const hasActiveFilters = types.length > 0 || authors.length > 0 || categories.length > 0 || topics.length > 0;
    const filterIcon = document.getElementById('filterIcon');
    if (filterIcon) {
        filterIcon.className = hasActiveFilters ? 'bi bi-funnel-fill' : 'bi bi-funnel';
    }

    wrappers.forEach(wrapper => {
        wrapper.querySelectorAll('.panel').forEach(panel => {
            const pType = panel.dataset.type;
            const pAuthor = panel.dataset.author;
            const pCategory = panel.dataset.category;
            const pTopic = panel.dataset.topic;

            let matchType = types.length === 0 || types.includes(pType);
            let matchAuthor = authors.length === 0 || authors.includes(pAuthor);
            let matchCategory = categories.length === 0 || categories.includes(pCategory);
            let matchTopic = topics.length === 0 || topics.includes(pTopic);

            panel.style.display = (matchType && matchAuthor && matchCategory && matchTopic) ? '' : 'none';
        });
    });

    if (shouldCloseModal && filterModal) filterModal.classList.remove('active');
};

window.resetFilters = function() {
    const filterModal = document.getElementById('filterModal');
    document.querySelectorAll('input[name=\'filter-types\']').forEach(cb => cb.checked = true);
    document.querySelectorAll('#filterModal select').forEach(sel => sel.value = '');
    saveFilters();
    if (filterModal) filterModal.classList.remove('active');
    window.applyFilters();
};

document.addEventListener('DOMContentLoaded', () => {
  const wrappers = document.querySelectorAll('.panel-wrapper[data-widget=\'gallery\']');
  const modal = document.getElementById('galleryModal');
  const modalImg = document.getElementById('modalImg');
  const modalPicName = document.getElementById('modalPicName');
  const modalAuthor = document.getElementById('modalAuthor');
  const modalYear = document.getElementById('modalYear');
  const modalStatus = document.getElementById('modalStatus');
  const modalCategory = document.getElementById('modalCategory');
  const modalTopic = document.getElementById('modalTopic');
  const modalDesc = document.getElementById('modalDesc');

  // Load and apply initial filters
  loadFilters();
  window.applyFilters();
  
  // Modal handling
  const closeModal = () => modal?.classList.remove('active');
  const openModal = (panel) => {
    modalImg.src = panel.dataset.image;
    modalPicName.value = panel.dataset.title;
    modalAuthor.value = panel.dataset.author;
    modalYear.value = panel.dataset.year;
    modalStatus.value = panel.dataset.status;
    modalCategory.value = panel.dataset.category;
    modalTopic.value = panel.dataset.topic;
    modalDesc.value = panel.dataset.desc;
    
    // Set orientation classes
    const img = new Image();
    img.onload = () => {
        const isLandscape = img.naturalWidth > img.naturalHeight;
        const modalDialog = modal.querySelector('.gallery-modal');
        if (modalDialog) {
            modalDialog.classList.remove('landscape-image', 'portrait-image');
            modalDialog.classList.add(isLandscape ? 'landscape-image' : 'portrait-image');
        }
    };
    img.src = panel.dataset.image;
    modal.classList.add('active');
  };

  // Close modal events
  modal?.querySelector('.gallery-modal-close-x')?.addEventListener('click', closeModal);
  modal?.querySelector('.gallery-modal-btn-close')?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  // Panel click listeners
  wrappers.forEach(wrapper => {
    wrapper.querySelectorAll('.panel').forEach(panel => {
      panel.addEventListener('click', () => openModal(panel));
      
      // Double tap/click handler for mobile
      let lastTap = 0;
      const handleDoubleTap = (e) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        
        if (e.type === 'dblclick' || (tapLength < 300 && tapLength > 0)) {
            openModal(panel);
            e.preventDefault();
        }
        lastTap = currentTime;
      };
      panel.addEventListener('dblclick', handleDoubleTap);
      panel.addEventListener('touchend', handleDoubleTap);
    });
    
    // Smooth scroll functions
    const container = wrapper.parentElement;
    const prevBtn = container.querySelector('.gallery-nav-prev');
    const nextBtn = container.querySelector('.gallery-nav-next');
    
    const scroll = (direction, isMany = false) => {
      const scrollAmount = isMany ? wrapper.clientWidth * 0.8 : (wrapper.querySelector('.panel')?.offsetWidth || 200) + 16;
      wrapper.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    };
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', () => scroll(-1, true));
    if (nextBtn) nextBtn.addEventListener('click', () => scroll(1, true));
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
      
      const isCtrl = e.ctrlKey || e.metaKey;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scroll(-1, isCtrl);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        scroll(1, isCtrl);
      } else if (e.key === 'Home') {
        e.preventDefault();
        wrapper.scrollTo({ left: 0, behavior: 'smooth' });
      } else if (e.key === 'End') {
        e.preventDefault();
        wrapper.scrollTo({ left: wrapper.scrollWidth, behavior: 'smooth' });
      }
    });
    
    // Mouse wheel horizontal scroll
    wrapper.addEventListener('wheel', (e) => {
      // Only allow horizontal wheel scroll on desktop; mobile portrait should rely on standard touch scrolling
      if (window.innerWidth <= 767) return;

      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        e.preventDefault();
        const isMany = e.ctrlKey || e.metaKey;
        const direction = e.deltaY > 0 ? 1 : -1;
        scroll(direction, isMany);
      }
    });
    
    // Update button states
    const updateButtons = () => {
      if (prevBtn) prevBtn.disabled = wrapper.scrollLeft <= 0;
      if (nextBtn) nextBtn.disabled = wrapper.scrollLeft >= (wrapper.scrollWidth - wrapper.clientWidth - 5);
    };
    
    wrapper.addEventListener('scroll', updateButtons);
    window.addEventListener('resize', updateButtons);
    updateButtons();
  });
});
