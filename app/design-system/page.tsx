import type { Metadata } from "next";
import { DesignSystemCatalog } from "../../components/blocks/DesignSystemCatalog";
import { CatalogPageShell } from "../../components/layout/PageShell";

export const metadata: Metadata = {
  title: "Design System",
  description: "The shared visual language and reusable components for SAB BIO.",
};

export default function DesignSystemPage() {
  return (
    <CatalogPageShell>
      <DesignSystemCatalog />
    </CatalogPageShell>
  );
}
