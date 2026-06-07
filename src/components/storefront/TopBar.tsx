"use client";

import { useEffect, useState } from "react";
import { ShoppingBag, Search, User as UserIcon } from "lucide-react";
import { useCustomerAuth } from "@/lib/useCustomerAuth";
import { LoginModal } from "./LoginModal";
import Link from "next/link";
import { useState as useStateAuth } from "react";
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
  const [loginOpen, setLoginOpen] = useStateAuth(false);
  const { user, profile } = useCustomerAuth();
  const totalItems = useCartStore((s) => s.totalItems());

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
    <header
      className={`sticky top-0 z-50 transition-shadow duration-250 ${
        scrolled ? "shadow-[0_6px_24px_-8px_rgba(42,58,44,0.12)]" : ""
      }`}
      style={{
        backdropFilter: "saturate(180%) blur(12px)",
        WebkitBackdropFilter: "saturate(180%) blur(12px)",
        paddingTop: "env(safe-area-inset-top)",
      }}
    >
      {/* Row 2: Main Nav Bar */}
      <div
        className={`transition-colors duration-250 ${
          scrolled ? "bg-[rgba(250,247,237,0.96)]" : "bg-[rgba(250,247,237,0.92)]"
        }`}
        style={{ borderBottom: "1px solid var(--color-line)" }}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex items-center justify-between relative min-h-[64px] sm:min-h-[76px] py-2.5">
          {/* Search icon left */}
          <button
            onClick={onSearchOpen}
            className="w-10 h-10 flex items-center justify-center rounded-full text-sage-dark hover:bg-mint transition-colors"
            aria-label="Suche"
          >
            <Search size={20} strokeWidth={2} />
          </button>

          {/* Logo Center */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center">
            {tenant.logo_url ? (
              <img
                src={tenant.logo_url}
                alt={tenant.name}
                className="h-[44px] sm:h-[56px] w-auto object-contain transition-transform hover:scale-[1.02]" style={{ maxWidth: "clamp(110px, 42vw, 240px)" }}
              />
            ) : (
              <span className="font-display italic font-black text-xl text-sage-dark tracking-tight">
                {tenant.name}
              </span>
            )}
          </div>

          {/* Login / Mein Konto */}
          {user ? (
            <Link
              href="/mein-konto"
              className="px-2.5 sm:px-3 h-9 sm:h-10 flex items-center gap-1.5 rounded-full text-sage-dark hover:bg-mint transition-colors mr-1 text-xs sm:text-sm font-bold"
              aria-label="Mein Konto"
              title="Mein Konto"
            >
              <UserIcon size={16} />
              <span className="hidden sm:inline">{profile?.name?.split(" ")[0] ?? "Konto"}</span>
            </Link>
          ) : (
            <button
              onClick={() => setLoginOpen(true)}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-sage-dark hover:bg-mint transition-colors mr-1"
              aria-label="Anmelden"
              title="Anmelden"
            >
              <UserIcon size={20} />
            </button>
          )}

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
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
