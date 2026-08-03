import type { ComponentPropsWithoutRef } from "react";

export function Eyebrow({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"span">) {
  return <span {...props} className={`eyebrow ${className}`.trim()} />;
}
