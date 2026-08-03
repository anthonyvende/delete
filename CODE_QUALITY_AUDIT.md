# SAB BIO code-quality audit

Audit date: 2026-07-31

## Rules verified

- Routes contain content/configuration only; reusable blocks own markup.
- CSS is loaded once and organized as foundations, blocks, and layouts.
- Component CSS never targets `p` or `h1`–`h6`.
- `h1`–`h6`, `p`, `a`, and `button` never own `width`, `min-width`,
  `max-width`, `height`, `min-height`, `max-height`, or equivalent logical
  size declarations. Line length and layout constraints live on neutral
  wrappers.
- Every CSS class has a source owner.
- Every concrete JSX class has a reusable CSS contract or is an intentional
  block root for its elements/modifiers.
- Colors and motion values resolve through shared tokens.
- Font sizes use fluid `clamp()` values and CSS contains no pixel units.
- Width and height rules are intrinsic, relative, or fluid.
- Content and component styles contain no static height constraints.
- Buttons, arrows, header, footer, cards, pipeline, and slider use shared
  implementations.
- Inline styles are limited to image focal points, pipeline progress, and
  design-token swatches.
- Internal navigation and legal routes resolve to real pages.
- All public assets listed below are referenced by source code.

## File-by-file review

### Application routes and layout

- ✅ `app/layout.tsx` — imports the single ordered stylesheet stack.
- ✅ `app/page.tsx` — homepage content composed from shared blocks.
- ✅ `app/about/page.tsx` — About content composed from shared blocks.
- ✅ `app/about/leadership/page.tsx` — leadership data uses `PeopleDirectory`.
- ✅ `app/pipeline/page.tsx` — pipeline data uses one `PipelineTable`.
- ✅ `app/platform/how-sab-142-works/page.tsx` — shared clinical/media blocks.
- ✅ `app/platform/manufacturing/page.tsx` — shared hero/process/benefit blocks.
- ✅ `app/patients/about-sab-142/page.tsx` — shared patient/resource blocks.
- ✅ `app/careers/page.tsx` — shared feature, values, jobs, and notices.
- ✅ `app/contact/page.tsx` — shared contact section and form primitives.
- ✅ `app/design-system/page.tsx` — renders the shared component catalog.
- ✅ `app/components/page.tsx` — renders the shared reusable component catalog scope.
- ✅ `app/terms-conditions/page.tsx` — delegates to `LegalPage`.
- ✅ `app/privacy-policy/page.tsx` — delegates to `LegalPage`.
- ✅ `app/conflict-of-interest-policy/page.tsx` — delegates to `LegalPage`.

### Shared shell, layouts, and UI

- ✅ `components/SiteHeader.tsx` — one navigation implementation.
- ✅ `components/SiteFooter.tsx` — one footer/legal implementation.
- ✅ `components/layout/PageShell.tsx` — one shared page shell.
- ✅ `components/layout/InnerPageShell.tsx` — reusable inner-page shell.
- ✅ `components/layout/Section.tsx` — reusable section spacing.
- ✅ `components/layout/CardGrid.tsx` — reusable responsive card grid.
- ✅ `components/ui/ArrowIcon.tsx` — one arrow drawing.
- ✅ `components/ui/ButtonLink.tsx` — primary/secondary/outline variants.
- ✅ `components/ui/ChevronIcon.tsx` — shared chevron drawing.
- ✅ `components/ui/CircleArrow.tsx` — shared circular arrow control.
- ✅ `components/ui/Eyebrow.tsx` — semantic eyebrow element.
- ✅ `components/ui/FormField.tsx` — shared accessible form-field primitive.
- ✅ `components/ui/MediaAction.tsx` — shared expanding media action.
- ✅ `components/ui/MediaCutout.tsx` — shared responsive media/action cutout.
- ✅ `components/ui/PageBand.tsx` — shared content-driven heading backdrop.

### Reusable blocks

