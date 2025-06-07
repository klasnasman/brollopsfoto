const margin = 20;
const trigger = document.querySelector('a[href="#info"]');

if (trigger) {
  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    const targetElement = document.querySelector("#info");

    if (targetElement) {
      const targetOffset = targetElement.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: targetOffset - margin,
        behavior: "smooth",
      });
    }
  });
}
