import type { ComponentPropsWithoutRef } from "react";

type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & {
  variant?: "primary" | "secondary" | "outline";
};

export function ButtonLink({
  className = "",
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <a {...props} className={`button button--${variant} ${className}`.trim()} />
  );
}
