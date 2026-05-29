"use client";

import { useState } from "react";
import { TrackingScreen } from "@/components/storefront/TrackingScreen";

interface Props {
  orderId: string;
  deliveryTimeMin: number;
  backHref: string;
}

export function SuccessClient({ orderId, deliveryTimeMin, backHref }: Props) {
  const [showTracking, setShowTracking] = useState(true);

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