- ✅ `components/blocks/ArticleGrid.tsx`
- ✅ `components/blocks/BenefitCollection.tsx`
- ✅ `components/blocks/CareersBand.tsx`
- ✅ `components/blocks/ComparisonTable.tsx`
- ✅ `components/blocks/ContactForm.tsx`
- ✅ `components/blocks/ContactSection.tsx`
- ✅ `components/blocks/ContentAside.tsx`
- ✅ `components/blocks/DesignSystemCatalog.tsx`
- ✅ `components/blocks/FactFeature.tsx`
- ✅ `components/blocks/FeatureCard.tsx`
- ✅ `components/blocks/FeatureCollection.tsx`
- ✅ `components/blocks/IconTextCard.tsx`
- ✅ `components/blocks/IconTextCollection.tsx`
- ✅ `components/blocks/ImageTextBand.tsx`
- ✅ `components/blocks/InnerHero.tsx`
- ✅ `components/blocks/JobBoard.tsx`
- ✅ `components/blocks/LandingHero.tsx`
- ✅ `components/blocks/LandingSectionStack.tsx`
- ✅ `components/blocks/LegalPage.tsx`
- ✅ `components/blocks/MediaBanner.tsx`
- ✅ `components/blocks/NextFeature.tsx`
- ✅ `components/blocks/NextStepCard.tsx`
- ✅ `components/blocks/NextStepStack.tsx`
- ✅ `components/blocks/NoticeList.tsx`
- ✅ `components/blocks/PeopleDirectory.tsx`
- ✅ `components/blocks/PersonCard.tsx`
- ✅ `components/blocks/PipelineTable.tsx`
- ✅ `components/blocks/ProcessCard.tsx`
- ✅ `components/blocks/ProcessCollection.tsx`
- ✅ `components/blocks/ResourceCollection.tsx`
- ✅ `components/blocks/SplitContent.tsx`
- ✅ `components/blocks/StudyLinkGrid.tsx`
- ✅ `components/blocks/Timeline.tsx`
- ✅ `components/icons/ValueIcon.tsx` — shared animated inline SVG icons.

### Stylesheets

- ✅ `app/styles/foundation/tokens.css` — complete shared palette, type, shape,
  shadow, and motion tokens.
- ✅ `app/styles/foundation/base.css` — reset and sole owner of `p`/heading
  typography.
- ✅ `app/styles/blocks/actions.css` — shared actions and arrow states.
- ✅ `app/styles/blocks/article-grid.css` — shared article cards/grid.
- ✅ `app/styles/blocks/cards.css` — shared card families.
- ✅ `components/PreviewScripts.tsx` — preview-only script bootstrapper; no
  behaviour, renders nothing, excluded from the handoff.
- ✅ `app/styles/blocks/benefit-collection.css` — image-beside-list benefit
  block; moved out of the shared layout sheet so the block owns its rules.
- ✅ `app/styles/blocks/legal-document.css` — long-form policy pages; moved
  out of the shared layout sheet so the block owns its rules.
- ✅ `app/styles/blocks/catalog.css` — component-catalog presentation only.
- ✅ `app/styles/blocks/header.css` — shared header and mobile navigation.
- ✅ `app/styles/blocks/footer.css` — shared responsive footer behavior.
- ✅ `app/styles/blocks/clinical-content.css` — facts/resources/comparison.
- ✅ `app/styles/blocks/content-showcase.css` — reusable landing band variants.
- ✅ `app/styles/blocks/forms.css` — shared form fields and responsive layout.
- ✅ `app/styles/blocks/hero.css` — shared inner hero.
- ✅ `app/styles/blocks/media.css` — banner slider.
- ✅ `app/styles/blocks/split-content.css` — split content block, all three variants.
- ✅ `app/styles/blocks/people-directory.css` — leadership directory.
- ✅ `app/styles/blocks/pipeline-table.css` — one responsive pipeline renderer.
- ✅ `app/styles/blocks/storytelling.css` — feature collection/timeline/next feature.
- ✅ `app/styles/blocks/workplace.css` — careers notices.
- ✅ `app/styles/sections/layouts.css` — generic containers/grids/spacing.
- ✅ `app/styles/README.md` — current CSS ownership contract.

### Content, tests, and configuration

