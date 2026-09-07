// Gallery functionality

// Persistence & Settings
const getGallerySettings = () => {
    try {
        const saved = localStorage.getItem('simezaSettings');
        if (saved) {
            const parsed = JSON.parse(saved);
            return {
                loopDelay: parseInt(parsed.loopDelay, 10) || 3,
                autoRotation: parsed.autoRotation === true || parsed.autoRotation === 'true',
              desktopLayout: parsed.desktopLayout === 'panels' ? 'panels' : 'slider',
              musicEnabled: parsed.musicEnabled === true || parsed.musicEnabled === 'true'
            };
        }
    } catch (e) {}
        return { loopDelay: 3, autoRotation: true, desktopLayout: 'slider', musicEnabled: false };
};

const applySettings = () => {
  const settings = getGallerySettings();
        if (window.innerWidth >= 768) {
          document.body.classList.toggle('layout-maximized', settings.desktopLayout === 'panels');
    }
};

const getSavedFilters = () => {
  try {
    return JSON.parse(localStorage.getItem('simezaFilters')) || {};
  } catch (e) {
    return {};
  }
};

const getFilterPagePath = () => {
  const lang = localStorage.getItem('lang') || 'en';
  const slugs = {
    en: 'filter.html', ro: 'filter.html', de: 'filter.html', es: 'filter.html',
    fr: 'filter.html', ru: 'filter.html', pt: 'filter.html', hu: 'filter.html', it: 'filter.html'
  };
  return '/' + lang + '/' + (slugs[lang] || 'filter.html');
};

const updateEmptyState = (filters, matchCount) => {
  const emptyState = document.getElementById('galleryEmptyState');
  const criteria = document.getElementById('galleryEmptyCriteria');
  if (!emptyState || !criteria) return;

  emptyState.hidden = matchCount !== 0;
  if (matchCount !== 0) return;

  const entries = [
    ['Type', filters.type],
    ['Author', filters.author],
    ['Category', filters.category],
    ['Topic', filters.topic]
  ].filter(([, value]) => value);
  criteria.innerHTML = entries.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('') || '<div><dd>All collection items</dd></div>';
};

const saveFilters = () => {
    const activeBtn = document.querySelector('.sticky-bottom-bar .bottom-bar-btn.active');
  const savedFilters = getSavedFilters();
    const filters = {
    type: activeBtn ? activeBtn.dataset.filter : savedFilters.type,
    author: document.querySelector('select[name=\'filter-authors\']')?.value || savedFilters.author || '',
    category: document.querySelector('select[name=\'filter-categories\']')?.value || savedFilters.category || '',
    topic: document.querySelector('select[name=\'filter-topics\']')?.value || savedFilters.topic || ''
    };
    localStorage.setItem('simezaFilters', JSON.stringify(filters));
};

const loadFilters = () => {
  const filters = getSavedFilters();
    
    // Set type (button) - restore saved or default to painting
    const buttons = document.querySelectorAll('.sticky-bottom-bar .bottom-bar-btn');
    if (filters.type) {
        buttons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filters.type);
        });
    } else {
        const defaultBtn = document.querySelector('.sticky-bottom-bar .bottom-bar-btn[data-filter="painting"]') || buttons[0];
        if (defaultBtn) defaultBtn.classList.add('active');
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

    const savedFilters = getSavedFilters();
    const activeBtn = document.querySelector('.sticky-bottom-bar .bottom-bar-btn.active');
    let type = activeBtn ? activeBtn.dataset.filter : savedFilters.type || null;
    const authorSelect = document.querySelector('select[name=\'filter-authors\']');
    const categorySelect = document.querySelector('select[name=\'filter-categories\']');
    const topicSelect = document.querySelector('select[name=\'filter-topics\']');

    const authors = authorSelect && authorSelect.value ? [authorSelect.value] : (savedFilters.author ? [savedFilters.author] : []);
    const categories = categorySelect && categorySelect.value ? [categorySelect.value] : (savedFilters.category ? [savedFilters.category] : []);
    const topics = topicSelect && topicSelect.value ? [topicSelect.value] : (savedFilters.topic ? [savedFilters.topic] : []);

    saveFilters();

    // Since radio buttons now always have a selection, filterIcon reflects author/category/topic filters only if 'type' is not just the default (though this is tricky since we don't know the default easily here)
    // For simplicity, let's just show it if there are any non-type filters active.
    const hasActiveFilters = authors.length > 0 || categories.length > 0 || topics.length > 0;
    const filterIcon = document.getElementById('filterIcon');
    if (filterIcon) {
        filterIcon.className = hasActiveFilters ? 'bi bi-funnel-fill' : 'bi bi-funnel';
    }

    let matchCount = 0;
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

            const isMatch = matchType && matchAuthor && matchCategory && matchTopic;
            panel.style.display = isMatch ? '' : 'none';
            if (isMatch) matchCount += 1;
        });
    });

        updateEmptyState({
          type,
          author: authors[0],
          category: categories[0],
          topic: topics[0]
        }, matchCount);

    if (shouldCloseModal && filterModal) filterModal.classList.remove('active');
};

