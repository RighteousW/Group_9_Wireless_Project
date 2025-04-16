// const track = document.getElementById("imageTrack");
const gap = 16; // 1rem
let lastTimestamp = performance.now();

function loop(timestamp) {
    const dt = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    const speed = (track.scrollWidth / 2) / 40000; // 50% over 40s
    const deltaX = speed * dt;

    const firstCard = track.querySelector(".card");
    const firstCardRect = firstCard.getBoundingClientRect();
    const containerRect = track.parentElement.getBoundingClientRect();

    if (firstCardRect.right < containerRect.left) {
        // Move first card to the end
        track.appendChild(firstCard);

        // Cancel animation, manually adjust transform, then restart animation
        const currentTransform = getComputedStyle(track).transform;
        const matrix = new DOMMatrix(currentTransform);
        const currentX = matrix.m41;

        track.style.animation = "none";
        track.style.transform = `translateX(${currentX + firstCard.offsetWidth + gap}px)`;

        // Force reflow and restart animation
        void track.offsetWidth;
        track.style.animation = "scroll-left 40s linear infinite";
    }

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
