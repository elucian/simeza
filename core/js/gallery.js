// Gallery functionality
document.addEventListener('DOMContentLoaded', () => {
  const wrappers = document.querySelectorAll('.panel-wrapper[data-widget="gallery"]');
  
  wrappers.forEach(wrapper => {
    const container = wrapper.parentElement;
    const prevBtn = container.querySelector('.gallery-nav-prev');
    const nextBtn = container.querySelector('.gallery-nav-next');
    
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

