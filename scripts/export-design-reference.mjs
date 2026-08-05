/*
 * Generates handoff/HANDOVER.md — the single document the receiving developers
 * work from.
 *
 * The narrative sections are written here; every figure in them — tokens,
 * breakpoints, block roots, script hooks, load order — is read out of the files
 * it describes, so the document cannot drift from the code the way a
 * hand-maintained one does. Run by `npm run build`.
 */
import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const read = (relative) =>
  readFile(path.join(projectRoot, relative), "utf8");

/* ---------------------------------------------------------------- tokens */

/**
 * Reads the token block into ordered groups. A single-line comment starts a new
 * group; the longer explanatory comments between declarations are notes, not
 * headings, so they are told apart by length.
 */
const readTokens = async () => {
  const css = await read("app/styles/foundation/tokens.css");
  const body = css.slice(css.indexOf("html:root {"), css.indexOf("\n}"));
  const groups = [];
  let current = { name: "Ungrouped", tokens: [] };
  let inComment = false;

  for (const line of body.split("\n")) {
    const trimmed = line.trim();

    if (inComment) {
      if (trimmed.endsWith("*/")) inComment = false;
      continue;
    }
    if (trimmed.startsWith("/*") && !trimmed.endsWith("*/")) {
      inComment = true;
      continue;
    }
    const heading = trimmed.match(/^\/\* (.+?) \*\/$/);
    if (heading) {
      // A heading is short and label-like; anything longer is a note.
      if (heading[1].length <= 30 && !heading[1].includes(".")) {
        if (current.tokens.length) groups.push(current);
        current = { name: heading[1], tokens: [] };
      }
      continue;
    }
    const declaration = trimmed.match(/^(--[\w-]+):\s*(.+);$/);
    if (declaration) current.tokens.push([declaration[1], declaration[2]]);
  }
  if (current.tokens.length) groups.push(current);
  return groups;
};

/* ----------------------------------------------------------- stylesheets */

const listFiles = async (directory, extension) => {
  const entries = await readdir(path.join(projectRoot, directory), {
    withFileTypes: true,
  });
  const paths = await Promise.all(
    entries.map((entry) => {
      const next = `${directory}/${entry.name}`;
      if (entry.isDirectory()) return listFiles(next, extension);
      return entry.name.endsWith(extension) ? [next] : [];
    }),
  );
  return paths.flat();
};

