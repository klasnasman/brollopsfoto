const header = document.querySelector(".header");
const modal = document.querySelector(".modal");
let isContainerVisible = false;
const scrollThreshold = 50;

const images = document.querySelectorAll(".lazy__load");
const lazyLoadMargin = 50;

const setupObserver = () => {
  const isMobile = window.innerWidth < 750;
  const threshold = isMobile ? [1] : [0.5]; // Adjust the default threshold as needed

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: threshold,
  };

  const observer = new IntersectionObserver((entries) => {
    const visibleSlug = document.getElementById("visibleSlug");

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const visibleElementId = entry.target.id;
        visibleSlug.textContent = visibleElementId || "";
      }
    });
  }, options);

  document.querySelectorAll("a[id]").forEach((element) => {
    observer.observe(element);
  });
};

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
  setupObserver();
});

let debounceTimer;

window.addEventListener("scroll", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    updateVisibility();
    checkScroll();
  }, 20);
});
