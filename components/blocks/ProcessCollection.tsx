import type { ReactNode } from "react";
import { CardGrid } from "../layout/CardGrid";
import { Section } from "../layout/Section";
import { ProcessCard } from "./ProcessCard";

type ProcessItem = {
  symbol: ReactNode;
  title: string;
  copy: string;
};

export function ProcessCollection({
  title,
  items,
  compact = false,
}: {
  title: ReactNode;
  items: ProcessItem[];
  compact?: boolean;
}) {
  /* A short flow keeps the four-column card width and centres itself, so a
     two-step stage reads as part of the same rhythm as a four-step one. */
  const pair = items.length <= 2;

  return (
    <Section data-block="process-collection" compact={compact}>
      <h2 className="process-heading">{title}</h2>
      <CardGrid columns={4} className={pair ? "card-grid--pair" : ""}>
        {items.map((item) => (
          <ProcessCard {...item} key={item.title} />
        ))}
      </CardGrid>
    </Section>
  );
}
