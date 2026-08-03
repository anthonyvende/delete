import type { Metadata } from "next";
import { DesignSystemCatalog } from "../../components/blocks/DesignSystemCatalog";
import { CatalogPageShell } from "../../components/layout/PageShell";

export const metadata: Metadata = {
  title: "Components",
  description: "Reusable SAB BIO interface components and content blocks.",
};

export default function ComponentsPage() {
  return (
    <CatalogPageShell>
      <DesignSystemCatalog scope="components" />
    </CatalogPageShell>
  );
}
