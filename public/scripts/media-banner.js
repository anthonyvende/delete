(() => {
  document.querySelectorAll("[data-media-banner]").forEach((banner) => {
    const frame = banner.querySelector("[data-banner-frame]");
    const slides = Array.from(banner.querySelectorAll("[data-banner-slide]"));
    const dots = Array.from(banner.querySelectorAll("[data-banner-dot]"));

    if (!frame || slides.length < 2) return;

    let active = 0;
    let pointerStart = null;

    const select = (index) => {
      active = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        slide.classList.toggle("is-active", i === active);
        slide.setAttribute("aria-hidden", String(i !== active));
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle("is-active", i === active);
        if (i === active) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
    };

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => select(index));
    });

    frame.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        select(active - 1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        select(active + 1);
      }
    });

    frame.addEventListener("pointerdown", (event) => {
      pointerStart = event.clientX;
    });

    frame.addEventListener("pointerup", (event) => {
      if (pointerStart === null) return;
      const distance = event.clientX - pointerStart;
      pointerStart = null;
      if (Math.abs(distance) >= 48) select(distance > 0 ? active - 1 : active + 1);
    });
  });

  // The prototype form has no backend; submission stays on the page.
  document.querySelectorAll("[data-static-form]").forEach((form) => {
    form.addEventListener("submit", (event) => event.preventDefault());
  });
})();
