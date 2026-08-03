import type { Metadata } from "next";
import { InnerHero } from "../../../components/blocks/InnerHero";
import { NextStepStack } from "../../../components/blocks/NextStepStack";
import { PeopleDirectory } from "../../../components/blocks/PeopleDirectory";
import { InnerPageShell } from "../../../components/layout/InnerPageShell";

export const metadata: Metadata = {
  title: "Leadership",
  description: "Meet the scientific and operational leaders behind SAB BIO.",
};

const executives = [
  { name: "Samuel J. Reich", role: "Chief Executive Officer" },
  { name: "Mark Conley, MD", role: "Chief Medical Officer" },
  { name: "David Neuman", role: "Chief Financial Officer" },
  { name: "Gaurav Talwar, PhD", role: "Chief Scientific Officer" },
  { name: "Michael King", role: "Chief Operating Officer" },
];

// TODO: supply real board and advisory roster (name, role, photo, bio) — these
// tabs render an empty state until the content is provided.
const boardMembers: { name: string; role: string }[] = [];

const clinicalAdvisors: { name: string; role: string }[] = [];

const seniorLeaders = [
  { name: "Eddie J. Sullivan, PhD", role: "Co-Founder & Strategic Advisor" },
  {
    name: "Amy Clemens",
    role: "Senior Vice President, Clinical Operations",
  },
  {
    name: "Ben Kelner",
    role: "Senior Vice President, Corporate Development",
  },
];

export default function LeadershipPage() {
  return (
    <InnerPageShell>
      <InnerHero
        eyebrow="Leadership"
        title="Meet the team leading with science"
        image="/assets/pages/leadership-hero.webp"
        imageAlt="SAB BIO researchers working together at a microscope"
        intro={
          <p className="lead">
            The scientific, clinical, and operational leadership behind SAB
            BIO&apos;s mission in type 1 diabetes
          </p>
        }
      />

      <PeopleDirectory
        panels={[
          {
            id: "senior-management",
            label: "Senior Management",
            groups: [
              {
                id: "executive-management",
                label: "Executive Management",
                people: executives,
              },
              {
                id: "senior-leadership",
                label: "Senior Leadership",
                people: seniorLeaders,
              },
            ],
          },
          {
            id: "board-of-directors",
            label: "Board of Directors",
            groups: [
              {
                id: "board-members",
                label: "Board of Directors",
                people: boardMembers,
              },
            ],
          },
          {
            id: "clinical-advisory-board",
            label: "Clinical Advisory Board",
            groups: [
              {
                id: "clinical-advisors",
                label: "Clinical Advisory Board",
                people: clinicalAdvisors,
              },
            ],
          },
        ]}
      />

      <NextStepStack
        items={[
          {
            href: "/pipeline/",
            image: "/assets/pages/pipeline-hero.webp",
            title: "See our pipeline",
          },
          {
            href: "/careers/",
            image: "/assets/pages/careers-hero.webp",
            title: "Explore careers",
          },
        ]}
      />
    </InnerPageShell>
  );
}
