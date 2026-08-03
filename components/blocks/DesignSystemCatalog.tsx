import type { ReactNode } from "react";
import { CardGrid } from "../layout/CardGrid";
import { Section } from "../layout/Section";
import { ButtonLink } from "../ui/ButtonLink";
import { CircleArrow } from "../ui/CircleArrow";
import { Eyebrow } from "../ui/Eyebrow";
import { FormField } from "../ui/FormField";
import { MediaAction } from "../ui/MediaAction";
import { ArticleGrid } from "./ArticleGrid";
import { BenefitCollection } from "./BenefitCollection";
import { CareersBand } from "./CareersBand";
import { ComparisonTable, type ComparisonRow } from "./ComparisonTable";
import { ContentAside } from "./ContentAside";
import { ContactForm } from "./ContactForm";
import { ContactSection } from "./ContactSection";
import { FactFeature } from "./FactFeature";
import { FeatureCard } from "./FeatureCard";
import { FeatureCollection } from "./FeatureCollection";
import { IconTextCard } from "./IconTextCard";
import { IconTextCollection } from "./IconTextCollection";
import { ImageTextBand } from "./ImageTextBand";
import { InnerHero } from "./InnerHero";
import { JobBoard } from "./JobBoard";
import { LandingHero } from "./LandingHero";
import { LandingSectionStack } from "./LandingSectionStack";
import { MediaBanner } from "./MediaBanner";
import { NextFeature } from "./NextFeature";
import { NextStepCard } from "./NextStepCard";
import { NextStepStack } from "./NextStepStack";
import { NoticeList } from "./NoticeList";
import { PeopleDirectory } from "./PeopleDirectory";
import { PersonCard } from "./PersonCard";
import { PipelineTable, type PipelineGroup } from "./PipelineTable";
import { ProcessCard } from "./ProcessCard";
import { ProcessCollection } from "./ProcessCollection";
import { ResourceCollection } from "./ResourceCollection";
import { SplitContent } from "./SplitContent";
import { StudyLinkGrid } from "./StudyLinkGrid";
import { Timeline, type TimelineItem } from "./Timeline";

