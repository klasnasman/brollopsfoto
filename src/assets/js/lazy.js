const images = document.querySelectorAll(".lazy__load");

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    const image = entry.target;

    if (entry.isIntersecting) {
      if (!image.src && image.dataset.src) {
        image.src = image.dataset.src;
      }
      image.classList.add("lazy__load-active");
    } else {
      image.classList.remove("lazy__load-active");
    }
  });
}

const observer = new IntersectionObserver(handleIntersection, {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
});

images.forEach((image) => {
  observer.observe(image);
});
