import type { ReactNode } from "react";

export type TimelineItem = {
  position: string;
  label: string;
  copy: string;
  complete?: boolean;
};

type TimelineProps = {
  title: ReactNode;
  years: string[];
  items: TimelineItem[];
};

export function Timeline({ title, years, items }: TimelineProps) {
  return (
    <section
      data-block="timeline"
      className="timeline-section"
      data-reveal-target
      data-reveal="pending"
    >
      <div className="container">
        <h2 className="timeline-section__title">{title}</h2>
        <div className="timeline-canvas" aria-label="SAB Bio roadmap">
          <div className="timeline-line">
            {years.map((year) => (
              <span
                className={`timeline-year timeline-year--${year}`}
                key={year}
              >
                {year}
              </span>
            ))}
          </div>
          {items.map((item) => (
            <article
              className={`timeline-item timeline-slot ${item.position}`}
              key={`${item.label}-${item.copy}`}
            >
              {item.complete ? (
                <span className="timeline-item__check" aria-label="Completed">
                  ✓
                </span>
              ) : null}
              <strong>{item.label}</strong>
              <span>{item.copy}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
