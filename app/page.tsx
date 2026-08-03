import { ArticleGrid } from "../components/blocks/ArticleGrid";
import { CareersBand } from "../components/blocks/CareersBand";
import { ImageTextBand } from "../components/blocks/ImageTextBand";
import { LandingHero } from "../components/blocks/LandingHero";
import { LandingSectionStack } from "../components/blocks/LandingSectionStack";
import { LandingPageShell } from "../components/layout/PageShell";

const news = [
  {
    date: "July 7, 2026",
    title: "Advancing the understanding of autoimmune disease",
    copy: "Our clinical work is focused on changing the course of autoimmune disease.",
    href: "#pipeline-section",
  },
  {
    date: "May 29, 2026",
    title: "Helping patients live fuller lives",
    copy: "Patient and caregiver experiences guide the work we advance.",
    href: "#patients-section",
  },
  {
    date: "May 12, 2026",
    title: "From research to reality",
    copy: "Fully human antibodies are opening a new path for autoimmune care.",
    href: "#platform-section",
  },
];

export default function HomePage() {
  return (
    <LandingPageShell>
      <LandingHero
        animation
        image="/assets/home-hero.png"
        imageAlt="Molecular spheres emerging across a pale blue field"
        title={
          <>
            We’re Not Here To
            <br />
            Manage Type 1 Diabetes.
            <span>We’re Here To Change It.</span>
          </>
        }
      >
        <p>
          At SAB BIO, we believe changing the future starts with thinking
          differently. We’re committed to redefining what a type 1 diabetes
          (T1D) diagnosis means with a novel disease-modifying therapy.
        </p>
      </LandingHero>

      <LandingSectionStack>
        <ImageTextBand
          id="about-section"
          layout="copy-media-cutout"
          eyebrow="About Us"
          title={
            <>
              We’re <span>revolutionizing</span>
              <br />
              the treatment
              <br />
              paradigm in T1D
            </>
          }
          image="/assets/home-microscope.jpg"
          imageAlt="Microscope in a research laboratory"
          action={{ href: "/about/", label: "Learn what drives us" }}
          mediaAction={{ href: "/about/", label: "Our Leadership" }}
        >
          At SAB BIO, our mission is singular: to dramatically redefine what it
          means to be diagnosed with T1D by developing a medicine to change the
          course of disease, not just treat symptoms. Every decision we
          make—scientific, clinical, and operational—is grounded in that
          commitment.
        </ImageTextBand>

        <ImageTextBand
          id="pipeline-section"
          layout="media-note-copy"
          eyebrow="Pipeline"
          title={
            <>
              T1D is where{" "}
              <span>
                we
                <br />
                start
              </span>
              , not where
              <br />
              we end
            </>
          }
          image="/assets/home-antibody.png"
          imageAlt="Human antibody research visualization"
          action={{ href: "/pipeline/", label: "See where we’re headed" }}
          note={{
            title: "SAB-142 Anti-Thymocyte Globulin (Human)",
            copy: "Our goal is to develop a T1D therapy that immunomodulates T cells to preserve C-peptide while avoiding immunosuppression.",
          }}
        >
          Our focus today is advancing SAB-142 as a potential best-in-class,
          disease-modifying therapy for T1D. Looking ahead, we believe our
          platform has the opportunity to transform the treatment of autoimmune
          diseases more broadly.
        </ImageTextBand>

        <ImageTextBand
          id="platform-section"
          layout="copy-note-media"
          eyebrow="Platform"
          title={
            <>
              A platform built
              <br />
              <span>differently</span>
            </>
          }
          image="/assets/home-scientist.jpg"
          imageAlt="Scientist operating laboratory equipment"
          action={{
            href: "/platform/how-sab-142-works/",
            label: "Discover how SAB-142 works",
          }}
          note={{
            title: "Revolutionary Antibody Technology:",
            copy: "Human Immunoglobulin G (hIgG) to Treat and Prevent Autoimmune Disorders",
          }}
        >
          For decades, insulin has been the standard of care for T1D but it
          doesn’t stop the immune attack driving the disease. SAB-142 is
          designed to do that: stopping the overreactive immune response and
          preventing loss of cells that produce insulin. It’s our multispecific,
          fully human type 1 diabetes immunotherapy in a registrational Phase 2b
          trial.
        </ImageTextBand>

        <ImageTextBand
          id="patients-section"
          layout="media-copy"
          eyebrow="Patients"
          title={
            <>
              Every decision starts
              <br />
              with <span>patients</span>
            </>
          }
          image="/assets/home-patient.jpg"
          imageAlt="A child managing diabetes while playing outdoors"
          action={{
            href: "/patients/about-sab-142/",
            label: "Get to know SAB-142",
          }}
        >
          Everything we do is driven by the people living with T1D and the
          caregivers who support them. Your stories inspire our commitment to
          reduce the burden of this disease and improve lives.
        </ImageTextBand>

        <ArticleGrid
          id="news-section"
          eyebrow="Investors & Media"
          title={
            <>
              The latest from <span>SAB BIO</span>
            </>
          }
          action={{ href: "#news-section", label: "Read all news" }}
          items={news}
        />

        <CareersBand
          id="careers-section"
          image="/assets/home-careers.jpg"
          imageAlt="Researcher working with a microscope"
          title="Careers"
          href="/careers/"
          actionLabel="Join the team"
        />
      </LandingSectionStack>
    </LandingPageShell>
  );
}
