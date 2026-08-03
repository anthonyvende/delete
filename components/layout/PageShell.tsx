import type { ReactNode } from "react";
import { SiteFooter } from "../SiteFooter";
import { SiteHeader } from "../SiteHeader";

type PageShellProps = {
  children: ReactNode;
  variant?: "inner" | "landing" | "catalog";
};

export function PageShell({ children, variant = "inner" }: PageShellProps) {
  const content = (
    <>
      {variant === "landing" ? null : <SiteHeader />}
      <main>{children}</main>
      <SiteFooter />
    </>
  );

  return (
    <div className={`site-shell site-shell--${variant}`}>
      {variant === "landing" ? (
        <div className="landing-canvas">{content}</div>
      ) : (
        content
      )}
    </div>
  );
}

export function LandingPageShell({ children }: { children: ReactNode }) {
  return <PageShell variant="landing">{children}</PageShell>;
}

export function CatalogPageShell({ children }: { children: ReactNode }) {
  return <PageShell variant="catalog">{children}</PageShell>;
}
