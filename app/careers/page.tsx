import type { Metadata } from "next";
import { FeatureCollection } from "../../components/blocks/FeatureCollection";
import { InnerHero } from "../../components/blocks/InnerHero";
import { JobBoard } from "../../components/blocks/JobBoard";
import { NoticeList } from "../../components/blocks/NoticeList";
import { SplitContent } from "../../components/blocks/SplitContent";
import { InnerPageShell } from "../../components/layout/InnerPageShell";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join SAB BIO and help change the course of autoimmune disease through science.",
};

const values = [
  {
    icon: "people",
    title: "Put People First",
    copy: "We see the person and the families behind every diagnosis.",
  },
  {
    icon: "shield",
    title: "Rethink What’s Possible",
    copy: "We are brave enough to see the potential and bold enough to explore it.",
  },
  {
    icon: "clock",
    title: "Move with Urgency",
    copy: "We move fast because every day counts.",
  },
  {
    icon: "hand",
    title: "Deliver Excellence",
    copy: "We say it, we mean it, we prove it.",
  },
];

const jobs = [
  { title: "Clinical Sample Manager" },
  { title: "Clinical Trial Manager, Immunology" },
  { title: "Executive Director, Pharmacovigilance (PV)" },
  { title: "Senior Clinical Project Manager" },
  { title: "Director, Translational Medicine" },
  { title: "Associate Director, Biostatistics" },
  { title: "Clinical Research Associate" },
  { title: "Quality Systems Manager" },
  { title: "Scientist, Immunology" },
];

const notices = [
  {
    title: "Job Postings at SAB BIO",
    copy: "SAB Biotherapeutics, Inc. is an Equal Opportunity Employer. All employment is decided on the basis of qualifications, merit, and business need. Applicants will receive consideration for employment without regard to race, ethnicity, color, religion, sex, gender identity, sexual orientation, national origin, age, disability, protected veteran or disabled status, or other characteristic protected by applicable law.",
  },
  {
    title: "A note to recruiters and employment agencies",
    copy: "All open positions are managed through our Human Resources department. Resumes submitted without an executed agreement for a specific position will be considered unsolicited.",
  },
  {
    title: "Beware of false recruitment offers",
    copy: "SAB BIO will never request passport, banking information, or payment from an applicant. Unusual requests for personal information, credentials, or money may be a sign of fraudulent activity.",
  },
];

export default function CareersPage() {
  return (
    <InnerPageShell>
      <InnerHero
        eyebrow="Careers"
        title={
          <>
            Work that matters.
            <br />
            Science that
            <br />
            changes lives.
          </>
        }
        image="/assets/pages/careers-hero.webp"
        imageAlt="A SAB BIO scientist using a laboratory pipette"
        imagePosition="center 35%"
        intro={
          <>
            <p className="lead">
              At SAB BIO, we are not building another treatment to manage a
              disease.
            </p>
            <p>
              We are working to change the course of the disease from the moment
              of diagnosis, starting with type 1 diabetes. If that mission moves
              you, we want to hear from you.
            </p>
          </>
        }
      />

      <SplitContent
        variant="feature"
        image="/assets/pages/father-daughter.webp"
        imageAlt="A father and daughter laughing together"
        mediaFirst
      >
        <>
          <h2>
            Why this <span className="teal">work matters</span>
          </h2>
          <p className="lead">
            <strong>Our vision is clear:</strong> To transform outcomes for
            people with autoimmune disease through disease modification.
          </p>
          <p>
            At SAB BIO, our mission is to dramatically redefine what it means
            to be diagnosed with T1D by developing a medicine to change the
            course of disease, not just treat symptoms.{" "}
            <em>It is what drives the work we do.</em>
          </p>
        </>
      </SplitContent>

      <FeatureCollection
        variant="section"
        title={
          <>
            The <span>values</span> that guide that work are simple:
          </>
        }
        items={values}
      />

      <JobBoard title="Current openings" jobs={jobs} />

      <NoticeList items={notices} />
    </InnerPageShell>
  );
}
