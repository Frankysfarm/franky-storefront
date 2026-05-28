"use client";

import type { Product } from "@/lib/types";
import { formatPriceRaw } from "@/lib/format";
import { TOP3_IDS } from "@/lib/mock-data";

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
            "linear-gradient(135deg, var(--color-cream-soft) 0%, var(--color-bone) 100%)",
          border: "1.5px solid var(--color-line-strong)",
          padding: "18px 24px 14px",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold tracking-[1.5px] text-sage-dark uppercase">
              ✨ Heute beliebt
            </span>
            <span className="w-2 h-2 rounded-full bg-sage-bright animate-[dp-pulse_2.4s_ease-out_infinite]" />
          </div>
          <span className="text-[11px] text-muted italic hidden sm:inline">Andiamo! 🍝</span>
        </div>

        {/* Scrollable Cards */}
        <div className="overflow-x-auto no-scrollbar -mx-6">
          <div className="flex gap-3 pb-1 px-6">
            {items.map((product, i) => {
              const isTop3 = TOP3_IDS.has(product.id);
              return (
                <div
                  key={product.id}
                  onClick={() => onAdd(product)}
                  role="button"
                  tabIndex={0}
                  className="relative flex-shrink-0 w-[140px] bg-white rounded-xl p-2.5 text-center cursor-pointer hover:shadow-lg hover:-translate-y-px transition-all border border-line"
                >
                  {/* Rank badge */}
                  <div
                    className="absolute top-1.5 left-1.5 z-10 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-extrabold border border-[rgba(228,192,104,0.5)]"
                    style={{ background: "var(--color-sage-dark)", color: "var(--color-gold)" }}
                  >
                    {i + 1}
                  </div>

                  {/* Popular badge */}
                  {isTop3 && (
                    <div className="absolute top-1.5 right-1.5 z-10">
                      <span className="text-[9px] font-bold bg-gold text-sage-dark px-1.5 py-0.5 rounded-full">
                        ⭐ Beliebt
                      </span>
                    </div>
                  )}

                  {/* Image */}
                  <div className="w-14 h-14 rounded-lg overflow-hidden mx-auto mb-2 bg-mint">
                    {product.bild_url ? (
                      <img
                        src={product.bild_url}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted text-xs">
                        🍝
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <div className="text-[11px] font-bold text-sage-dark leading-tight line-clamp-2 mb-1 min-h-[28px]">
                    {product.name}
                  </div>

                  {/* Price */}
                  <div className="font-display font-black text-[15px] text-gold-deep tabular-nums">
                    {formatPriceRaw(product.preis)}
                  </div>
                </div>
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
