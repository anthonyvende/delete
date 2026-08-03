import type { ReactNode } from "react";
import { CardGrid } from "../layout/CardGrid";
import { Section } from "../layout/Section";
import { ProcessCard } from "./ProcessCard";

type ProcessItem = {
  symbol: string;
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
  const columns = items.length <= 2 ? 2 : 4;

  return (
    <Section data-block="process-collection" compact={compact}>
      <h2 className="process-heading">{title}</h2>
      <CardGrid columns={columns}>
        {items.map((item) => (
          <ProcessCard {...item} key={item.title} />
        ))}
      </CardGrid>
    </Section>
  );
}
