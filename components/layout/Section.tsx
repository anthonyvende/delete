import type { ComponentPropsWithoutRef } from "react";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  compact?: boolean;
};

export function Section({
  className = "",
  compact = false,
  ...props
}: SectionProps) {
  return (
    <section
      data-reveal-target
      data-reveal="pending"
      {...props}
      className={`page-section${compact ? " page-section--tight" : ""} container ${className}`.trim()}
    />
  );
}
