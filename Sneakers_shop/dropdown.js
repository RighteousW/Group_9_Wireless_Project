
const selected = document.getElementById("selectedOption");
const dropdown = document.getElementById("dropdownOptions");
const container = document.querySelector(".dropdown-container");

selected.addEventListener("click", () => {
  container.classList.toggle("open");
});

dropdown.querySelectorAll("li").forEach(item => {
  item.addEventListener("click", () => {
    selected.textContent = item.textContent;
    selected.dataset.value = item.dataset.value;
    container.classList.remove("open");

    // Optional: trigger a change event
    console.log("Selected material:", item.dataset.value);
  });
});

// Close if clicked outside
document.addEventListener("click", (e) => {
  if (!container.contains(e.target)) {
    container.classList.remove("open");
  }
});