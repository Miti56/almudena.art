document.addEventListener("DOMContentLoaded", () => {
    // --- 1. Setup Histogram ---
    const videoElement = document.querySelector(".preview-video");
    const histogramCanvas = document.getElementById("histogram-canvas");

    // Ensure canvas exists
    if (!histogramCanvas || !videoElement) return;

    const histCtx = histogramCanvas.getContext("2d");

    // High-performance hidden canvas for analysis
    const hiddenCanvas = document.createElement("canvas");
    const hiddenCtx = hiddenCanvas.getContext("2d", { willReadFrequently: true });
    const analysisWidth = 160;
    const analysisHeight = 90;
    hiddenCanvas.width = analysisWidth;
    hiddenCanvas.height = analysisHeight;

    // Fix Canvas Resolution
    histogramCanvas.width = histogramCanvas.clientWidth;
    histogramCanvas.height = histogramCanvas.clientHeight;

    // --- 2. Histogram Loop ---
    function updateHistogram() {
        if (videoElement.readyState >= 2) {
            // Draw small frame
            hiddenCtx.drawImage(videoElement, 0, 0, analysisWidth, analysisHeight);
            const frame = hiddenCtx.getImageData(0, 0, analysisWidth, analysisHeight);
            const data = frame.data;

            const bins = 64;
            const histogram = new Array(bins).fill(0);

            // Calculate Luma
            for (let i = 0; i < data.length; i += 4) {
                const brightness = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
                histogram[Math.min(bins - 1, Math.floor((brightness / 256) * bins))]++;
            }

            // Draw
            const maxValSlice = histogram.slice(1);
            const maxVal = maxValSlice.length > 0 ? Math.max(...maxValSlice) * 1.05 : 1;

            histCtx.clearRect(0, 0, histogramCanvas.width, histogramCanvas.height);

            // Style for the bars
            histCtx.fillStyle = '#ffffff'; // White bars for cleaner look on dark bg

            for (let i = 0; i < bins; i++) {
                const h = Math.sqrt(histogram[i] / maxVal) * histogramCanvas.height;
                const x = i * (histogramCanvas.width / bins);
                const w = (histogramCanvas.width / bins) - 1; // -1 for gap between bars

                histCtx.fillRect(x, histogramCanvas.height - h, w, h);
            }
        }
        requestAnimationFrame(updateHistogram);
    }

    // --- 3. Fake Audio Meter Animation ---
    function updateAudioMeters() {
        const leftBar = document.getElementById('audio-l');
        const rightBar = document.getElementById('audio-r');

        if(leftBar && rightBar) {
            // Random percentage between 30% and 90%
            const lVal = Math.floor(Math.random() * 60) + 30;
            const rVal = Math.floor(Math.random() * 60) + 30;

            leftBar.style.width = `${lVal}%`;
            rightBar.style.width = `${rVal}%`;
        }

        // Update every 100ms
        setTimeout(updateAudioMeters, 100);
    }

    // --- 4. Start Everything ---
    videoElement.addEventListener("canplay", () => {
        updateHistogram();
        updateAudioMeters();
    });

    // Fallback if video is already ready
    if(videoElement.readyState >= 2) {
        updateHistogram();
        updateAudioMeters();
    }


    // --- 5. Button Handlers ---
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
            window.location.href = viewfinderPage;
        });
    }

    const galleryButton = document.querySelector(".btn-2");
    if (galleryButton) {
        galleryButton.addEventListener("click", () => {
            window.location.href = "../menus/gallery.html";
        });
    }
});