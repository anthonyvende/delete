import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const outDirectory = path.join(projectRoot, "out");
const handoffDirectory = path.join(projectRoot, "handoff", "fragments");
const blocksDirectory = path.join(handoffDirectory, "blocks");

const banner = "<!-- Generated from the shared Next.js preview component. -->";

const builtHomepage = await readFile(
  path.join(outDirectory, "index.html"),
  "utf8",
);

/* ---------------------------------------------------------------- chrome */

const extractChrome = (tag) => {
  const match = builtHomepage.match(new RegExp(`<${tag}\\b[\\s\\S]*?</${tag}>`));

  if (!match) {
    throw new Error(`The static homepage does not contain a <${tag}> fragment.`);
  }

  return `${banner}\n${match[0]}\n`;
};

/* ---------------------------------------------------------------- blocks */

const listPages = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const paths = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return listPages(entryPath);
      return entry.name.endsWith(".html") ? [entryPath] : [];
    }),
  );

  return paths.flat();
};

// Void elements never close, so they must not count towards nesting depth.
const VOID_ELEMENTS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

/**
 * Reads one element out of a built page by walking the tag depth from its
 * opening tag. A regex cannot do this: blocks nest elements of the same name,
 * so `<section>…</section>` would stop at the first inner close.
 */
const extractElement = (html, openTagStart) => {
  const tagName = html.slice(openTagStart + 1).match(/^[a-zA-Z][\w-]*/)?.[0];
  if (!tagName) return null;

  const tagPattern = new RegExp(`</?${tagName}\\b`, "gi");
  tagPattern.lastIndex = openTagStart;

  let depth = 0;
  let match;
  while ((match = tagPattern.exec(html))) {
    const isClosing = match[0][1] === "/";
    const tagEnd = html.indexOf(">", match.index);
    if (tagEnd === -1) return null;

    if (isClosing) {
      depth -= 1;
      if (depth === 0) return html.slice(openTagStart, tagEnd + 1);
    } else if (!VOID_ELEMENTS.has(tagName.toLowerCase())) {
      // A self-closing form opens and closes in one tag.
      depth += html[tagEnd - 1] === "/" ? 0 : 1;
    }
  }

  return null;
};

// Real content pages first, so a fragment carries realistic copy. The design
// system renders every block with specimen content, and would otherwise win
// on alphabetical order.
const isSpecimen = (page) => /(^|\/)(components|design-system)(\/|$)/.test(page);
const pages = (await listPages(outDirectory)).sort((a, b) => {
  const specimen = Number(isSpecimen(a)) - Number(isSpecimen(b));
  return specimen || a.localeCompare(b);
});
const blocks = new Map();

for (const page of pages) {
  const html = await readFile(page, "utf8");
  const marker = /<[a-zA-Z][\w-]*\b[^>]*\sdata-block="([\w-]+)"/g;
  let found;

  while ((found = marker.exec(html))) {
    const [, name] = found;
    if (blocks.has(name)) continue;

    const element = extractElement(html, found.index);
    if (!element) {
      throw new Error(`Could not read the "${name}" block out of ${page}.`);
    }

    blocks.set(name, {
      element,
      source: path.relative(outDirectory, page) || "index.html",
    });
  }
}

if (!blocks.size) {
  throw new Error(
    'No data-block markers found in the export. Blocks must render data-block="<name>" on their root.',
  );
}

/* ---------------------------------------------------------------- write */

await mkdir(blocksDirectory, { recursive: true });

await Promise.all([
  writeFile(path.join(handoffDirectory, "header.html"), extractChrome("header")),
  writeFile(path.join(handoffDirectory, "footer.html"), extractChrome("footer")),
  ...[...blocks].map(([name, { element, source }]) =>
    writeFile(
      path.join(blocksDirectory, `${name}.html`),
      `${banner}\n<!-- Rendered from /${source} — content is placeholder; the markup and classes are the contract. -->\n${element}\n`,
    ),
  ),
]);

/* ------------------------------------------------- block → stylesheet map */

// Block names do not match stylesheet names, and several blocks are styled
// from both their own file and a shared layout file. Generating the map means
// nobody has to grep for it and it cannot go stale.
const listStylesheets = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const paths = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return listStylesheets(entryPath);
      return entry.name.endsWith(".css") ? [entryPath] : [];
    }),
  );

  return paths.flat();
};

const stylesRoot = path.join(projectRoot, "app", "styles");
const stylesheets = await Promise.all(
  (await listStylesheets(stylesRoot)).sort().map(async (file) => ({
    name: path.relative(stylesRoot, file),
    text: await readFile(file, "utf8"),
  })),
);

const rootClassesOf = (element) => {
  const attribute = element.match(/^<[a-zA-Z][\w-]*\b[^>]*?\sclass="([^"]+)"/);
  return attribute ? attribute[1].split(/\s+/).filter(Boolean) : [];
};

// A block root often carries a generic wrapper class first (`page-section`,
// `container`), so every class is searched, and modifiers count as a match.
// Some roots are bare semantic wrappers with no rules of their own, so the
// BEM prefix is matched too — otherwise the block would list no stylesheet
// while its children are clearly styled somewhere.
const stylesheetsFor = (classes) => {
  const selectors = classes.map(
    (name) => new RegExp(`\\.${name}(?![\\w-])|\\.${name}--|\\.${name}__`),
  );
  return stylesheets
    .filter((sheet) => selectors.some((selector) => selector.test(sheet.text)))
    .map((sheet) => sheet.name);
};

const GENERIC = new Set([
  "container",
  "page-section",
  "page-section--tight",
  "section",
  "surface-card",
  "expanding-action",
]);

const index = [...blocks]
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([name, { element }]) => {
    const classes = rootClassesOf(element);
    // Generic wrappers appear in nearly every stylesheet, so searching them
    // would list every file for every block.
    const specific = classes.filter((c) => !GENERIC.has(c));
    const owners = stylesheetsFor(specific.length ? specific : classes);
    const styles = owners.length ? owners.map((o) => `\`${o}\``).join(", ") : "—";
    const root = (specific[0] ?? classes[0] ?? "?").replace(/^/, ".");
    return `| \`${name}\` | \`${root}\` | ${styles} |`;
  })
  .join("\n");

await writeFile(
  path.join(handoffDirectory, "README.md"),
  `# Generated fragments

Do not edit these by hand. They are regenerated from the rendered preview by
\`npm run build\` (or \`npm run handoff\`), so the markup and class contract can
never drift from what the site actually renders.

## Site chrome

- \`header.html\`
- \`footer.html\`

## Blocks

Each file is one block's root element as it renders, taken from the first page
that uses it. The copy inside is placeholder — the markup, classes, and
\`data-*\` hooks are the contract.

The stylesheet column lists every file under \`app/styles/\` that targets the
block's root class. Paths are relative to \`app/styles/\`. Where two files are
listed, the block's own file holds its appearance and the shared layout file
holds its page rhythm — copy both.

| Block | Root class | Stylesheets |
| --- | --- | --- |
${index}
`,
);

console.log(
  `Exported header, footer, and ${blocks.size} blocks to handoff/fragments/.`,
);
