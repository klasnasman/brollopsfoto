const header = document.querySelector(".header");
const modal = document.querySelector(".modal");
const footer = document.querySelector("footer");
const scrollThreshold = 0;
let isContainerVisible = false;

const images = document.querySelectorAll(".lazy__load");
const lazyLoadMargin = 20;

function isScrolledToBottom() {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  return scrollY + windowHeight >= documentHeight - scrollThreshold;
}

function headerModalToggle() {
  const scrollY = window.scrollY;
  const isVisible = scrollY <= scrollThreshold;

  header.classList.toggle("open", !isVisible);
  modal.classList.toggle("close", !isVisible);
  isContainerVisible = isVisible;

  footer.classList.toggle("open", isScrolledToBottom());
}

function lazyLoad() {
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
  headerModalToggle();
  lazyLoad();
});

let debounceTimer;

window.addEventListener("scroll", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    headerModalToggle();
    lazyLoad();
  }, 0);
});
