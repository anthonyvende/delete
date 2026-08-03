import type { ReactNode } from "react";
import { ArrowIcon } from "../ui/ArrowIcon";

type Resource = {
  title: string;
  image: string;
  href: string;
};

export function ResourceCollection({
  title,
  items,
}: {
  title: ReactNode;
  items: Resource[];
}) {
  return (
    <section
      data-block="resource-collection"
      className="resource-collection page-section container"
      data-reveal-target
      data-reveal="pending"
    >
      <h2 className="section-heading">{title}</h2>
      <div className="resource-collection__grid">
        {items.map((item) => (
          <a
            className="resource-card surface-card"
            href={item.href}
            key={`${item.href}-${item.title}`}
          >
            <span className="resource-card__logo">
              <img src={item.image} alt={item.title} />
            </span>
            <span className="resource-card__label expanding-action">
              <span>{item.title}</span>
              <span
                className="resource-card__arrow expanding-action__control icon-circle"
                aria-hidden="true"
              >
                <ArrowIcon className="expanding-action__arrow-icon" />
              </span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
