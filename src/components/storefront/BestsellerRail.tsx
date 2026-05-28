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
        className="rounded-[18px] overflow-hidden border border-[#2a3a2c]"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(228,192,104,0.45) 0%, transparent 55%), radial-gradient(ellipse at bottom left, rgba(74,94,74,0.15) 0%, transparent 60%), linear-gradient(135deg, #3a4a3a 0%, #4a5e4a 50%, #5d735d 100%)",
          padding: "20px 28px",
        }}
      >
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start sm:items-center">
          {/* Left Column */}
          <div className="flex-shrink-0 sm:w-[260px]">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-extrabold tracking-[2px] text-gold uppercase">
                ✦ HEUTE BELIEBT
              </span>
              <span className="w-2 h-2 rounded-full bg-[#6fcf97] animate-[dp-pulse_2.4s_ease-out_infinite]" />
            </div>
            <h3
              className="font-display font-black text-white leading-tight"
              style={{ fontSize: "clamp(20px, 2.8vw, 26px)" }}
            >
              Andiamo! 🍝
            </h3>
            <p className="text-[13px] text-[rgba(255,255,255,0.65)] mt-1 leading-snug">
              Die Lieblinge unserer Gäste
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
                    className="relative flex-shrink-0 w-[140px] bg-white rounded-xl p-2.5 text-center cursor-pointer hover:shadow-lg hover:-translate-y-px transition-all"
                  >
                    {/* Rank badge */}
                    <div className="absolute top-1.5 left-1.5 z-10 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-extrabold" style={{ background: "#2a3a2c", color: "#e4c068" }}>
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
