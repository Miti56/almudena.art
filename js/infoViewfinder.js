document.addEventListener("DOMContentLoaded", () => {
    // --- Setup ---
    const videoElement = document.querySelector(".preview-video");
    const histogramCanvas = document.getElementById("histogram-canvas");
    const histCtx = histogramCanvas.getContext("2d");

    // --- High-performance hidden canvas (from previous version) ---
    const hiddenCanvas = document.createElement("canvas");
    const hiddenCtx = hiddenCanvas.getContext("2d", { willReadFrequently: true });

    // We still use a small, fast analysis size
    const analysisWidth = 160;
    const analysisHeight = 90;
    hiddenCanvas.width = analysisWidth;
    hiddenCanvas.height = analysisHeight;

    // Set render size
    // Check if histogramCanvas exists before setting properties
    if (histogramCanvas) {
        histogramCanvas.width = histogramCanvas.clientWidth;
        histogramCanvas.height = histogramCanvas.clientHeight;
    } else {
        console.error("Histogram canvas not found!");
        // If canvas isn't here, no point in running the rest
        return;
    }

    // === HISTOGRAM UPDATER (Your new logic) ===
    function updateHistogram() {
        // Check if video has data
        if (videoElement && videoElement.readyState >= 2) {

            // Draw the small, fast version
            hiddenCtx.drawImage(videoElement, 0, 0, analysisWidth, analysisHeight);

            // Get pixel data
            const frame = hiddenCtx.getImageData(0, 0, analysisWidth, analysisHeight);
            const data = frame.data;

            // --- Your new logic starts here ---
            const bins = 64; // 64 bins for a "smoother" look
            const histogram = new Array(bins).fill(0);

            for (let i = 0; i < data.length; i += 4) {
                // Standard luminance calculation
                const brightness = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
                // Sort brightness into 64 bins
                histogram[Math.min(bins - 1, Math.floor((brightness / 256) * bins))]++;
            }

            // Find max value, but ignore bin 0 (pure black) to prevent skewing
            // Also check if histogram.slice(1) is not empty
            const maxValSlice = histogram.slice(1);
            const maxVal = maxValSlice.length > 0 ? Math.max(...maxValSlice) * 1.05 : 1; // add 5% headroom, avoid dividing by zero

            histCtx.clearRect(0, 0, histogramCanvas.width, histogramCanvas.height);

            for (let i = 0; i < bins; i++) {
                // Use Math.sqrt() for "sensitive" scaling
                const h = Math.sqrt(histogram[i] / maxVal) * histogramCanvas.height;
                histCtx.fillStyle = 'lime'; // Your requested color

                histCtx.fillRect(
                    i * (histogramCanvas.width / bins),
                    histogramCanvas.height - h,
                    histogramCanvas.width / bins,
                    h
                );
            }
        }

        requestAnimationFrame(updateHistogram);
    }

    // Start the loop once the video can play
    if (videoElement) {
        videoElement.addEventListener("canplay", () => {
            requestAnimationFrame(updateHistogram);
        });
    } else {
        console.error("Video element not found!");
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
            window.location.href = viewfinderPage;
        });
    }



});