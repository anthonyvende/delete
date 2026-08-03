import type { Metadata } from "next";
import { LegalPage } from "../../components/blocks/LegalPage";
import { conflictContent } from "../../content/legal";

export const metadata: Metadata = { title: "Conflict of Interest Policy" };

export default function ConflictOfInterestPolicyPage() {
  return (
    <LegalPage title="Conflict of Interest Policy">
      {conflictContent}
    </LegalPage>
  );
}
