import type { ReactNode } from "react";

export function LandingSectionStack({ children }: { children: ReactNode }) {
  return <div className="landing-section-stack container">{children}</div>;
}