- ✅ `content/legal.tsx` — shared legal copy source.
- ✅ `tests/site-contract.test.mjs` — permanent architecture/style contracts.
- ✅ `tests/shared-layout-regressions.test.mjs` — shared spacing and flow
  regression coverage.
- ✅ `CODE_QUALITY_AUDIT.md` — this complete, test-enforced source ledger.
- ✅ `README.md` — current routes, commands, and handoff model.
- ✅ `.gitignore` — generated dependencies, builds, caches, and browser logs.
- ✅ `package.json` — minimal Next/React dependency set.
- ✅ `package-lock.json` — locked dependency graph.
- ✅ `next.config.mjs` — static export and trailing-slash configuration.
- ✅ `next-env.d.ts` — Next TypeScript environment declaration.
- ✅ `tsconfig.json` — strict, no-emit TypeScript configuration.
- ✅ `AGENTS.md` — workspace execution instructions; not runtime code.

### Referenced public assets

- ✅ `public/vendor/three.module.js` — vendored Three.js build for the hero block.
- ✅ `public/vendor/three.core.js` — chunk imported by the Three.js build.
- ✅ `public/assets/pages/world-map.svg` — dotted world map behind the T1D figure.
- ✅ `public/assets/about-mission.jpg`
- ✅ `public/assets/about-profile.jpg`
- ✅ `public/assets/about-team.jpg`
- ✅ `public/assets/home-antibody.png`
- ✅ `public/assets/home-careers.jpg`
- ✅ `public/assets/home-hero.png`
- ✅ `public/assets/home-microscope.jpg`
- ✅ `public/assets/home-patient.jpg`
- ✅ `public/assets/home-scientist.jpg`
- ✅ `public/assets/pages/american-diabetes.png`
- ✅ `public/assets/pages/antibody-wide.webp`
- ✅ `public/assets/pages/breakthrough-t1d.png`
- ✅ `public/assets/pages/careers-hero.webp`
- ✅ `public/assets/pages/clinical-scientist.webp`
- ✅ `public/assets/pages/family-care.webp`
- ✅ `public/assets/pages/father-daughter.webp`
- ✅ `public/assets/pages/how-hero.webp`
- ✅ `public/assets/pages/leader-samuel.webp`
- ✅ `public/assets/pages/leadership-hero.webp`
- ✅ `public/assets/pages/manufacturing-hero.webp`
- ✅ `public/assets/pages/microscope-wide.webp`
- ✅ `public/assets/pages/mother-child.webp`
- ✅ `public/assets/pages/patient-doctor.webp`
- ✅ `public/assets/pages/patient-insulin.webp`
- ✅ `public/assets/pages/pipeline-hero.webp`
- ✅ `public/assets/pages/thymoglobulin.png`
- ✅ `public/assets/pages/tzield.png`
- ✅ `public/assets/pages/watermelon-kids.webp`
- ✅ `public/assets/pages/woman-t1d.webp`
- ✅ `public/assets/sab-bio-logo.svg`
- ✅ `public/assets/value-hand.svg`
- ✅ `public/assets/value-people.svg`
- ✅ `public/assets/value-shield.svg`

### Documentation history

These files were checked as documentation-only history. They are not imported
by the application and cannot affect rendered HTML or CSS.

