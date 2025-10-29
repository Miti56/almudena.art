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
}, 0);

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
// === CAMERA BUTTON HANDLERS  =======================================
// ===================================================================
// ===================================================================
// === CAMERA BUTTON HANDLERS  =======================================
// ===================================================================

const viewfinderPage = "viewfinder.html";

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
        window.location.href = "menus/infoViewfinder.html";
    });
}

// Display Button (usually cycles back to main view)
const gallerypButton = document.querySelector(".btn-2");
if (gallerypButton) {
    gallerypButton.addEventListener("click", () => {
        window.location.href = "menus/gallery.html";
    });
}
