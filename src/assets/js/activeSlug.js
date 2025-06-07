const setupObserver = () => {
  const isMobile = window.innerWidth < 750;
  const threshold = isMobile ? [0.6] : [0.6];

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