- ✅ `docs/superpowers/plans/2026-07-30-complete-component-catalog.md`
- ✅ `docs/superpowers/plans/2026-07-30-expanding-action-hover.md`
- ✅ `docs/superpowers/plans/2026-07-30-fluid-sizing-action-system.md`
- ✅ `docs/superpowers/plans/2026-07-30-foundation-colors-fluid-type.md`
- ✅ `docs/superpowers/plans/2026-07-30-global-variables-contact-page.md`
- ✅ `docs/superpowers/plans/2026-07-30-media-banner-slider.md`
- ✅ `docs/superpowers/plans/2026-07-30-mobile-news-footer-ux.md`
- ✅ `docs/superpowers/plans/2026-07-30-responsive-pipeline.md`
- ✅ `docs/superpowers/plans/2026-07-30-static-css-cleanup.md`
- ✅ `docs/superpowers/plans/2026-07-30-reusable-pages-and-legal-routes.md`
- ✅ `docs/superpowers/plans/2026-07-30-semantic-typography-board.md`
- ✅ `docs/superpowers/plans/2026-07-30-sab-bio-design-system.md`
- ✅ `docs/superpowers/plans/2026-07-30-sab-bio-home-about-nextjs.md`
- ✅ `docs/superpowers/plans/2026-07-30-sab-bio-reusable-html-css.md`
- ✅ `docs/superpowers/plans/2026-07-30-sab-bio-six-inner-pages.md`
- ✅ `docs/superpowers/plans/2026-07-30-value-icon-animation.md`
- ✅ `docs/superpowers/specs/2026-07-30-complete-component-catalog-design.md`
- ✅ `docs/superpowers/specs/2026-07-30-expanding-action-hover-design.md`
- ✅ `docs/superpowers/specs/2026-07-30-fluid-sizing-action-system-design.md`
- ✅ `docs/superpowers/specs/2026-07-30-foundation-colors-fluid-type-design.md`
- ✅ `docs/superpowers/specs/2026-07-30-global-variables-contact-page-design.md`
- ✅ `docs/superpowers/specs/2026-07-30-media-banner-slider-design.md`
- ✅ `docs/superpowers/specs/2026-07-30-mobile-news-footer-ux-design.md`
- ✅ `docs/superpowers/specs/2026-07-30-responsive-pipeline-design.md`
- ✅ `docs/superpowers/specs/2026-07-30-reusable-pages-and-legal-routes-design.md`
- ✅ `docs/superpowers/specs/2026-07-30-sab-bio-design-system-design.md`
- ✅ `docs/superpowers/specs/2026-07-30-sab-bio-reusable-html-css-design.md`
- ✅ `docs/superpowers/specs/2026-07-30-value-icon-animation-design.md`

The empty `sources/` directory remains untouched as required.

Generated directories (`node_modules/`, `.next/`, `out/`, `.playwright-cli/`,
and `.playwright-mcp/`) are excluded from source review and ignored by Git.
`output/` contains the requested visual QA screenshots and gallery, not runtime
code.

## Cleanup completed during this audit

- Removed every nested component selector targeting a paragraph or heading.
- Replaced those selectors with reusable named block elements where layout was
  required.
- Removed the dead `.feature-grid` rule and dead markup-only classes.
- Replaced the undefined `--motion-medium` reference with
  `--motion-standard`.
- Removed five unreferenced duplicate value-icon assets.
- Added permanent class ownership, inline-style, and CSS-variable checks.
- Removed box-size declarations from every heading, paragraph, link, and
  button selector or class used by those elements.
- Moved necessary line-length constraints to neutral layout wrappers.
- Removed the job-card title-specific color path; job cards now consume the
  foundation `--heading-color` and `--paragraph-color` tokens so text, metadata,
  dot, expanding background, and arrow enter one coherent hover state.
- Corrected the landing hero copy wrapper so its desktop line length resets to
  intrinsic mobile flow.

## Final verification

- ✅ 51/51 architecture and CSS contract tests pass.
- ✅ Next.js production build and TypeScript validation pass.
- ✅ 15 static pages generate successfully.
- ✅ All 13 public routes were checked at 1440 × 900 and 390 × 844.
- ✅ Zero horizontal page overflow on every checked route.
- ✅ Zero clipped headings, paragraphs, links, or buttons on every checked
  route.
- ✅ Zero raw visual length, timing, or angle declarations remain outside the
  foundation token file.
- ✅ All 16 generated HTML documents contain unique IDs and no broken images.
- ✅ The Design System index wraps at narrow widths with every section link
  visible and no nested horizontal overflow.
- ✅ The Contact page, global variable rules, form primitives, and their live
  Design System specimens are included in the verified surface.
- ✅ Job-card hover verified in both `/design-system/` and `/careers/`: heading
  and metadata become white immediately, the blue surface expands, and the
  control finishes as a white circle with a blue right-pointing arrow.
