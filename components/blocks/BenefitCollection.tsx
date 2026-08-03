import { IconTextCard } from "./IconTextCard";

export function BenefitCollection({
  title,
  image,
  imageAlt,
  items,
}: {
  title: string;
  image: string;
  imageAlt: string;
  items: string[];
}) {
  return (
    <section
      data-block="benefit-collection"
      className="benefit-collection page-section container"
      data-reveal-target
      data-reveal="pending"
    >
      <h2 className="section-heading">{title}</h2>
      <div className="benefit-collection__grid">
        <img src={image} alt={imageAlt} />
        <div className="benefit-collection__list">
          {items.map((item) => (
            <IconTextCard symbol="✓" key={item}>
              <p>{item}</p>
            </IconTextCard>
          ))}
        </div>
      </div>
    </section>
  );
}
