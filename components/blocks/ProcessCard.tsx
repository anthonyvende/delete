import type { ReactNode } from "react";
import { IconTextCard } from "./IconTextCard";

type ProcessCardProps = {
  symbol: ReactNode;
  title: string;
  copy: string;
};

export function ProcessCard({ symbol, title, copy }: ProcessCardProps) {
  return (
    <IconTextCard className="process-card" symbol={symbol} title={title}>
      <p className="process-card__copy">{copy}</p>
    </IconTextCard>
  );
}
