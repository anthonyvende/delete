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
  {
    name: "Samuel J. Reich",
    role: "CEO",
    bio: "Samuel J. Reich currently serves as Chief Executive Officer of SAB Biotherapeutics.",
  },
  {
    name: "Eddie J. Sullivan, PhD",
    role: "Co-Founder & President",
    bio: "Eddie J. Sullivan, PhD, is our co-founder and president since 2014.",
  },
  {
    name: "Lucy To",
    role: "EVP & Chief Financial Officer",
    bio: "Lucy To was named Chief Financial Officer in August of 2024, bringing over 18 years of finance leadership.",
  },
  {
    name: "Christoph Bausch, PhD, MBA",
    role: "EVP & Chief Operating Officer",
    bio: "Christoph Bausch, PhD, MBA, is our Chief Operating Officer as of May 2022.",
  },
  {
    name: "Alexandra Kropotova, MD, MBA",
    role: "EVP & Chief Medical Officer",
    bio: "Dr. Kropotova, MD, MBA is our Executive Vice President & Chief Medical Officer.",
  },
];

const seniorLeaders = [
  {
    name: "Carlos Carrillo, Ph.D., M.Sc",
    role: "Senior Vice President of Regulatory Affairs",
    bio: "Carlos Carrillo, Ph.D., M.Sc., brings more than 29 years of exceptional experience in regulatory affairs.",
  },
  {
    name: "Mark Conley, MBA, CPA",
    role: "Vice President of Finance",
    bio: "Mark Conley has served as our Vice President of Finance since November 2023.",
  },
  {
    name: "Catherine DeRose",
    role: "Vice President of Human Resources",
    bio: "Catherine DeRose joined SAB BIO in February 2024 as Vice President of Human Resources.",
  },
  {
    name: "Angie Parizek",
    role: "Senior Vice President of Clinical Operations",
    bio: "Angie Parizek leads clinical operations at SAB Biotherapeutics.",
  },
  {
    name: "Todd Stahl",
    role: "Vice President of Plasma Production",
    bio: "Todd Stahl serves as the Vice President of Plasma Production at SAB, having worked across the platform.",
  },
  {
    name: "Stan Stoyanov, MD, MBA",
    role: "Vice President of Clinical Development",
    bio: "Stan is a physician-scientist with over 25 years of experience in global clinical development.",
  },
  {
    name: "Hua Wu, PhD",
    role: "Senior Vice President of Product Development",
    bio: "Hua Wu, PhD, serves as the Senior Vice President of Product Development at SAB.",
  },
];

const AUDIT = "Member of the Audit Committee";
const AUDIT_CHAIR = "Chair of the Audit Committee";
const COMP = "Member of the Compensation Committee";
const COMP_CHAIR = "Chair of the Compensation Committee";
const NOM = "Member of the Nominating and Corporate Governance Committee";
const NOM_CHAIR = "Chair of the Nominating and Corporate Governance Committee";

const boardMembers = [
  {
    name: "David Zaccardelli, Pharm.D.",
    role: "Chair of the Board",
    bio: "Dr. David Zaccardelli is an accomplished biopharmaceutical executive with more than 30 years of industry experience.",
  },
  {
    name: "Samuel J. Reich",
    role: "CEO",
    bio: "Samuel J. Reich currently serves as Chief Executive Officer of SAB Biotherapeutics.",
  },
  {
    name: "Eddie J. Sullivan, PhD",
    role: "Co-Founder & President",
    bio: "Eddie J. Sullivan, PhD, is our co-founder and president since 2014. Dr. Sullivan has led the platform from its origin.",
  },
  {
    name: "Katie Ellias",
    role: "Director",
    bio: "Katie Ellias joined SAB's Board of Directors in November 2023, bringing more than two decades of investment experience.",
    committees: [{ label: COMP_CHAIR }, { label: AUDIT }],
  },
  {
    name: "Scott Giberson, RPh, MPH, D.Sc.",
    role: "Director",
    bio: "Rear Admiral (RADM), retired, Scott Giberson joined the SAB board of directors in April 2023, bringing thirty years of public health leadership.",
    committees: [{ label: COMP }, { label: NOM }],
  },
  {
    name: "Rita Jain, M.D.",
    role: "Director",
    bio: "Dr. Rita Jain is a rheumatologist who brings more than two decades of leadership in drug development.",
    committees: [{ label: COMP }],
  },
  {
    name: "David Link, MBA",
    role: "Director",
    bio: "David Link, MBA, has served as a member of our board of directors since 2018 and is a seasoned operator.",
    committees: [{ label: NOM_CHAIR }],
  },
  {
    name: "Erick Lucera, CFA",
    role: "Director",
    bio: "Erick Lucera joined the SAB board of directors in October 2023, bringing thirty years of financial leadership.",
    committees: [{ label: AUDIT_CHAIR }, { label: COMP }],
  },
  {
    name: "Andrew Moin",
    role: "Director",
    bio: "Andrew Moin joined the SAB Board of Directors in October 2023, bringing extensive investment experience.",
    committees: [{ label: NOM }],
  },
  {
    name: "Bill Polvino, MD",
    role: "Director",
    bio: "Dr. William J. Polvino, MD, has served as a member of our board of directors since 2021.",
    committees: [{ label: AUDIT }],
  },
  {
    name: "Jay Skyler, MD",
    role: "Director",
    bio: "Dr. Jay S. Skyler, M.D., MACP, FRCP joined the Board in May 2024. He is a Professor of Medicine, Pediatrics and Psychology.",
    committees: [{ label: NOM }],
  },
];

/* Advisory members are credited by institution and carry no biography. */
const clinicalAdvisors = [
  {
    name: "Colin Mark Dayan, MA, MBBS, FRCP, PhD",
    role: "Professor of Clinical Diabetes and Metabolism",
    institution: "Cardiff University School of Medicine",
  },
  {
    name: "Michael Haller, MD",
    role: "Professor and Chief Silverstein Family Eminent Scholar",
    institution: "University of Florida",
  },
  {
    name: "Stephen Gitelman, MD",
    role: "Professor Pediatrics",
    institution: "University of California, San Francisco",
  },
  {
    name: "Thomas Kay, MBBS, PhD",
    role: "Professor of Medicine",
    institution: "University of Melbourne",
  },
  {
    name: "Chantal Mathieu, MD, PhD",
    role: "Professor of Medicine",
    institution: "Katholieke Universiteit Leuven",
  },
  {
    name: "John Wentworth MBBS, FRACP",
    role: "Professor of Medicine",
    institution: "Royal Melbourne Hospital",
  },
  {
    name: "Jay S. Skyler, MD, MACP, FRCP",
    role: "Professor of Medicine, Pediatrics, & Psychology, in the Division of Endocrinology Diabetes & Metabolism, Department of Medicine",
    institution:
      "University of Miami Leonard M. Miller School of Medicine, Miami, Florida",
  },
];

export default function LeadershipPage() {
  return (
    <InnerPageShell>
      <InnerHero
        eyebrow="Leadership"
        title="Meet the team"
        image="/assets/pages/leadership-hero.webp"
        imageAlt="Clinicians reviewing data together on a tablet"
        intro={
          <p className="lead">
            SAB BIO is led by a team with deep, proven biopharma experience
            across global clinical development, regulatory strategy, and
            commercialization.
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
            id: "board",
            label: "Board of Directors",
            groups: [{ id: "board-members", label: "", people: boardMembers }],
          },
          {
            id: "clinical-advisory",
            label: "Clinical Advisory Board",
            groups: [{ id: "advisors", label: "", people: clinicalAdvisors }],
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
