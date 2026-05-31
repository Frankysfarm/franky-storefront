import { loadFrankyBundle } from "@/lib/load-tenant";
import { SuccessClient } from "./SuccessClient";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ order_id?: string }>;
}

export default async function SuccessPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { order_id } = await searchParams;

  let deliveryMin = 28;
  try {
    const bundle = await loadFrankyBundle(decodeURIComponent(slug));
    if (bundle) deliveryMin = bundle.tenant.durchschnittliche_lieferzeit_min;
  } catch {
    // fallback to default
  }

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <SuccessClient
      orderId={order_id ?? "—"}
      deliveryTimeMin={deliveryMin}
      backHref={`${basePath}/${slug}`}
    />
  );
}
