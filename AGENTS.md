# ChatGPT project context

This directory is a local mirror of the ChatGPT project “SAB-BIO”.

- Treat every file under `sources/` as read-only reference material.
- Do not edit, rename, move, or delete synced project files.
- These files may be replaced the next time a task is created from this ChatGPT project.

## Project instructions

## Portable WordPress handoff architecture

- Next.js is only the visual preview renderer. It must not own behavior that the
  WordPress implementation cannot reuse directly.
- Render semantic, copyable HTML. Route files provide content; shared blocks
  own reusable markup and class contracts.
- Keep component CSS isolated by foundation, block, section, header, and
  footer. Never add route-specific CSS.
- The shared header and footer are the only site-chrome implementations.
  `app/styles/blocks/header.css` owns the header and mobile navigation;
  `app/styles/blocks/footer.css` owns the footer.
- Interactive behavior required by the WordPress handoff must be isolated
  vanilla JavaScript under `public/scripts/`. The mobile menu must never depend
  on React state or React event handlers.
- `npm run build` exports the static preview and regenerates the WordPress-ready
  header and footer fragments in `handoff/fragments/`.
- Do not hand-maintain duplicate React and HTML implementations. Generated
  fragments must come from the rendered shared components, and contract tests
  must fail if this architecture changes.

### Block fragments

- Every block a route composes renders `data-block="<kebab-name>"` on its own
  root. `npm run build` exports one `handoff/fragments/blocks/<name>.html` per
  marker, so the WordPress theme gets the block's real markup and classes.
- Put the marker on the element the block owns, not on a page shell that does
  not forward props — the attribute would be dropped and the block would never
  be exported.

### Scroll reveal

- A block that animates into view renders both `data-reveal-target` and
  `data-reveal="pending"` on its own root. The hidden state ships in the HTML;
  `public/scripts/scroll-reveal.js` only ever flips it to `shown`.
- Applying the hidden state from script instead leaves a section that is
  scrolled to immediately still settling into hidden when it is asked to
  reveal, so nothing visibly moves — and it makes the served HTML disagree with
  anything hydrating over it.
- Transitions for the properties the hidden state sets belong under
  `[data-reveal="shown"]`, so hiding snaps and only the reveal animates. Where
  that rule outranks a base rule carrying hover transitions, repeat those in it;
  the shorthand would otherwise drop them once revealed.
- Keep `transform` out of any base transition on a revealed element.
- The root also carries `suppressHydrationWarning`. The script changes the
  attribute before a framework finishes hydrating over the markup, and this
  is React's own opt-out for an attribute a script owns after render.
