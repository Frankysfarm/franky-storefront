"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { TrackingScreen } from "@/components/storefront/TrackingScreen";
import { loadFrankyBundle } from "@/lib/load-tenant";

export default function SuccessPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id") ?? "—";
  const [deliveryMin, setDeliveryMin] = useState(28);
  const [showTracking, setShowTracking] = useState(true);

  useEffect(() => {
    const slug = typeof params.slug === "string" ? params.slug : Array.isArray(params.slug) ? params.slug[0] : "frankys-pasta";
    loadFrankyBundle(slug).then((bundle) => {
      setDeliveryMin(bundle.tenant.durchschnittliche_lieferzeit_min);
    });
  }, [params.slug]);

  if (!showTracking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bone">
        <a href=".." className="text-sage font-bold underline">Zurück zur Speisekarte</a>
      </div>
    );
  }

  return (
    <TrackingScreen
      orderId={orderId}
      customerName=""
      deliveryTimeMin={deliveryMin}
      onClose={() => setShowTracking(false)}
    />
  );
}
