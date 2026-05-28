"use client";

import { useEffect, useState, useCallback } from "react";
import { X, Minus, Plus } from "lucide-react";
import type { Product, Selections, DietTag } from "@/lib/types";
import { DIET_TAG_LABELS } from "@/lib/types";
import { formatPriceRaw } from "@/lib/format";
import { useCartStore } from "@/lib/store";

interface Props {
  product: Product | null;
  onClose: () => void;
}

export function ProductSheet({ product, onClose }: Props) {
  const [qty, setQty] = useState(1);
  const [selections, setSelections] = useState<Selections>({});
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    if (!product) return;
    setQty(1);
    const initial: Selections = {};
    if (product.option_groups) {
      for (const group of product.option_groups) {
        if (group.type === "multi") {
          initial[group.id] = [];
        } else {
          const def = group.options.find((o) => o.default) ?? group.options[0];
          if (def) initial[group.id] = def.id;
        }
      }
    }
    setSelections(initial);
  }, [product]);

  const computePrice = useCallback(() => {
    if (!product) return 0;
    let price = product.preis;
    if (product.option_groups) {
      for (const group of product.option_groups) {
        const val = selections[group.id];
        if (group.type === "multi" && Array.isArray(val)) {
          for (const optId of val) {
            const opt = group.options.find((o) => o.id === optId);
            if (opt) price += opt.priceDelta;
          }
        } else if (typeof val === "string") {
          const opt = group.options.find((o) => o.id === val);
          if (opt) price += opt.priceDelta;
        }
      }
    }
    return price;
  }, [product, selections]);

  const canAdd = useCallback(() => {
    if (!product?.option_groups) return true;
    return product.option_groups
      .filter((g) => g.required)
      .every((g) => {
        const val = selections[g.id];
        return val && (Array.isArray(val) ? val.length > 0 : val !== "");
      });
  }, [product, selections]);

  const handleAdd = () => {
    if (!product || !canAdd()) return;
    addItem(product, qty, Object.keys(selections).length > 0 ? selections : null);
    onClose();
  };

  const setSingle = (groupId: string, optionId: string) => {
    setSelections((prev) => ({ ...prev, [groupId]: optionId }));
  };

  const toggleMulti = (groupId: string, optionId: string) => {
    setSelections((prev) => {
      const current = (prev[groupId] as string[]) || [];
      const next = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];
      return { ...prev, [groupId]: next };
    });
  };

  if (!product) return null;

  const unitPrice = computePrice();
  const totalPrice = unitPrice * qty;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-black/40 transition-opacity"
        onClick={onClose}
      />

      {/* Sheet */}
      <aside
        className="fixed bottom-0 left-0 right-0 z-[101] bg-bone rounded-t-2xl max-h-[90vh] flex flex-col shadow-xl animate-[reveal-up_0.3s_ease-out]"
        role="dialog"
        aria-modal
      >
        {/* Handle */}
        <div className="flex justify-center pt-2 pb-1">
          <div className="w-10 h-1 bg-disabled rounded-full" />
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-cream hover:bg-cream-deep transition-colors z-10"
          aria-label="Schließen"
        >
          <X size={18} strokeWidth={2.4} />
        </button>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 pb-4">
          {/* Hero Image */}
          {product.bild_url && (
            <div
              className="w-full h-48 rounded-xl bg-cover bg-center mb-4"
              style={{ backgroundImage: `url(${product.bild_url})` }}
            />
          )}

          {/* Meta */}
          <div className="flex items-center gap-2 text-[12px] mb-1">
            <span className="text-gold-deep font-bold">★ {product.rating.toFixed(1)}</span>
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="px-1.5 py-0.5 bg-sage/10 text-sage text-[10px] font-bold rounded"
              >
                {DIET_TAG_LABELS[tag as DietTag] ?? tag}
              </span>
            ))}
          </div>

          <h2 className="font-display font-black text-2xl text-sage-dark">
            {product.name}
          </h2>
          <p className="text-sm text-muted mt-1">{product.beschreibung}</p>

          {/* Option Groups */}
          {product.option_groups?.map((group) => (
            <div key={group.id} className="mt-5">
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-bold text-sm text-sage-dark">{group.name}</h3>
                {group.required && (
                  <span className="text-[10px] font-bold text-burgundy bg-burgundy/10 px-2 py-0.5 rounded-full">
                    PFLICHT
                  </span>
                )}
              </div>

              <div className="space-y-1.5">
                {group.options.map((opt) => {
                  const isSelected =
                    group.type === "multi"
                      ? ((selections[group.id] as string[]) || []).includes(opt.id)
                      : selections[group.id] === opt.id;

                  return (
                    <label
                      key={opt.id}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border ${
                        isSelected
                          ? "bg-sage/5 border-sage"
                          : "bg-white border-transparent hover:border-line-strong"
                      }`}
                    >
                      <input
                        type={group.type === "multi" ? "checkbox" : "radio"}
                        name={group.id}
                        checked={isSelected}
                        onChange={() =>
                          group.type === "multi"
                            ? toggleMulti(group.id, opt.id)
                            : setSingle(group.id, opt.id)
                        }
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-${group.type === "multi" ? "md" : "full"} border-2 flex items-center justify-center transition-colors ${
                          isSelected ? "bg-sage border-sage" : "border-disabled"
                        }`}
                      >
                        {isSelected && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-medium text-sage-dark">
                          {opt.badge && <span className="mr-1">{opt.badge}</span>}
                          {opt.label}
                        </span>
                      </div>
                      {opt.priceDelta > 0 && (
                        <span className="text-xs font-bold text-sage tabular-nums">
                          +{formatPriceRaw(opt.priceDelta)}
                        </span>
                      )}
                      {opt.priceDelta === 0 && opt.id !== "none" && !opt.default && (
                        <span className="text-[10px] font-bold text-sage-bright">
                          GRATIS
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-line px-5 py-4 flex items-center gap-4">
          {/* Qty */}
          <div className="flex items-center gap-0 bg-cream rounded-lg">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-10 h-10 flex items-center justify-center text-sage-dark hover:bg-cream-deep rounded-l-lg transition-colors"
              aria-label="Weniger"
            >
              <Minus size={16} strokeWidth={2.5} />
            </button>
            <span className="w-8 text-center font-bold text-sage-dark tabular-nums">
              {qty}
            </span>
            <button
              onClick={() => setQty(qty + 1)}
              className="w-10 h-10 flex items-center justify-center text-sage-dark hover:bg-cream-deep rounded-r-lg transition-colors"
              aria-label="Mehr"
            >
              <Plus size={16} strokeWidth={2.5} />
            </button>
          </div>

          {/* CTA */}
          <button
            onClick={handleAdd}
            disabled={!canAdd()}
            className="flex-1 h-12 bg-sage text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-sage-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>In den Warenkorb</span>
            <span className="opacity-70">·</span>
            <span className="tabular-nums">{formatPriceRaw(totalPrice)}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
