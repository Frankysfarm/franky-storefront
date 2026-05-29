"use client";

import { useEffect, useState } from "react";
import { ShoppingBag, Search } from "lucide-react";
import { useCartStore } from "@/lib/store";
import type { Tenant } from "@/lib/types";

interface Props {
  tenant: Tenant;
  onCartOpen: () => void;
  onSearchOpen: () => void;
  onBonusOpen?: () => void;
}

export function TopBar({ tenant, onCartOpen, onSearchOpen, onBonusOpen }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-250 ${
        scrolled ? "shadow-[0_6px_24px_-8px_rgba(42,58,44,0.12)]" : ""
      }`}
      style={{
        backdropFilter: "saturate(180%) blur(12px)",
        WebkitBackdropFilter: "saturate(180%) blur(12px)",
      }}
    >
      {/* Row 1: Bonus-Club Bar */}
      <button
        onClick={onBonusOpen}
        className="w-full flex items-center justify-center gap-2 px-4 py-1.5 text-[11px] font-extrabold tracking-[1.2px] uppercase transition-opacity hover:opacity-80"
        style={{ background: "var(--color-sage-dark)", color: "var(--color-gold)" }}
      >
        <span>★ Franky&apos;s Bonus-Club</span>
        <span className="hidden sm:inline" style={{ opacity: 0.6 }}>·</span>
        <span className="hidden sm:inline font-bold tracking-normal normal-case" style={{ opacity: 0.85 }}>
          Jede 2. Bestellung gratis →
        </span>
      </button>

      {/* Row 2: Main Nav Bar */}
      <div
        className={`transition-colors duration-250 ${
          scrolled ? "bg-[rgba(250,247,237,0.96)]" : "bg-[rgba(250,247,237,0.92)]"
        }`}
        style={{ borderBottom: "1px solid var(--color-line)" }}
      >
        <div className="max-w-[1240px] mx-auto px-6 flex items-center justify-between relative min-h-[60px]">
          {/* Search icon left */}
          <button
            onClick={onSearchOpen}
            className="w-10 h-10 flex items-center justify-center rounded-full text-sage-dark hover:bg-mint transition-colors"
            aria-label="Suche"
          >
            <Search size={20} strokeWidth={2} />
          </button>

          {/* Logo Center */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {tenant.logo_url ? (
              <img
                src={tenant.logo_url}
                alt={tenant.name}
                className="h-[44px] max-h-[44px] w-auto hover:-translate-y-px hover:scale-[1.02] transition-transform"
              />
            ) : (
              <span className="font-display italic font-black text-xl text-sage-dark tracking-tight">
                {tenant.name}
              </span>
            )}
          </div>

          {/* Cart Icon Right */}
          <button
            onClick={onCartOpen}
            className="relative w-10 h-10 flex items-center justify-center rounded-full bg-sage text-white hover:bg-sage-hover transition-colors"
            aria-label="Warenkorb"
          >
            <ShoppingBag size={18} strokeWidth={2} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-burgundy-dark text-white text-[11px] font-bold rounded-full flex items-center justify-center animate-[bump_0.3s_ease-out]">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
