const header = document.querySelector(".header");
const modal = document.querySelector(".modal");
const scrollThreshold = 0;
let isContainerVisible = false;

const images = document.querySelectorAll(".lazy__load");
const lazyLoadMargin = 50;

function updateVisibility() {
  const scrollY = window.scrollY;
  const isVisible = scrollY <= scrollThreshold;

  header.classList.toggle("open", !isVisible);
  modal.classList.toggle("close", !isVisible);
  isContainerVisible = isVisible;
}

function checkScroll() {
  if (images.length === 0) {
    return;
  }
  for (const image of images) {
    const rect = image.getBoundingClientRect();
    const isTopVisible =
      rect.top + rect.height / 2 < window.innerHeight + lazyLoadMargin;
    const isBottomVisible = rect.bottom - rect.height / 2 > lazyLoadMargin;
    const hasNoSrc = !image.src;

    if (isTopVisible && isBottomVisible) {
      if (hasNoSrc && image.dataset.src) {
        image.src = image.dataset.src;
      }
      image.classList.add("lazy__load-active");
    } else {
      image.classList.remove("lazy__load-active");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateVisibility();
  checkScroll();
});

let debounceTimer;

window.addEventListener("scroll", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    updateVisibility();
    checkScroll();
  }, 0);
});
