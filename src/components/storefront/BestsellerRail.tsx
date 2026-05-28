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
        className="rounded-[18px] overflow-hidden border border-line-strong"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(228,192,104,0.20) 0%, transparent 55%), linear-gradient(135deg, var(--color-cream-deep) 0%, var(--color-cream-soft) 100%)",
          padding: "20px 28px",
        }}
      >
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start sm:items-center">
          {/* Left Column */}
          <div className="flex-shrink-0 sm:w-[260px]">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-extrabold tracking-[2px] text-sage uppercase">
                ✦ DIESE WOCHE TRENDING
              </span>
              <span className="w-2 h-2 rounded-full bg-sage-bright animate-[dp-pulse_2.4s_ease-out_infinite]" />
            </div>
            <h3
              className="font-display font-black text-sage-dark leading-tight"
              style={{ fontSize: "clamp(20px, 2.8vw, 26px)" }}
            >
              Mamma Mia — die Top 5
            </h3>
            <p className="text-[13px] text-muted mt-1 leading-snug">
              Was Aachen aktuell am liebsten bestellt.
            </p>
          </div>

          {/* Scrollable Cards */}
          <div className="flex-1 overflow-x-auto no-scrollbar -mr-7">
            <div className="flex gap-3 pb-1 pr-7">
              {items.map((product, i) => {
                const isTop3 = TOP3_IDS.has(product.id);
                return (
                  <div
                    key={product.id}
                    onClick={() => onAdd(product)}
                    role="button"
                    tabIndex={0}
                    className="relative flex-shrink-0 w-[160px] bg-white rounded-xl p-2.5 text-center cursor-pointer hover:shadow-lg hover:-translate-y-px transition-all border border-line"
                  >
                    {/* Rank badge */}
                    <div className="absolute top-1.5 left-1.5 z-10 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-extrabold bg-sage text-gold">
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
                    <div className="w-full h-[100px] rounded-lg overflow-hidden mb-2 bg-mint">
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
                    <div className="font-display font-black text-[15px] text-sage-dark tabular-nums">
                      {formatPriceRaw(product.preis)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
