// Gallery functionality

// Persistence
const saveFilters = () => {
    const activeBtn = document.querySelector('.sticky-bottom-bar .bottom-bar-btn.active');
    const filters = {
        type: activeBtn ? activeBtn.dataset.filter : 'painting',
        author: document.querySelector('select[name=\'filter-authors\']')?.value,
        category: document.querySelector('select[name=\'filter-categories\']')?.value,
        topic: document.querySelector('select[name=\'filter-topics\']')?.value
    };
    localStorage.setItem('simezaFilters', JSON.stringify(filters));
};

const loadFilters = () => {
    const saved = localStorage.getItem('simezaFilters');
    const filters = saved ? JSON.parse(saved) : {};
    
    // Set type (button) - only if explicitly saved
    const buttons = document.querySelectorAll('.sticky-bottom-bar .bottom-bar-btn');
    if (filters.type) {
        buttons.forEach(btn => {
            if (btn.dataset.filter === filters.type) {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }
        });
    } else {
        buttons.forEach(b => b.classList.remove('active'));
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
    if (shouldCloseModal) {
        // Toolbar filter used: unselect all pills so secondary filter takes full control across all types
        document.querySelectorAll('.sticky-bottom-bar .bottom-bar-btn').forEach(b => b.classList.remove('active'));
    }

    const activeBtn = document.querySelector('.sticky-bottom-bar .bottom-bar-btn.active');
    let type = activeBtn ? activeBtn.dataset.filter : null;
    const authorSelect = document.querySelector('select[name=\'filter-authors\']');
    const categorySelect = document.querySelector('select[name=\'filter-categories\']');
    const topicSelect = document.querySelector('select[name=\'filter-topics\']');

    const authors = authorSelect && authorSelect.value ? [authorSelect.value] : [];
    const categories = categorySelect && categorySelect.value ? [categorySelect.value] : [];
    const topics = topicSelect && topicSelect.value ? [topicSelect.value] : [];

    saveFilters();

    // Since radio buttons now always have a selection, filterIcon reflects author/category/topic filters only if 'type' is not just the default (though this is tricky since we don't know the default easily here)
    // For simplicity, let's just show it if there are any non-type filters active.
    const hasActiveFilters = authors.length > 0 || categories.length > 0 || topics.length > 0;
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

            let matchType = !type || (pType === type);
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
    // Unselect all pill buttons
    document.querySelectorAll('.sticky-bottom-bar .bottom-bar-btn').forEach(b => b.classList.remove('active'));
    
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
  const loopBtn = document.getElementById('galleryModalLoopBtn');
  let modalFilteredPanels = [];
  let currentModalIndex = 0;
  let modalLoopTimeout = null;
  let isModalLooping = false;

  const populateModal = (panel) => {
    modalImg.src = panel.dataset.image;
    modalPicName.value = panel.dataset.title;
    modalAuthor.value = panel.dataset.author;
    modalYear.value = panel.dataset.year;
    modalStatus.value = panel.dataset.status;
    if (modalCategory) modalCategory.value = panel.dataset.category;
    if (modalTopic) modalTopic.value = panel.dataset.topic;
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
  };

  const stopModalLoop = () => {
    clearTimeout(modalLoopTimeout);
    isModalLooping = false;
    loopBtn.classList.remove('is-looping');
    loopBtn.querySelector('span').textContent = loopBtn.dataset.loopText;
    loopBtn.querySelector('i').className = 'bi bi-arrow-repeat';
  };

  const startModalLoop = () => {
    isModalLooping = true;
    loopBtn.classList.add('is-looping');
    loopBtn.querySelector('span').textContent = loopBtn.dataset.stopText;
    loopBtn.querySelector('i').className = 'bi bi-stop-fill';
    
    const cycle = () => {
      if (!isModalLooping) return;
      currentModalIndex = (currentModalIndex + 1) % modalFilteredPanels.length;
      populateModal(modalFilteredPanels[currentModalIndex]);
      modalLoopTimeout = setTimeout(cycle, 3000);
    };
    modalLoopTimeout = setTimeout(cycle, 3000);
  };

  loopBtn?.addEventListener('click', () => {
      isModalLooping ? stopModalLoop() : startModalLoop();
  });

  const closeModal = () => {
      stopModalLoop();
      modal?.classList.remove('active');
  };

  // Close modal events
  modal?.querySelector('.gallery-modal-close-x')?.addEventListener('click', closeModal);
  document.getElementById('galleryModalCloseBtn')?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal?.classList.contains('active')) closeModal(); });

  const openModal = (panel) => {
    modalFilteredPanels = Array.from(document.querySelectorAll('.panel-wrapper[data-widget="gallery"] .panel'))
                               .filter(p => p.offsetParent !== null && window.getComputedStyle(p).display !== 'none');
    currentModalIndex = modalFilteredPanels.indexOf(panel);
    populateModal(panel);
    
    // Initialize loop button text
    loopBtn.querySelector('span').textContent = loopBtn.dataset.loopText;
    
    modal.classList.add('active');
  };

  // Panel click listeners
  wrappers.forEach(wrapper => {
    wrapper.querySelectorAll('.panel').forEach(panel => {
      // Inject overlay for protection
      const panelImg = panel.querySelector('.panel-image');
      if (panelImg) {
          const overlay = document.createElement('div');
          overlay.className = 'img-overlay';
          panelImg.appendChild(overlay);
      }

      // Info modal on click (only on desktop)
      panel.addEventListener('click', (e) => {
          if (window.innerWidth > 767) {
              openModal(panel);
          }
      });
      
      // Double tap/click handler for mobile/desktop full-screen (handled by simeza.js now)
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
    // Add listener for bottom bar buttons to update gallery filters
    document.querySelectorAll('.sticky-bottom-bar .bottom-bar-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const wasActive = btn.classList.contains('active');
            
            // Toggle behavior
            document.querySelectorAll('.sticky-bottom-bar .bottom-bar-btn').forEach(b => b.classList.remove('active'));
            
            if (!wasActive) {
                btn.classList.add('active');
            }
            
            applyFilters();
            
            // Reset scroll position to beginning of filtered results
            document.querySelectorAll('.panel-wrapper[data-widget="gallery"]').forEach(wrapper => {
                wrapper.scrollTo({ left: 0, behavior: 'smooth' });
            });
        });
    });

});
