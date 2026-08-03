# ChatGPT project context

This directory is a local mirror of the ChatGPT project “SAB-BIO”.

- Treat every file under `sources/` as read-only reference material.
- Do not edit, rename, move, or delete synced project files.
- These files may be replaced the next time a task is created from this ChatGPT project.

## Project instructions

## Portable WordPress handoff architecture

### Tokens

- `app/styles/foundation/tokens.css` declares the palette on `html:root`, not
  `:root`. `--accent`, `--border`, and `--muted` are also shadcn and Tailwind
  defaults, so a host shipping its own `globals.css` after this file would
  otherwise repaint the brand with its greys. Keep the extra element in that
  selector, and prefer a distinctive name for any new token.

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
- `components/PreviewScripts.tsx` is the one client component, and it holds no
  behaviour: it loads the same files from `public/scripts/` when it finds the
  layout's own `<script>` tags were never executed, which is the case on hosts
  that mount the component tree on the client (v0). In a browser those tags
  have already run and it does nothing. Keep behaviour out of it.
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
  `data-reveal="pending"` on its own root, and never changes them afterwards.
- Nothing is actually hidden until `public/scripts/scroll-reveal.js` runs and
  marks `<html data-reveal-ready>`. The CSS hides only under that marker, so a
  missing, blocked, or failed script leaves every section visible instead of
  blanking the page. Never key a hidden state off the markup alone.
- The script reveals by adding `data-revealed`, an attribute no framework
  renders, so a re-render cannot put a section back into hiding.
- Transitions for the properties the hidden state sets belong under
  `[data-reveal="shown"]`, so hiding snaps and only the reveal animates. Where
  that rule outranks a base rule carrying hover transitions, repeat those in it;
  the shorthand would otherwise drop them once revealed.
- Keep `transform` out of any base transition on a revealed element.
- The root also carries `suppressHydrationWarning`. The script changes the
  attribute before a framework finishes hydrating over the markup, and this
  is React's own opt-out for an attribute a script owns after render.
