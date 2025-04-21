const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        } else {
          entry.target.classList.remove("in-view");
        }
      });
    },
    { threshold: 0.6 }
  );
  
  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });
  