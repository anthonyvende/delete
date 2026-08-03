import { FormField } from "../ui/FormField";

type ContactFormProps = {
  idPrefix?: string;
};

export function ContactForm({ idPrefix = "contact" }: ContactFormProps) {
  return (
    <form className="contact-form surface-card" data-static-form>
      <div className="contact-form__heading">
        <span className="eyebrow">Send a message</span>
        <h2>How can we help?</h2>
        <p>
          Share your details and message. This static design prototype does not
          transmit or store submitted information.
        </p>
      </div>

      <div className="contact-form__fields">
        <FormField
          id={`${idPrefix}-name`}
          label="Name"
          placeholder="Your full name"
          required
        />
        <FormField
          id={`${idPrefix}-email`}
          label="Email"
          placeholder="you@example.com"
          type="email"
          required
        />
        <FormField
          id={`${idPrefix}-telephone`}
          label="Telephone"
          placeholder="+1 000 000 0000"
          type="tel"
        />
        <FormField
          id={`${idPrefix}-subject`}
          label="Subject"
          placeholder="Choose a subject"
          type="select"
          options={[
            { label: "General inquiry", value: "general" },
            { label: "Clinical programs", value: "clinical" },
            { label: "Media and investors", value: "media" },
            { label: "Careers", value: "careers" },
          ]}
          required
        />
        <FormField
          id={`${idPrefix}-message`}
          label="Message"
          placeholder="Tell us how we can help"
          type="textarea"
          helperText="Please do not include sensitive medical information."
          fullWidth
          required
        />
      </div>

      <div className="contact-form__actions">
        <button className="button button--primary" type="submit">
          Send message
        </button>
      </div>
    </form>
  );
}
