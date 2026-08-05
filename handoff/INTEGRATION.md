# SAB BIO — WordPress integration guide

For the team building the WordPress theme. Everything here describes what is in
this repository today, not an intention.

---

## 1. What this deliverable is

A block library that renders to semantic HTML, isolated CSS, and framework-free
JavaScript. Next.js is only the preview renderer — it is not part of what you
ship.

| | |
| --- | --- |
| Blocks | 25, each exported as a standalone HTML fragment |
| Stylesheets | 21 (foundation → block → shared layout) |
| Design tokens | 251, in one file |
| Behaviour scripts | 5, vanilla, no dependencies |
| Reference routes | 14, fully composed |
| Assets | 34 files, 12MB |

**No React at runtime.** There are no hooks, no state, and no React event
handlers in any block. The one client component, `components/PreviewScripts.tsx`,
carries no behaviour — it only loads the same `public/scripts/` files on hosts
that do not execute script tags, and renders nothing.

---

## 2. Repository map

```
handoff/fragments/
  header.html                  site chrome
  footer.html                  site chrome
  blocks/<block>.html          25 files, one per block
  README.md                    GENERATED block → stylesheet map

app/styles/
  foundation/tokens.css        251 tokens — the whole palette, type, spacing
  foundation/base.css          semantic element styles (h1–h6, p, a, button)
  blocks/*.css                 one sheet per block family
  sections/layouts.css         shared primitives only (container, grid, rhythm)

public/scripts/*.js            5 behaviour files
public/vendor/                 three.js build for the hero (2MB)
public/assets/                 images, logo, icons (12MB)

out/                           full static export — browsable without tooling
```

`npm run build` regenerates every fragment from the same components that render
the site, so the handoff cannot drift from what is actually rendered. The
stylesheets are **not** regenerated — they are copied by hand (see §11).

---

## 3. Running it

```bash
npm install
npm run dev       # preview at localhost:3000
npm run build     # static export to out/ + regenerate handoff/fragments/
npm run handoff   # regenerate fragments only
```

Dependencies are pinned exactly (`next 16.2.12`, `react 19.2.8`). Do not loosen
them to `latest` — that previously caused two machines to render differently.

Two catalogue pages are the fastest way in:

- `/design-system/` — every token with live values: colour, type scale, spacing,
  motion, shadows, radii
- `/components/` — all 25 blocks rendered with real content

---

## 4. CSS load order — this matters

```
tokens.css
base.css
blocks/*.css          (any order among themselves)
sections/layouts.css  MUST come after the block sheets
blocks/header.css
blocks/footer.css     header and footer last
```

`handoff/fragments/README.md` contains a generated table mapping each block to
the stylesheets that target it. Several blocks need two files — their own plus
`sections/layouts.css` — and that table is the authority, because block names do
not always match stylesheet names (`careers-band` lives in
`content-showcase.css`, `study-link-grid` in `cards.css`).

### The one trap

Tokens are declared on `html:root`, not `:root`:

```css
html:root {
  --accent: #2e3a8d;
  ...
}
```

`--accent`, `--border`, and `--muted` are also shadcn and Tailwind defaults. A
theme stylesheet that defines them on `:root` and loads afterwards will
otherwise repaint the brand with its own greys — the brand blue silently becomes
a near-white. Keep the extra element in that selector. If you add tokens, give
them distinctive names.

---

## 5. JavaScript contract

Five files. All `defer` except the hero, which is `type="module"`. Load them
after the markup.

```html
<script src="/scripts/site-header.js" defer></script>
<script src="/scripts/people-directory.js" defer></script>
<script type="module" src="/scripts/microcapsule-hero.js"></script>
<script src="/scripts/scroll-reveal.js" defer></script>
<script src="/scripts/media-banner.js" defer></script>
```

Every script binds to `data-*` attributes, never to classes, so you can restyle
without breaking behaviour.

