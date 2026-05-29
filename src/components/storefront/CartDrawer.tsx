"use client";

import { X, Minus, Plus, Trash2, ShoppingBag, Tag, Sparkles } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPriceRaw } from "@/lib/format";
import type { Product, Tenant } from "@/lib/types";
import { useEffect, useRef, useState, useMemo } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
  productMap: Map<string, Product>;
  tenant: Tenant;
  allProducts: Product[];
}

const CONFETTI = ["#e4c068", "#c9a227", "#4a5e4a", "#f8dcd8", "#dde3d4", "#c46a4a", "#7a2e2a"];

function ConfettiPiece({ index }: { index: number }) {
  const color = CONFETTI[index % CONFETTI.length];
  const left = 8 + (index * 6.5) % 90;
  const size = 5 + (index % 3) * 2;
  const delay = (index * 60) % 350;
  return (
    <div
      className="absolute pointer-events-none top-0"
      style={{
        left: `${left}%`,
        width: size,
        height: size,
        borderRadius: index % 3 === 0 ? "50%" : "2px",
        background: color,
        animation: `confetti-pop 1.2s ease-out ${delay}ms forwards`,
        zIndex: 10,
      }}
    />
  );
}

export function CartDrawer({ open, onClose, onCheckout, productMap, tenant, allProducts }: Props) {
  const rawItems = useCartStore((s) => s.items);
  const items = useMemo(() => useCartStore.getState().getComputedItems(productMap), [rawItems, productMap]);
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const addItem = useCartStore((s) => s.addItem);
  const subtotal = useCartStore((s) => s.subtotal(productMap));
  const deliveryFee = useCartStore((s) => s.deliveryFee(productMap, tenant.liefergebuehr, tenant.free_delivery_threshold));
  const grandTotal = useCartStore((s) => s.grandTotal(productMap, tenant.liefergebuehr, tenant.free_delivery_threshold));
  const drawerRef = useRef<HTMLDivElement>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const prevFree = useRef(false);

  const freeThreshold = tenant.free_delivery_threshold;
  const minOrder = tenant.mindestbestellwert;
  const freeProgress = Math.min((subtotal / freeThreshold) * 100, 100);
  const freeReached = subtotal >= freeThreshold;
  const meetsMin = subtotal >= minOrder;
  const freeRemaining = Math.max(0, freeThreshold - subtotal);
  const minRemaining = Math.max(0, minOrder - subtotal);

  useEffect(() => {
    if (freeReached && !prevFree.current) {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 1600);
      prevFree.current = true;
      return () => clearTimeout(t);
    }
    if (!freeReached) prevFree.current = false;
  }, [freeReached]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Cross-Sell: 4 bestseller drinks/sides not in cart
  const crossSellItems = useMemo(() => {
    const inCart = new Set(items.map((i) => i.product.id));
    return allProducts
      .filter((p) => !inCart.has(p.id) && (p.beliebt || p.id.startsWith("DRI")))
      .slice(0, 4);
  }, [allProducts, items]);

  if (!open) return null;

  const isEmpty = items.length === 0;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[110] bg-black/55 backdrop-blur-sm animate-[fade-in_0.25s_ease-out]"
        onClick={onClose}
      />

      {/* Drawer (mobile: bottom sheet, desktop: right side) */}
      <div
        ref={drawerRef}
        className="fixed inset-x-0 bottom-0 sm:inset-y-0 sm:right-0 sm:left-auto sm:w-[440px] z-[120] flex flex-col bg-bone shadow-2xl sm:rounded-l-3xl rounded-t-3xl sm:rounded-t-none animate-[reveal-up_0.35s_cubic-bezier(0.34,1.56,0.64,1)] sm:animate-none"
        style={{ maxHeight: "92vh", height: isEmpty ? "auto" : "92vh" }}
      >
        {/* Drag handle (mobile) */}
        <div className="sm:hidden flex justify-center pt-2 pb-1">
          <div className="w-12 h-1.5 bg-sage-dark/15 rounded-full" />
        </div>

        {/* Header */}
        <header className="flex items-center justify-between px-5 pt-3 pb-3 border-b border-line">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-sage/15 text-sage-dark">
              <ShoppingBag size={18} strokeWidth={2.5} />
            </div>
            <div>
              <div className="font-display font-black text-base text-sage-dark leading-none">
                Dein Warenkorb
              </div>
              <div className="text-[11px] text-sage-dark/55 mt-0.5">
                {isEmpty ? "Noch leer" : `${items.length} ${items.length === 1 ? "Artikel" : "Artikel"}`}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-sage-dark hover:bg-mint transition-colors active:scale-95"
            aria-label="Schließen"
          >
            <X size={18} />
          </button>
        </header>

        {/* Empty State */}
        {isEmpty ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 text-center">
            <div className="text-6xl mb-4 opacity-40">🛒</div>
            <h3 className="font-display font-black text-xl text-sage-dark">
              Noch nichts ausgewählt
            </h3>
            <p className="text-sm text-sage-dark/60 mt-2 max-w-xs">
              Mindestbestellwert {formatPriceRaw(minOrder)} · Probier mal eine Pasta!
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-3 bg-sage text-white rounded-full font-bold text-sm hover:bg-sage-hover active:scale-95 transition-all"
            >
              Zur Speisekarte
            </button>
          </div>
        ) : (
          <>
            {/* Progress bar */}
            <div className="px-5 py-4 bg-cream-soft border-b border-line relative overflow-hidden">
              {showConfetti && Array.from({ length: 28 }).map((_, i) => <ConfettiPiece key={i} index={i} />)}
              {freeReached ? (
                <div className="flex items-center gap-2 text-sage font-bold text-[13px]">
                  <Sparkles size={16} className="text-gold-deep" />
                  <span>Gratis-Lieferung freigeschaltet! 🎉</span>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between text-[11.5px] font-semibold text-sage-dark mb-1.5">
                    <span>Noch <b className="text-gold-deep">{formatPriceRaw(freeRemaining)}</b> bis Gratis-Lieferung 🚀</span>
                    <span className="font-mono text-[10px] opacity-60">{Math.round(freeProgress)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-sage-dark/12 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${freeProgress}%`,
                        background: "linear-gradient(90deg, var(--color-gold-deep) 0%, var(--color-gold) 60%, #f7d77a 100%)",
                        boxShadow: "0 0 8px rgba(228,192,104,0.5)",
                      }}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Items list (scrollable) */}
            <div className="flex-1 overflow-y-auto px-5 py-3 space-y-2.5">
              {items.map((item) => (
                <div
                  key={item.cartKey}
                  className="flex gap-3 p-2.5 rounded-2xl bg-white border border-line"
                >
                  {/* Image */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-mint">
                    {item.product.bild_url ? (
                      <img src={item.product.bild_url} alt={item.product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">🍝</div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[13px] text-sage-dark leading-tight line-clamp-1">
                      {item.product.name}
                    </div>
                    {item.optionsSummary && (
                      <div className="text-[10.5px] text-sage-dark/55 mt-0.5 line-clamp-2 leading-tight">
                        {item.optionsSummary}
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-1.5">
                      <div className="font-display font-black text-[14px] text-gold-deep tabular-nums">
                        {formatPriceRaw(item.lineTotal)}
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQty(item.cartKey, item.qty - 1)}
                          className="w-7 h-7 rounded-lg bg-mint hover:bg-mint-deep flex items-center justify-center text-sage-dark active:scale-90 transition-all"
                          aria-label="Weniger"
                        >
                          {item.qty === 1 ? <Trash2 size={12} /> : <Minus size={12} strokeWidth={2.5} />}
                        </button>
                        <span className="w-7 text-center font-bold text-[13px] text-sage-dark tabular-nums">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.cartKey, item.qty + 1)}
                          className="w-7 h-7 rounded-lg bg-sage hover:bg-sage-hover text-white flex items-center justify-center active:scale-90 transition-all"
                          aria-label="Mehr"
                        >
                          <Plus size={12} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Cross-Sell */}
              {crossSellItems.length > 0 && (
                <div className="pt-3 mt-2 border-t border-line">
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <Tag size={13} className="text-gold-deep" />
                    <span className="text-[11px] font-extrabold tracking-[1px] text-sage-dark uppercase">
                      Dazu passt
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {crossSellItems.slice(0, 4).map((p) => (
                      <button
                        key={p.id}
                        onClick={() => addItem(p, 1, null)}
                        className="relative flex gap-2 p-2 rounded-xl bg-white border border-line hover:border-gold/50 hover:-translate-y-px transition-all text-left active:scale-95"
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-mint">
                          {p.bild_url ? (
                            <img src={p.bild_url} alt={p.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-base">🥤</div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[10.5px] font-bold text-sage-dark leading-tight line-clamp-1">
                            {p.name}
                          </div>
                          <div className="text-[11px] font-display font-black text-gold-deep tabular-nums mt-0.5">
                            +{formatPriceRaw(p.preis)}
                          </div>
                        </div>
                        <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-sage text-white flex items-center justify-center">
                          <Plus size={11} strokeWidth={3} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Total + CTA */}
            <div className="border-t border-line bg-cream pt-3 pb-4 sm:pb-3 px-5" style={{ paddingBottom: "max(env(safe-area-inset-bottom, 16px), 16px)" }}>
              <div className="space-y-1 mb-3">
                <div className="flex justify-between text-[12px] text-sage-dark/70">
                  <span>Zwischensumme</span>
                  <span className="tabular-nums">{formatPriceRaw(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[12px] text-sage-dark/70">
                  <span>Lieferung</span>
                  <span className={`tabular-nums ${deliveryFee === 0 ? "text-sage font-bold" : ""}`}>
                    {deliveryFee === 0 ? "GRATIS" : formatPriceRaw(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between text-[15px] font-display font-black text-sage-dark pt-1 border-t border-line/60">
                  <span>Gesamt</span>
                  <span className="tabular-nums text-gold-deep">{formatPriceRaw(grandTotal)}</span>
                </div>
              </div>

              {!meetsMin && (
                <div className="text-[11px] text-burgundy font-semibold mb-2 text-center">
                  Noch {formatPriceRaw(minRemaining)} bis Mindestbestellwert
                </div>
              )}

              <button
                onClick={onCheckout}
                disabled={!meetsMin}
                className={`w-full h-14 rounded-2xl font-bold text-[15px] flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98] ${
                  meetsMin
                    ? "text-white shadow-[0_10px_28px_-8px_rgba(74,94,74,0.55)]"
                    : "bg-mint-deep/60 text-sage-dark/40 cursor-not-allowed"
                }`}
                style={
                  meetsMin
                    ? { background: "linear-gradient(135deg, var(--color-sage) 0%, var(--color-sage-hover) 100%)" }
                    : undefined
                }
              >
                {meetsMin ? (
                  <>
                    Zur Kasse
                    <span className="opacity-70 font-mono text-[12px]">·</span>
                    <span className="tabular-nums">{formatPriceRaw(grandTotal)}</span>
                  </>
                ) : (
                  <>Mindestbestellwert noch nicht erreicht</>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
