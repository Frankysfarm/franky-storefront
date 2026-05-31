"use client";

import { useState, useEffect } from "react";
import { TrackingScreen } from "@/components/storefront/TrackingScreen";
import { useCartStore } from "@/lib/store";

interface Props {
  orderId: string;
  deliveryTimeMin: number;
  backHref: string;
}

export function SuccessClient({ orderId, deliveryTimeMin, backHref }: Props) {
  const [showTracking, setShowTracking] = useState(true);
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!showTracking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bone">
        <a href={backHref} className="text-sage font-bold underline">
          Zurück zur Speisekarte
        </a>
      </div>
    );
  }

  return (
    <TrackingScreen
      orderId={orderId}
      customerName=""
      deliveryTimeMin={deliveryTimeMin}
      onClose={() => setShowTracking(false)}
    />
  );
}