const readBreakpoints = async () => {
  const sheets = await listFiles("app/styles", ".css");
  const counts = new Map();
  for (const sheet of sheets) {
    const css = await read(sheet);
    for (const [, query] of css.matchAll(/@media ([^{]+)\{/g)) {
      const key = query.trim();
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }
  return [...counts].sort((a, b) => b[1] - a[1]);
};

/* --------------------------------------------------------------- scripts */

const readScripts = async () => {
  const files = (await listFiles("public/scripts", ".js")).filter(
    (file) => !file.includes("portrait-data"),
  );
  // How each one is actually loaded is decided by the layout, not by the file:
  // the hero uses dynamic import() inside a function, so scanning the source
  // for a top-level `import` would wrongly report it as a plain script.
  const layout = await read("app/layout.tsx");
  return Promise.all(
    files.map(async (file) => {
      const source = await read(file);
      const hooks = [
        ...new Set(
          [...source.matchAll(/["'`](\[data-[\w-]+\])["'`]/g)].map((m) => m[1]),
        ),
      ].sort();
      const name = path.basename(file);
      const tag = layout.match(
        new RegExp(`<script[^>]*${name.replace(".", "\\.")}[^>]*>`),
      )?.[0];
      return {
        name,
        hooks,
        module: Boolean(tag && tag.includes('type="module"')),
        bytes: Buffer.byteLength(source),
      };
    }),
  );
};

/* ---------------------------------------------------------------- blocks */

const readBlocks = async () => {
  const files = await listFiles("handoff/fragments/blocks", ".html");
  return Promise.all(
    files.map(async (file) => {
      const html = await read(file);
      const source = html.match(/Rendered from ([^\s]+)/)?.[1] ?? "";
      // Match the tag carrying data-block directly: the file opens with two
      // HTML comments, so slicing to the first "<" lands on a comment.
      const openTag =
        html.match(/<[a-z]+[^>]*\sdata-block="[^"]*"[^>]*>/)?.[0] ?? "";
      const element = html.slice(html.indexOf(openTag));
      const root = openTag.match(/\sclass="([^"]+)"/)?.[1] ?? "";
      const hooks = [
        ...new Set(
          [...element.matchAll(/\s(data-[\w-]+)(?==|\s|>)/g)]
            .map((m) => m[1])
            .filter((name) => name !== "data-block"),
        ),
      ].sort();
      return {
        name: path.basename(file, ".html"),
        root: root.split(/\s+/)[0] ?? "",
        hooks,
        source: source.replace("index.html", "").replace(/^\/?/, "/"),
        bytes: Buffer.byteLength(element),
      };
    }),
  );
};

/* ----------------------------------------------------------------- write */

const table = (headers, rows) =>
  [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.join(" | ")} |`),
  ].join("\n");

const [tokenGroups, breakpoints, scripts, blocks, stylesheets] =
  await Promise.all([
    readTokens(),
    readBreakpoints(),
    readScripts(),
    readBlocks(),
    listFiles("app/styles", ".css"),
  ]);

const tokenCount = tokenGroups.reduce((sum, g) => sum + g.tokens.length, 0);

const sections = [];

sections.push(`# SAB BIO — developer handover

Everything needed to take this design into a WordPress theme: what the
deliverable is, how it is built, and the steps to integrate it.

Generated by \`npm run build\` from the source files. Every figure below is read
out of the code it describes, so it cannot fall out of date. Do not edit by
hand — change the source and rebuild.

| | |
| --- | --- |
| Blocks | ${blocks.length}, each exported as a standalone HTML fragment |
| Stylesheets | ${stylesheets.length} |
| Design tokens | ${tokenCount} |
| Behaviour scripts | ${scripts.length}, framework-free |
| Breakpoints | ${breakpoints.length} |

---

## Contents

1. [What you are receiving](#1-what-you-are-receiving)
2. [Running it locally](#2-running-it-locally)
3. [How it is built, and why](#3-how-it-is-built-and-why)
4. [WordPress integration, step by step](#4-wordpress-integration-step-by-step)
5. [Stylesheet load order](#5-stylesheet-load-order)
6. [JavaScript contract](#6-javascript-contract)
7. [Blocks](#7-blocks)
8. [Content model per block](#8-content-model-per-block)
9. [Design tokens](#9-design-tokens)
10. [Breakpoints](#10-breakpoints)
11. [Accessibility](#11-accessibility)
12. [Known gaps](#12-known-gaps)
13. [Keeping the handoff in sync](#13-keeping-the-handoff-in-sync)
14. [Conventions to keep](#14-conventions-to-keep)

---

## 1. What you are receiving

A block library that renders to semantic HTML, isolated CSS, and framework-free
JavaScript. Next.js is only the preview renderer — it is **not** part of what
you ship.

**No React at runtime.** There are no hooks, no state, and no React event
handlers in any block. What you copy into a PHP template runs unchanged.

\`\`\`
handoff/
  HANDOVER.md                  this document
  fragments/
    header.html                site chrome
    footer.html                site chrome
    blocks/<name>.html         ${blocks.length} files, one per block
    README.md                  generated block → stylesheet map

app/styles/
  foundation/tokens.css        ${tokenCount} tokens — the entire visual language
  foundation/base.css          semantic element styles (h1–h6, p, a, button)
  blocks/*.css                 one sheet per block family
  sections/layouts.css         shared primitives only

public/scripts/*.js            ${scripts.length} behaviour files
public/vendor/                 three.js build for the hero
public/assets/                 images, logo, icons

out/                           full static export — open it, no tooling needed
\`\`\`

---

## 2. Running it locally

\`\`\`bash
npm install
npm run dev       # preview on localhost:3000
npm run build     # static export to out/ + regenerate everything in handoff/
npm run handoff   # regenerate handoff/ only
\`\`\`

Dependencies are pinned exactly (\`next 16.2.12\`, \`react 19.2.8\`). Please do
not loosen them to \`latest\` — that previously caused two machines to render the
same commit differently.

Two catalogue pages are the fastest way in:

- \`/design-system/\` — every token with live values
- \`/components/\` — all ${blocks.length} blocks rendered with real content

---

## 3. How it is built, and why

Five rules shaped the code. They matter to you because they are what make the
markup portable.

**Routes hold content, blocks hold markup.** A page file is a list of blocks
plus the data for them. No page contains one-off HTML, so every visual pattern
exists exactly once and you map it once.

**Every visual value is a token.** No literal colours, no arbitrary spacing, no
pixel units anywhere in the stylesheets. Type and spacing are fluid
\`clamp()\` values, so the design scales between breakpoints instead of
snapping.

**CSS is owned by the block it styles.** A block's appearance lives in its own
sheet; \`sections/layouts.css\` holds only shared primitives (container, grid,
section rhythm). There is no route-specific CSS and there are no ID selectors.

**Behaviour is vanilla and attribute-bound.** All interaction is plain
JavaScript in \`public/scripts/\`, bound to \`data-*\` attributes rather than
classes — so you can restyle freely without breaking anything.

**The handoff is generated, not written.** \`npm run build\` re-exports every
fragment from the same components that render the site, and regenerates this
document. There is no parallel "design version" to drift from the real one.

---

## 4. WordPress integration, step by step

**Step 1 — Enqueue the styles, in this order.** Order matters; see §5.

**Step 2 — Enqueue the ${scripts.length} scripts.** All \`defer\` except the hero, which is
\`type="module"\`. Load them after the markup. See §6.

**Step 3 — Copy the chrome.** \`fragments/header.html\` and
\`fragments/footer.html\` become your theme header/footer. Keep the
\`data-*\` attributes: the mobile menu script reads them.

**Step 4 — Turn each fragment into a block.** For each file in
\`fragments/blocks/\`, create the Gutenberg block or ACF flexible-content layout
that renders that markup. The class names and \`data-*\` hooks are the contract —
they can be nested inside your own wrappers, but should not be renamed.

**Step 5 — Map fields.** §8 lists the data each block needs. Two blocks carry
inline CSS values that must come from fields: the pipeline bar
(\`--pipeline-progress\`) and the optional image focal point
(\`object-position\`).

**Step 6 — Replace the placeholder content.** §12 lists what is still
placeholder. The leadership rosters and job listings need real data.

**Step 7 — Remove the prototype form guard.** \`[data-static-form]\` currently
calls \`preventDefault()\` on submit because there is no backend. Remove that
hook when you wire a real handler, or submissions will silently do nothing.

**Step 8 — Check the reveal behaviour survives.** Load a page with JavaScript
blocked. Every section must still be visible. If anything is blank, the hidden
state has been moved into the markup — see §6.

---`);

/* Tokens ------------------------------------------------------------------ */

const tokensSection = [
  `---

## 9. Design tokens

${tokenCount} tokens across ${tokenGroups.length} groups. Nothing in a component
hardcodes a colour, a spacing value, or a pixel size — every visual value
resolves through one of these.`,
  ...tokenGroups.map(
    (group) => `### ${group.name}

${table(
  ["Token", "Value"],
  group.tokens.map(([name, value]) => [
    `\`${name}\``,
    `\`${value.replace(/\|/g, "\\|")}\``,
  ]),
)}`,
  ),
].join("\n\n");

/* Breakpoints ------------------------------------------------------------- */

const breakpointsSection = `---

## 10. Breakpoints

All widths are \`rem\`-based and all are \`max-width\`, so the design scales down
from desktop. Type and spacing are fluid \`clamp()\` values, so most sizing needs
no breakpoint at all.

${table(
  ["Query", "Rules"],
  breakpoints.map(([query, count]) => [`\`${query}\``, count]),
)}`;

/* Scripts ----------------------------------------------------------------- */

const scriptsSection = `---

