"use client";

import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPriceRaw } from "@/lib/format";
import type { Product, Tenant } from "@/lib/types";
import { useEffect, useRef, useState, useMemo } from "react";
import { CrossSell } from "./CrossSell";

interface Props {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
  productMap: Map<string, Product>;
  tenant: Tenant;
  allProducts: Product[];
}

const CONFETTI_COLORS = ["#e4c068", "#c9a227", "#4a5e4a", "#f8dcd8", "#dde3d4", "#c46a4a", "#7a2e2a", "#f3e7bd"];

function ConfettiPiece({ index }: { index: number }) {
  const color = CONFETTI_COLORS[index % CONFETTI_COLORS.length];
  const left = 10 + (index * 7.5) % 85;
  const size = 6 + (index % 3) * 2;
  const delay = (index * 80) % 400;
  const isCircle = index % 3 === 0;

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${left}%`,
        top: "0%",
        width: size,
        height: size,
        borderRadius: isCircle ? "50%" : "2px",
        background: color,
        animation: `confetti-pop 1s ease-out ${delay}ms forwards`,
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
  const subtotal = useCartStore((s) => s.subtotal(productMap));
  const deliveryFee = useCartStore((s) =>
    s.deliveryFee(productMap, tenant.liefergebuehr, tenant.free_delivery_threshold),
  );
  const grandTotal = useCartStore((s) =>
    s.grandTotal(productMap, tenant.liefergebuehr, tenant.free_delivery_threshold),
  );
  const drawerRef = useRef<HTMLDivElement>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const prevFreeDelivery = useRef(false);

  const freeDeliveryProgress = Math.min(
    (subtotal / tenant.free_delivery_threshold) * 100,
    100,
  );
  const freeDeliveryReached = subtotal >= tenant.free_delivery_threshold;
  const meetsMinOrder = subtotal >= tenant.mindestbestellwert;
  const remaining = tenant.free_delivery_threshold - subtotal;

  // Confetti on free delivery threshold reached
  useEffect(() => {
    if (freeDeliveryReached && !prevFreeDelivery.current) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 1600);
      prevFreeDelivery.current = true;
      return () => clearTimeout(timer);
    }
    if (!freeDeliveryReached) {
      prevFreeDelivery.current = false;
    }
  }, [freeDeliveryReached]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[90] bg-black/30 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        ref={drawerRef}
        className="fixed top-0 right-0 bottom-0 z-[91] w-full max-w-[400px] bg-bone flex flex-col shadow-xl animate-[reveal-up_0.25s_ease-out]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-line">
          <h3 className="font-display font-bold text-lg text-sage-dark">
            Dein Warenkorb
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-cream transition-colors"
            aria-label="Schließen"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div className="relative px-5 py-3 bg-cream-soft overflow-hidden">
          {/* Confetti */}
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 12 }).map((_, i) => (
                <ConfettiPiece key={i} index={i} />
              ))}
            </div>
          )}
          <div className="text-xs text-sage-dark mb-1.5 relative z-[1]">
            {freeDeliveryReached ? (
              <span className="font-bold text-sage-bright">
                🎉 Gratis-Lieferung aktiviert!
              </span>
            ) : (
              <span>
                🚴 Noch{" "}
                <b className="text-sage-dark">{formatPriceRaw(remaining)}</b> bis
                zur Gratis-Lieferung
              </span>
            )}
          </div>
          <div className="h-1.5 bg-cream-deep rounded-full overflow-hidden relative z-[1]">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${freeDeliveryProgress}%`,
                background: freeDeliveryReached
                  ? "linear-gradient(to right, #4a5e4a, #c9a227)"
                  : "linear-gradient(to right, #4a5e4a, #c9a227)",
              }}
            />
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted">
              <span className="text-4xl mb-2">🍝</span>
              <strong className="text-sage-dark">Noch nichts drin.</strong>
              <span className="text-sm mt-1">
                Wir haben heute frische Pasta, geh stöbern!
              </span>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.cartKey}
                  className="flex gap-3 p-3 bg-cream-soft rounded-xl"
                >
                  {/* Image */}
                  {item.product.bild_url && (
                    <div
                      className="w-14 h-14 rounded-lg bg-cover bg-center flex-shrink-0"
                      style={{ backgroundImage: `url(${item.product.bild_url})` }}
                    />
                  )}

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm text-sage-dark truncate">
                      {item.product.name}
                    </div>
                    {item.optionsSummary && (
                      <div className="text-[11px] text-muted truncate">
                        {item.optionsSummary}
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-1.5">
                      {/* Qty */}
                      <div className="flex items-center gap-0">
                        <button
                          onClick={() => updateQty(item.cartKey, -1)}
                          className="w-7 h-7 flex items-center justify-center rounded-l-md bg-cream text-sage-dark hover:bg-cream-deep transition-colors"
                        >
                          {item.qty === 1 ? (
                            <Trash2 size={12} />
                          ) : (
                            <Minus size={12} strokeWidth={2.5} />
                          )}
                        </button>
                        <span className="w-7 h-7 flex items-center justify-center bg-cream text-xs font-bold tabular-nums">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.cartKey, 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-r-md bg-cream text-sage-dark hover:bg-cream-deep transition-colors"
                        >
                          <Plus size={12} strokeWidth={2.5} />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-bold text-sm text-sage-dark tabular-nums">
                        {formatPriceRaw(item.lineTotal)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Cross-Sell */}
          {items.length > 0 && (
            <CrossSell
              cartProductIds={items.map((i) => i.product.id)}
              allProducts={allProducts}
              onAdd={(product) => {
                const { addItem } = useCartStore.getState();
                addItem(product, 1, null);
              }}
            />
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-line px-5 py-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Zwischensumme</span>
              <span className="font-bold tabular-nums">{formatPriceRaw(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Lieferung</span>
              <span className={`font-bold tabular-nums ${deliveryFee === 0 ? "text-sage-bright" : ""}`}>
                {deliveryFee === 0 ? "GRATIS" : formatPriceRaw(deliveryFee)}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold border-t border-line pt-2">
              <span>Gesamt</span>
              <span className="tabular-nums">{formatPriceRaw(grandTotal)}</span>
            </div>

            {!meetsMinOrder && (
              <div className="text-xs text-burgundy bg-burgundy/5 p-2 rounded-lg text-center">
                Mindestbestellwert <b>{formatPriceRaw(tenant.mindestbestellwert)}</b> — noch{" "}
                <b>{formatPriceRaw(tenant.mindestbestellwert - subtotal)}</b>
              </div>
            )}

            <button
              onClick={onCheckout}
              disabled={!meetsMinOrder}
              className="w-full h-12 bg-sage text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-sage-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Sicher bestellen
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
