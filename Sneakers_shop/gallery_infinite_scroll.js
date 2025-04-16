const track = document.getElementById("imageTrack");
const gap = 16; // px gap between cards
const speed = 1; // px per frame

let currentX = 0;

function loop() {
  currentX -= speed;
  track.style.transform = `translateX(${currentX}px)`;

  const firstCard = track.querySelector(".card");
  if (!firstCard) return requestAnimationFrame(loop); // safety check

  const firstCardRect = firstCard.getBoundingClientRect();
  const containerRect = track.parentElement.getBoundingClientRect();

  // When card is completely off-screen to the left
  if (firstCardRect.right < containerRect.left) {
    // Move the first card to the end
    track.appendChild(firstCard);
    
    // Adjust currentX so there's no visual jump
    currentX += firstCard.offsetWidth + gap;
    track.style.transform = `translateX(${currentX}px)`;
  }

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
