import type { Metadata } from "next";
import { ContentAside } from "../../components/blocks/ContentAside";
import { InnerHero } from "../../components/blocks/InnerHero";
import {
  PipelineTable,
  type PipelineGroup,
} from "../../components/blocks/PipelineTable";
import { StudyLinkGrid } from "../../components/blocks/StudyLinkGrid";
import { InnerPageShell } from "../../components/layout/InnerPageShell";

export const metadata: Metadata = {
  title: "Pipeline",
  description:
    "Explore SAB BIO's clinical pipeline for type 1 diabetes, transplantation, and autoimmune disease.",
};

const phases = ["Preclinical", "Phase 1", "Phase 2", "Phase 3"];

const pipelineGroups = [
  {
    title: "Type 1 Diabetes",
    tone: "current",
    studies: [
      {
        label: "Delaying progression of T1D in new onset T1D patients (Stage 3)",
        progress: 3,
        stage: "Phase 2",
        current: true,
        note: "Registrational Phase 2b",
      },
      {
        label: "Maintenance of Stage 3 T1D (LTE SAFEGUARD)",
        progress: 2.6,
        stage: "Phase 2",
      },
      {
        label: "Delaying onset of Stage 3 T1D (Stage 2)",
        progress: 2,
        stage: "Phase 1",
      },
      {
        label: "Delaying progression of T1D following diagnosis (Stage 3)",
        progress: 3.85,
        stage: "Phase 3",
        note: "Investigator-Led",
      },
    ],
  },
  {
    title: "Transplantation",
    studies: [
      {
        label: "Transplant Maintenance in Islet Cell Transplantation",
        progress: 0.9,
        stage: "Preclinical",
      },
    ],
  },
  {
    title: "Autoimmunity",
    tone: "future",
    studies: [
      {
        label: "Celiac Disease",
        progress: 0.9,
        stage: "Preclinical",
      },
      {
        label: "SLE, Scleroderma, Polymyositis, Dermatomyositis",
        progress: 0.9,
        stage: "Preclinical",
      },
    ],
  },
] satisfies PipelineGroup[];

const studyLinks = [
  {
    image: "/assets/pages/clinical-scientist.webp",
    title: (
      <>
        Find out more about <strong>SAFEGUARD</strong>
      </>
    ),
    href: "/patients/about-sab-142/#safeguard",
  },
  {
    image: "/assets/pages/family-care.webp",
    title: (
      <>
        Learn more about the <strong>PRISE-hATG</strong> study
      </>
    ),
    href: "/patients/about-sab-142/#prise-hatg",
  },
  {
    image: "/assets/pages/how-hero.webp",
    title: (
      <>
        See how <strong>SAB-142</strong> works
      </>
    ),
    href: "/platform/how-sab-142-works/",
  },
];

export default function PipelinePage() {
  return (
    <InnerPageShell>
      <InnerHero
        eyebrow="Pipeline"
        title={
          <>
            Advancing a different future for type 1 diabetes and beyond
          </>
        }
        image="/assets/pages/pipeline-hero.webp"
        imageAlt="A SAB BIO scientist working at a laboratory microscope"
        intro={
          <>
            <p className="lead">
              Our commitment today is focused: advancing SAB-142 as a potential
              best-in-class, redosable, disease-modifying therapy for T1D.
            </p>
            <p>
              As our clinical journey progresses, we believe that the platform
              behind it may one day reach other complex autoimmune diseases.
            </p>
          </>
        }
      />

      <PipelineTable phases={phases} groups={pipelineGroups} />

      <ContentAside aside={<StudyLinkGrid items={studyLinks} />}>
        <>
          <h2>
            <span className="teal">PRISE-hATG:</span> Extending the window for
            T1D intervention
          </h2>
          <p>
            <strong>
              The PRISE study is our registrational Phase 3 clinical trial
              investigating SAB-142 in individuals 100 days to 2 years after a
              T1D diagnosis.
            </strong>{" "}
            It is designed to evaluate whether SAB-142 can preserve beta cell
            function and help modify the course of disease.
          </p>
          <p>
            <small>
              PRISE-hATG—Personalized Response and Immunologic Surveillance of
              Endogenous C-Peptide Preservation in New, Recent, and Extended
              New Onset T1D Treated with human Anti-Thymocyte Globulin.
            </small>
          </p>
        </>
      </ContentAside>
    </InnerPageShell>
  );
}
