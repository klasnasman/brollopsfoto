const setupObserver = () => {
  const isMobile = window.innerWidth < 750;
  const threshold = isMobile ? 0.2 : 0.6; // Adjusted threshold for better control
  const bottomMargin = isMobile ? "-200px" : "-100px"; // Adjust this value as needed

  const options = {
    root: null, // The viewport
    rootMargin: `0px 0px ${bottomMargin} 0px`, // Top, Right, Bottom, Left. Negative bottom margin means elements need to be further up to intersect.
    threshold: threshold,
  };

  const observer = new IntersectionObserver((entries) => {
    const visibleSlug = document.getElementById("visibleSlug");
    const observedElements = Array.from(document.querySelectorAll(".index__section a[id], .info-list__container"));
    const lastObservedElement = observedElements[observedElements.length - 1];

    let currentVisibleId = "";
    let lastElementIntersecting = false;

    entries.forEach(entry => {
        if (entry.target === lastObservedElement) {
            lastElementIntersecting = entry.isIntersecting;
        }
        // Prioritize the top-most intersecting element
        if (entry.isIntersecting && entry.target.id && !currentVisibleId) {
            currentVisibleId = entry.target.id;
        }
    });

    if (currentVisibleId) {
        // If an element is intersecting, display its ID
        visibleSlug.textContent = currentVisibleId;
    } else if (!lastElementIntersecting && observedElements.length > 0) {
        // If no element is intersecting AND the last observed element is NOT intersecting
        // (meaning we've scrolled past it and are at the very bottom), then clear the slug.
        visibleSlug.textContent = ""; // Clear the slug
    } else {
        // Fallback for when nothing is intersecting at the very top or if initial state.
        // You might want to get the initial header title here if needed.
        const initialHeaderTitle = document.querySelector('header p[id="visibleSlug"]').dataset.initialTitle || "";
        visibleSlug.textContent = initialHeaderTitle;
    }

  }, options);

  // Observe all project links within the main content area
  document.querySelectorAll(".index__section a[id]").forEach((element) => {
    observer.observe(element);
  });

  // Also observe the info-list__container to treat it as the "last div"
  const infoContainer = document.querySelector(".info-list__container");
  if (infoContainer) {
    // Add an ID to info-list__container if it doesn't have one, or use a data attribute
    // For demonstration, let's assume it has an ID or we can add one.
    // If you want its slug to be "Info" when it's visible, you'd add an ID:
    infoContainer.id = infoContainer.id || "infoSection"; // Ensure it has an ID
    observer.observe(infoContainer);
  }
};

// Ensure the DOM is fully loaded before setting up the observer
document.addEventListener('DOMContentLoaded', setupObserver);
