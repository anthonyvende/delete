import type { Metadata } from "next";
import { BenefitCollection } from "../../../components/blocks/BenefitCollection";
import { InnerHero } from "../../../components/blocks/InnerHero";
import { MediaBanner } from "../../../components/blocks/MediaBanner";
import { NextStepStack } from "../../../components/blocks/NextStepStack";
import { ProcessCollection } from "../../../components/blocks/ProcessCollection";
import { ProcessIcon } from "../../../components/icons/ProcessIcon";
import { InnerPageShell } from "../../../components/layout/InnerPageShell";

export const metadata: Metadata = {
  title: "Manufacturing",
  description:
    "Learn how SAB BIO's biosecure platform produces targeted, fully human, multispecific antibodies.",
};

const upstream = [
  {
    symbol: <ProcessIcon name="magnifier" />,
    title: "Engineered Biology",
    copy: "Our transchromosomic (Tc) Bovine are genetically designed to produce fully human antibodies.",
  },
  {
    symbol: <ProcessIcon name="target" />,
    title: "Targeted Immunization",
    copy: "We immunize Tc Bovine with the target disease to generate antibodies against it.",
  },
  {
    symbol: <ProcessIcon name="antibody" />,
    title: "Human Antibody Production",
    copy: "The engineered platform produces fully human, multispecific antibodies that circulate in the bloodstream and target disease-causing cells directly.",
  },
  {
    symbol: <ProcessIcon name="test-tube" />,
    title: "Plasma Collection",
    copy: "Antibodies are collected from non-invasive plasma donations repeatedly.",
  },
];

const downstream = [
  {
    symbol: <ProcessIcon name="funnel" />,
    title: "Purified",
    copy: "Antibodies are isolated from the pooled plasma.",
  },
  {
    symbol: <ProcessIcon name="vial" />,
    title: "Formulated",
    copy: "The purified antibodies are used to generate a fully human, multispecific antibody therapy.",
  },
];

const benefits = [
  "SAB-142 has a favorable safety profile potentially suitable for long-term disease modification through repeat dosing because the antibodies are fully human and the body is less likely to recognize them as foreign.",
  "Supply is consistent and scalable because no human donors are required.",
  "There are high barriers to entry because this unique platform leverages a multi-level IP strategy with no biosimilar pathway.",
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
              fully human, multispecific antibodies to delay the onset and
              progression of type 1 diabetes (T1D).
            </p>
            <p>
              Many antibody therapies depend on either human donors or a single
              engineered cell line. Both approaches carry limitations: donor
              supply is variable, or the resulting antibodies can only target
              one pathway at a time.
            </p>
            <p>
              We took a different approach. Using advanced genetic engineering
              and antibody science, we developed a proprietary technology which
              holds the potential to generate novel therapeutic candidates
              utilizing the human immune response, without the need for human
              donors or convalescent plasma. Our proprietary, wholly-owned,
              in-house platform is capable of generating a diverse repertoire of
              multispecific, targeted, fully human immunoglobulins (hIgG) that
              can address a wide range of serious unmet needs in human diseases.
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
            <strong>Upstream:</strong>
            {" SAB's Biosecure facility"}
          </>
        }
        items={upstream}
      />

      <ProcessCollection
        compact
        title={
          <>
            <strong>Downstream:</strong>
            {" SAB's cGMP facility"}
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
