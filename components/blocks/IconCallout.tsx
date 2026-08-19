import type { ReactNode } from "react";

/* A pale icon panel joined to a white copy panel — used to lift one fact out
   of a longer passage without breaking the section it sits in. */
export function IconCallout({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <aside data-block="icon-callout" className="icon-callout">
      <span className="icon-callout__icon" aria-hidden="true">
        {icon}
      </span>
      <div className="icon-callout__copy">{children}</div>
    </aside>
  );
}
