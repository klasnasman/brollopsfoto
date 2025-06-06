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

    // Sort entries by intersection ratio descending to get the most visible one
    const visibleEntries = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

    if (visibleEntries.length > 0) {
      const topEntry = visibleEntries[0];
      visibleSlug.textContent = topEntry.target.id || "";
    } else {
      // Clear when no slug targets are visible
      visibleSlug.textContent = "";
    }
  }, options);

  document.querySelectorAll("a[id]").forEach((element) => {
    observer.observe(element);
  });
};

setupObserver();