| Script | Markup hooks |
| --- | --- |
| `site-header.js` | `[data-site-header]` `[data-menu-toggle]` `[data-menu-panel]` |
| `people-directory.js` | `[data-people-tab]` `[data-people-panel]` `[data-person-card]` `[data-person-dialog]` `[data-person-close]` |
| `media-banner.js` | `[data-media-banner]` `[data-banner-frame]` `[data-banner-slide]` `[data-banner-dot]` `[data-static-form]` |
| `scroll-reveal.js` | `[data-reveal-target]` |
| `microcapsule-hero.js` | `[data-microcapsule]` (a `<canvas>`) |

### Scroll reveal — read before changing

Blocks ship `data-reveal-target data-reveal="pending"` on their root. **Nothing
is actually hidden until the script sets `<html data-reveal-ready>`.** The CSS
hides only under that marker.

This is deliberate. If the script is not enqueued, is blocked, or 404s because
the site lives under a sub-path, every section renders visible instead of the
page going blank. Do not move the hidden state into the markup alone.

The script reveals by adding `data-revealed` — an attribute no framework
renders — so a re-render cannot put a section back into hiding.

### Contact form

`[data-static-form]` has a submit guard that calls `preventDefault()`, because
the prototype has no backend. **Remove that hook when you wire a real handler**,
or submissions will silently do nothing. Fields: email, tel, select, textarea,
submit.

### Hero animation

`microcapsule-hero.js` imports `/vendor/three.module.js` **by path** — no import
map is needed. `three.module.js` resolves its own `./three.core.js` relatively,
so keep the two vendor files side by side.

It degrades on its own: with `prefers-reduced-motion` or no WebGL2 it removes
the canvas so the poster image shows through. It only runs while the hero is on
screen, and pulls its ~3MB of dependencies only after it finds the canvas, so it
is safe to enqueue site-wide.

---

## 6. Block inventory and source pages

Each fragment is taken from the first real page that uses the block. The copy
inside is placeholder — the markup, classes, and `data-*` hooks are the
contract.

| Block | Root class | Sampled from |
| --- | --- | --- |
| `landing-hero` | `.hero.hero--immersive` | `/` |
| `inner-hero` | `.inner-hero` | `/about/` |
| `image-text-band` | `.image-text-band` | `/` |
| `split-content` | `.split-content` | `/about/` |
| `feature-collection` | `.feature-collection` | `/about/` |
| `benefit-collection` | `.benefit-collection` | `/platform/manufacturing/` |
| `icon-text-collection` | `.page-section` | `/patients/about-sab-142/` |
| `process-collection` | `.page-section` | `/platform/manufacturing/` |
| `resource-collection` | `.resource-collection` | `/patients/about-sab-142/` |
| `pipeline-table` | `.pipeline-overview` | `/pipeline/` |
| `comparison-table` | `.comparison` | `/platform/how-sab-142-works/` |
| `timeline` | `.timeline-section` | `/about/` |
| `people-directory` | `.people-directory` | `/about/leadership/` |
| `article-grid` | `.article-section` | `/` |
| `job-board` | `.page-section` | `/careers/` |
| `media-banner` | `.media-banner` | `/patients/about-sab-142/` |
| `careers-band` | `.careers-band` | `/` |
| `next-feature` | `.next-feature-section` | `/about/` |
| `next-step-stack` | `.next-steps` | `/about/leadership/` |
| `content-aside` | `.content-aside` | `/pipeline/` |
| `study-link-grid` | `.study-links` | `/pipeline/` |
| `fact-feature` | `.fact-feature` | `/patients/about-sab-142/` |
| `notice-list` | `.notice-list` | `/careers/` |
| `contact-section` | `.page-section` | `/contact/` |
| `legal-page` | `.legal-document` | `/conflict-of-interest-policy/` |

---

## 7. Field shapes for CMS mapping

The prototype's component props are the natural field shape. A few worth
planning around:

**Pipeline table** — the most structured block.
```
phases: string[]                     column headers
groups: [{ title, tone, studies: [{ label, status, progress }] }]
progress: number 0–4                 drives bar width
```
`progress` reaches CSS as an inline `--pipeline-progress` on `.pipeline-row`.
This is one of only two inline styles in the whole project.

**People directory** — tabs plus a bio dialog.
```
panels: [{ id, label, groups: [{ id, label, people: [...] }] }]
person: { name, role, image?, bio?, bioFull?: string[] }
```
`image` falls back to a default when absent — which is why every leader
currently shows the same photo (see §10).

