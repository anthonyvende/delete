import { CircleArrow } from "../ui/CircleArrow";

type PersonCardProps = {
  name: string;
  role: string;
  image?: string;
  bio?: string;
  bioFull?: string[];
};

export function PersonCard({
  name,
  role,
  image = "/assets/pages/leader-samuel.webp",
  bio = "Helping lead SAB BIO's work to transform treatment for people living with autoimmune disease.",
  bioFull,
}: PersonCardProps) {
  const paragraphs = bioFull ?? [bio];

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
          <p>{bio}</p>
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
          </div>
        </div>
      </dialog>
    </div>
  );
}
