import { FrankyStorefront } from "@/components/storefront/FrankyStorefront";
import { loadFrankyBundle } from "@/lib/load-tenant";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const bundle = await loadFrankyBundle(decodeURIComponent(slug));
  if (!bundle) return { title: "Nicht gefunden" };
  return {
    title: `${bundle.tenant.name} — Online bestellen`,
    description: `Bestelle direkt bei ${bundle.tenant.name} — schnelle Lieferung, sichere Zahlung.`,
  };
}

export default async function TenantPage({ params }: PageProps) {
  const { slug } = await params;
  const bundle = await loadFrankyBundle(decodeURIComponent(slug));
  if (!bundle) notFound();

  return (
    <FrankyStorefront
      tenant={bundle.tenant}
      categories={bundle.categories}
      products={bundle.products}
      bestsellers={bundle.bestsellers}
      paymentMethods={bundle.paymentMethods}
    />
  );
}
