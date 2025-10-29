document.addEventListener('DOMContentLoaded', () => {
    // Selectors are now based on 'document'
    const galleryScreen = document.querySelector('.gallery-screen');
    const galleryTitle = document.querySelector('.gallery-title');
    const galleryGrid = document.querySelector('.gallery-grid');
    const cells = galleryGrid?.querySelectorAll('.gallery-cell') || [];
    const detailsScreen = document.querySelector('.details-screen');

    // === NEW: Selectors for the Details Screen Elements ===
    // (We check if detailsScreen exists first to avoid errors)
    const detailsBackButton = detailsScreen?.querySelector('#gallery-back-button');
    const detailsImage = detailsScreen?.querySelector('.details-image img');
    const detailsTitle = detailsScreen?.querySelector('.details-title');
    const detailsDirector = detailsScreen?.querySelector('.details-director');
    const detailsActor = detailsScreen?.querySelector('.details-actor');
    const detailsYear = detailsScreen?.querySelector('.details-year');
    const detailsRuntime = detailsScreen?.querySelector('.details-runtime');
    const detailsDescription = detailsScreen?.querySelector('.details-description');


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
    });

    // ===================================================================
    // === GALLERY CLICK & DETAILS SCREEN LOGIC =========================
    // ===================================================================

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            const data = cell.dataset;
            const thumbSrc = cell.querySelector('img')?.src;

            // Only open details if the cell has a 'data-title'
            // This prevents opening details for the empty/placeholder cells
            if (data.title && detailsScreen) {

                // Populate data
                // Use data-src (full res) but fallback to the thumbnail's src
                const imageUrl = data.src || thumbSrc || '';
                detailsImage.src = imageUrl;
                detailsImage.alt = data.title;
                detailsTitle.textContent = data.title;
                detailsDescription.textContent = data.description || '';

                // Populate meta, with 'N/A' as a fallback if data is missing
                detailsDirector.textContent = data.director || 'N/A';
                detailsActor.textContent = data.actor || 'N/A';
                detailsYear.textContent = data.year || 'N/A';
                detailsRuntime.textContent = data.runtime || 'N/A';

                // Add an overlay to make the text readable over the background image
                detailsScreen.style.setProperty('--background-overlay', 'rgba(0, 0, 0, 0.7)'); // Define custom property

                // Show the details screen
                detailsScreen.classList.add('active');
            }
        });
    });

    // Details screen 'Back' button listener
    if (detailsBackButton) {
        detailsBackButton.addEventListener('click', () => {
            // Hide the details screen
            detailsScreen.classList.remove('active');

            // Optional: This stops video/audio from playing in the background
            // after the user clicks "back" by clearing the image/video source.
            if (detailsImage) {
                detailsImage.src = '';
            }
        });
    }

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

    // Gallery Button (btn-2)
    const gallerypButton = document.querySelector(".btn-2");
    if (gallerypButton) {
        gallerypButton.addEventListener("click", () => {
            window.location.href = viewfinderPage;
        });
    }
});