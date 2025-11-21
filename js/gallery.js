document.addEventListener('DOMContentLoaded', () => {
    const galleryScreen = document.querySelector('.gallery-screen');
    const galleryTitle = document.querySelector('.gallery-title');
    const galleryGrid = document.querySelector('.gallery-grid');
    const cells = galleryGrid?.querySelectorAll('.gallery-cell') || [];
    const detailsScreen = document.querySelector('.details-screen');

    // === NEW SELECTORS FOR THE NEW LAYOUT ===
    const detailsBackButton = detailsScreen?.querySelector('#gallery-back-button');
    const detailsImage = detailsScreen?.querySelector('.details-img-display');
    const detailsTitle = detailsScreen?.querySelector('.details-title');

    // Meta Selectors
    const detailsDirector = detailsScreen?.querySelector('.details-director');
    const detailsActor = detailsScreen?.querySelector('.details-actor');
    const detailsYear = detailsScreen?.querySelector('.details-year');
    const detailsRuntime = detailsScreen?.querySelector('.details-runtime');
    const detailsRes = detailsScreen?.querySelector('.details-res');
    const detailsSize = detailsScreen?.querySelector('.details-size');
    const detailsDescription = detailsScreen?.querySelector('.details-description');


    // Hover title effect on the grid
    cells.forEach(cell => {
        const img = cell.querySelector('img');
        if (!img) return;

        cell.addEventListener('mouseenter', () => {
            const title = cell.dataset.title || 'EMPTY SLOT';
            galleryTitle.textContent = title;
            galleryTitle.style.color = cell.dataset.title ? '#fff' : '#555';
        });
        cell.addEventListener('mouseleave', () => {
            galleryTitle.textContent = 'MY MEDIA';
            galleryTitle.style.color = '#fff';
        });
    });

    // ===================================================================
    // === CLICK & POPULATE LOGIC ========================================
    // ===================================================================

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            const data = cell.dataset;
            const thumbSrc = cell.querySelector('img')?.src;

            // Only open details if there is a Title
            if (data.title && detailsScreen) {

                // 1. Image
                const imageUrl = data.src || thumbSrc || '';
                detailsImage.src = imageUrl;
                detailsImage.alt = data.title;

                // 2. Text Content
                detailsTitle.textContent = data.title;
                detailsDescription.textContent = data.description || 'No description available.';

                // 3. Metadata (with fallbacks)
                detailsDirector.textContent = data.director || 'Unknown';
                detailsActor.textContent = data.actor || '-';
                detailsYear.textContent = data.year || '----';
                detailsRuntime.textContent = data.runtime || '-- min';

                // New Tech Data
                if(detailsRes) detailsRes.textContent = data.res || 'UNK';
                if(detailsSize) detailsSize.textContent = data.size || '---';

                // 4. Show Screen
                detailsScreen.classList.add('active');
            }
        });
    });

    // Back Button Logic
    if (detailsBackButton) {
        detailsBackButton.addEventListener('click', () => {
            detailsScreen.classList.remove('active');
            // Clear image source after animation to prevent ghosting, slight delay optional
            setTimeout(() => {
                if (detailsImage) detailsImage.src = '';
            }, 200);
        });
    }

    // ===================================================================
    // === CAMERA UI NAVIGATION ==========================================
    // ===================================================================

    const viewfinderPage = "../viewfinder.html";

    const backButton = document.querySelector(".btn-back");
    if (backButton) {
        backButton.addEventListener("click", () => {
            window.location.href = viewfinderPage;
        });
    }

    const dispButton = document.querySelector(".btn-disp");
    if (dispButton) {
        dispButton.addEventListener("click", () => {
            window.location.href = "../menus/infoViewfinder.html";
        });
    }

    const gallerypButton = document.querySelector(".btn-2");
    if (gallerypButton) {
        gallerypButton.addEventListener("click", () => {
            window.location.href = viewfinderPage;
        });
    }
});