const foundationTokenGroups = [
  {
    name: "Colors",
    layout: "swatches",
    tokens: [
      "--bg",
      "--surface",
      "--fg",
      "--copy",
      "--muted",
      "--muted-secondary",
      "--border",
      "--border-strong",
      "--accent",
      "--teal",
      "--teal-bright",
      "--soft-blue",
      "--hero-scrim-soft",
      "--hero-scrim",
      "--mask-opaque",
      "--hero-blue",
      "--blue-mid",
      "--blue-light",
      "--blue-rule",
      "--pipeline-blue",
      "--pipeline-surface",
      "--warning",
      "--heading-color",
      "--paragraph-color",
      "--surface-72",
      "--surface-78",
      "--surface-90",
      "--surface-97",
      "--surface-99",
      "--surface-22",
      "--fg-07",
      "--fg-08",
      "--fg-09",
      "--fg-10",
      "--fg-12",
      "--fg-15",
      "--fg-16",
      "--fg-18",
      "--fg-30",
      "--accent-10",
      "--accent-11",
      "--accent-20",
      "--accent-24",
      "--accent-28",
      "--accent-50",
      "--accent-70",
      "--teal-14",
      "--warning-14",
    ],
  },
  {
    name: "Font families",
    layout: "specimens",
    tokens: ["--font-display", "--font-body"],
  },
  {
    name: "Type scale",
    layout: "specimens",
    tokens: [
      "--font-size-micro",
      "--font-size-tiny",
      "--font-size-caption",
      "--font-size-caption-tight",
      "--font-size-label",
      "--font-size-small",
      "--font-size-body",
      "--font-size-body-compact",
      "--font-size-body-wide",
      "--font-size-action",
      "--font-size-h5",
      "--font-size-lead-compact",
      "--font-size-h4",
      "--font-size-card-title",
      "--font-size-card-title-wide",
      "--font-size-pipeline-title",
      "--font-size-emphasis",
      "--font-size-h3",
      "--font-size-card-heading",
      "--font-size-card-heading-wide",
      "--font-size-section",
      "--font-size-section-compact",
      "--font-size-display-small",
      "--font-size-h2",
      "--font-size-h1",
    ],
  },
  {
    name: "Font weights",
    layout: "specimens",
    tokens: [
      "--font-weight-regular",
      "--font-weight-medium",
      "--font-weight-semibold",
      "--font-weight-bold",
    ],
  },
  {
    name: "Line heights and tracking",
    layout: "specimens",
    tokens: [
      "--line-height-none",
      "--line-height-solid",
      "--line-height-display",
      "--line-height-heading",
      "--line-height-heading-relaxed",
      "--line-height-tight",
      "--line-height-snug",
      "--line-height-subheading",
      "--line-height-action",
      "--line-height-copy-compact",
      "--line-height-card",
      "--line-height-balanced",
      "--line-height-lead",
      "--line-height-copy",
      "--line-height-relaxed",
      "--line-height-loose",
      "--line-height-caption",
      "--line-height-control",
      "--tracking-tight",
      "--tracking-wide",
    ],
  },
  {
    name: "Spacing scale",
    layout: "scale",
    tokens: [
      "--space-1",
      "--space-2",
      "--space-3",
      "--space-4",
      "--space-5",
      "--space-6",
      "--space-7",
      "--space-8",
      "--space-9",
      "--space-10",
    ],
  },
  {
    name: "Content measures",
    layout: "scale",
    tokens: [
      "--measure-page",
      "--measure-header",
      "--measure-content",
      "--measure-copy",
      "--measure-hero-copy",
      "--measure-hero-intro",
      "--measure-hero-fill",
      "--measure-menu",
      "--measure-submenu",
      "--bleed-inline",
      "--measure-media",
      "--measure-comparison",
      "--measure-pipeline",
      "--measure-pipeline-compact",
      "--measure-next-feature",
      "--brand-header",
      "--brand-header-compact",
      "--brand-header-mobile",
      "--brand-footer",
      "--brand-footer-mobile",
    ],
  },
  {
    name: "Control dimensions",
    layout: "scale",
    tokens: [
      "--control-action-block",
      "--control-size-sm",
      "--control-size-md",
      "--control-size-lg",
      "--control-icon-size",
      "--control-menu-icon",
      "--control-inline-inset",
      "--header-mobile-offset",
      "--status-dot-size",
      "--status-dot-align",
    ],
  },
  {
    name: "Interaction transforms",
    layout: "specimens",
    tokens: [
      "--transform-arrow-rest",
      "--transform-arrow-hover",
      "--transform-chevron-open",
      "--transform-menu-open-start",
      "--transform-menu-open-end",
      "--transform-menu-hidden",
      "--transform-menu-mobile-hidden",
      "--transform-reveal-hidden",
      "--transform-reveal-inline",
      "--transform-reveal-inline-end",
      "--transform-reveal-scale",
      "--transform-reveal-shown",
      "--form-label-rest",
      "--form-label-rest-block",
      "--form-label-float",
      "--opacity-hover",
      "--transform-lift",
      "--transform-nudge-right",
      "--transform-icon-hover",
      "--transform-people-left",
      "--transform-people-center",
      "--transform-people-right",
      "--transform-clock-mid",
      "--transform-clock-settle",
      "--transform-speed-lines",
      "--transform-hand-lift",
      "--transform-antibody-left",
      "--transform-antibody-right",
      "--transform-vial-tilt",
      "--transform-dot-hover",
      "--transform-button-press",
      "--transform-button-active",
      "--transform-button-sheen-rest",
      "--transform-button-sheen-travel",
    ],
  },
  {
    name: "Stroke weights",
    layout: "tiles",
    tokens: ["--stroke-thin", "--stroke-medium", "--stroke-strong"],
  },
  {
    name: "Corner radius",
    layout: "tiles",
    tokens: [
      "--radius-2xs",
      "--radius-sm",
      "--radius-md",
      "--radius-shell",
      "--radius-lg",
      "--radius-xl",
      "--radius-2xl",
      "--radius-card",
      "--radius-3xl",
      "--radius-4xl",
      "--radius-media",
      "--radius-5xl",
      "--radius-circle",
      "--radius-pill",
    ],
  },
  {
    name: "Focus and underline offsets",
    layout: "tiles",
    tokens: [
      "--outline-offset",
      "--outline-offset-roomy",
      "--underline-offset",
    ],
  },
  {
    name: "Depth",
    layout: "tiles",
    tokens: [
      "--shadow-card",
      "--shadow-soft",
      "--shadow-card-light",
      "--shadow-card-hover",
      "--shadow-card-raised",
      "--shadow-menu",
      "--shadow-action",
      "--shadow-action-hover",
    ],
  },
  {
    name: "Image filters",
    layout: "tiles",
    tokens: ["--filter-soft-blur", "--filter-saturated"],
  },
  {
    name: "Media ratios",
    layout: "tiles",
    tokens: [
      "--ratio-square",
      "--ratio-portrait",
      "--ratio-landscape",
      "--ratio-wide",
      "--ratio-banner",
      "--ratio-feature-banner",
    ],
  },
  {
    name: "Layers",
    layout: "scale",
    tokens: [
      "--layer-behind",
      "--layer-base",
      "--layer-content",
      "--layer-raised",
      "--layer-header",
    ],
  },
  {
    name: "Transition timings",
    layout: "specimens",
    tokens: [
      "--duration-reduced",
      "--duration-quick",
      "--duration-fast",
      "--duration-standard",
      "--duration-medium",
      "--duration-slow",
      "--duration-image",
      "--duration-expansion",
      "--duration-reveal",
      "--duration-deliberate",
      "--duration-unhurried",
    ],
  },
  {
    name: "Easing and motion recipes",
    layout: "specimens",
    tokens: [
      "--ease-standard",
      "--ease-emphasized",
      "--ease-expansion",
      "--ease-reveal",
      "--motion-quick",
      "--motion-fast",
      "--motion-standard",
      "--motion-medium",
      "--motion-slow",
      "--motion-image",
      "--motion-expansion",
      "--motion-reveal",
      "--motion-deliberate",
      "--motion-unhurried",
    ],
  },
  {
    name: "Icon animations",
    layout: "specimens",
    tokens: [
      "--animation-people",
      "--animation-shield",
      "--animation-heartbeat",
      "--animation-clock",
      "--animation-speed-lines",
      "--animation-hand",
      "--animation-rays",
      "--animation-antibody",
      "--animation-vial",
      "--animation-button-sheen",
      "--animation-icon-intro",
      "--animation-icon-draw",
    ],
  },
] as const;

const foundationSections = [
  {
    id: "colors",
    number: "02",
    eyebrow: "Palette",
    title: "Color",
    intro:
      "Brand, surface, text, state, and transparent colors used throughout the interface.",
    groups: ["Colors"],
  },
  {
    id: "typography",
    number: "03",
    eyebrow: "Language",
    title: "Typography",
    intro:
      "Semantic HTML carries the shared type system. Components inherit these rules instead of redefining them.",
    groups: [],
  },
  {
    id: "layout-spacing",
    number: "04",
    eyebrow: "Rhythm",
    title: "Layout and spacing",
    intro:
      "A ten-step spacing scale and shared measures keep every page aligned and responsive.",
    groups: ["Spacing scale", "Content measures", "Control dimensions"],
  },
  {
    id: "shape-depth",
    number: "05",
    eyebrow: "Surface",
    title: "Shape and depth",
    intro:
      "Shared strokes, corners, shadows, filters, ratios, and layers define the visual character of every block.",
    groups: [
      "Stroke weights",
      "Corner radius",
      "Focus and underline offsets",
      "Depth",
      "Image filters",
      "Media ratios",
      "Layers",
    ],
  },
  {
    id: "motion",
    number: "06",
    eyebrow: "Behavior",
    title: "Motion",
    intro:
      "One motion language covers transforms, timings, easing, transitions, and icon animation.",
    groups: [
      "Interaction transforms",
      "Transition timings",
      "Easing and motion recipes",
      "Icon animations",
    ],
  },
] as const;

