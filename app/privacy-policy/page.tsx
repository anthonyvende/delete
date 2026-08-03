import type { Metadata } from "next";
import { LegalPage } from "../../components/blocks/LegalPage";
import { privacyContent } from "../../content/legal";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" effectiveDate="July 1, 2014">
      {privacyContent}
    </LegalPage>
  );
}
