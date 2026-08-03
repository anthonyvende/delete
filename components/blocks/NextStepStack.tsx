import type { ComponentProps } from "react";
import { NextStepCard } from "./NextStepCard";

type NextStep = ComponentProps<typeof NextStepCard>;

export function NextStepStack({ items }: { items: NextStep[] }) {
  return (
    <nav
      data-block="next-step-stack"
      data-reveal-target
      data-reveal="pending"
      suppressHydrationWarning
      className="next-steps next-step-stack container"
      aria-label="Continue exploring"
    >
      {items.map((item) => (
        <NextStepCard {...item} key={`${item.href}-${item.title}`} />
      ))}
    </nav>
  );
}
