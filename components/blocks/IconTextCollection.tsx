import type { ReactNode } from "react";
import { Section } from "../layout/Section";
import { IconTextCard } from "./IconTextCard";

type IconTextItem = {
  icon?: string;
  symbol?: ReactNode;
  title: string;
  copy: string;
};

export function IconTextCollection({ items }: { items: IconTextItem[] }) {
  return (
    <Section data-block="icon-text-collection" compact>
      <div className="icon-text-collection">
        {items.map((item) => (
          <IconTextCard
            icon={item.icon}
            symbol={item.symbol}
            title={item.title}
            key={item.title}
          >
            <p className="icon-text-card__description">{item.copy}</p>
          </IconTextCard>
        ))}
      </div>
    </Section>
  );
}
