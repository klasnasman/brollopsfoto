const header = document.querySelector(".header");
const modal = document.querySelector(".modal");
let isContainerVisible = false;
const scrollThreshold = 10;

function updateVisibility() {
  const scrollY = window.scrollY;
  const isVisible = scrollY <= scrollThreshold;

  header.classList.toggle("open", !isVisible);
  modal.classList.toggle("close", !isVisible);
  isContainerVisible = isVisible;
}

document.addEventListener("DOMContentLoaded", () => {
  updateVisibility();
});

let debounceTimer;
window.addEventListener("scroll", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(updateVisibility, 0);
});
