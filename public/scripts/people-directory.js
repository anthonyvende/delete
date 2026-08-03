(() => {
  document.querySelectorAll(".people-directory").forEach((directory) => {
    const tabs = Array.from(directory.querySelectorAll("[data-people-tab]"));
    const panels = Array.from(
      directory.querySelectorAll("[data-people-panel]"),
    );

    if (!tabs.length || !panels.length) return;

    const select = (id) => {
      tabs.forEach((tab) => {
        tab.setAttribute(
          "aria-selected",
          String(tab.getAttribute("aria-controls") === id),
        );
      });
      panels.forEach((panel) => {
        panel.hidden = panel.id !== id;
      });
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        select(tab.getAttribute("aria-controls"));
      });
    });
  });

  document.querySelectorAll("[data-person-card]").forEach((card) => {
    const trigger = card.querySelector("[data-person-open]");
    const dialog = card.querySelector("[data-person-dialog]");

    if (!trigger || !dialog) return;

    const close = () => {
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
    };

    trigger.addEventListener("click", () => {
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    });

    dialog.querySelectorAll("[data-person-close]").forEach((button) => {
      button.addEventListener("click", close);
    });

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) close();
    });
  });
})();
