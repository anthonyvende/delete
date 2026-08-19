import type { Metadata } from "next";
import { CareersBand } from "../../components/blocks/CareersBand";
import { FeatureCollection } from "../../components/blocks/FeatureCollection";
import { InnerHero } from "../../components/blocks/InnerHero";
import { SplitContent } from "../../components/blocks/SplitContent";
import { Timeline, type TimelineItem } from "../../components/blocks/Timeline";
import { InnerPageShell } from "../../components/layout/InnerPageShell";
import { Eyebrow } from "../../components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn what drives SAB Bio and its pursuit of disease modification in type 1 diabetes.",
};

const values = [
  {
    icon: "people",
    title: "Put People First",
    copy: "We see the person and the families behind every diagnosis",
  },
  {
    icon: "shield",
    title: "Rethink What’s Possible",
    copy: "We are brave enough to see the potential and bold enough to explore what’s possible",
  },
  {
    icon: "clock",
    title: "Move with Urgency",
    copy: "We move fast because every day counts",
  },
  {
    icon: "hand",
    title: "Deliver Excellence",
    copy: "We say it, we mean it, we prove it",
  },
];

/* Positions read off the design: column/span place the pill along the twelve
   column canvas, side and tier decide which row band it sits in. */
const milestones: TimelineItem[] = [
  {
    side: "above",
    tier: 1,
    column: 1,
    span: 3,
    label: "Q2 2025:",
    copy: "SAFEGUARD Type B FDA meeting",
    complete: true,
  },
  {
    side: "above",
    tier: 2,
    column: 2,
    span: 3,
    label: "2H 2025:",
    copy: "Phase 2b SAFEGUARD Initiation",
    complete: true,
  },
  {
    side: "above",
    tier: 1,
    column: 4,
    span: 3,
    label: "Q4 2025:",
    copy: "Dosed first patient in the SAFEGUARD trial",
    complete: true,
  },
  {
    side: "above",
    tier: 2,
    column: 8,
    span: 3,
    label: "Q4 2026:",
    copy: "Complete enrollment of the SAFEGUARD trial of SAB-142",
  },
  {
    side: "above",
    tier: 1,
    column: 10,
    span: 3,
    label: "2H 2027:",
    copy: "Phase 2b SAFEGUARD topline data",
  },
  {
    side: "below",
    tier: 1,
    column: 2,
    span: 3,
    label: "Q3 2025:",
    copy: "MELD Data at EASD Confirmed rATG efficacy, including HbA1c reduction and C-peptide preservation",
    complete: true,
  },
  {
    side: "below",
    tier: 1,
    column: 5,
    span: 3,
    label: "Q1 2026:",
    copy: "SAB-142 Phase 1 T1D Cohort data demonstrated early signals of C-peptide preservation",
    complete: true,
  },
  {
    side: "below",
    tier: 2,
    column: 4,
    span: 3,
    label: "Q4 2025:",
    copy: "SAB-142 Phase 1 redosing data demonstrated continued lack of lymphodepletion and immunogenicity on repeat dosing",
    complete: true,
  },
];

export default function AboutPage() {
  return (
    <InnerPageShell>
      <InnerHero
        eyebrow="Company Profile"
        title="Who we are"
        image="/assets/about-profile.jpg"
        imageAlt="A mother helping her daughter with diabetes care"
        intro={
          <>
            <p className="lead">
              SAB BIO is a clinical-stage biopharmaceutical company developing
              multispecific, high-potency human immunoglobulin G (hIgG)
              therapies to treat and prevent immune and autoimmune disorders.
            </p>
            <p>
              Founded in 2014 and publicly traded on Nasdaq (SABS) since 2021,
              the company leverages advanced genetic engineering and proprietary
              antibody technology to generate novel therapeutic candidates by
              harnessing the human immune response without relying on human
              donors or convalescent plasma.
            </p>
            <p>
              Our lead candidate, SAB-142, targets autoimmune type 1 diabetes
              (T1D) with a disease-modifying therapeutic approach that aims to
              change the T1D treatment paradigm by delaying onset and
              potentially preventing disease progression of Stage 3 T1D
              patients. SAB-142 is currently being evaluated in newly diagnosed
              Stage 3 T1D patients in a registrational Phase 2b clinical trial
              called SAFEGUARD.
            </p>
          </>
        }
      />

      <SplitContent
        variant="story"
        image="/assets/about-mission.jpg"
        imageAlt="A person wearing a glucose monitor"
        mediaFirst
      >
        <h2>
          The <span>vision</span>, <span>mission</span>, and <span>values</span>{" "}
          behind our pursuit of disease modification in type 1 diabetes.
        </h2>
        <p className="split-content__lead">
          SAB BIO was founded with the vision to transform outcomes for people
          with autoimmune disease through disease modification.
        </p>
        <p>
          Our mission is to make it real. We are developing a medicine to
          dramatically redefine what it means to be diagnosed with type 1
          diabetes by developing a medicine to change the course of disease. Not
          just symptoms.
        </p>
      </SplitContent>

      <FeatureCollection
        title={
          <>
            <span>Four values</span> guide how we do that work.
          </>
        }
        items={values}
      />

      <CareersBand
        id="meet-the-team"
        image="/assets/pages/leadership-hero.webp"
        imageAlt="Clinicians reviewing data together on a tablet"
        title="Meet our team"
        href="/about/leadership/"
        actionLabel="Explore"
        align="start"
      />

      <Timeline
        title={
          <>
            <span>Where</span> we’re going
          </>
        }
        years={["2025", "2026", "2027"]}
        items={milestones}
      />
    </InnerPageShell>
  );
}
