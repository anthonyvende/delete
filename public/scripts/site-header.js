(() => {
  const mobileQuery = window.matchMedia("(max-width: 43.75rem)");
  const compactQuery = window.matchMedia("(max-width: 73.75rem)");

  const setDocumentMenuState = (open) => {
    document.documentElement.dataset.menuOpen = String(
      open && mobileQuery.matches,
    );
  };

  document.querySelectorAll("[data-site-header]").forEach((header) => {
    const toggle = header.querySelector("[data-menu-toggle]");
    const panel = header.querySelector("[data-menu-panel]");
    if (!toggle || !panel) return;

    const setOpen = (open) => {
      header.dataset.menuOpen = String(open);
      panel.dataset.open = String(open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute(
        "aria-label",
        open ? "Close navigation" : "Open navigation",
      );
      setDocumentMenuState(open);
    };

    toggle.addEventListener("click", () => {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    panel.addEventListener("click", (event) => {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });

    compactQuery.addEventListener("change", (event) => {
      if (!event.matches) setOpen(false);
    });

    mobileQuery.addEventListener("change", () => {
      setDocumentMenuState(toggle.getAttribute("aria-expanded") === "true");
    });
  });
})();