// Mirrors `foundationSections`: one list drives both the "On this page" index
// and each section's eyebrow, so the two catalog pages share a structure and
// the numbering can never drift from the sections actually rendered.
const componentSections = [
  { id: "forms", number: "01", eyebrow: "Components", title: "Forms" },
  { id: "actions", number: "02", eyebrow: "Components", title: "Actions" },
  {
    id: "cards",
    number: "03",
    eyebrow: "Components",
    title: "Card primitives",
  },
  {
    id: "heroes",
    number: "04",
    eyebrow: "Components",
    title: "Heroes and media",
  },
  {
    id: "content-layouts",
    number: "05",
    eyebrow: "Components",
    title: "Content layouts",
  },
  {
    id: "collections",
    number: "06",
    eyebrow: "Components",
    title: "Collections",
  },
  {
    id: "data-displays",
    number: "07",
    eyebrow: "Components",
    title: "Data displays",
  },
  {
    id: "navigation",
    number: "08",
    eyebrow: "Components",
    title: "Next-step navigation",
  },
  {
    id: "templates",
    number: "09",
    eyebrow: "Reference",
    title: "Live page templates",
  },
] as const;

const componentSection = (id: (typeof componentSections)[number]["id"]) => {
  const section = componentSections.find((entry) => entry.id === id);
  if (!section) throw new Error(`Unknown component section: ${id}`);
  return {
    id: section.id,
    eyebrow: `${section.number} / ${section.eyebrow}`,
    title: section.title,
  };
};

function getFoundationTokenExample(token: string) {
  if (
    token.includes("color") ||
    token.includes("blue") ||
    /--(bg|surface|fg|copy|muted|border|accent|teal|blue|pipeline|warning)/.test(
      token,
    )
  ) {
    return { kind: "color", label: "Colour" };
  }

  if (token.includes("font-display") || token.includes("font-body")) {
    return { kind: "font-family", label: "Font family" };
  }

  if (token.includes("font-size")) {
    return { kind: "font-size", label: "Type size" };
  }

  if (token.includes("font-weight")) {
    return { kind: "font-weight", label: "Type weight" };
  }

  if (token.includes("line-height")) {
    return { kind: "line-height", label: "Line height" };
  }

  if (token.includes("tracking")) {
    return { kind: "tracking", label: "Letter spacing" };
  }

  if (token.includes("space")) {
    return {
      kind: "spacing",
      label: `Step ${token.replace("--space-", "")}`,
    };
  }

  if (token.includes("measure") || token.includes("brand")) {
    return { kind: "measure", label: "Content measure" };
  }

  if (token.includes("control") || token.includes("header-mobile")) {
    return { kind: "control", label: "Control size" };
  }

  if (token.includes("status-dot-align")) {
    return { kind: "transform", label: "Status alignment" };
  }

  if (token.includes("status")) {
    return { kind: "status", label: "Status marker" };
  }

  if (token.includes("transform")) {
    return { kind: "transform", label: "Movement" };
  }

  if (token.includes("stroke")) {
    return { kind: "stroke", label: "Stroke weight" };
  }

  if (token.includes("radius")) {
    return { kind: "radius", label: "Corner shape" };
  }

  if (token.includes("outline") || token.includes("underline")) {
    return { kind: "offset", label: "Focus or underline offset" };
  }

  if (token.includes("shadow")) {
    return { kind: "shadow", label: "Elevation" };
  }

  if (token.includes("filter")) {
    return { kind: "filter", label: "Image treatment" };
  }

  if (token.includes("layer")) {
    return { kind: "layer", label: "Stacking order" };
  }

  if (token.includes("duration")) {
    return { kind: "duration", label: "Transition speed" };
  }

  if (token.startsWith("--ratio-")) {
    return { kind: "ratio", label: "Media proportion" };
  }

  if (token.includes("ease")) {
    return { kind: "easing", label: "Transition curve" };
  }

  if (token.includes("motion")) {
    return { kind: "motion", label: "Transition recipe" };
  }

  if (token.includes("animation")) {
    return { kind: "animation", label: "Repeating motion" };
  }

  return { kind: "reference", label: "Foundation value" };
}

function getFoundationSampleText(kind: string) {
  if (kind === "font-family") return "Science changes lives";
  if (kind === "font-size") return "Aa";
  if (kind === "font-weight") return "Type weight";
  if (kind === "line-height") return "Line height\nshown clearly";
  if (kind === "tracking") return "Tracking";
  return "Ab";
}

const featureItems = [
  {
    icon: "people",
    title: "Put People First",
    copy: "We see the person and the families behind every diagnosis.",
  },
  {
    icon: "shield",
    title: "Rethink What’s Possible",
    copy: "We are brave enough to see the potential and explore it.",
  },
  {
    icon: "clock",
    title: "Move with Urgency",
    copy: "We move fast because every day counts.",
  },
  {
    icon: "hand",
    title: "Deliver Excellence",
    copy: "We say it, we mean it, and we prove it.",
  },
];

const iconTextItems = [
  {
    icon: "/assets/value-hand.svg",
    title: "Understand the disease",
    copy: "Start with the person and the biology behind the diagnosis.",
  },
  {
    icon: "/assets/value-shield.svg",
    title: "Address the source",
    copy: "Design therapies that modify disease, not only its symptoms.",
  },
  {
    icon: "/assets/value-people.svg",
    title: "Support long-term care",
    copy: "Build for repeatable treatment and a broad patient population.",
  },
];

