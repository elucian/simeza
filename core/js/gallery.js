// Gallery functionality
document.addEventListener('DOMContentLoaded', () => {
  const wrappers = document.querySelectorAll('.panel-wrapper[data-widget="gallery"]');
  const modal = document.getElementById('galleryModal');
  const modalImg = document.getElementById('modalImg');
  const modalPicName = document.getElementById('modalPicName');
  const modalAuthor = document.getElementById('modalAuthor');
  const modalYear = document.getElementById('modalYear');
  const modalStatus = document.getElementById('modalStatus');
  const modalDesc = document.getElementById('modalDesc');
  const closeModal = () => modal.classList.remove('active');

  // Close modal events
  document.querySelector('.gallery-modal-close-x')?.addEventListener('click', closeModal);
  document.querySelector('.gallery-modal-btn-close')?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  wrappers.forEach(wrapper => {
    const container = wrapper.parentElement;
    const prevBtn = container.querySelector('.gallery-nav-prev');
    const nextBtn = container.querySelector('.gallery-nav-next');
    
  // Open modal helper
  const openModal = (panel) => {
    modalImg.src = panel.dataset.image;
    modalPicName.value = panel.dataset.title;
    modalAuthor.value = panel.dataset.author;
    modalYear.value = panel.dataset.year;
    modalStatus.value = panel.dataset.status;
    modalDesc.value = panel.dataset.desc;
    modal.classList.add('active');
  };

  wrappers.forEach(wrapper => {
    const container = wrapper.parentElement;
    const prevBtn = container.querySelector('.gallery-nav-prev');
    const nextBtn = container.querySelector('.gallery-nav-next');
    
    // Panel interaction
    wrapper.querySelectorAll('.panel').forEach(panel => {
      // Click for Desktop
      panel.addEventListener('click', () => {
        const isLandscapeMobile = (window.innerWidth <= 1024 && window.innerWidth > window.innerHeight);
        const isPortraitMobile = (window.innerWidth <= 767);
        // On mobile, rely on double tap for dialog
        if (isLandscapeMobile || isPortraitMobile) return; 
        
        openModal(panel);
      });

      // Double tap/click for Mobile/Landscape
      let lastTap = 0;
      const handleDoubleTap = (e) => {
        const isLandscapeMobile = (window.innerWidth <= 1024 && window.innerWidth > window.innerHeight);
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        
        // Only on mobile or landscape
        if (isLandscapeMobile || window.innerWidth <= 767) {
          if (e.type === 'dblclick' || (tapLength < 300 && tapLength > 0)) {
            openModal(panel);
            e.preventDefault();
          }
        }
        lastTap = currentTime;
      };

      panel.addEventListener('dblclick', handleDoubleTap);
      panel.addEventListener('touchend', handleDoubleTap);
    });

    // Smooth scroll functions
    const scroll = (direction, isMany = false) => {
      const scrollAmount = isMany ? wrapper.clientWidth * 0.8 : wrapper.querySelector('.panel').offsetWidth + 16;
      wrapper.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    };
    
    // Event listeners
    prevBtn.addEventListener('click', () => scroll(-1, true));
    nextBtn.addEventListener('click', () => scroll(1, true));
    
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
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        e.preventDefault();
        const isMany = e.ctrlKey || e.metaKey;
        const direction = e.deltaY > 0 ? 1 : -1;
        scroll(direction, isMany);
      }
    });
    
    // Update button states
    const updateButtons = () => {
      prevBtn.disabled = wrapper.scrollLeft <= 0;
      nextBtn.disabled = wrapper.scrollLeft >= (wrapper.scrollWidth - wrapper.clientWidth - 5);
    };
    
    wrapper.addEventListener('scroll', updateButtons);
    window.addEventListener('resize', updateButtons);
    updateButtons();
  });
});

