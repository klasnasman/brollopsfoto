// PAGE FADE TRANSITION NOT IN USE
async function fadeIn(el, durationInMs) {
  return new Promise((resolve) => {
    const animation = el.animate(
      [
        {
          opacity: "0",
        },
        {
          opacity: "0.5",
          offset: 0.5,
        },
        {
          opacity: "1",
          offset: 1,
        },
      ],
      {
        duration: durationInMs,
        easing: "linear",
        iterations: 1,
        direction: "normal",
        fill: "forwards",
        delay: 0,
        endDelay: 0,
      }
    );
    animation.onfinish = () => resolve();
  });
}

async function fadeInSection() {
  for (const section of document.getElementsByClassName("page__transition")) {
    await fadeIn(section, 800);
  }
}

window.addEventListener("load", async () => {
  await fadeInSection();
});
