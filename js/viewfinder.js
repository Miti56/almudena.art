const loadingScreen = document.querySelector('.loading-screen');
const video = document.getElementById('bg-video');
const histCanvas = document.getElementById('histogram');
const histCtx = histCanvas.getContext('2d');
const hiddenCanvas = document.createElement('canvas');
const hiddenCtx = hiddenCanvas.getContext('2d');
const hudContainer = document.querySelector('.hud-container');
const menuContainer = document.querySelector('.menu-container');

// Fade in after 3s
setTimeout(() => {
    loadingScreen.style.transition = 'opacity 0.5s';
    loadingScreen.style.opacity = 0;
    setTimeout(() => loadingScreen.style.display = 'none', 500);

    video.style.display = 'block';
    hudContainer.style.display = 'block';

    video.play();
    updateHistogram();
}, 3000);

// Histogram update
function updateHistogram() {
    if (video.readyState >= 2) {
        hiddenCanvas.width = video.videoWidth;
        hiddenCanvas.height = video.videoHeight;
        hiddenCtx.drawImage(video, 0, 0);
        const frame = hiddenCtx.getImageData(0, 0, hiddenCanvas.width, hiddenCanvas.height);
        const data = frame.data;
        const bins = 64;
        const histogram = new Array(bins).fill(0);

        for (let i = 0; i < data.length; i += 4) {
            const brightness = 0.2126 * data[i] + 0.7152 * data[i+1] + 0.0722 * data[i+2];
            histogram[Math.min(bins-1, Math.floor((brightness / 256) * bins))]++;
        }

        const maxVal = Math.max(...histogram) * 1.05;
        histCtx.clearRect(0, 0, histCanvas.width, histCanvas.height);
        for (let i = 0; i < bins; i++) {
            const h = Math.sqrt(histogram[i] / maxVal) * histCanvas.height;
            histCtx.fillStyle = 'lime';
            histCtx.fillRect(i * (histCanvas.width / bins), histCanvas.height - h, histCanvas.width / bins, h);
        }
    }
    requestAnimationFrame(updateHistogram);
}

// Menu system
// --- inside viewfinder.js ---

function loadMenu(file) {
    fetch(file)
        .then(res => res.text())
        .then(html => {
            menuContainer.innerHTML = html;
            menuContainer.style.display = 'block';

            // --- Detect if this is the GALLERY page ---
            const galleryTitle = menuContainer.querySelector('.gallery-title');
            const cells = menuContainer.querySelectorAll('.gallery-cell');
            const detailsScreen = menuContainer.querySelector('.details-screen');
            const galleryGrid = menuContainer.querySelector('.gallery-grid');
            const backButton = menuContainer.querySelector('#gallery-back-button');

            if (galleryTitle && cells.length > 0 && detailsScreen && galleryGrid && backButton) {
                // === Define interactivity ===

                // Hover: show image title
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
                        detailsScreen.querySelector('.details-image img').src = data.src || img.src;
                        detailsScreen.querySelector('.details-title').textContent = data.title || img.alt || 'Untitled';
                        detailsScreen.querySelector('.details-description').textContent = data.description || '';
                        detailsScreen.querySelector('.details-director').textContent = data.director || 'N/A';
                        detailsScreen.querySelector('.details-actor').textContent = data.actor || 'N/A';
                        detailsScreen.querySelector('.details-year').textContent = data.year || 'N/A';
                        detailsScreen.querySelector('.details-runtime').textContent = data.runtime || 'N/A';

                        // Hide the grid, show the details
                        galleryGrid.style.display = 'none';
                        galleryTitle.style.display = 'none';
                        detailsScreen.classList.add('active');
                    });
                });

                // Back button inside details screen
                backButton.addEventListener('click', () => {
                    detailsScreen.classList.remove('active');
                    galleryGrid.style.display = 'grid';
                    galleryTitle.style.display = 'block';
                });
            }
        })
        .catch(err => console.error('Error loading menu:', err));
}


function hideMenu() {
    menuContainer.innerHTML = '';
    menuContainer.style.display = 'none';
}

// Button bindings
document.querySelector('.btn-bottom').addEventListener('click', hideMenu);
document.querySelector('.btn-top').addEventListener('click', () => loadMenu('menus/menu2.html'));
document.querySelector('.btn-middle').addEventListener('click', () => loadMenu('menus/gallery.html'));
document.querySelector('.btn-weird').addEventListener('click', () => loadMenu('menus/menu3.html'));
