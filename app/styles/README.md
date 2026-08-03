# SAB BIO CSS ownership

The styles are loaded once in `app/layout.tsx` and organized from broadest to
most specific.

## `foundation/`

- `tokens.css`: brand colors, typography families, radii, shadows, and motion.
- `base.css`: reset, document defaults, accessibility, and the only typography
  definitions for `p` and `h1`–`h6`.

Change these files only when the update should affect the complete site.
Blocks may arrange text with layout properties, but must never redefine
paragraph or heading font, size, weight, spacing, margin, or line-height.

## `blocks/`

- `actions.css`: buttons, arrow controls, and small interactive actions.
- `cards.css`: reusable content, people, process, resource, job, and next-step
  cards.
- `header.css`: shared semantic header and mobile navigation presentation.
- `footer.css`: shared semantic footer and responsive legal navigation.
- `hero.css`: reusable inner-page hero.
- `media.css`: reusable image and image/text compositions.
- `people-directory.css`: reusable leadership tabs and people grids.
- `clinical-content.css`: reusable facts, resources, and comparison data.
- `pipeline-table.css`: reusable pipeline visualization.
- `workplace.css`: reusable feature splits, job boards, and notice lists.
- `storytelling.css`: reusable profile, story, timeline, and next-feature
  blocks.
- `content-showcase.css`: landing hero and image/text showcase variants.
- `catalog.css`: reusable component-catalog presentation.

A block owns its markup, internal layout, responsive behavior, and states.
Route files supply content and select supported variants; they do not recreate
block HTML or styles.

## `sections/`

- `layouts.css`: containers, card grids, content splits, and section spacing.

Use this file only for generic composition primitives. There is deliberately no
`pages/` CSS layer: a visual rule must belong to a reusable block, layout,
token, or base primitive.

## Naming

Classes use a block/element pattern such as `.next-step__copy` and modifiers
such as `.card-grid--3`. Shared React components keep the same class contract so
their rendered HTML can be transferred directly into WordPress templates.

Route names, section IDs, and page names must never appear in CSS selectors.
