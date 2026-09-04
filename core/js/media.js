// Media functionality
document.addEventListener('DOMContentLoaded', () => {
    // Filter
    const filterBtns = document.querySelectorAll('.bottom-bar-btn');
    const panels = document.querySelectorAll('.media-panel');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter panels
            const filter = btn.dataset.filter;
            panels.forEach(panel => {
                // If button is 'all', show everything, otherwise match type
                if (filter === 'all' || panel.dataset.type === filter) {
                    panel.style.display = 'flex';
                } else {
                    panel.style.display = 'none';
                }
            });
        });
    });

    // Modal
    const modal = document.getElementById('mediaModalDialog');
    const closeBtn = document.querySelector('.media-modal-close');

    panels.forEach(panel => {
        panel.addEventListener('click', () => {
            const title = panel.dataset.title;
            const desc = panel.dataset.desc;
            
            document.getElementById('modalMediaTitle').textContent = title;
            document.getElementById('modalMediaDesc').textContent = desc;
            
            modal.showModal();
        });
    });

    closeBtn.addEventListener('click', () => modal.close());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.close();
    });
});
