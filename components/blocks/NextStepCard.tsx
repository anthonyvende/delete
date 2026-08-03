import { CircleArrow } from "../ui/CircleArrow";

type NextStepCardProps = {
  href: string;
  title: string;
  image?: string;
  imageAlt?: string;
  eyebrow?: string;
  colorBlock?: boolean;
};

export function NextStepCard({
  href,
  title,
  image,
  imageAlt = "",
  eyebrow = "Next Up:",
  colorBlock = false,
}: NextStepCardProps) {
  return (
    <a className="next-step surface-card" href={href}>
      {image ? (
        <span className="next-step__media">
          <img src={image} alt={imageAlt} />
        </span>
      ) : (
        <span
          className={`next-step__media next-step__media--color${colorBlock ? " is-accent" : ""}`}
          aria-hidden="true"
        />
      )}
      <span className="next-step__copy">
        <span>{eyebrow}</span>
        <strong>{title}</strong>
      </span>
      <span className="next-step__action cutout-action">
        <CircleArrow className="next-step__arrow" />
      </span>
    </a>
  );
}
