// Optional: Add a subtle typing or extra staggered animation
const textElements = document.querySelectorAll('.fade-text');

textElements.forEach((el, i) => {
    el.style.animationDelay = `${i * 0.7}s`;
});