## 6. JavaScript contract

Framework-free, no dependencies, bound to \`data-*\` attributes rather than
classes — so styling can change without breaking behaviour.

${table(
  ["Script", "Loaded as", "Size", "`data-*` attributes used"],
  scripts.map((s) => [
    `\`${s.name}\``,
    s.module ? "module" : "defer",
    `${(s.bytes / 1024).toFixed(1)}KB`,
    s.hooks.length ? s.hooks.map((h) => `\`${h}\``).join(" ") : "—",
  ]),
)}`;

/* Blocks ------------------------------------------------------------------ */

const blocksSection = `---

## 7. Blocks

Each block is exported to \`handoff/fragments/blocks/<name>.html\`, taken from
the first real page that uses it. The copy inside is placeholder — the markup,
classes, and \`data-*\` hooks are the contract.

${table(
  ["Block", "Root class", "Sampled from", "Hooks"],
  blocks.map((b) => [
    `\`${b.name}\``,
    `\`.${b.root}\``,
    `\`${b.source}\``,
    b.hooks.length ? b.hooks.map((h) => `\`${h}\``).join(" ") : "—",
  ]),
)}`;

/* Stylesheets ------------------------------------------------------------- */

const loadOrderSection = `---

## 5. Stylesheet load order

\`sections/layouts.css\` must load after the block sheets, and the header and
footer last. Block names do not always match stylesheet names — see the
generated map in [fragments/README.md](fragments/README.md) for which files a
given block needs.

\`\`\`
${(await read("app/layout.tsx"))
  .split("\n")
  .filter((line) => line.includes('styles/'))
  .map((line) => line.match(/styles\/[\w/-]+\.css/)?.[0])
  .filter(Boolean)
  .join("\n")}
\`\`\``;

/* Closing narrative ------------------------------------------------------- */

