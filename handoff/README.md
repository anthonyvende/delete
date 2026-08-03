# WordPress handoff

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

Copy their component-owned styles from:

- `app/styles/blocks/header.css`
- `app/styles/blocks/footer.css`
- `app/styles/blocks/actions.css`
- `app/styles/foundation/`

The mobile navigation behavior is framework-free and lives at
`public/scripts/site-header.js`. Load it with `defer` after the header markup.
Do not recreate the menu with React or WordPress-specific state.

Two more framework-free behaviors ship the same way — load each with `defer`:

- `public/scripts/people-directory.js` — leadership tabs and the biography
  `<dialog>`. Markup hooks: `[data-people-tab]`, `[data-people-panel]`,
  `[data-person-card]`.
- `public/scripts/scroll-reveal.js` — reveals sections as they scroll into
  view. Each block ships hidden by rendering both `data-reveal-target` and
  `data-reveal="pending"` on its root; the script only ever flips that to
  `data-reveal="shown"` once the section's top crosses 75% of the viewport.
  The hidden state must stay in the served HTML — applying it from script
  instead leaves a section that is scrolled to immediately still settling into
  hidden when it is asked to reveal, so nothing visibly moves. Without the
  script nothing would reveal at all, so the document `<head>` carries a
  `<noscript>` rule that clears the pending state.
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
- Library: `public/vendor/three.module.js` + `three.core.js`, resolved by the
  import map in the document `<head>`:

  ```html
  <script type="importmap">
    { "imports": { "three": "/vendor/three.module.js" } }
  </script>
  ```

The script sizes itself to the canvas element, runs only while the hero is on
screen, and removes the canvas entirely when the visitor prefers reduced motion
or WebGL is unavailable — the hero's `<video>`/poster shows through instead.
