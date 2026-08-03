import type { Metadata } from "next";
import { FeatureCollection } from "../../components/blocks/FeatureCollection";
import { InnerHero } from "../../components/blocks/InnerHero";
import { NextFeature } from "../../components/blocks/NextFeature";
import { SplitContent } from "../../components/blocks/SplitContent";
import {
  Timeline,
  type TimelineItem,
} from "../../components/blocks/Timeline";
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

const milestones: TimelineItem[] = [
  {
    position: "timeline-item--slot-1",
    label: "Q2 2025:",
    copy: "SAFEGUARD Type B FDA meeting",
    complete: true,
  },
  {
    position: "timeline-item--slot-2",
    label: "2H 2025:",
    copy: "Phase 2b SAFEGUARD Initiation",
    complete: true,
  },
  {
    position: "timeline-item--slot-3",
    label: "Q3 2025:",
    copy: "MED-DATA at EASD Confirmed rATG efficacy, including HbA1c reduction and C-peptide preservation",
    complete: true,
  },
  {
    position: "timeline-item--slot-4",
    label: "Q4 2025:",
    copy: "Dosed first patient in the SAFEGUARD trial",
    complete: true,
  },
  {
    position: "timeline-item--slot-5",
    label: "Q4 2025:",
    copy: "SAB-142 Phase 1 redosing data demonstrated continued lack of lymphodepletion and immunogenicity on repeat dosing",
    complete: true,
  },
  {
    position: "timeline-item--slot-6",
    label: "Q4 2026:",
    copy: "Complete enrollment of the SAFEGUARD trial of SAB-142 by end of 2026",
  },
  {
    position: "timeline-item--slot-7",
    label: "2H 2027:",
    copy: "Phase 2b SAFEGUARD topline data",
  },
];

export default function AboutPage() {
  return (
    <InnerPageShell>
      <InnerHero
        eyebrow="Company Profile"
        title="What drives us"
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
          The <span>vision</span>, <span>mission</span>, and{" "}
          <span>values</span> behind our pursuit of disease modification in type
          1 diabetes.
        </h2>
        <p className="split-content__lead">
          SAB BIO was founded on a belief that autoimmune disease modification
          should not be the exception—it should be the standard of care. That
          vision shapes every program we run, every partnership we pursue, and
          every decision we make.
        </p>
        <p>
          Our mission is to make it real. We are developing a medicine to change
          the course of type 1 diabetes, not manage its symptoms, but intervene
          at the source and dramatically redefine what a diagnosis means for the
          millions of patients and families it touches each year.
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

      <Timeline
        title={
          <>
            <span>Where</span> we’re going
          </>
        }
        years={["2025", "2026", "2027"]}
        items={milestones}
      />

      <NextFeature
        href="/about/leadership/"
        image="/assets/about-team.jpg"
        imageAlt="Scientists working together in a laboratory"
        title="Meet our team"
      />
    </InnerPageShell>
  );
}
