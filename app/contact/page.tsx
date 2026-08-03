import type { Metadata } from "next";
import { ContactSection } from "../../components/blocks/ContactSection";
import { InnerHero } from "../../components/blocks/InnerHero";
import { InnerPageShell } from "../../components/layout/InnerPageShell";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact SAB BIO about our company, clinical programs, media, investor relations, or careers.",
};

export default function ContactPage() {
  return (
    <InnerPageShell>
      <InnerHero
        eyebrow="Contact"
        title="Let’s change what comes next"
        image="/assets/pages/clinical-scientist.webp"
        imageAlt="A scientist working in a laboratory"
        imagePosition="center 35%"
        intro={
          <p>
            We welcome conversations with patients, partners, media, investors,
            and people who want to help change the course of autoimmune disease.
          </p>
        }
      />
      <ContactSection />
    </InnerPageShell>
  );
}
