import type { Metadata } from "next";
import { FactFeature } from "../../../components/blocks/FactFeature";
import { ValueIcon } from "../../../components/icons/ValueIcon";
import { IconTextCollection } from "../../../components/blocks/IconTextCollection";
import { InnerHero } from "../../../components/blocks/InnerHero";
import { MediaBanner } from "../../../components/blocks/MediaBanner";
import { NextStepStack } from "../../../components/blocks/NextStepStack";
import { ResourceCollection } from "../../../components/blocks/ResourceCollection";
import { SplitContent } from "../../../components/blocks/SplitContent";
import { InnerPageShell } from "../../../components/layout/InnerPageShell";
import { ButtonLink } from "../../../components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "About SAB-142",
  description:
    "Learn about SAB-142, an investigational disease-modifying therapy for type 1 diabetes.",
};

const principles = [
  {
    symbol: <ValueIcon name="antibody" />,
    title: "T1D is an autoimmune disease that affects millions of people worldwide.",
    copy: "In T1D, the immune system—your body's natural defense—mistakenly attacks the beta cells in the pancreas that make insulin. The inability to produce insulin is the consequence. The immune attack on the insulin-producing cells is the cause. And for decades, treatment has focused almost entirely on replacing insulin without addressing the underlying cause of the disease.",
  },
  {
    symbol: <ValueIcon name="shield-person" />,
    title: "SAB-142 is designed to stop the autoimmune attack.",
    copy: "SAB-142 works by targeting multiple immune cells involved in destroying beta cells that produce insulin with the goal of delaying progression of T1D.",
  },
  {
    symbol: <ValueIcon name="vial" />,
    title: "SAB-142 supports long-term disease modification through repeat dosing.",
    copy: "SAB-142 is made from fully human antibodies, like proteins your body already makes. Because they look familiar to your immune system, your body is less likely to trigger the body's immune system to react against them. That means SAB-142 may be suitable for repeat dosing in order to delay progression of T1D, which cannot be offered by any currently approved disease-modifying therapy in T1D.",
  },
];

const resources = [
  {
    title: "Breakthrough T1D",
    image: "/assets/pages/breakthrough-t1d.png",
    href: "https://www.breakthrought1d.org/",
  },
  {
    title: "American Diabetes Association",
    image: "/assets/pages/american-diabetes.png",
    href: "https://diabetes.org/",
  },
];

export default function AboutSab142Page() {
  return (
    <InnerPageShell>
      <InnerHero
        eyebrow="How SAB-142 works"
        title="You’ve been managing T1D. We’re working to change it."
        image="/assets/pages/patient-insulin.webp"
        imageAlt="A person preparing an insulin dose at home"
        intro={
          <>
            <p className="lead">
              Most treatments help you manage living with type 1 diabetes
              (T1D). SAB-142 is being studied to change the course of T1D to
              address the underlying autoimmune attack.
            </p>
            <p>
              If you or someone close to you has T1D, you know the daily
              reality: the checking, the calculating, the constant adjustments.
              Living with T1D means making countless decisions every day around
              meals, activity, insulin, and blood glucose levels, while carrying
              the emotional weight of managing a lifelong disease. Insulin plays
              a critical role in regulating blood glucose and helping the body
              use energy. Without enough insulin, glucose builds up in the
              blood, increasing the risk of damage to nerves, blood vessels,
              tissues, and organs over time.
            </p>
          </>
        }
      />

      <FactFeature
        image="/assets/pages/watermelon-kids.webp"
        imageAlt="Two children enjoying watermelon outside"
        map="/assets/pages/world-map.svg"
        quote="We’re working to change the course of T1D."
        intro={
          <>
            Today’s treatments focus on replacing the insulin your body can no
            longer make. That’s essential, but insulin therapies and delivery
            devices cannot match your body’s natural ability to regulate
            glucose, and they do not stop the immune attack that destroys your
            insulin-producing cells in the first place.
          </>
        }
        statistic={
          <>
            T1D affects millions of people worldwide. In the U.S., approximately{" "}
            <span className="teal">2 million people</span> are living with
            insulin-dependent, symptomatic T1D (Stage 3 and beyond), with
            roughly <span className="teal">64,000</span> new diagnoses each
            year.
          </>
        }
      />

      <IconTextCollection items={principles} />

      <MediaBanner
        image="/assets/pages/antibody-wide.webp"
        imageAlt="Scientific visualization of a fully human antibody"
      >
        <p>
          <strong>SAB-142</strong> is investigational and is currently being
          studied in a registrational Phase 2b clinical trial called SAFEGUARD,
          as well as an investigator-led Phase 3 study called PRISE-hATG.
        </p>
      </MediaBanner>

      <SplitContent
        id="safeguard"
        image="/assets/pages/clinical-scientist.webp"
        imageAlt="A clinical researcher working at a microscope"
        mediaFirst
      >
        <>
          <h2>
            Interested in participating in the{" "}
            <span className="teal">clinical trial?</span>
          </h2>
          <p>
            The SAFEGUARD study is advancing research on SAB-142 in people newly
            diagnosed with Stage 3 T1D to explore its potential to preserve
            insulin-producing cells and delay progression of T1D.
          </p>
          <ButtonLink
            href="mailto:SAFEGUARD@sab.bio?subject=SAFEGUARD%20clinical%20trial"
          >
            Find out if you qualify for SAFEGUARD
          </ButtonLink>
          <p>
            If you&apos;re in the United States, you may contact{" "}
            <a href="tel:+18447631890">1-844-763-1890</a> or{" "}
            <a href="mailto:SAFEGUARD@sab.bio">SAFEGUARD@sab.bio</a> for more
            information.
          </p>
        </>
      </SplitContent>

      <SplitContent
        id="prise-hatg"
        image="/assets/pages/family-care.webp"
        imageAlt="A parent helping a child with diabetes care"
      >
        <>
          <h2>
            <span className="teal">Not newly diagnosed?</span>
            <br />
            There may still be a path.
          </h2>
          <p>
            Breakthrough T1D has awarded a grant to expand research on SAB-142
            in patients up to two years from diagnosis.
          </p>
          <ButtonLink href="/pipeline/">
            Learn more about the PRISE-hATG study
          </ButtonLink>
          <p className="footnote">
            PRISE-hATG=Personalized Response and Immunologic Surveillance of
            Endogenous C-Peptide Preservation in New, Recent, and Extended New
            Onset T1D Treated with human Anti-Thymocyte Globulin.
          </p>
        </>
      </SplitContent>

      <ResourceCollection
        title={
          <>
            For <span className="teal">additional T1D education</span>,
            resources,
            <br />
            and community support, visit
          </>
        }
        items={resources}
      />

      <NextStepStack
        items={[
          {
            href: "/pipeline/",
            title: "Discover our expanded access policy",
            colorBlock: true,
          },
        ]}
      />
    </InnerPageShell>
  );
}
