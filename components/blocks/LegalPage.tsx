import type { ReactNode } from "react";
import { InnerPageShell } from "../layout/InnerPageShell";
import { Eyebrow } from "../ui/Eyebrow";
import { PageBand } from "../ui/PageBand";

type LegalPageProps = {
  title: string;
  effectiveDate?: string;
  children: ReactNode;
};

export function LegalPage({ title, effectiveDate, children }: LegalPageProps) {
  return (
    <InnerPageShell>
      <article data-block="legal-page" className="legal-document container">
        <header className="legal-document__header">
          <PageBand />
          <Eyebrow>Legal</Eyebrow>
          <h1>{title}</h1>
          {effectiveDate ? (
            <p className="legal-document__effective-date">
              Effective Date: {effectiveDate}
            </p>
          ) : null}
        </header>
        <div
          className="legal-document__body"
          data-reveal-target
          data-reveal="pending"
        >
          {children}
        </div>
      </article>
    </InnerPageShell>
  );
}
