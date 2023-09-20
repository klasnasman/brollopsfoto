const images = document.querySelectorAll(".lazy__load");

function checkScroll() {
  const margin = 20;
  if (images.length === 0) {
    return;
  }
  for (const image of images) {
    const rect = image.getBoundingClientRect();
    const isTopVisible =
      rect.top + rect.height / 2 < window.innerHeight + margin;
    const isBottomVisible = rect.bottom - rect.height / 2 > margin;
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

checkScroll();
window.addEventListener("scroll", checkScroll);
