const margin = 20;

document.querySelector('a[href="#info"]').addEventListener("click", (e) => {
  e.preventDefault();
  const targetElement = document.querySelector("#info");

  if (targetElement) {
    const targetOffset =
      targetElement.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: targetOffset - margin,
      behavior: "smooth",
    });
  }
});
