export function init(root) {
    const galleryScreen = root.querySelector('.gallery-screen');
    const galleryTitle = root.querySelector('.gallery-title');
    const galleryGrid = root.querySelector('.gallery-grid');
    const cells = galleryGrid?.querySelectorAll('.gallery-cell') || [];
    const detailsScreen = root.querySelector('.details-screen');
    const backButton = root.querySelector('#gallery-back-button');

    if (!galleryScreen || !galleryTitle || !galleryGrid || !detailsScreen || !backButton) {
        console.warn('Gallery structure missing expected elements.');
        return;
    }

    // Hover title
    cells.forEach(cell => {
        const img = cell.querySelector('img');
        if (!img) return;

        cell.addEventListener('mouseenter', () => {
            galleryTitle.textContent = img.alt || '';
        });
        cell.addEventListener('mouseleave', () => {
            galleryTitle.textContent = 'My Media';
        });

        // Click: show details
        cell.addEventListener('click', () => {
            const data = cell.dataset;
            const imgSrc = data.src || img.src;

            const detailsImg = detailsScreen.querySelector('.details-image img');
            const titleEl = detailsScreen.querySelector('.details-title');
            const descEl = detailsScreen.querySelector('.details-description');
            const dirEl = detailsScreen.querySelector('.details-director');
            const actorEl = detailsScreen.querySelector('.details-actor');
            const yearEl = detailsScreen.querySelector('.details-year');
            const runtimeEl = detailsScreen.querySelector('.details-runtime');

            detailsImg.src = imgSrc;
            titleEl.textContent = data.title || img.alt || 'Untitled';
            descEl.textContent = data.description || '';
            dirEl.textContent = data.director || 'N/A';
            actorEl.textContent = data.actor || 'N/A';
            yearEl.textContent = data.year || 'N/A';
            runtimeEl.textContent = data.runtime || 'N/A';

            galleryGrid.style.display = 'none';
            galleryTitle.style.display = 'none';
            detailsScreen.classList.add('active');
        });
    });

    // Back button
    backButton.addEventListener('click', () => {
        detailsScreen.classList.remove('active');
        galleryGrid.style.display = 'grid';
        galleryTitle.style.display = 'block';
    });
}
