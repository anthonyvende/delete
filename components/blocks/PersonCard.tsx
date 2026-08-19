import { CircleArrow } from "../ui/CircleArrow";

export type PersonCommittee = {
  label: string;
  href?: string;
};

export type PersonCardProps = {
  name: string;
  role: string;
  image?: string;
  bio?: string;
  bioFull?: string[];
  /* Board members list the committees they sit on beneath their biography. */
  committees?: PersonCommittee[];
  /* Advisory members are credited with an institution instead of a biography. */
  institution?: string;
};

/*
 * Two shapes share one card. A person with a biography gets a photo, a hover
 * arrow, and a dialog; an advisory member has neither photo nor biography, so
 * the card carries only their title and institution and stays inert.
 */
export function PersonCard({
  name,
  role,
  image = "/assets/pages/leader-samuel.webp",
  bio,
  bioFull,
  committees,
  institution,
}: PersonCardProps) {
  if (institution && !bio) {
    return (
      <article className="person-card person-card--plain surface-card">
        <h3 className="person-card__name">{name}</h3>
        <p className="person-card__role">{role}</p>
        <p className="person-card__institution">{institution}</p>
      </article>
    );
  }

  const summary =
    bio ??
    "Helping lead SAB BIO's work to transform treatment for people living with autoimmune disease.";
  const paragraphs = bioFull ?? [summary];

  return (
    <div className="person-card-shell" data-person-card>
      <article className="person-card surface-card">
        <img
          className="person-card__photo"
          src={image}
          alt={`${name}, ${role}`}
        />
        <div className="person-card__body expanding-action">
          <h3 className="person-card__name">{name}</h3>
          <p className="person-card__role">{role}</p>
          <p>{summary}</p>
          {committees?.length ? (
            <ul className="person-card__committees">
              {committees.map((committee) => (
                <li key={committee.label}>
                  {committee.href ? (
                    <a href={committee.href}>{committee.label}</a>
                  ) : (
                    committee.label
                  )}
                </li>
              ))}
            </ul>
          ) : null}
          <CircleArrow className="person-card__arrow expanding-action__control" />
        </div>
        <button
          className="person-card__trigger"
          type="button"
          aria-haspopup="dialog"
          data-person-open
        >
          {`Read ${name}'s biography`}
        </button>
      </article>

      <dialog className="person-modal" data-person-dialog>
        <div className="person-modal__panel">
          <button
            className="person-modal__close"
            type="button"
            aria-label={`Close ${name} biography`}
            data-person-close
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <div className="person-modal__aside">
            <img
              className="person-modal__photo"
              src={image}
              alt={`${name}, ${role}`}
            />
            <h3 className="person-modal__name">{name}</h3>
            <p className="person-modal__role">{role}</p>
          </div>
          <div className="person-modal__bio">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {committees?.length ? (
              <ul className="person-modal__committees">
                {committees.map((committee) => (
                  <li key={committee.label}>{committee.label}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </dialog>
    </div>
  );
}
