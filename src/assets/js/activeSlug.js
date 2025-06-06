const setupObserver = () => {
  const isMobile = window.innerWidth < 750;
  const threshold = isMobile ? 0.6 : 0.6; // Keep your original threshold

  const options = {
    root: null, // The viewport is the root
    rootMargin: "0px", // No custom margin
    threshold: threshold,
  };

  // Define your default title here
  const defaultTitle = "Klas Näsman Bröllopsfotograf"; 

  // Store references to all observed elements to check their intersection state
  let observedElements = []; 

  const observer = new IntersectionObserver((entries) => {
    const visibleSlug = document.getElementById("visibleSlug");
    let topMostVisibleId = ""; // This will hold the ID of the highest visible element

    // First, update the intersection status of all observed elements
    // We'll iterate through `observedElements` to ensure we check in DOM order
    // for the topmost visible one.
    for (const element of observedElements) {
      const entry = entries.find(e => e.target === element);
      if (entry && entry.isIntersecting) {
        // If this element is intersecting and we haven't found a topmost yet, set it
        if (!topMostVisibleId) {
          topMostVisibleId = element.id;
        }
      }
    }

    // Now, apply the logic:
    if (topMostVisibleId) {
      // If any element is visible, show its ID
      visibleSlug.textContent = topMostVisibleId;
    } else {
      // If NO elements are visible (scrolled to top, or past all content at bottom),
      // set the default title.
      visibleSlug.textContent = defaultTitle;
    }
  }, options);

  // Collect all elements to observe once, and then observe them
  // This helps us keep track of their order and total count.
  const allObservableAnchors = document.querySelectorAll(".index__section a[id]");
  const infoContainer = document.querySelector(".info-list__container");

  // Ensure infoContainer has an ID for observation if it's your last section
  if (infoContainer) {
    infoContainer.id = infoContainer.id || "infoSection"; 
  }

  // Populate observedElements in DOM order
  observedElements = Array.from(allObservableAnchors);
  if (infoContainer) {
    observedElements.push(infoContainer);
  }

  // Start observing
  observedElements.forEach((element) => {
    observer.observe(element);
  });
};

// Make sure the DOM is fully loaded before the script runs
document.addEventListener('DOMContentLoaded', setupObserver);
