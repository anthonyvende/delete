(() => {
  // Blocks opt in by rendering `data-reveal-target data-reveal="pending"` on
  // their own root. The hidden state ships in the markup rather than being
  // applied here, for two reasons: a section is hidden from the very first
  // paint instead of from the first scroll — a section reached immediately
  // would otherwise still be settling into the hidden state when it is asked
  // to reveal, and barely move — and the server and client agree on the
  // attribute, so nothing hydrating over the markup sees a mismatch.
  //
  // Without JavaScript the pending state is neutralised by a <noscript> rule.
  const SELECTOR = '[data-reveal-target][data-reveal="pending"]';

  // A section reveals once its top rises past this fraction of the viewport.
  const TRIGGER = 0.75;

  const targets = Array.from(document.querySelectorAll(SELECTOR)).filter(
    (target) => !target.parentElement.closest("[data-reveal-target]"),
  );

  if (!targets.length) return;

  const showAll = () => {
    targets.forEach((target) => {
      target.dataset.reveal = "shown";
    });
  };

  // Reduced motion keeps the composition, just without the movement.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    showAll();
    return;
  }

  let pending = targets;

  // A plain position test rather than an IntersectionObserver: the observer
  // only reports at threshold crossings, so a section scrolled past between
  // two crossings — or jumped over by an anchor link or a restored scroll
  // position — would stay hidden with nothing left to trigger it.
  const sweep = () => {
    const line = window.innerHeight * TRIGGER;
    // The page cannot scroll past its own end, so a final section short enough
    // to sit below the line would never cross it.
    const atPageEnd =
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 2;

    pending = pending.filter((target) => {
      if (target.getBoundingClientRect().top >= line && !atPageEnd) return true;
      target.dataset.reveal = "shown";
      return false;
    });

    if (!pending.length) {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    }
  };

  // Coalesce to one measurement per frame, so a fast scroll cannot queue up a
  // layout read per event.
  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      sweep();
    });
  };

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  sweep();
})();
