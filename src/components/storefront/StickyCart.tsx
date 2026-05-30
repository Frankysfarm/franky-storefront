"use client";

import { useCartStore } from "@/lib/store";
import { formatPriceRaw } from "@/lib/format";
import type { Product, Tenant } from "@/lib/types";
import { ShoppingBag, ArrowRight } from "lucide-react";

interface Props {
  onOpen: () => void;
  productMap: Map<string, Product>;
  tenant: Tenant;
}

export function StickyCart({ onOpen, productMap, tenant }: Props) {
  const totalItems = useCartStore((s) => s.totalItems());
  const subtotal = useCartStore((s) => s.subtotal(productMap));

  const freeThreshold = tenant.free_delivery_threshold;
  const minOrder = tenant.mindestbestellwert;
  const progress = Math.min((subtotal / freeThreshold) * 100, 100);
  const remaining = Math.max(0, freeThreshold - subtotal);
  const meetsMinOrder = subtotal >= minOrder;
  const freeDelivery = subtotal >= freeThreshold;

  const isEmpty = totalItems === 0;
  const minRemaining = Math.max(0, minOrder - subtotal);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 12px)" }}
    >
      {/* Gradient fade above */}
      <div
        className="h-12 sm:h-8"
        style={{
          background: "linear-gradient(to top, var(--color-cream) 0%, rgba(232,228,211,0) 100%)",
        }}
      />

      <div
        className="bg-cream pointer-events-auto pb-4 pt-3 px-4 sm:px-6"
        style={{ borderTop: "1px solid rgba(42,38,34,0.08)" }}
      >
        <div className="max-w-[1240px] mx-auto">
          {/* Progress bar (when items exist) */}
          {!isEmpty && !freeDelivery && (
            <div className="mb-3 flex items-center gap-3 text-[12px] font-semibold text-sage-dark">
              <div
                className="flex-1 h-2 rounded-full overflow-hidden"
                style={{ background: "rgba(74,94,74,0.12)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${progress}%`,
                    background:
                      "linear-gradient(90deg, var(--color-gold-deep) 0%, var(--color-gold) 50%, #f7d77a 100%)",
                    boxShadow: "0 0 8px rgba(228,192,104,0.5)",
                  }}
                />
              </div>
              <span className="font-mono text-[11px] whitespace-nowrap">
                Noch <b className="text-gold-deep">{formatPriceRaw(remaining)}</b> bis Gratis-Lieferung 🚀
              </span>
            </div>
          )}

          {!isEmpty && freeDelivery && (
            <div className="mb-3 text-center text-[12px] font-bold text-sage">
              ✨ Gratis-Lieferung freigeschaltet! Andiamo! 🍝
            </div>
          )}

          <button
            onClick={onOpen}
            disabled={isEmpty}
            className={`w-full h-14 rounded-2xl flex items-center justify-between px-5 transition-all duration-300 active:scale-[0.98] ${
              isEmpty
                ? "bg-mint-deep/60 cursor-default"
                : meetsMinOrder
                ? "bg-sage hover:bg-sage-hover shadow-[0_8px_24px_-6px_rgba(74,94,74,0.45)]"
                : "bg-sage/85 hover:bg-sage shadow-md"
            }`}
            style={{
              background: isEmpty
                ? undefined
                : meetsMinOrder
                ? "linear-gradient(135deg, var(--color-sage) 0%, var(--color-sage-hover) 100%)"
                : undefined,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className={`relative w-9 h-9 rounded-xl flex items-center justify-center ${
                  isEmpty ? "bg-sage-dark/15 text-sage-dark" : "bg-white/15 text-white"
                }`}
              >
                <ShoppingBag size={18} strokeWidth={2.5} />
                {!isEmpty && (
                  <span
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[10px] font-extrabold flex items-center justify-center animate-[bump_0.4s_ease-out]"
                    style={{
                      background: "var(--color-gold)",
                      color: "var(--color-sage-dark)",
                      boxShadow: "0 2px 8px rgba(228,192,104,0.5)",
                    }}
                  >
                    {totalItems}
                  </span>
                )}
              </div>
              <div className="flex flex-col items-start leading-tight">
                {isEmpty ? (
                  <>
                    <span className="text-sm font-bold text-sage-dark">Dein Warenkorb</span>
                    <span className="text-[11px] text-sage-dark/60 font-medium">
                      Mindestbestellwert {formatPriceRaw(minOrder)}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-sm font-bold text-white">
                      {totalItems} {totalItems === 1 ? "Artikel" : "Artikel"}
                    </span>
                    {!meetsMinOrder ? (
                      <span className="text-[11px] text-white/85 font-medium">
                        Noch {formatPriceRaw(minRemaining)} bis Mindestbestellwert
                      </span>
                    ) : (
                      <span className="text-[11px] text-white/85 font-medium">
                        Zur Kasse — alles passt
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`font-display font-black text-lg tabular-nums ${
                  isEmpty ? "text-sage-dark/40" : "text-white"
                }`}
              >
                {formatPriceRaw(subtotal)}
              </span>
              {!isEmpty && (
                <ArrowRight size={18} className="text-white opacity-90" />
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
