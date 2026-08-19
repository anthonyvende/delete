import type { ReactNode } from "react";
import { CircleArrow } from "../ui/CircleArrow";

type StudyLink = {
  image: string;
  title: ReactNode;
  href: string;
};

export function StudyLinkGrid({ items }: { items: StudyLink[] }) {
  return (
    <div
      data-block="study-link-grid"
      className="study-links"
      data-reveal-target
      data-reveal="pending"
      suppressHydrationWarning
    >
      {items.map((item) => (
        <a
          className="study-link surface-card"
          href={item.href}
          key={item.image}
        >
          <img src={item.image} alt="" />
          <span className="study-link__copy">{item.title}</span>
          <CircleArrow className="study-link__arrow" />
        </a>
      ))}
    </div>
  );
}
