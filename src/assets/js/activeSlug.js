const setupObserver = () => {
  const isMobile = window.innerWidth < 750;
  const threshold = isMobile ? [0.2] : [0.5]; // Adjust the default threshold as needed

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

setupObserver();
