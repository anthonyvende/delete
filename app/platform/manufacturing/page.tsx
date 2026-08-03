import type { Metadata } from "next";
import { BenefitCollection } from "../../../components/blocks/BenefitCollection";
import { InnerHero } from "../../../components/blocks/InnerHero";
import { MediaBanner } from "../../../components/blocks/MediaBanner";
import { NextStepStack } from "../../../components/blocks/NextStepStack";
import { ProcessCollection } from "../../../components/blocks/ProcessCollection";
import { InnerPageShell } from "../../../components/layout/InnerPageShell";

export const metadata: Metadata = {
  title: "Manufacturing",
  description:
    "Learn how SAB BIO's biosecure platform produces targeted, fully human, multispecific antibodies.",
};

const upstream = [
  {
    symbol: "D",
    title: "Engineered Biology",
    copy: "Our transchromosomic bovine are genetically designed to produce fully human antibodies.",
  },
  {
    symbol: "T",
    title: "Targeted Immunization",
    copy: "We immunize Tc Bovine with the target disease to generate antibodies against it.",
  },
  {
    symbol: "Y",
    title: "Human Antibody Production",
    copy: "The platform produces fully human, multispecific antibodies that circulate in the bloodstream and target disease-causing cells.",
  },
  {
    symbol: "P",
    title: "Plasma Collection",
    copy: "Antibodies are collected from non-invasive plasma donations repeatedly.",
  },
];

const downstream = [
  {
    symbol: "✓",
    title: "Purified",
    copy: "Antibodies are isolated from the pooled plasma.",
  },
  {
    symbol: "Rx",
    title: "Formulated",
    copy: "The purified antibodies are used to generate a fully human, multispecific antibody therapy.",
  },
];

const benefits = [
  "SAB-142 has a favorable safety profile potentially suitable for long-term disease modification through repeat dosing because the antibodies are fully human and the body is less likely to recognize them as foreign.",
  "Supply is consistent and scalable because no human donors are required.",
  "The platform creates high barriers to entry through a multi-level intellectual-property strategy with no biosimilar pathway.",
];

export default function ManufacturingPage() {
  return (
    <InnerPageShell>
      <InnerHero
        eyebrow="Manufacturing"
        title="Revolutionary antibody technology"
        image="/assets/pages/manufacturing-hero.webp"
        imageAlt="Two SAB BIO scientists reviewing laboratory data"
        intro={
          <>
            <p className="lead">
              SAB-142 is built on a proprietary platform that produces targeted,
              fully human, multispecific antibodies directed against the
              autoreactive T cells driving T1D.
            </p>
            <p>
              Many antibody therapies depend on either human donors or a single
              engineered cell line. Both approaches carry limitations: donor
              supply is variable, or the resulting antibodies can only target
              one pathway at a time.
            </p>
            <p>
              Using advanced genetic engineering and antibody science, our
              wholly-owned platform generates a diverse repertoire of
              multispecific, targeted, fully human immunoglobulins without the
              need for human donors.
            </p>
          </>
        }
      />

      <MediaBanner
        image="/assets/pages/microscope-wide.webp"
        imageAlt="Close-up of laboratory microscope lenses"
        label="How it works"
      />

      <ProcessCollection
        title={
          <>
          <strong>Upstream:</strong> SAB&apos;s Biosecure facility
          </>
        }
        items={upstream}
      />

      <ProcessCollection
        compact
        title={
          <>
          <strong>Downstream:</strong> SAB&apos;s cGMP facility
          </>
        }
        items={downstream}
      />

      <BenefitCollection
        title="Why it matters"
        image="/assets/pages/patient-doctor.webp"
        imageAlt="A patient speaking with his doctor"
        items={benefits}
      />

      <NextStepStack
        items={[
          {
            href: "/platform/how-sab-142-works/",
            title: "See what this platform makes possible",
            colorBlock: true,
          },
        ]}
      />
    </InnerPageShell>
  );
}
