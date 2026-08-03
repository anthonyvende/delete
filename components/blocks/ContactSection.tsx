import { Section } from "../layout/Section";
import { Eyebrow } from "../ui/Eyebrow";
import { ContactForm } from "./ContactForm";

type ContactSectionProps = {
  formIdPrefix?: string;
};

export function ContactSection({
  formIdPrefix = "contact",
}: ContactSectionProps) {
  return (
    <Section
      data-block="contact-section"
      aria-labelledby="contact-section-title"
      className="contact-section"
    >
      <div className="contact-section__intro">
        <Eyebrow>Contact SAB BIO</Eyebrow>
        <h2 id="contact-section-title">Start a conversation</h2>
        <p>
          Connect with our team about our company, clinical programs, media,
          investor relations, or careers.
        </p>
        <address className="contact-section__details">
          <a href="mailto:info@sab.bio">info@sab.bio</a>
          <a href="tel:+16053399332">+1 605 339 9332</a>
          <span>2100 East 54th Street North, Sioux Falls, SD 57104</span>
        </address>
      </div>
      <ContactForm idPrefix={formIdPrefix} />
    </Section>
  );
}
