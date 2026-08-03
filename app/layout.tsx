import type { Metadata } from "next";
import "./styles/foundation/tokens.css";
import "./styles/foundation/base.css";
import "./styles/blocks/actions.css";
import "./styles/blocks/cards.css";
import "./styles/blocks/benefit-collection.css";
import "./styles/blocks/hero.css";
import "./styles/blocks/media.css";
import "./styles/blocks/split-content.css";
import "./styles/blocks/people-directory.css";
import "./styles/blocks/clinical-content.css";
import "./styles/blocks/pipeline-table.css";
import "./styles/blocks/workplace.css";
import "./styles/blocks/article-grid.css";
import "./styles/blocks/content-showcase.css";
import "./styles/blocks/storytelling.css";
import "./styles/blocks/forms.css";
import "./styles/blocks/legal-document.css";
import "./styles/blocks/catalog.css";
import "./styles/sections/layouts.css";
import "./styles/blocks/header.css";
import "./styles/blocks/footer.css";

export const metadata: Metadata = {
  title: {
    default: "SAB Bio",
    template: "%s | SAB Bio",
  },
  description:
    "SAB Bio is developing disease-modifying therapies for type 1 diabetes and other autoimmune diseases.",
  icons: { icon: "/assets/sab-bio-logo.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Resolves the vendored Three.js build for the hero animation block. */}
        <script
          type="importmap"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              imports: {
                three: "/vendor/three.module.js",
                "three/webgpu": "/vendor/three.module.js",
              },
            }),
          }}
        />
        {/* Sections ship hidden so the reveal has something to animate from.
            Without JavaScript nothing would ever reveal them, so drop the
            hidden state entirely. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<style>[data-reveal="pending"], [data-reveal="pending"] * { opacity: 1 !important; transform: none !important; } [data-reveal="pending"] .pipeline-stage__bar { width: calc(var(--pipeline-progress) * 100% - var(--radius-sm)) !important; }</style>`,
          }}
        />
      </head>
      <body>
        {children}
        <script src="/scripts/site-header.js" defer />
        <script src="/scripts/people-directory.js" defer />
        <script type="module" src="/scripts/microcapsule-hero.js" />
        <script src="/scripts/scroll-reveal.js" defer />
        <script src="/scripts/media-banner.js" defer />
      </body>
    </html>
  );
}
