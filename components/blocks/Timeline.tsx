import type { ReactNode } from "react";

export type TimelineItem = {
  label: string;
  copy: string;
  /* Delivered milestones are filled and carry a check; future ones are outlined. */
  complete?: boolean;
  /* Which side of the year bar the pill sits on. */
  side: "above" | "below";
  /* Distance from the bar. Tier 2 clears a tier 1 pill beneath it. */
  tier?: 1 | 2;
  /* Placement along the twelve-column canvas. */
  column: number;
  span?: number;
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
      suppressHydrationWarning
    >
      <div className="container">
        <h2 className="timeline-section__title">{title}</h2>
        <div className="timeline-canvas" aria-label="SAB Bio roadmap">
          <ol className="timeline-line">
            {years.map((year) => (
              <li className={`timeline-year timeline-year--${year}`} key={year}>
                {year}
              </li>
            ))}
          </ol>

          {items.map((item) => (
            <article
              className={[
                "timeline-item",
                `timeline-item--${item.side}`,
                `timeline-item--tier-${item.tier ?? 1}`,
                item.complete ? "timeline-item--complete" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={
                {
                  "--timeline-column": item.column,
                  "--timeline-span": item.span ?? 3,
                } as React.CSSProperties
              }
              key={`${item.label}-${item.copy}`}
            >
              <div className="timeline-item__pill">
                {item.complete ? (
                  <span className="timeline-item__check" aria-label="Completed">
                    ✓
                  </span>
                ) : null}
                <strong>{item.label}</strong>
                <span>{item.copy}</span>
              </div>
              <span className="timeline-item__connector" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
