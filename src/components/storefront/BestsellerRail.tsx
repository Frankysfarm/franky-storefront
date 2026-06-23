"use client";

import type { Product } from "@/lib/types";
import { formatPriceRaw } from "@/lib/format";

interface Props {
  products: Product[];
  bestsellers: string[];
  onAdd: (product: Product) => void;
}

export function BestsellerRail({ products, bestsellers, onAdd }: Props) {
  const items = bestsellers
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  if (items.length === 0) return null;

  return (
    <section className="max-w-[1240px] mx-auto mt-4 px-6">
      <div
        className="rounded-[18px] overflow-hidden"
        style={{
          background:
            "linear-gradient(150deg, var(--color-bone) 0%, var(--color-cream-soft) 60%, var(--color-cream) 100%)",
          border: "1.5px solid var(--color-cream-deep)",
          padding: "18px 24px 14px",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7), 0 2px 8px -2px rgba(42,58,44,0.06)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold tracking-[1.5px] text-sage-dark uppercase">
              ✨ Heute beliebt
            </span>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-[dp-pulse_2.4s_ease-out_infinite]" />
          </div>
          <span className="text-[11px] text-muted italic hidden sm:inline">Andiamo! 🍝</span>
        </div>

        {/* Scrollable Cards */}
        <div className="overflow-x-auto no-scrollbar -mx-6">
          <div className="flex gap-3 pb-1 px-6">
            {items.map((product, i) => {
              const isTop3 = i < 3;
              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => onAdd(product)}
                  className="relative flex-shrink-0 w-[130px] sm:w-[140px] bg-white rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all border border-line shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-left"
                >
                  {/* Rank badge */}
                  <div
                    className="absolute top-2 left-2 z-10 w-6 h-6 rounded-full flex items-center justify-center font-display font-black text-[12px] leading-none border border-[rgba(228,192,104,0.5)]"
                    style={{ background: "var(--color-sage-dark)", color: "var(--color-gold)" }}
                  >
                    {i + 1}
                  </div>

                  {/* Popular badge */}
                  {isTop3 && (
                    <div className="absolute top-2 right-2 z-10">
                      <span className="text-[9px] font-bold bg-gold text-sage-dark px-1.5 py-0.5 rounded-full">
                        ⭐
                      </span>
                    </div>
                  )}

                  {/* Image — full width */}
                  <div className="w-full h-[100px] sm:h-[110px] overflow-hidden bg-mint">
                    {product.bild_url ? (
                      <img
                        src={product.bild_url}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted text-2xl">
                        🍝
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-2">
                    <div className="text-[11px] font-bold text-sage-dark leading-tight line-clamp-2 mb-1 min-h-[28px]">
                      {product.name}
                    </div>
                    <div className="font-display font-black text-[14px] text-gold-deep tabular-nums">
                      {formatPriceRaw(product.preis)}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile microcopy */}
        <div className="text-right mt-1 sm:hidden">
          <span className="text-[11px] text-muted italic">Andiamo! 🍝</span>
        </div>
      </div>
    </section>
  );
}