const processItems = [
  {
    symbol: "D",
    title: "Engineered Biology",
    copy: "A fully human antibody platform begins with engineered biology.",
  },
  {
    symbol: "T",
    title: "Targeted Immunization",
    copy: "Targeted immunization generates antibodies against disease.",
  },
  {
    symbol: "Y",
    title: "Antibody Production",
    copy: "The platform produces multispecific human antibodies.",
  },
  {
    symbol: "P",
    title: "Plasma Collection",
    copy: "Antibodies are collected repeatedly without human donors.",
  },
];

const pipelineGroups: PipelineGroup[] = [
  {
    title: "Type 1 Diabetes",
    tone: "current",
    studies: [
      {
        label: "New onset Stage 3 T1D",
        progress: 3,
        stage: "Phase 2",
        current: true,
        note: "Registrational Phase 2b",
      },
      {
        label: "Maintenance of Stage 3 T1D",
        progress: 2.6,
        stage: "Phase 2",
      },
    ],
  },
  {
    title: "Autoimmunity",
    tone: "future",
    studies: [
      {
        label: "Potential future autoimmune studies",
        progress: 0.9,
        stage: "Preclinical",
      },
    ],
  },
];

const comparisonRows: ComparisonRow[] = [
  { label: "Fully human", values: [false, true, true] },
  { label: "Repeat dosing", values: [false, false, true] },
  { label: "Dosing", values: ["12 days", "1–2 days", "2 days"] },
];

const timelineItems: TimelineItem[] = [
  {
    position: "timeline-item--slot-1",
    label: "Q2 2025:",
    copy: "SAFEGUARD Type B FDA meeting",
    complete: true,
  },
  {
    position: "timeline-item--slot-3",
    label: "Q4 2025:",
    copy: "First patient dosed in SAFEGUARD",
    complete: true,
  },
  {
    position: "timeline-item--slot-6",
    label: "Q4 2026:",
    copy: "Complete SAFEGUARD enrollment",
  },
];

const studyLinks = [
  {
    image: "/assets/pages/clinical-scientist.webp",
    title: (
      <>
        Find out more about <strong>SAFEGUARD</strong>
      </>
    ),
    href: "/patients/about-sab-142/",
  },
  {
    image: "/assets/pages/family-care.webp",
    title: (
      <>
        Learn more about the <strong>PRISE study</strong>
      </>
    ),
    href: "/pipeline/",
  },
];

