import { CircleArrow } from "../ui/CircleArrow";

type NextFeatureProps = {
  href: string;
  image: string;
  imageAlt: string;
  eyebrow?: string;
  title: string;
};

export function NextFeature({
  href,
  image,
  imageAlt,
  eyebrow = "Next Up:",
  title,
}: NextFeatureProps) {
  return (
    <section
      data-block="next-feature"
      className="next-feature-section"
      data-reveal-target
      data-reveal="pending"
    >
      <a className="next-feature expanding-action surface-card" href={href}>
        <img src={image} alt={imageAlt} />
        <span className="next-feature__copy">
          {eyebrow}
          <strong>{title}</strong>
        </span>
        <CircleArrow className="next-feature__arrow expanding-action__control" />
      </a>
    </section>
  );
}