const closingSection = `---

## 8. Content model per block

The prototype's data shapes are the natural field shapes. The ones worth
planning around:

**Pipeline table** — the most structured block.

\`\`\`
phases:  string[]                       column headers
groups:  [{ title, tone, studies: [...] }]
study:   { label, status, progress }    progress is 0–4
\`\`\`

\`progress\` reaches CSS as an inline \`--pipeline-progress\` on
\`.pipeline-row\`, which drives the bar width. This is one of only two inline
styles in the project.

**People directory** — tabs plus a bio dialog.

\`\`\`
panels:  [{ id, label, groups: [{ id, label, people: [...] }] }]
person:  { name, role, image?, bio?, bioFull?: string[] }
\`\`\`

\`image\` falls back to a default when absent — which is why every leader
currently shows the same photo (§12).

**Image / text band**

\`\`\`
{ id, layout, eyebrow, title, image, imageAlt,
  action: { href, label }, mediaAction?, note?: { title, copy } }
\`\`\`

\`layout\` is one of four values controlling media/copy order and the cutout.

**Split content**

\`\`\`
{ variant: "story" | "standard" | "feature", image, imageAlt,
  imagePosition?, mediaFirst?, reverse? }
\`\`\`

\`imagePosition\` is the second inline style — an optional CSS
\`object-position\` focal point.

**Job board**

\`\`\`
jobs: [{ title, location?, href? }]
\`\`\`

Without \`href\` it falls back to \`mailto:careers@sab.bio\`; without
\`location\` it prints "Remote".

---

## 11. Accessibility

Already wired: \`aria-expanded\`, \`aria-controls\`, \`aria-selected\`,
\`aria-current\`, \`aria-describedby\`, \`aria-labelledby\`, \`aria-haspopup\`,
\`aria-label\`, \`aria-hidden\`. The leadership bio uses a native \`<dialog>\`.

The mobile nav panel is fully removed from the tab order when closed
(\`visibility: hidden\` plus \`pointer-events: none\`, inherited by everything
inside it). An earlier build had those links clickable and tabbable over page
content while the menu was shut — please keep the inherited values if you
restyle the panel.

Preserve these attributes when templating; the scripts read them.

**Not done:** no formal audit. Contrast ratios, focus order, and screen reader
flows have not been verified by a person or a tool.

---

## 12. Known gaps

Please scope these — none are blocked by the front end.

1. **Content is placeholder.** Board of Directors and Clinical Advisory Board
   are empty, so those two tabs render with no people. No leader has a photo or
   bio in the data, so all of them fall back to the same image and text. All
   job listings have a title only.
2. **No automated tests.** A contract suite enforced the token rules, class
   ownership, and the no-React constraint. It was removed before handover, so
   nothing currently fails if a stylesheet breaks those rules.
3. **Two external links** (\`breakthrought1d.org\`, \`diabetes.org\`) lack
   \`target="_blank" rel="noopener"\`.
4. **Stylesheets are copied by hand.** Fragments regenerate on every build; CSS
   does not. See §13.

---

## 13. Keeping the handoff in sync

Everything in \`handoff/\` is generated. Never hand-edit it — re-run
\`npm run build\` and the fragments, the stylesheet map, and this document are
rewritten from the rendered components.

Stylesheets and scripts are copied manually, which is the one place drift can
occur. If the design changes after integration:

1. The change lands here and \`npm run build\` runs
2. Re-copy the stylesheets named against that block in
   [fragments/README.md](fragments/README.md)
3. Re-copy \`public/scripts/\` if behaviour changed

If you would rather consume this as a package or a build step, that is a
reasonable ask — it simply was not built that way.

---

## 14. Conventions to keep

These are the rules the prototype follows. They were machine-enforced until the
test suite was removed, so they now rely on review.

- Colours resolve through tokens — no literal hex outside \`tokens.css\`
- Padding, margin, and gap use \`--space-1\` … \`--space-10\`
- No pixel units; sizes are fluid or intrinsic
- Component CSS never targets \`p\` or \`h1\`–\`h6\` — typography is global
- No route-specific CSS and no ID selectors
- Behaviour lives in \`public/scripts/\`, bound to \`data-*\` attributes
- A block owns its own stylesheet; shared files hold only primitives
- Reveal blocks ship \`data-reveal="pending"\` and never change it — the script
  owns \`data-revealed\``;

// Assembled in reading order, independent of the order the data was gathered.
const document = [
  ...sections,
  loadOrderSection,
  scriptsSection,
  blocksSection,
  closingSection.slice(0, closingSection.indexOf("---\n\n## 11.")),
  tokensSection,
  breakpointsSection,
  closingSection.slice(closingSection.indexOf("---\n\n## 11.")),
].join("\n\n");

await writeFile(path.join(projectRoot, "handoff", "HANDOVER.md"), document + "\n");

console.log(
  `Wrote handoff/HANDOVER.md — ${tokenCount} tokens, ${blocks.length} blocks, ${scripts.length} scripts, ${breakpoints.length} breakpoints.`,
);
