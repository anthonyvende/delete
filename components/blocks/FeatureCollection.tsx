import type { ReactNode } from "react";
import { FeatureCard } from "./FeatureCard";

type FeatureCollectionItem = {
  icon?: string;
  title: string;
  copy: string;
};

type FeatureCollectionProps = {
  title: ReactNode;
  items: FeatureCollectionItem[];
  variant?: "showcase" | "section";
};

export function FeatureCollection({
  title,
  items,
  variant = "showcase",
}: FeatureCollectionProps) {
  return (
    <section
      data-block="feature-collection"
      className={`feature-collection feature-collection--${variant}`}
      data-reveal-target
      data-reveal="pending"
      suppressHydrationWarning
    >
      <div className="container">
        <h2 className="feature-collection__title">{title}</h2>
        <div className="value-grid">
          {items.map((item) => (
            <FeatureCard icon={item.icon} title={item.title} key={item.title}>
              <p>{item.copy}</p>
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}
