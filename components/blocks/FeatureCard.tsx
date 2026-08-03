import type { ReactNode } from "react";
import { ValueIcon, type ValueIconName } from "../icons/ValueIcon";

type FeatureCardProps = {
  icon?: string | ValueIconName;
  title: string;
  children: ReactNode;
  className?: string;
};

const valueIconNames: readonly string[] = ["people", "shield", "clock", "hand"];

function isValueIconName(icon: string): icon is ValueIconName {
  return valueIconNames.includes(icon);
}

export function FeatureCard({
  icon,
  title,
  children,
  className = "",
}: FeatureCardProps) {
  return (
    <article className={`feature-card surface-card ${className}`.trim()}>
      {icon ? (
        isValueIconName(icon) ? (
          <ValueIcon name={icon} />
        ) : (
          <img className="feature-card__icon" src={icon} alt="" />
        )
      ) : null}
      <h3>{title}</h3>
      {children}
    </article>
  );
}
