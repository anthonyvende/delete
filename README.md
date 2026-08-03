# SAB Bio design prototype

Next.js is only the visual preview renderer for the complete responsive SAB BIO
design. The transferable implementation is semantic HTML, reusable CSS,
assets, and isolated vanilla JavaScript that can be copied into a WordPress
theme without React.

```bash
npm install
npm run dev
npm test
npm run build
```

`npm run build` creates portable static HTML in `out/` for:

- Home and About Us
- Leadership and Pipeline
- How SAB-142 Works and Manufacturing
- About SAB-142 and Careers
- Terms, Privacy, and Conflict of Interest
- The foundations catalog at `/design-system/` and the block library at
  `/components/`

Page routes contain content only. Shared preview blocks own the transferable
semantic markup, and `app/styles/` owns reusable foundation, block, section,
header, and footer CSS. The mobile header behavior is framework-free in
`public/scripts/site-header.js`.

Every build regenerates the WordPress-ready fragments in `handoff/fragments/`
from the same rendered components used by the preview: the header, the footer,
and one file per block under `blocks/`. They are generated artifacts, never
parallel handwritten implementations — see `handoff/README.md`.

The contract tests reject React state in the site header, route-specific CSS,
orphan classes, undefined tokens, fixed pixel units, duplicate button styling,
and component overrides of semantic paragraph or heading rules.
