// === Core DOM references ===
const loadingScreen = document.querySelector('.loading-screen');
const video = document.getElementById('bg-video');
const histCanvas = document.getElementById('histogram');
const histCtx = histCanvas.getContext('2d');
const hiddenCanvas = document.createElement('canvas');
const hiddenCtx = hiddenCanvas.getContext('2d');
const hudContainer = document.querySelector('.hud-container');
const menuContainer = document.querySelector('.menu-container');

// === INITIAL LOADING SCREEN ===
setTimeout(() => {
    loadingScreen.style.transition = 'opacity 0.5s';
    loadingScreen.style.opacity = 0;

    setTimeout(() => (loadingScreen.style.display = 'none'), 500);

    video.style.display = 'block';
    hudContainer.style.display = 'block';

    video.play();
    updateHistogram();
}, 3000);

// === HISTOGRAM UPDATER ===
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
            const brightness = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
            histogram[Math.min(bins - 1, Math.floor((brightness / 256) * bins))]++;
        }

        const maxVal = Math.max(...histogram) * 1.05;
        histCtx.clearRect(0, 0, histCanvas.width, histCanvas.height);

        for (let i = 0; i < bins; i++) {
            const h = Math.sqrt(histogram[i] / maxVal) * histCanvas.height;
            histCtx.fillStyle = 'lime';
            histCtx.fillRect(
                i * (histCanvas.width / bins),
                histCanvas.height - h,
                histCanvas.width / bins,
                h
            );
        }
    }

    requestAnimationFrame(updateHistogram);
}

// ===================================================================
// === MODULAR MENU SYSTEM  ==========================================
// ===================================================================

export async function loadMenu(file, scriptName) {
    try {
        const res = await fetch(file);
        const html = await res.text();

        menuContainer.innerHTML = html;
        menuContainer.style.display = 'block';

        // Load its JS companion from /js/
        if (scriptName) {
            try {
                const module = await import(`./${scriptName}.js`);
                if (typeof module.init === 'function') {
                    module.init(menuContainer);
                }
            } catch (err) {
                console.warn(`No JS module found for ${scriptName}:`, err);
            }
        }
    } catch (err) {
        console.error('Error loading menu:', err);
    }
}


export function hideMenu() {
    menuContainer.innerHTML = '';
    menuContainer.style.display = 'none';
}

// ===================================================================
// === CAMERA BUTTON HANDLERS  =======================================
// ===================================================================


document.querySelector('.btn-1')?.addEventListener('click', () =>
    loadMenu('/menus/menu1.html', 'menu2')
);

document.querySelector('.btn-2')?.addEventListener('click', () =>
    loadMenu('menus/gallery.html', 'gallery') // assuming js/gallery.js
);


// We now just tell the browser to go to this page
document.querySelector('.btn-disp')?.addEventListener('click', () => {
    window.location.href = 'menus/infoViewfinder.html';
})

document.querySelector('.btn-back')?.addEventListener('click', hideMenu);
