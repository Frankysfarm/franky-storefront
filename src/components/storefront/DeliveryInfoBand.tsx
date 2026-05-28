"use client";

import { Clock, MapPin, Bike, Star } from "lucide-react";
import type { Tenant } from "@/lib/types";
import { formatPriceRaw } from "@/lib/format";

interface Props {
  tenant: Tenant;
}

export function DeliveryInfoBand({ tenant }: Props) {
  const minTime = (tenant.durchschnittliche_lieferzeit_min ?? 30) - 5;
  const maxTime = (tenant.durchschnittliche_lieferzeit_min ?? 30) + 10;
  const deliveryFee = tenant.liefergebuehr ?? 2.5;
  const freeDelivery = tenant.free_delivery_threshold ?? 25;

  return (
    <section className="max-w-[1240px] mx-auto mt-3 px-6">
      <div
        className="rounded-2xl px-4 sm:px-5 py-2.5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] sm:text-[13px]"
        style={{
          background:
            "linear-gradient(135deg, rgba(74,94,74,0.06) 0%, rgba(228,192,104,0.10) 100%)",
          border: "1px solid rgba(74,94,74,0.12)",
        }}
      >
        {/* Open status */}
        <div className="flex items-center gap-1.5 text-sage-dark font-semibold">
          <span className="relative w-2 h-2 rounded-full bg-green-500">
            <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-60" />
          </span>
          <span>Jetzt geöffnet</span>
        </div>

        <div className="hidden sm:block w-px h-4 bg-sage-dark/15" />

        {/* Delivery time */}
        <div className="flex items-center gap-1.5 text-sage-dark">
          <Clock size={13} strokeWidth={2.5} className="text-sage" />
          <span className="font-semibold">
            <b className="text-sage-dark">{minTime}–{maxTime} Min</b> Lieferung
          </span>
        </div>

        <div className="hidden sm:block w-px h-4 bg-sage-dark/15" />

        {/* Delivery fee */}
        <div className="flex items-center gap-1.5 text-sage-dark">
          <Bike size={14} strokeWidth={2.5} className="text-sage" />
          <span className="font-semibold">
            ab <b className="text-sage-dark">{formatPriceRaw(deliveryFee)}</b>
          </span>
        </div>

        <div className="hidden sm:block w-px h-4 bg-sage-dark/15" />

        {/* Free delivery threshold */}
        <div className="flex items-center gap-1.5 text-sage-dark hidden sm:flex">
          <span className="text-base leading-none">🎉</span>
          <span className="font-semibold">
            Gratis ab <b className="text-gold-deep">{formatPriceRaw(freeDelivery)}</b>
          </span>
        </div>

        <div className="hidden md:block w-px h-4 bg-sage-dark/15" />

        {/* Rating */}
        <div className="flex items-center gap-1.5 text-sage-dark hidden md:flex">
          <Star size={13} fill="currentColor" className="text-gold-deep" />
          <span className="font-semibold">
            <b className="text-sage-dark">4.8</b>
            <span className="text-sage-dark/55 ml-1">· 312 Bewertungen</span>
          </span>
        </div>

        <div className="ml-auto flex items-center gap-1.5 text-sage hover:text-sage-dark cursor-pointer transition-colors">
          <MapPin size={13} strokeWidth={2.5} />
          <span className="font-bold underline-offset-4 hover:underline">PLZ prüfen</span>
        </div>
      </div>
    </section>
  );
}
