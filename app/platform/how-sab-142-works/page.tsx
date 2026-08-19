import type { Metadata } from "next";
import {
  ComparisonTable,
  type ComparisonRow,
} from "../../../components/blocks/ComparisonTable";
import { IconCallout } from "../../../components/blocks/IconCallout";
import { InnerHero } from "../../../components/blocks/InnerHero";
import { MediaBanner } from "../../../components/blocks/MediaBanner";
import { NextStepStack } from "../../../components/blocks/NextStepStack";
import { SplitContent } from "../../../components/blocks/SplitContent";
import { InnerPageShell } from "../../../components/layout/InnerPageShell";
import { ProcessIcon } from "../../../components/icons/ProcessIcon";

export const metadata: Metadata = {
  title: "How SAB-142 Works",
  description:
    "Explore the mechanism, long-term potential, and broad patient approach behind SAB-142.",
};

const comparisonRows: ComparisonRow[] = [
  { label: "CD4+ exhaustion signature", values: [true, true, true] },
  { label: "Treg preservation", values: [false, true, true] },
  { label: "No sustained lymphodepletion", values: [false, false, true] },
  { label: "No anti-drug antibodies (ADAs)", values: [false, false, true] },
  { label: "No serum sickness", values: [false, false, true] },
  { label: "C-peptide preservation", values: [true, true, "SAFEGUARD*"] },
  { label: "HbA1c", values: [false, true, "SAFEGUARD*"] },
  { label: "Dosing", values: ["12 days", "1–2 days", "2 days"] },
  { label: "Infusing timing", values: ["1 hour", "4–12 hours", "4–6 hours"] },
  { label: "Redosable without ADAs", values: [false, false, true] },
  { label: "Age range", values: ["8–17", "5–45", "5–40*"] },
];

export default function HowSab142WorksPage() {
  return (
    <InnerPageShell>
      <InnerHero
        eyebrow="How SAB-142 works"
        title="The science behind SAB-142"
        image="/assets/pages/how-hero.webp"
        imageAlt="Two clinicians discussing a treatment plan in a laboratory"
        intro={
          <p className="lead">
            SAB-142 is an investigational fully human antibody therapy in
            registrational Phase 2b trials, designed to stop the overreactive
            immune response and preserve beta cells that produce insulin with
            the goal of slowing disease progression in autoimmune type 1
            diabetes.
          </p>
        }
      />

      <SplitContent
        image="/assets/pages/woman-t1d.webp"
        imageAlt="A woman living with type 1 diabetes"
        mediaFirst
      >
        <>
          <h2>
            How <span className="teal">T1D</span> is treated today
          </h2>
          <p>
            Type 1 diabetes is an autoimmune disease, driven by autoreactive T
            cells that mistakenly attack insulin-producing beta cells in the
            pancreas. In the U.S., approximately{" "}
            <strong>2 million patients</strong> have insulin-dependent,
            symptomatic T1D (Stage 3 and beyond), with roughly{" "}
            <strong>64,000 newly diagnosed each year</strong>. For decades, the
            standard of care has been insulin replacement. That approach does
            not address the underlying immune attack, which means the
            destruction of beta cells continues and the disease progresses.
          </p>
          <p>
            We are taking a new approach: developing a disease-modifying therapy
            designed to go beyond insulin by modulating the immune system to
            preserve insulin-producing beta cells and change the course of T1D.
          </p>
        </>
      </SplitContent>

      <MediaBanner
        title={
          <>
            <span className="teal">Validated</span> mechanism
          </>
        }
        slides={[
          {
            image: "/assets/pages/antibody-wide.webp",
            imageAlt: "Scientific visualization of the SAB-142 antibody",
            content: (
              <p>
                <strong className="teal">SAB-142</strong> is a multispecific,
                fully human anti-thymocyte immunoglobulin (hATG) targeting
                multiple immune cells involved in beta cell destruction.
              </p>
            ),
          },
          {
            image: "/assets/pages/microscope-wide.webp",
            imageAlt: "A researcher examining samples under a microscope",
            content: (
              <p>
                SAB-142 is designed to modulate the immune response to preserve
                insulin-producing beta cells and change the course of T1D.
              </p>
            ),
          },
          {
            image: "/assets/pages/father-daughter.webp",
            imageAlt: "A father and daughter laughing together at home",
            content: (
              <p>
                As a fully human biologic, SAB-142 is designed to overcome key
                limitations of non-human approaches and can potentially enable
                long-term repeat dosing.
              </p>
            ),
          },
        ]}
      />

      <SplitContent
        image="/assets/pages/patient-doctor.webp"
        imageAlt="A patient discussing long-term treatment with a physician"
        mediaFirst
      >
        <>
          <h2>
            Designed for <span className="teal">long-term</span> use
          </h2>
          <p>
            T1D is a chronic disease requiring long-term management. In Phase 1
            studies, SAB-142 was generally well tolerated and demonstrated a
            favorable safety profile, with no serum sickness and no observed
            anti-drug antibodies. As a fully human biologic, SAB-142 is designed
            to overcome key limitations of non-human approaches and has the
            potential to enable long-term, repeat dosing to help delay
            progression of T1D.
          </p>
          <IconCallout icon={<ProcessIcon name="vial" />}>
            <p>
              In the clinical study, SAB-142 is administered as a{" "}
              <strong className="teal">
                2-day infusion course, repeated every 6 months
              </strong>
              . The potential for chronic redosing is a fundamental design
              advantage. No currently approved disease-modifying therapy for T1D
              offers it.
            </p>
          </IconCallout>
        </>
      </SplitContent>

      <SplitContent
        image="/assets/pages/mother-child.webp"
        imageAlt="A mother and young child playing outside"
        mediaFirst
        reverse
      >
        <>
          <h2>
            Built for the <span className="teal">broadest eligible</span>{" "}
            patient population
          </h2>
          <p>
            While many T1D clinical studies focus on the first 100 days
            following Stage 3 diagnosis, a significant unmet need remains for
            people beyond this window who still have residual beta cell
            function. SAB-142 is being studied in the investigator-led Phase 3
            PRISE-hATG study, enrolling pediatric and adult patients ages 5–40
            who are 100 days to 2 years following a Stage 3 T1D diagnosis. The
            study is assessing the safety, efficacy, and tolerability of
            SAB-142, expanding the opportunity to evaluate disease modification
            beyond the earliest stages of T1D.
          </p>
        </>
      </SplitContent>

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
        note={
          <small>
            *Potential benefits and patient ranges will be confirmed with
            ongoing SAB-142 clinical-study results.
          </small>
        }
      />

      <NextStepStack
        items={[
          {
            href: "/patients/about-sab-142/",
            image: "/assets/pages/clinical-scientist.webp",
            title: "Find out more about SAFEGUARD",
          },
          {
            href: "/#news-section",
            title: "See recent publications",
          },
        ]}
      />
    </InnerPageShell>
  );
}