**Image/text band**
```
{ id, layout, eyebrow, title, image, imageAlt,
  action: { href, label }, mediaAction?, note?: { title, copy } }
```
`layout` is one of four values controlling media/copy order and the cutout.

**Split content**
```
{ variant: "story" | "standard" | "feature", image, imageAlt,
  imagePosition?, mediaFirst?, reverse? }
```
`imagePosition` is the second inline style — an optional CSS `object-position`
focal point.

**Job board**
```
jobs: [{ title, location?, href? }]
```
Without `href` it falls back to `mailto:careers@sab.bio`; without `location` it
prints "Remote".

---

## 8. Responsive model

Six breakpoints, all `max-width`, all in `rem`:

| Breakpoint | Purpose |
| --- | --- |
| `73.75rem` (1180px) | desktop nav → mobile panel; main layout shifts |
| `56.25rem` (900px) | article grid columns |
| `50rem` (800px) | split/benefit grids collapse |
| `43.75rem` (700px) | phone layout; tightened section rhythm |
| `73.8125–119.9375rem` | wide-desktop refinements |
| `prefers-reduced-motion` | 8 stylesheets + both animation scripts |

Type and spacing are fluid `clamp()` values, so most sizing scales without a
breakpoint. There are no pixel units in the stylesheets by design — please keep
it that way, and use the spacing scale (`--space-1` … `--space-10`) rather than
arbitrary values.

---

## 9. Accessibility already wired

`aria-expanded`, `aria-controls`, `aria-selected`, `aria-current`,
`aria-describedby`, `aria-labelledby`, `aria-haspopup`, `aria-label`,
`aria-hidden`.

The leadership bio uses a native `<dialog>`. The mobile nav panel is fully
removed from the tab order when closed (`visibility: hidden` plus
`pointer-events: none`, inherited by everything inside it) — an earlier bug had
those links clickable and tabbable over page content while the menu was shut.

Preserve these attributes when templating; the scripts read them.

**Not yet done:** no formal audit — contrast ratios, focus order, and screen
reader flows have not been verified by a person or a tool.

---

## 10. Known gaps — please scope

1. **Content is placeholder.** Board of Directors and Clinical Advisory Board
   are empty arrays, so those two tabs render empty. No leader has a photo or
   bio in the data, so all eight fall back to the same image and text. All nine
   job listings have a title only.
2. **No automated tests.** A 55-check contract suite enforced the token rules,
   class ownership, and the no-React constraint. It was removed before handover.
   Nothing currently fails if a stylesheet breaks those rules.
3. **Two external links** (`breakthrought1d.org`, `diabetes.org`) lack
   `target="_blank" rel="noopener"`.
4. **Stylesheets are copied by hand.** Fragments regenerate on every build;
   CSS does not. See §11.

---

## 11. Keeping the handoff in sync

Fragments are generated — never hand-edit `handoff/fragments/`. Re-run
`npm run build` and the 25 block files, header, footer, and the stylesheet map
are rewritten from the rendered components.

Stylesheets and scripts are copied manually today, which is the one place drift
can occur. If the design changes after integration, the safest flow is:

1. Change lands here, `npm run build` runs
2. Re-copy the affected stylesheet(s) named in
   `handoff/fragments/README.md`
3. Re-copy `public/scripts/` if behaviour changed

If you would rather consume this as a package or a build step, that is a
reasonable ask — it just was not built that way.

---

## 12. Conventions to keep

These are the rules the prototype follows. They were machine-enforced until the
test suite was removed, so they now rely on review.

- Colours resolve through tokens — no literal hex outside `tokens.css`
- Padding, margin, and gap use `--space-1` … `--space-10`
- No pixel units; sizes are fluid or intrinsic
- Component CSS never targets `p` or `h1`–`h6` — typography is global
- No route-specific CSS and no ID selectors
- Behaviour lives in `public/scripts/`, bound to `data-*` attributes
- A block owns its own stylesheet; shared layout files hold only primitives
- Every reveal block ships `data-reveal="pending"` and never changes it —
  the script owns `data-revealed`
