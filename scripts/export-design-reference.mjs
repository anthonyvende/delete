/*
 * Generates handoff/DESIGN-SYSTEM.md from the source itself.
 *
 * Every number in that document — tokens, breakpoints, block roots, script
 * hooks — is read out of the files it describes, so the reference cannot drift
 * from the code the way a hand-written one does. Run by `npm run build`.
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

sections.push(`# SAB BIO — design system reference

Generated by \`npm run build\` from the source files themselves. Every value
below is read out of the code it documents, so this cannot drift. Do not edit
by hand.

| | |
| --- | --- |
| Design tokens | ${tokenCount} |
| Stylesheets | ${stylesheets.length} |
| Blocks | ${blocks.length} |
| Behaviour scripts | ${scripts.length} |
| Breakpoints | ${breakpoints.length} |

For integration instructions — load order, field shapes, known gaps — see
[INTEGRATION.md](INTEGRATION.md).

---

## How to read this

Tokens are declared on \`html:root\` in \`app/styles/foundation/tokens.css\`.
The extra element in that selector is deliberate: \`--accent\`, \`--border\`, and
\`--muted\` are also shadcn and Tailwind defaults, so a host stylesheet loading
afterwards would otherwise repaint the brand with its own greys.

Nothing in a component may hardcode a colour, a spacing value, or a pixel size.
Every visual value resolves through a token below.`);

/* Tokens ------------------------------------------------------------------ */

sections.push(`---

## 1. Design tokens

${tokenCount} tokens across ${tokenGroups.length} groups.`);

for (const group of tokenGroups) {
  sections.push(`### ${group.name}

${table(
  ["Token", "Value"],
  group.tokens.map(([name, value]) => [
    `\`${name}\``,
    `\`${value.replace(/\|/g, "\\|")}\``,
  ]),
)}`);
}

/* Breakpoints ------------------------------------------------------------- */

sections.push(`---

## 2. Breakpoints

All widths are \`rem\`-based and all are \`max-width\`, so the design scales down
from desktop. Type and spacing are fluid \`clamp()\` values, so most sizing needs
no breakpoint at all.

${table(
  ["Query", "Rules"],
  breakpoints.map(([query, count]) => [`\`${query}\``, count]),
)}`);

/* Scripts ----------------------------------------------------------------- */

sections.push(`---

## 3. Behaviour scripts

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
)}`);

/* Blocks ------------------------------------------------------------------ */

sections.push(`---

## 4. Blocks

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
)}`);

/* Stylesheets ------------------------------------------------------------- */

sections.push(`---

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
\`\`\``);

await writeFile(
  path.join(projectRoot, "handoff", "DESIGN-SYSTEM.md"),
  sections.join("\n\n") + "\n",
);

console.log(
  `Wrote handoff/DESIGN-SYSTEM.md — ${tokenCount} tokens, ${blocks.length} blocks, ${scripts.length} scripts.`,
);
