# WordPress handoff

**Start with [INTEGRATION.md](INTEGRATION.md)** — the full brief for the team
building the theme. [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) is the generated
reference: every token, breakpoint, block, and script hook, read straight from
the source on each build. This file is the quick reference.

Next.js is only the visual preview renderer. The production handoff is the
semantic HTML, reusable CSS, assets, and isolated vanilla JavaScript.

After `npm run build`, the latest WordPress-ready fragments are generated at:

- `handoff/fragments/header.html`
- `handoff/fragments/footer.html`
- `handoff/fragments/blocks/<block>.html` — one file per block, listed in
  `handoff/fragments/README.md`

Every block renders `data-block="<name>"` on its root, which is how the export
finds it. A block without that marker still renders on the site but never
reaches the handoff, so a contract test fails if a route-level block omits it.

The copy inside a block fragment is placeholder — it is taken from the first
real page that uses the block. The markup, class names, and `data-*` hooks are
the contract; the text is whatever WordPress will supply.

The palette is declared on `html:root` rather than `:root` on purpose:
`--accent`, `--border`, and `--muted` collide with shadcn and Tailwind
defaults, and a theme stylesheet loading afterwards would otherwise overwrite
the brand colours. Keep that selector when porting.

Copy their component-owned styles from:

- `app/styles/blocks/header.css`
- `app/styles/blocks/footer.css`
- `app/styles/blocks/actions.css`
- `app/styles/foundation/`

`components/PreviewScripts.tsx` exists only so the Next preview works on hosts
that do not execute script tags. It renders nothing and is not part of the
handoff — WordPress enqueues the files in `public/scripts/` directly.

The mobile navigation behavior is framework-free and lives at
`public/scripts/site-header.js`. Load it with `defer` after the header markup.
Do not recreate the menu with React or WordPress-specific state.

Two more framework-free behaviors ship the same way — load each with `defer`:

- `public/scripts/people-directory.js` — leadership tabs and the biography
  `<dialog>`. Markup hooks: `[data-people-tab]`, `[data-people-panel]`,
  `[data-person-card]`.
- `public/scripts/scroll-reveal.js` — reveals sections as they scroll into
  view. Blocks ship `data-reveal-target data-reveal="pending"` on their root,
  but nothing is hidden until this script marks `<html data-reveal-ready>`, and
  it reveals by adding `data-revealed`. If the file is not enqueued, or 404s
  because the site lives under a sub-path, every section renders visible — the
  page is never blank. Load it with `defer`.
- `public/scripts/media-banner.js` — slider controls and swipe for
  `[data-media-banner]`, plus the static-prototype submit guard for
  `[data-static-form]`.

The homepage hero animation is a separate, optional block:

- Markup: a single `<canvas class="hero__canvas" data-microcapsule>` inside the
  hero's media wrapper.
- Behaviour: `public/scripts/microcapsule-hero.js`, loaded as
  `<script type="module">` (not `defer`). It is safe to load site-wide: the
  script is ~34KB and pulls in Three.js and the portrait cloud (~3MB) only
  after it finds a `[data-microcapsule]` canvas, so other routes pay nothing.
- Library: `public/vendor/three.module.js` + `three.core.js`. The hero imports
  the build by path, so no import map is needed — copy the two files across and
  nothing else. `three.module.js` resolves `./three.core.js` relatively, so keep
  them side by side.

The script sizes itself to the canvas element, runs only while the hero is on
screen, and removes the canvas entirely when the visitor prefers reduced motion
or WebGL is unavailable — the hero's `<video>`/poster shows through instead.
