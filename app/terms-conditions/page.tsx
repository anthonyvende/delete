import type { Metadata } from "next";
import { LegalPage } from "../../components/blocks/LegalPage";
import { termsContent } from "../../content/legal";

export const metadata: Metadata = { title: "Terms and Conditions" };

export default function TermsConditionsPage() {
  return (
    <LegalPage title="Terms and Conditions" effectiveDate="July 1, 2014">
      {termsContent}
    </LegalPage>
  );
}
