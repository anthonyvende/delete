"use client";

import { useEffect } from "react";

/*
 * Preview-only bootstrapper. Contains no behaviour of its own.
 *
 * The layout renders real <script> tags so the exported HTML stays copyable
 * into a WordPress theme. Some hosts — v0 and anything else that mounts the
 * component tree on the client — never execute a script written as JSX, so on
 * those the site renders with no menu, no reveal, and no hero animation.
 *
 * This loads the very same files from `public/scripts/` when it finds they are
 * not already on the page, so one implementation serves every environment. In
 * a normal browser the markup's own tags have already run and every check below
 * short-circuits, so nothing loads twice. It renders nothing, so it never
 * reaches the handoff.
 */

const SCRIPTS: { src: string; module?: boolean }[] = [
  { src: "/scripts/site-header.js" },
  { src: "/scripts/people-directory.js" },
  { src: "/scripts/microcapsule-hero.js", module: true },
  { src: "/scripts/scroll-reveal.js" },
  { src: "/scripts/media-banner.js" },
];

export function PreviewScripts() {
  useEffect(() => {
    const missing = SCRIPTS.filter(
      ({ src }) => !document.querySelector(`script[src="${src}"]`),
    );
    if (!missing.length) return;

    for (const { src, module } of missing) {
      const element = document.createElement("script");
      element.src = src;
      if (module) element.type = "module";
      else element.defer = true;
      document.body.appendChild(element);
    }
  }, []);

  return null;
}
