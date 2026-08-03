import type { ComponentPropsWithoutRef } from "react";
import { ArrowIcon } from "./ArrowIcon";

export function MediaAction({
  children,
  className = "",
  ...props
}: ComponentPropsWithoutRef<"a">) {
  return (
    <a
      {...props}
      className={`media-action expanding-action surface-card ${className}`.trim()}
    >
      <span>{children}</span>
      <span
        className="expanding-action__control icon-circle"
        aria-hidden="true"
      >
        <ArrowIcon className="expanding-action__arrow-icon" />
      </span>
    </a>
  );
}