window.resetFilters = function() {
    const filterModal = document.getElementById('filterModal');
    // Unselect all pill buttons
    document.querySelectorAll('.sticky-bottom-bar .bottom-bar-btn').forEach(b => b.classList.remove('active'));
    
    document.querySelectorAll('#filterModal select').forEach(sel => sel.value = '');
    localStorage.removeItem('simezaFilters');
    if (filterModal) filterModal.classList.remove('active');
    window.applyFilters();
};

function onDOMReady(fn) {
    if (document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

onDOMReady(() => {
  const wrappers = document.querySelectorAll('.panel-wrapper[data-widget=\'gallery\']');
  const sliderImage = document.getElementById('sliderImage');
  const sliderName = document.getElementById('sliderName');
  const sliderAuthor = document.getElementById('sliderAuthor');
  const sliderYear = document.getElementById('sliderYear');
  const sliderStatus = document.getElementById('sliderStatus');
  const sliderDescription = document.getElementById('sliderDescription');
  const sliderLoopButton = document.getElementById('sliderLoopBtn');
  const sliderDownloadButton = document.getElementById('sliderDownloadBtn');
  const modalDownloadButton = document.getElementById('galleryModalDownloadBtn');


  const updateDownloadButtonState = (btn, status, imageSrc) => {
    if (!btn) return;
    
    // Reset state
    btn.classList.remove('is-protected', 'is-archived', 'is-available');
    btn.removeAttribute('download');
    btn.href = '#';
    btn.style.cursor = '';
    btn.onclick = null;

    const normalizedStatus = (status || '').toLowerCase();

    if (normalizedStatus === 'available') {
        btn.classList.add('is-available');
        btn.href = imageSrc || '#';
        btn.download = (imageSrc || '').split('/').pop() || 'artwork';
    } else if (normalizedStatus === 'protected') {
        btn.classList.add('is-protected');
        btn.onclick = (e) => { e.preventDefault(); return false; };
    } else if (normalizedStatus === 'archived') {
        btn.classList.add('is-archived');
        btn.onclick = (e) => { e.preventDefault(); return false; };
    } else {
        // Default to available-like behavior for unknown statuses
        btn.classList.add('is-available');
        btn.href = imageSrc || '#';
        btn.download = (imageSrc || '').split('/').pop() || 'artwork';
    }
  };

  const modal = document.getElementById('galleryModal');
  const modalImg = document.getElementById('modalImg');
  const modalPicName = document.getElementById('modalPicName');
  const modalAuthor = document.getElementById('modalAuthor');
  const modalYear = document.getElementById('modalYear');
  const modalStatus = document.getElementById('modalStatus');
  const modalCategory = document.getElementById('modalCategory');
  const modalTopic = document.getElementById('modalTopic');
  // Apply settings
  applySettings();

  document.getElementById('rebuildFiltersBtn')?.addEventListener('click', () => {
    location.href = getFilterPagePath();
  });

  const modalDesc = document.getElementById('modalDesc');
  const loopBtn = document.getElementById('galleryModalLoopBtn');
  const closeBtn = document.getElementById('galleryModalCloseBtn');

  // Load and apply initial filters
  loadFilters();
  // Apply route filters
  window.applyRouteFilters();

  window.applyFilters();
  
  // Modal handling
  let modalFilteredPanels = [];
  let currentModalIndex = 0;
  let modalLoopTimeout = null;
  let isModalLooping = false;
  let sliderLoopTimeout = null;
  let isSliderLooping = false;
  let selectedSliderPanel = null;
  const sliderMusicTracks = [
    '/content/music/3m-Oriental-JapaneseFolk-120bpm-GMajor.mp3',
    '/content/music/3m-Jazz-CoolJazz-120bpm-CMajor.mp3',
    '/content/music/3m-Blues-ChicagoBlues-120bpm-FMajor.mp3',
    '/content/music/13m-Ambient-NatureSoundscape-120bpm-GMajor.mp3',
    '/content/music/3m-Western-Bluegrass-120bpm-EMajor%20(1).mp3',
    '/content/music/3m-Spanish-Guitar-120bpm-CMajor.mp3',
    '/content/music/3m-Western-Bluegrass-120bpm-EMajor.mp3'
  ];
  const sliderAudio = new Audio();
  let currentSliderTrack = -1;
  let sliderMusicTimeout = null;

  const playNextSliderTrack = () => {
    if (!isSliderLooping || !sliderMusicTracks.length) return;
    let nextTrack = Math.floor(Math.random() * sliderMusicTracks.length);
    if (sliderMusicTracks.length > 1) {
      while (nextTrack === currentSliderTrack) nextTrack = Math.floor(Math.random() * sliderMusicTracks.length);
    }
    currentSliderTrack = nextTrack;
    sliderAudio.src = sliderMusicTracks[currentSliderTrack];
    sliderAudio.play().catch(() => {});
  };

  sliderAudio.addEventListener('ended', () => {
    clearTimeout(sliderMusicTimeout);
    sliderMusicTimeout = setTimeout(playNextSliderTrack, 3000);
  });

  const fitSliderImage = () => {
    if (!sliderImage?.naturalWidth) return;
    const frame = sliderImage.parentElement.getBoundingClientRect();
    const availableWidth = Math.max(1, frame.width - 32);
    const availableHeight = Math.max(1, frame.height - 32);
    const sourceWidth = sliderImage.naturalWidth;
    const sourceHeight = sliderImage.naturalHeight;
    const scale = Math.min(availableWidth / sourceWidth, availableHeight / sourceHeight);
    sliderImage.style.width = `${Math.floor(sourceWidth * scale)}px`;
    sliderImage.style.height = `${Math.floor(sourceHeight * scale)}px`;
  };

  sliderImage?.addEventListener('load', fitSliderImage);
  window.addEventListener('resize', fitSliderImage);

  const selectSliderPanel = (panel) => {
    if (!panel || !sliderImage) return;
    selectedSliderPanel = panel;
    sliderImage.src = panel.dataset.image;
    sliderImage.alt = panel.dataset.title || '';
    sliderName.textContent = panel.dataset.title || '';
    sliderAuthor.textContent = panel.dataset.author || '';
    sliderYear.textContent = panel.dataset.year || '';
    sliderStatus.textContent = panel.dataset.status || '';
    sliderDescription.textContent = panel.dataset.desc || '';
    updateDownloadButtonState(sliderDownloadButton, panel.dataset.status, panel.dataset.image);
    wrappers.forEach(wrapper => wrapper.querySelectorAll('.panel').forEach(item => item.classList.toggle('is-selected', item === panel)));
  };

  const revealSelectedSliderPanel = (panel) => {
    const wrapper = panel?.closest('.panel-wrapper');
    if (!wrapper || document.body.classList.contains('layout-maximized')) return;
    const stripBounds = wrapper.getBoundingClientRect();
    const panelBounds = panel.getBoundingClientRect();
    if (panelBounds.right > stripBounds.right - 2) {
      wrapper.scrollTo({ left: panel.offsetLeft - 12, behavior: 'smooth' });
    } else if (panelBounds.left < stripBounds.left + 2) {
      wrapper.scrollTo({ left: panel.offsetLeft + panel.offsetWidth - wrapper.clientWidth + 12, behavior: 'smooth' });
    }
  };

  const stopSliderLoop = () => {
    clearTimeout(sliderLoopTimeout);
    clearTimeout(sliderMusicTimeout);
    isSliderLooping = false;
    sliderAudio.pause();
    sliderAudio.currentTime = 0;
    if (sliderLoopButton) {
      sliderLoopButton.classList.remove('is-looping');
      sliderLoopButton.querySelector('i').className = 'bi bi-arrow-repeat';
      sliderLoopButton.querySelector('span').textContent = sliderLoopButton.dataset.loopText;
    }
  };

  const startSliderLoop = () => {
    const visiblePanels = Array.from(document.querySelectorAll('.panel')).filter(panel => getComputedStyle(panel).display !== 'none');
    if (!visiblePanels.length) return stopSliderLoop();
    isSliderLooping = true;
    if (getGallerySettings().musicEnabled) playNextSliderTrack();
    if (sliderLoopButton) {
      sliderLoopButton.classList.add('is-looping');
      sliderLoopButton.querySelector('i').className = 'bi bi-stop-fill';
      sliderLoopButton.querySelector('span').textContent = sliderLoopButton.dataset.stopText;
    }
    const advance = () => {
      if (!isSliderLooping) return;
      const currentIndex = Math.max(0, visiblePanels.indexOf(selectedSliderPanel));
      const nextPanel = visiblePanels[(currentIndex + 1) % visiblePanels.length];
      selectSliderPanel(nextPanel);
      revealSelectedSliderPanel(nextPanel);
      sliderLoopTimeout = setTimeout(advance, (parseInt(getGallerySettings().loopDelay, 10) || 3) * 1000);
    };
    sliderLoopTimeout = setTimeout(advance, (parseInt(getGallerySettings().loopDelay, 10) || 3) * 1000);
  };

  sliderLoopButton?.addEventListener('click', () => {
    isSliderLooping ? stopSliderLoop() : startSliderLoop();
  });

  const populateModal = (panel) => {
    modalImg.src = panel.dataset.image;
    modalPicName.value = panel.dataset.title;
    modalAuthor.value = panel.dataset.author;
    modalYear.value = panel.dataset.year;
    modalStatus.value = panel.dataset.status;
    if (modalCategory) modalCategory.value = panel.dataset.category;
    if (modalTopic) modalTopic.value = panel.dataset.topic;
    modalDesc.value = panel.dataset.desc;
    
    updateDownloadButtonState(modalDownloadButton, panel.dataset.status, panel.dataset.image);

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
    if (loopBtn) loopBtn.classList.remove('is-looping');
    if (loopBtn) loopBtn.querySelector('span').textContent = loopBtn.dataset.loopText;
    if (loopBtn) loopBtn.querySelector('i').className = 'bi bi-arrow-repeat';
  };

  const startModalLoop = () => {
    isModalLooping = true;
    if (loopBtn) loopBtn.classList.add('is-looping');
    if (loopBtn) loopBtn.querySelector('span').textContent = loopBtn.dataset.stopText;
    if (loopBtn) loopBtn.querySelector('i').className = 'bi bi-stop-fill';
    
    const cycle = () => {
      if (!isModalLooping) return;
      currentModalIndex = (currentModalIndex + 1) % modalFilteredPanels.length;
      populateModal(modalFilteredPanels[currentModalIndex]);
      const currentDelay = (parseInt(getGallerySettings().loopDelay, 10) || 3) * 1000;
      modalLoopTimeout = setTimeout(cycle, currentDelay);
    };
    const initialDelay = (parseInt(getGallerySettings().loopDelay, 10) || 3) * 1000;
    modalLoopTimeout = setTimeout(cycle, initialDelay);
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
    stopModalLoop();
    modalFilteredPanels = Array.from(document.querySelectorAll('.panel-wrapper[data-widget="gallery"] .panel'))
                               .filter(p => p.offsetParent !== null && window.getComputedStyle(p).display !== 'none');
    currentModalIndex = modalFilteredPanels.indexOf(panel);
    populateModal(panel);
    
    modal.classList.add('active');
  };

  selectSliderPanel(Array.from(document.querySelectorAll('.panel')).find(panel => getComputedStyle(panel).display !== 'none'));

  // Panel click listeners
  wrappers.forEach(wrapper => {
    wrapper.querySelectorAll('.panel').forEach(panel => {
      // Inject overlay for protection
      const panelImg = panel.querySelector('.panel-image');
      if (panelImg) {
          const overlay = document.createElement("div");
          overlay.className = "img-overlay";
          panelImg.appendChild(overlay);
      }

      // Info modal on click (only on desktop)
      panel.addEventListener("click", (e) => {
          if (window.innerWidth > 767) {
            if (document.body.classList.contains('layout-maximized')) {
              openModal(panel);
            } else {
              selectSliderPanel(panel);
            }
          }
      });
      panel.addEventListener("dblclick", (e) => {
          if (window.innerWidth > 767) {
              e.preventDefault();
              e.stopPropagation();
                if (document.body.classList.contains('layout-maximized')) {
                  openModal(panel);
                } else {
                  selectSliderPanel(panel);
                }
          }
      });
    });
    
    // Smooth scroll functions
    const container = wrapper.parentElement;
    const prevBtn = container.querySelector('.gallery-nav-prev');
    const nextBtn = container.querySelector('.gallery-nav-next');

    const isSliderMode = () => window.innerWidth > 767 && !document.body.classList.contains('layout-maximized');
    const getVisiblePanels = () => Array.from(wrapper.querySelectorAll('.panel')).filter(panel => getComputedStyle(panel).display !== 'none');
    const selectPanelAtScrollPosition = (scrollLeft) => {
      const visiblePanels = getVisiblePanels();
      const nextPanel = visiblePanels.find(panel => panel.offsetLeft + panel.offsetWidth > scrollLeft + 2) || visiblePanels.at(-1);
      if (nextPanel) selectSliderPanel(nextPanel);
    };

    const moveSliderSelection = (direction) => {
      const visiblePanels = getVisiblePanels();
      const currentIndex = Math.max(0, visiblePanels.indexOf(selectedSliderPanel));
      const nextPanel = visiblePanels[currentIndex + direction];
      if (!nextPanel) return;

      selectSliderPanel(nextPanel);
      const stripBounds = wrapper.getBoundingClientRect();
      const panelBounds = nextPanel.getBoundingClientRect();
      const isOutsideVisibleStrip = direction > 0
        ? panelBounds.right > stripBounds.right - 2
        : panelBounds.left < stripBounds.left + 2;

      if (isOutsideVisibleStrip) {
        wrapper.scrollBy({ left: direction * (nextPanel.offsetWidth + 10), behavior: 'smooth' });
      }
      setTimeout(updateButtons, 350);
    };
    
    const scroll = (direction, isMany = false) => {
      const panelWidth = (wrapper.querySelector('.panel')?.offsetWidth || 220) + 12;
      const scrollAmount = isMany ? Math.max(wrapper.clientWidth * 0.75, panelWidth * 2) : panelWidth;
      const targetScrollLeft = Math.max(0, Math.min(wrapper.scrollLeft + direction * scrollAmount, wrapper.scrollWidth - wrapper.clientWidth));
      wrapper.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
      if (isSliderMode()) {
        if (isMany) {
          selectPanelAtScrollPosition(targetScrollLeft);
        } else {
          const visiblePanels = getVisiblePanels();
          const currentIndex = Math.max(0, visiblePanels.indexOf(selectedSliderPanel));
          selectSliderPanel(visiblePanels[Math.max(0, Math.min(visiblePanels.length - 1, currentIndex + direction))]);
        }
      }
      setTimeout(updateButtons, 350);
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
        if (isSliderMode() && !isCtrl) {
          moveSliderSelection(-1);
        } else {
          scroll(-1, isCtrl);
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (isSliderMode() && !isCtrl) {
          moveSliderSelection(1);
        } else {
          scroll(1, isCtrl);
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        wrapper.scrollTo({ left: 0, behavior: 'smooth' });
        if (isSliderMode()) selectSliderPanel(getVisiblePanels()[0]);
      } else if (e.key === 'End') {
        e.preventDefault();
        wrapper.scrollTo({ left: wrapper.scrollWidth, behavior: 'smooth' });
        if (isSliderMode()) selectSliderPanel(getVisiblePanels().at(-1));
      }
    });
    
    // Mouse wheel horizontal scroll
    wrapper.addEventListener('wheel', (e) => {
      // Only allow horizontal wheel scroll on desktop; mobile portrait should rely on standard touch scrolling
      if (window.innerWidth <= 767 || document.body.classList.contains('layout-maximized')) return;

      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        e.preventDefault();
        const isMany = e.ctrlKey || e.metaKey;
        const direction = e.deltaY > 0 ? 1 : -1;
        scroll(direction, isMany);
      }
    });
    
    // Update button states
    const updateButtons = () => {
      if (prevBtn) {
        const atStart = wrapper.scrollLeft <= 2;
        prevBtn.disabled = atStart;
        prevBtn.style.opacity = atStart ? "0.3" : "1";
      }
      if (nextBtn) {
        const canScroll = wrapper.scrollWidth > wrapper.clientWidth + 10;
        const atEnd = wrapper.scrollLeft >= (wrapper.scrollWidth - wrapper.clientWidth - 10);
        nextBtn.disabled = canScroll && atEnd;
        nextBtn.style.opacity = (canScroll && atEnd) ? "0.3" : "1";
      }
    };

    wrapper.addEventListener("scroll", updateButtons);
    window.addEventListener("resize", updateButtons);
    window.addEventListener("load", updateButtons);
    wrapper.querySelectorAll("img").forEach(img => {
      if (!img.complete) {
        img.addEventListener("load", updateButtons, { once: true });
      }
    });
    updateButtons();
  });

});



