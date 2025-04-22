const faders = document.querySelectorAll('.fade-in-section');

const appearOnScroll = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Optional: only animate once
      }
    });
  },
  {
    threshold: 0.1
  }
);

faders.forEach(section => {
  appearOnScroll.observe(section);
});
