document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.querySelector('.gallery-grid');
    const galleryTitle = document.querySelector('.gallery-title');
    const detailsScreen = document.querySelector('.details-screen');
    const detailsBackButton = document.getElementById('gallery-back-button');

    // Details Elements
    const detailsImage = document.querySelector('.details-img-display');
    const detailsTitle = document.querySelector('.details-title');
    const detailsDescription = document.querySelector('.details-description');

    // Check if a second description paragraph exists in CSS/HTML, if not we create/select it
    let detailsDescription2 = document.querySelector('.details-description-2');
    if (!detailsDescription2 && detailsDescription) {
        detailsDescription2 = document.createElement('p');
        detailsDescription2.className = 'details-description-2';
        detailsDescription2.style.marginTop = '1rem';
        detailsDescription.parentNode.appendChild(detailsDescription2);
    }

    const detailsDirector = document.querySelector('.details-director');
    const detailsActor = document.querySelector('.details-actor');
    const detailsYear = document.querySelector('.details-year');
    const detailsRuntime = document.querySelector('.details-runtime');
    const detailsRes = document.querySelector('.details-res');
    const detailsSize = document.querySelector('.details-size');

    // 1. Fetch Data
    fetch('../content/films.json')
        .then(response => response.json())
        .then(data => {
            renderGallery(data);
        })
        .catch(err => console.error('Error loading gallery data:', err));

    // 2. Render Grid
    function renderGallery(items) {
        // Clear existing static HTML
        galleryGrid.innerHTML = '';

        items.forEach(item => {
            const cell = document.createElement('div');
            cell.className = 'gallery-cell';

            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.title || 'Gallery Image';
            cell.appendChild(img);

            // Only add interactions if it is a Movie (has a title)
            if (item.title) {
                // Hover Logic
                cell.addEventListener('mouseenter', () => {
                    galleryTitle.textContent = item.title;
                    galleryTitle.style.color = '#fff';
                });
                cell.addEventListener('mouseleave', () => {
                    galleryTitle.textContent = 'MY MEDIA';
                    galleryTitle.style.color = '#fff';
                });

                // Click Logic
                cell.addEventListener('click', () => openDetails(item));
            } else {
                // It is just a filler photo
                cell.style.cursor = 'default';
            }

            galleryGrid.appendChild(cell);
        });
    }

    // 3. Populate Details
    function openDetails(data) {
        if (!detailsScreen) return;

        detailsImage.src = data.src;
        detailsTitle.textContent = data.title;

        detailsDescription.textContent = data.description || '';
        if (detailsDescription2) {
            detailsDescription2.textContent = data.description2 || '';
        }

        detailsDirector.textContent = data.director || '';
        detailsActor.textContent = data.actor || '';
        detailsYear.textContent = data.year || '';
        detailsRuntime.textContent = data.runtime || '';
        detailsRes.textContent = data.res || '';
        detailsSize.textContent = data.size || '';

        detailsScreen.classList.add('active');
    }

    // 4. Back Button Logic
    if (detailsBackButton) {
        detailsBackButton.addEventListener('click', () => {
            detailsScreen.classList.remove('active');
            setTimeout(() => {
                if (detailsImage) detailsImage.src = '';
            }, 200);
        });
    }

    // 5. Navigation Buttons
    const viewfinderPage = "../viewfinder.html";

    document.querySelector(".btn-back")?.addEventListener("click", () => {
        window.location.href = viewfinderPage;
    });

    document.querySelector(".btn-disp")?.addEventListener("click", () => {
        window.location.href = "../menus/infoViewfinder.html";
    });

    document.querySelector(".btn-2")?.addEventListener("click", () => {
        window.location.href = viewfinderPage;
    });
});