function FoundationTokenGroup({
  group,
}: {
  group: (typeof foundationTokenGroups)[number];
}) {
  return (
    <section
      className={`foundation-token-group foundation-token-group--${group.layout}`}
    >
      <header className="foundation-token-group__heading">
        <span>
          <strong>{group.name}</strong>
          <small>{group.tokens.length} tokens</small>
        </span>
      </header>
      <div className="foundation-token-group__rows">
        {group.tokens.map((token) => {
          const example = getFoundationTokenExample(token);

          return (
            <article
              className={`foundation-token-row foundation-token-row--${example.kind}`}
              key={token}
              style={
                {
                  "--foundation-token-value": `var(${token})`,
                } as React.CSSProperties
              }
            >
              <span className="foundation-token-row__sample" aria-hidden="true">
                <span>{getFoundationSampleText(example.kind)}</span>
              </span>
              <code>{token}</code>
              <span className="foundation-token-row__label">
                {example.label}
              </span>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function SemanticTypeReference() {
  const specimens = [
    {
      tag: "h1",
      node: <h1>Heading level one</h1>,
      tokens: [
        "--font-display",
        "--font-size-h1",
        "--line-height-display",
        "--font-weight-regular",
      ],
    },
    {
      tag: "h2",
      node: <h2>Heading level two</h2>,
      tokens: [
        "--font-display",
        "--font-size-h2",
        "--line-height-heading",
        "--font-weight-regular",
      ],
    },
    {
      tag: "h3",
      node: <h3>Heading level three</h3>,
      tokens: [
        "--font-display",
        "--font-size-h3",
        "--line-height-tight",
        "--font-weight-regular",
      ],
    },
    {
      tag: "h4",
      node: <h4>Heading level four</h4>,
      tokens: [
        "--font-display",
        "--font-size-h4",
        "--line-height-snug",
        "--font-weight-regular",
      ],
    },
    {
      tag: "h5",
      node: <h5>Heading level five</h5>,
      tokens: [
        "--font-display",
        "--font-size-h5",
        "--line-height-subheading",
        "--font-weight-regular",
      ],
    },
    {
      tag: "h6",
      node: <h6>Heading level six</h6>,
      tokens: [
        "--font-display",
        "--font-size-body",
        "--line-height-action",
        "--font-weight-regular",
      ],
    },
    {
      tag: "p",
      node: <p>Body paragraph for supporting copy.</p>,
      tokens: [
        "--font-body",
        "--font-size-body",
        "--line-height-copy",
        "--font-weight-regular",
      ],
    },
    {
      tag: "small",
      node: <small>Caption and supporting detail</small>,
      tokens: [
        "--font-body",
        "--font-size-caption",
        "--line-height-copy",
        "--font-weight-regular",
      ],
    },
    {
      tag: "a",
      node: (
        <a className="text-link" href="#typography">
          Inline text link
        </a>
      ),
      tokens: [
        "--font-body",
        "--font-size-body",
        "--line-height-copy",
        "--font-weight-regular",
      ],
    },
  ] as const;

  return (
    <section className="semantic-type-reference">
      <div className="foundation-token-group__heading">
        <span>
          <strong>Semantic typography</strong>
          <small>Each element shows its complete type recipe once</small>
        </span>
      </div>
      <div className="semantic-type-reference__rows">
        {specimens.map((specimen) => (
          <article className="semantic-type-reference__row" key={specimen.tag}>
            <code>{specimen.tag}</code>
            <div className="semantic-type-reference__sample">
              {specimen.node}
            </div>
            <div className="semantic-type-reference__tokens">
              {specimen.tokens.map((token) => (
                <code key={token}>{token}</code>
              ))}
            </div>
          </article>
        ))}
        <article className="semantic-type-reference__row">
          <code>strong / em</code>
          <div className="semantic-type-reference__lists">
            <strong>Strong importance</strong>
            <em>Editorial emphasis</em>
          </div>
        </article>
        <article className="semantic-type-reference__row">
          <code>ul / ol</code>
          <div className="semantic-type-reference__lists">
            <ul>
              <li>Unordered list item</li>
            </ul>
            <ol>
              <li>Ordered list item</li>
            </ol>
          </div>
        </article>
        <article className="semantic-type-reference__row">
          <code>blockquote</code>
          <blockquote>Science-led design with human clarity.</blockquote>
        </article>
      </div>
    </section>
  );
}

function ActionSpecimens() {
  return (
    <div className="action-specimens">
      <ButtonLink href="/" variant="primary">
        Primary action
      </ButtonLink>
      <ButtonLink href="/about/" variant="secondary">
        Secondary action
      </ButtonLink>
      <ButtonLink href="/pipeline/" variant="outline">
        Outline action
        <CircleArrow />
      </ButtonLink>
      <MediaAction href="/about/">Expanding action</MediaAction>
    </div>
  );
}

function CatalogSection({
  id,
  eyebrow,
  title,
  children,
  fullBleed = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  fullBleed?: boolean;
}) {
  return (
    <section className="design-system-section" id={id}>
      <div className="container design-system-heading">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
      </div>
      <div
        className={
          fullBleed
            ? "design-system-specimens"
            : "container design-system-specimens"
        }
      >
        {children}
      </div>
    </section>
  );
}

function CatalogSpecimen({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="catalog-specimen">
      <span className="catalog-specimen__label">{label}</span>
      {children}
    </div>
  );
}

type CatalogScope = "foundations" | "components";

export function DesignSystemCatalog({
  scope = "foundations",
}: {
  scope?: CatalogScope;
}) {
  const isFoundations = scope === "foundations";

  return (
    <div className={`design-system-page design-system-page--${scope}`}>
      <header className="container design-system-hero">
        <div className="design-system-hero__meta">
          <a href="/" aria-label="SAB Bio home">
            <img src="/assets/sab-bio-logo.svg" alt="SAB Bio" />
          </a>
          <span>{isFoundations ? "Interface system" : "Block library"}</span>
          <span>Version 1.0</span>
        </div>
        <div className="design-system-hero__content">
          <h1>
            {isFoundations
              ? "Clarity through consistency."
              : "Reusable by default."}
          </h1>
          <div>
            <p className="design-system-hero__intro">
              {isFoundations
                ? "A practical reference for SAB BIO’s visual language. Every color, type rule, space, surface, and motion value is documented once and reused everywhere."
                : "Live, semantic HTML and isolated CSS blocks that can move from this Next.js preview into the WordPress theme without rebuilding the design."}
            </p>
            <ButtonLink href={isFoundations ? "/components/" : "#actions"}>
              {isFoundations ? "Explore components" : "Explore actions"}
            </ButtonLink>
          </div>
        </div>
      </header>

      <nav className="container catalog-index" aria-label="On this page">
        <p className="catalog-index__label">On this page</p>
        <ol>
          {isFoundations ? (
            <>
              <li>
                <a href="#foundation-rules">
                  <span>01</span>Rules
                </a>
              </li>
              {foundationSections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>
                    <span>{section.number}</span>
                    {section.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="#actions">
                  <span>07</span>Actions
                </a>
              </li>
              <li>
                <a href="/components/">
                  <span>08</span>Components
                </a>
              </li>
            </>
          ) : (
            <>
              {componentSections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>
                    <span>{section.number}</span>
                    {section.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="/design-system/">
                  <span>10</span>Foundations
                </a>
              </li>
            </>
          )}
        </ol>
      </nav>

      {isFoundations && (
        <>
          <CatalogSection
            id="foundation-rules"
            eyebrow="01 / Foundation"
            title="Rules"
          >
            <div className="variable-rules">
              <article className="variable-rule-card">
                <span>01</span>
                <div>
                  <h3>One source of truth</h3>
                  <p>
                    Components consume foundation variables; routes compose
                    reusable components.
                  </p>
                </div>
              </article>
              <article className="variable-rule-card">
                <span>02</span>
                <div>
                  <h3>Semantic first</h3>
                  <p>
                    Use clear HTML structure before adding a class or visual
                    treatment.
                  </p>
                </div>
              </article>
              <article className="variable-rule-card">
                <span>03</span>
                <div>
                  <h3>No visual literals</h3>
                  <p>
                    Colors, type, spacing, radii, shadows, motion, ratios, and
                    layers come from tokens.
                  </p>
                </div>
              </article>
            </div>
            <div className="variable-example-grid">
              <article className="variable-example">
                <strong>Use tokens</strong>
                <code>padding: var(--space-4);</code>
                <code>font-size: var(--font-size-body);</code>
                <code>border-radius: var(--radius-card);</code>
              </article>
              <article className="variable-example variable-example--wrong">
                <strong>Avoid literals</strong>
                <code>padding: 2rem;</code>
                <code>font-size: 18px;</code>
                <code>border-radius: 24px;</code>
              </article>
            </div>
          </CatalogSection>

          {foundationSections.map((section) => {
            const groups = foundationTokenGroups.filter((group) =>
              (section.groups as readonly string[]).includes(group.name),
            );

            return (
              <CatalogSection
                id={section.id}
                eyebrow={`${section.number} / ${section.eyebrow}`}
                title={section.title}
                key={section.id}
              >
                <p className="foundation-section-intro">{section.intro}</p>
                {section.id === "typography" && <SemanticTypeReference />}
                <div className="foundation-token-reference">
                  {groups.map((group) => (
                    <FoundationTokenGroup group={group} key={group.name} />
                  ))}
                </div>
              </CatalogSection>
            );
          })}

          <CatalogSection id="actions" eyebrow="07 / Interface" title="Actions">
            <p className="foundation-section-intro">
              The shared button and expanding-action styles used across every
              page.
            </p>
            <ActionSpecimens />
          </CatalogSection>

          <section className="container design-system-reuse">
            <Eyebrow>08 / Reuse</Eyebrow>
            <h2>Build once. Use everywhere.</h2>
            <p>
              Browse the reusable HTML and CSS blocks used to assemble every
              page.
            </p>
            <ButtonLink href="/components/">Explore components</ButtonLink>
          </section>
        </>
      )}

      {!isFoundations && (
        <>
          <CatalogSection {...componentSection("forms")} fullBleed>
            <CatalogSpecimen label="Form fields">
              <div className="container catalog-form-fields surface-card">
                <FormField
                  id="catalog-name"
                  label="Text field"
                  placeholder="Your name"
                />
                <FormField
                  id="catalog-email"
                  label="Email field"
                  placeholder="you@example.com"
                  type="email"
                />
                <FormField
                  id="catalog-telephone"
                  label="Telephone field"
                  placeholder="+1 000 000 0000"
                  type="tel"
                />
                <FormField
                  id="catalog-subject"
                  label="Select field"
                  placeholder="Choose one"
                  type="select"
                  options={[
                    { label: "General inquiry", value: "general" },
                    { label: "Clinical programs", value: "clinical" },
                  ]}
                />
                <FormField
                  id="catalog-message"
                  label="Textarea"
                  placeholder="Your message"
                  type="textarea"
                  helperText="Reusable helper text and accessible description."
                  fullWidth
                />
              </div>
            </CatalogSpecimen>
            <CatalogSpecimen label="Static contact form">
              <div className="container catalog-contact-form">
                <ContactForm idPrefix="catalog-contact-form" />
              </div>
            </CatalogSpecimen>
            <CatalogSpecimen label="Complete contact composition">
              <ContactSection formIdPrefix="catalog-contact-section" />
            </CatalogSpecimen>
          </CatalogSection>

          <CatalogSection {...componentSection("actions")}>
            <ActionSpecimens />
          </CatalogSection>

          <CatalogSection {...componentSection("cards")}>
            <Section compact className="catalog-primitives">
              <CardGrid columns={3}>
                <FeatureCard icon="people" title="Feature card">
                  <p>
                    Use for principles, values, and concise supporting copy.
                  </p>
                </FeatureCard>
                <IconTextCard symbol="01" title="Icon and text card">
                  <p>
                    Use for patient information, benefits, and process steps.
                  </p>
                </IconTextCard>
                <ProcessCard
                  symbol="Rx"
                  title="Process card"
                  copy="Use within a repeatable scientific or manufacturing flow."
                />
                <PersonCard
                  name="Samuel J. Reich"
                  role="Chief Executive Officer"
                />
                <NextStepCard
                  href="/pipeline/"
                  image="/assets/pages/pipeline-hero.webp"
                  imageAlt="A scientist at a microscope"
                  title="Next-step card"
                />
              </CardGrid>
            </Section>
          </CatalogSection>

          <CatalogSection {...componentSection("heroes")} fullBleed>
            <CatalogSpecimen label="Landing hero">
              <LandingHero
                image="/assets/home-hero.png"
                imageAlt="Molecular spheres across a pale blue field"
                showHeader={false}
                title={
                  <>
                    We’re not here to manage T1D.
                    <span>We’re here to change it.</span>
                  </>
                }
              >
                <p>
                  A reusable immersive hero for the primary landing experience.
                </p>
              </LandingHero>
            </CatalogSpecimen>

            <CatalogSpecimen label="Inner hero">
              <InnerHero
                eyebrow="Pipeline"
                title="Advancing a different future"
                image="/assets/pages/pipeline-hero.webp"
                imageAlt="A scientist working at a microscope"
                intro={
                  <p className="lead">
                    A reusable page hero combining title, supporting copy, and
                    photography.
                  </p>
                }
              />
            </CatalogSpecimen>

            <CatalogSpecimen label="Media banner">
              <MediaBanner
                title={
                  <>
                    A <span className="teal">different</span> mechanism
                  </>
                }
                slides={[
                  {
                    image: "/assets/pages/antibody-wide.webp",
                    imageAlt: "Scientific visualization of an antibody",
                    content: (
                      <p>
                        <strong>SAB-142</strong> is a multispecific, fully human
                        antibody therapy.
                      </p>
                    ),
                  },
                  {
                    image: "/assets/pages/patient-doctor.webp",
                    imageAlt: "A patient speaking with a physician",
                    content: (
                      <p>
                        Each progress control selects a real slide with its own
                        image and content.
                      </p>
                    ),
                  },
                  {
                    image: "/assets/pages/mother-child.webp",
                    imageAlt: "A parent and child outdoors",
                    content: (
                      <p>
                        The same component supports click, keyboard, and swipe
                        navigation.
                      </p>
                    ),
                  },
                ]}
              />
            </CatalogSpecimen>
          </CatalogSection>

          <CatalogSection {...componentSection("content-layouts")} fullBleed>
            <CatalogSpecimen label="Image/text band — all four layouts">
              <LandingSectionStack>
                <ImageTextBand
                  id="catalog-copy-media-cutout"
                  layout="copy-media-cutout"
                  eyebrow="About Us"
                  title={
                    <>
                      Copy with a <span>media cutout</span>
                    </>
                  }
                  image="/assets/home-microscope.jpg"
                  imageAlt="Microscope in a research laboratory"
                  action={{ href: "/about/", label: "Explore About Us" }}
                  mediaAction={{
                    href: "/about/leadership/",
                    label: "Leadership",
                  }}
                >
                  This layout pairs substantial copy with an adaptive image
                  shape and a secondary media action.
                </ImageTextBand>

                <ImageTextBand
                  id="catalog-media-note-copy"
                  layout="media-note-copy"
                  eyebrow="Pipeline"
                  title={
                    <>
                      Media, note, and <span>copy</span>
                    </>
                  }
                  image="/assets/home-antibody.png"
                  imageAlt="Human antibody visualization"
                  action={{ href: "/pipeline/", label: "Explore the pipeline" }}
                  note={{
                    title: "SAB-142 Anti-Thymocyte Globulin (Human)",
                    copy: "A reusable text tile that grows with its content.",
                  }}
                >
                  The note remains a white rounded surface while the shape
                  adapts across screen sizes.
                </ImageTextBand>

                <ImageTextBand
                  id="catalog-copy-note-media"
                  layout="copy-note-media"
                  eyebrow="Platform"
                  title={
                    <>
                      Copy, note, and <span>media</span>
                    </>
                  }
                  image="/assets/home-scientist.jpg"
                  imageAlt="Scientist operating laboratory equipment"
                  action={{
                    href: "/platform/how-sab-142-works/",
                    label: "See how it works",
                  }}
                  note={{
                    title: "Revolutionary Antibody Technology",
                    copy: "Human immunoglobulin G for autoimmune disorders.",
                  }}
                >
                  The mirrored composition uses the same component and shared
                  responsive behavior.
                </ImageTextBand>

                <ImageTextBand
                  id="catalog-media-copy"
                  layout="media-copy"
                  eyebrow="Patients"
                  title={
                    <>
                      Media with <span>supporting copy</span>
                    </>
                  }
                  image="/assets/home-patient.jpg"
                  imageAlt="A child managing diabetes while playing outside"
                  action={{
                    href: "/patients/about-sab-142/",
                    label: "Learn about SAB-142",
                  }}
                >
                  A clean two-part composition for patient and caregiver
                  stories.
                </ImageTextBand>
              </LandingSectionStack>
            </CatalogSpecimen>

            <CatalogSpecimen label="Split content — story">
              <SplitContent
                variant="story"
                image="/assets/about-mission.jpg"
                imageAlt="A person wearing a glucose monitor"
                mediaFirst
              >
                <h2>
                  Story layout with <span>adaptive media</span>
                </h2>
                <p className="lead">
                  Use for longer narrative sections with an expressive image
                  shape.
                </p>
              </SplitContent>
            </CatalogSpecimen>

            <CatalogSpecimen label="Split content — standard and feature">
              <SplitContent
                variant="standard"
                image="/assets/pages/patient-doctor.webp"
                imageAlt="A patient speaking with a doctor"
                mediaFirst
              >
                <h2>Standard split content</h2>
                <p>
                  Use for balanced informational sections across inner pages.
                </p>
              </SplitContent>
              <SplitContent
                variant="feature"
                image="/assets/pages/father-daughter.webp"
                imageAlt="A father and daughter laughing together"
                mediaFirst
              >
                <h2>
                  Why this <span className="teal">work matters</span>
                </h2>
                <p className="lead">
                  The feature variant gives important storytelling more
                  presence.
                </p>
              </SplitContent>
            </CatalogSpecimen>

            <CatalogSpecimen label="Fact feature">
              <FactFeature
                image="/assets/pages/watermelon-kids.webp"
                imageAlt="Two children enjoying watermelon outside"
                quote="We’re working to change the course of T1D."
                intro="A reusable editorial feature combines a human story with supporting context."
                statistic="T1D affects millions of people worldwide."
              />
            </CatalogSpecimen>

            <CatalogSpecimen label="Content aside and study links">
              <ContentAside aside={<StudyLinkGrid items={studyLinks} />}>
                <h2>
                  <span className="teal">PRISE-hATG:</span> Extending the window
                  for intervention
                </h2>
                <p>
                  The content-aside block balances long-form information with
                  reusable linked study cards.
                </p>
              </ContentAside>
            </CatalogSpecimen>

            <CatalogSpecimen label="Careers band">
              <CareersBand
                id="catalog-careers-band"
                image="/assets/home-careers.jpg"
                imageAlt="Researcher working with a microscope"
                title="Careers"
                href="/careers/"
                actionLabel="Join the team"
              />
            </CatalogSpecimen>
          </CatalogSection>

          <CatalogSection {...componentSection("collections")} fullBleed>
            <CatalogSpecimen label="Feature collection">
              <FeatureCollection
                variant="section"
                title={
                  <>
                    Four <span>values</span> guide our work
                  </>
                }
                items={featureItems}
              />
            </CatalogSpecimen>

            <CatalogSpecimen label="Icon and text collection">
              <IconTextCollection items={iconTextItems} />
            </CatalogSpecimen>

            <CatalogSpecimen label="Process collection">
              <ProcessCollection
                title={
                  <>
                    <strong>Upstream:</strong> SAB&apos;s biosecure facility
                  </>
                }
                items={processItems}
              />
            </CatalogSpecimen>

            <CatalogSpecimen label="Benefit collection">
              <BenefitCollection
                title="Why it matters"
                image="/assets/pages/patient-doctor.webp"
                imageAlt="A patient speaking with a doctor"
                items={[
                  "Fully human antibodies support repeat dosing.",
                  "Supply is consistent because no human donors are required.",
                  "The platform is designed for targeted, multispecific therapies.",
                ]}
              />
            </CatalogSpecimen>

            <CatalogSpecimen label="People directory">
              <PeopleDirectory
                panels={[
                  {
                    id: "catalog-management",
                    label: "Senior Management",
                    groups: [
                      {
                        id: "catalog-executive",
                        label: "Executive Management",
                        people: [
                          {
                            name: "Samuel J. Reich",
                            role: "Chief Executive Officer",
                          },
                          {
                            name: "Mark Conley, MD",
                            role: "Chief Medical Officer",
                          },
                          {
                            name: "David Neuman",
                            role: "Chief Financial Officer",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "catalog-board",
                    label: "Board of Directors",
                    groups: [
                      {
                        id: "catalog-board-members",
                        label: "Board of Directors",
                        people: [
                          {
                            name: "Eddie J. Sullivan, PhD",
                            role: "Co-Founder",
                          },
                        ],
                      },
                    ],
                  },
                ]}
              />
            </CatalogSpecimen>

            <CatalogSpecimen label="Resource collection">
              <ResourceCollection
                title={
                  <>
                    Additional <span className="teal">T1D resources</span>
                  </>
                }
                items={[
                  {
                    title: "Breakthrough T1D",
                    image: "/assets/pages/breakthrough-t1d.png",
                    href: "/patients/about-sab-142/",
                  },
                  {
                    title: "American Diabetes Association",
                    image: "/assets/pages/american-diabetes.png",
                    href: "/patients/about-sab-142/",
                  },
                ]}
              />
            </CatalogSpecimen>

            <CatalogSpecimen label="Job board">
              <JobBoard
                title="Current openings"
                jobs={[
                  { title: "Clinical Sample Manager" },
                  { title: "Clinical Trial Manager, Immunology" },
                  { title: "Scientist, Immunology" },
                ]}
              />
            </CatalogSpecimen>

            <CatalogSpecimen label="Notice list">
              <NoticeList
                items={[
                  {
                    title: "Job Postings at SAB BIO",
                    copy: "SAB Biotherapeutics is an Equal Opportunity Employer.",
                  },
                  {
                    title: "A note to recruiters",
                    copy: "All open positions are managed through Human Resources.",
                  },
                ]}
              />
            </CatalogSpecimen>
          </CatalogSection>

          <CatalogSection {...componentSection("data-displays")} fullBleed>
            <CatalogSpecimen label="Article grid">
              <div className="container">
                <ArticleGrid
                  id="catalog-articles"
                  eyebrow="Investors & Media"
                  title={
                    <>
                      The latest from <span>SAB BIO</span>
                    </>
                  }
                  action={{ href: "/", label: "Read all news" }}
                  items={[
                    {
                      date: "July 7, 2026",
                      title: "Advancing autoimmune research",
                      copy: "Clinical work focused on changing the course of disease.",
                      href: "/pipeline/",
                    },
                    {
                      date: "May 29, 2026",
                      title: "Helping patients live fuller lives",
                      copy: "Patient and caregiver experiences guide the work.",
                      href: "/patients/about-sab-142/",
                    },
                    {
                      date: "May 12, 2026",
                      title: "From research to reality",
                      copy: "Fully human antibodies open a new path for care.",
                      href: "/platform/how-sab-142-works/",
                    },
                  ]}
                />
              </div>
            </CatalogSpecimen>

            <CatalogSpecimen label="Pipeline table">
              <PipelineTable
                phases={["Preclinical", "Phase 1", "Phase 2", "Phase 3"]}
                groups={pipelineGroups}
              />
            </CatalogSpecimen>

            <CatalogSpecimen label="Comparison table">
              <ComparisonTable
                label="Therapy comparison"
                columns={[
                  { image: "/assets/pages/tzield.png", imageAlt: "Tzield" },
                  {
                    image: "/assets/pages/thymoglobulin.png",
                    imageAlt: "Thymoglobulin",
                  },
                  {
                    image: "/assets/sab-bio-logo.svg",
                    imageAlt: "SAB BIO SAB-142",
                  },
                ]}
                rows={comparisonRows}
                note="Representative comparison-table specimen."
              />
            </CatalogSpecimen>

            <CatalogSpecimen label="Timeline">
              <Timeline
                title={
                  <>
                    <span>Where</span> we’re going
                  </>
                }
                years={["2025", "2026", "2027"]}
                items={timelineItems}
              />
            </CatalogSpecimen>
          </CatalogSection>

          <CatalogSection {...componentSection("navigation")} fullBleed>
            <CatalogSpecimen label="Next feature">
              <NextFeature
                href="/about/leadership/"
                image="/assets/about-team.jpg"
                imageAlt="Scientists working together"
                title="Meet our team"
              />
            </CatalogSpecimen>

            <CatalogSpecimen label="Next-step stack">
              <NextStepStack
                items={[
                  {
                    href: "/pipeline/",
                    image: "/assets/pages/pipeline-hero.webp",
                    imageAlt: "A scientist at a microscope",
                    title: "See our pipeline",
                  },
                  {
                    href: "/platform/how-sab-142-works/",
                    title: "See what this platform makes possible",
                    colorBlock: true,
                  },
                ]}
              />
            </CatalogSpecimen>
          </CatalogSection>

          <CatalogSection {...componentSection("templates")}>
            <div className="next-step-stack catalog-template-index">
              <NextStepCard href="/" title="Homepage template" colorBlock />
              <NextStepCard href="/about/" title="About template" colorBlock />
              <NextStepCard
                href="/about/leadership/"
                title="Leadership template"
                colorBlock
              />
              <NextStepCard
                href="/pipeline/"
                title="Pipeline template"
                colorBlock
              />
              <NextStepCard
                href="/platform/how-sab-142-works/"
                title="How SAB-142 works template"
                colorBlock
              />
              <NextStepCard
                href="/platform/manufacturing/"
                title="Manufacturing template"
                colorBlock
              />
              <NextStepCard
                href="/patients/about-sab-142/"
                title="Patient template"
                colorBlock
              />
              <NextStepCard
                href="/careers/"
                title="Careers template"
                colorBlock
              />
              <NextStepCard
                href="/contact/"
                title="Contact template"
                colorBlock
              />
              <NextStepCard
                href="/terms-conditions/"
                title="Terms and Conditions template"
                colorBlock
              />
              <NextStepCard
                href="/privacy-policy/"
                title="Privacy Policy template"
                colorBlock
              />
              <NextStepCard
                href="/conflict-of-interest-policy/"
                title="Conflict of Interest Policy template"
                colorBlock
              />
            </div>
          </CatalogSection>
        </>
      )}
    </div>
  );
}
