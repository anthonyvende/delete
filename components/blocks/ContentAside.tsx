import type { ReactNode } from "react";

export function ContentAside({
  children,
  aside,
}: {
  children: ReactNode;
  aside: ReactNode;
}) {
  return (
    <section data-block="content-aside" className="content-aside container">
      <div className="content-aside__copy">{children}</div>
      <div className="content-aside__aside">{aside}</div>
    </section>
  );
}
