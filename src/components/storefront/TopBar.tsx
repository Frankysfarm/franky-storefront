"use client";

import { useEffect, useState } from "react";
import { ShoppingBag, Search } from "lucide-react";
import { useCartStore } from "@/lib/store";
import type { Tenant } from "@/lib/types";

interface Props {
  tenant: Tenant;
  onCartOpen: () => void;
  onSearchOpen: () => void;
}

export function TopBar({ tenant, onCartOpen, onSearchOpen }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-250 ${
        scrolled
          ? "shadow-[0_6px_24px_-8px_rgba(42,58,44,0.12)] bg-[rgba(250,247,237,0.96)]"
          : "bg-[rgba(250,247,237,0.92)]"
      }`}
      style={{
        backdropFilter: "saturate(180%) blur(12px)",
        WebkitBackdropFilter: "saturate(180%) blur(12px)",
        borderBottom: "1px solid var(--color-line)",
      }}
    >
      <div className="max-w-[1240px] mx-auto px-6 flex items-center justify-between relative min-h-[60px]">
        {/* Delivery Pill */}
        <div className="flex items-center gap-2.5 px-3 py-2 bg-mint border-[1.5px] border-transparent rounded-full hover:bg-mint-deep hover:border-sage-bright transition-all cursor-pointer">
          <span className="w-[9px] h-[9px] bg-sage-bright rounded-full animate-[dp-pulse_2.4s_ease-out_infinite]" />
          <div className="flex flex-col leading-tight">
            <small className="text-[10.5px] font-semibold text-muted tracking-wide">
              Liefern · {tenant.stadt}
            </small>
            <strong className="text-[13px] font-bold text-sage-dark">
              Jetzt geöffnet
            </strong>
          </div>
        </div>

        {/* Logo Center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {tenant.logo_url ? (
            <img
              src={tenant.logo_url}
              alt={tenant.name}
              className="h-[44px] max-h-[44px] w-auto hover:-translate-y-px hover:scale-[1.02] transition-transform"
            />
          ) : (
            <span className="font-display font-black text-xl text-sage-dark">
              {tenant.name}
            </span>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5">
          {/* ETA Badge */}
          <div className="hidden sm:flex items-center gap-1.5 bg-gold-soft text-[#7a5818] px-3 py-1.5 rounded-full text-xs font-bold border border-[rgba(240,176,57,0.35)]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {tenant.durchschnittliche_lieferzeit_min - 5}–{tenant.durchschnittliche_lieferzeit_min + 5} Min
          </div>

          <button
            onClick={onSearchOpen}
            className="w-10 h-10 flex items-center justify-center rounded-full text-sage-dark hover:bg-mint transition-colors"
            aria-label="Suche"
          >
            <Search size={20} strokeWidth={2} />
          </button>

          <button
            onClick={onCartOpen}
            className="relative w-10 h-10 flex items-center justify-center rounded-full bg-sage text-white hover:bg-sage-hover transition-colors"
            aria-label="Warenkorb"
          >
            <ShoppingBag size={18} strokeWidth={2} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold-deep text-white text-[11px] font-bold rounded-full flex items-center justify-center animate-[bump_0.3s_ease-out]">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
