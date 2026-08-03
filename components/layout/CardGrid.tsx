import type { ComponentPropsWithoutRef } from "react";

type CardGridProps = ComponentPropsWithoutRef<"div"> & {
  columns?: 2 | 3 | 4;
};

export function CardGrid({
  className = "",
  columns = 4,
  ...props
}: CardGridProps) {
  return (
    <div
      {...props}
      className={`card-grid card-grid--${columns} ${className}`.trim()}
    />
  );
}
