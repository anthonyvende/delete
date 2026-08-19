import type { ReactNode } from "react";
import { ArrowIcon } from "../ui/ArrowIcon";
import { ButtonLink } from "../ui/ButtonLink";
import { Eyebrow } from "../ui/Eyebrow";

type Article = {
  date: string;
  title: string;
  copy: string;
  href: string;
};

type ArticleGridProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  action: { href: string; label: string };
  items: Article[];
};

export function ArticleGrid({
  id,
  eyebrow,
  title,
  action,
  items,
}: ArticleGridProps) {
  return (
    <section
      data-block="article-grid"
      className="section article-section"
      id={id}
      data-reveal-target
      data-reveal="pending"
      suppressHydrationWarning
    >
      <div className="section__intro">
        <div className="article-section__heading">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="article-section__title">{title}</h2>
        </div>
      </div>
      <div className="article-grid">
        {items.map((item) => (
          <a
            className="article-card expanding-action surface-card"
            href={item.href}
            key={item.title}
          >
            <time className="article-card__meta">{item.date}</time>
            <h3 className="article-card__title">{item.title}</h3>
            <p className="article-card__copy">{item.copy}</p>
            <span
              className="article-card__arrow expanding-action__control icon-circle"
              aria-hidden="true"
            >
              <ArrowIcon className="expanding-action__arrow-icon" />
            </span>
          </a>
        ))}
      </div>
      <ButtonLink href={action.href}>{action.label}</ButtonLink>
    </section>
  );
}
