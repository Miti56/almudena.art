document.addEventListener('DOMContentLoaded', () => {
    // Selectors are now based on 'document'
    const galleryScreen = document.querySelector('.gallery-screen');
    const galleryTitle = document.querySelector('.gallery-title');
    const galleryGrid = document.querySelector('.gallery-grid');
    const cells = galleryGrid?.querySelectorAll('.gallery-cell') || [];
    const detailsScreen = document.querySelector('.details-screen');

    // This is the BACK button for the DETAILS screen
    const detailsBackButton = document.querySelector('#gallery-back-button');

    // This is the main BACK button for the whole UI
    const mainBackButton = document.querySelector('.ui-buttons .btn-back');

    if (!galleryScreen || !galleryTitle || !galleryGrid || !detailsScreen || !detailsBackButton || !mainBackButton) {
        console.warn('Gallery structure missing expected elements.');
        return;
    }

    // Hover title
    cells.forEach(cell => {
        const img = cell.querySelector('img');
        if (!img) return;

        cell.addEventListener('mouseenter', () => {
            const title = cell.dataset.title || img.alt || 'My Media';
            galleryTitle.textContent = title;
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

            if (detailsImg) detailsImg.src = imgSrc;
            if (titleEl) titleEl.textContent = data.title || img.alt || 'Untitled';
            if (descEl) descEl.textContent = data.description || '';
            if (dirEl) dirEl.textContent = data.director || 'N/A';
            if (actorEl) actorEl.textContent = data.actor || 'N/A';
            if (yearEl) yearEl.textContent = data.year || 'N/A';
            if (runtimeEl) runtimeEl.textContent = data.runtime || 'N/A';

            galleryGrid.style.display = 'none';
            galleryTitle.style.display = 'none';
            detailsScreen.classList.add('active');
        });
    });

    // ===================================================================
// === CAMERA BUTTON HANDLERS  =======================================
// ===================================================================

    const viewfinderPage = "../viewfinder.html";

    // Back Button
    const backButton = document.querySelector(".btn-back");
    if (backButton) {
        backButton.addEventListener("click", () => {
            window.location.href = viewfinderPage;
        });
    }

    // Display Button (usually cycles back to main view)
    const dispButton = document.querySelector(".btn-disp");
    if (dispButton) {
        dispButton.addEventListener("click", () => {
            window.location.href = "../menus/infoViewfinder.html";
        });
    }
    // Display Button (usually cycles back to main view)
    const gallerypButton = document.querySelector(".btn-2");
    if (gallerypButton) {
        gallerypButton.addEventListener("click", () => {
            window.location.href = viewfinderPage;
        });
    }


});