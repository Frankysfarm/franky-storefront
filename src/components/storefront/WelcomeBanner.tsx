"use client";

import type { Tenant, Product } from "@/lib/types";
import { formatPriceRaw } from "@/lib/format";

interface Props {
  tenant: Tenant;
  topProducts: Product[];
  onAdd: (product: Product) => void;
}

export function WelcomeBanner({ topProducts, onAdd }: Props) {
  return (
    <section className="max-w-[1240px] mx-auto mt-4 px-6">
      <div
        className="relative overflow-hidden rounded-xl border-[1.5px] border-line-strong p-4 sm:p-8"
        style={{
          background: `radial-gradient(ellipse at top right, rgba(228,192,104,0.28) 0%, transparent 55%),
                       linear-gradient(135deg, var(--color-cream-deep) 0%, var(--color-cream-soft) 100%)`,
        }}
      >
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-start sm:items-center">
          {/* Left: Title + Subtext */}
          <div className="flex-shrink-0 sm:w-[260px]">
            <span className="inline-block text-[10px] sm:text-[11px] font-extrabold tracking-[1.4px] sm:tracking-[1.8px] text-burgundy-dark mb-1.5 sm:mb-2">
              ✦ DIESE WOCHE TRENDING
            </span>
            <h2
              className="font-display font-black leading-[1.02] text-sage-dark"
              style={{ fontSize: "clamp(20px, 4vw, 42px)", letterSpacing: "-0.02em" }}
            >
              Mamma Mia —{" "}
              <span className="italic text-sage">die Top&nbsp;5</span>
            </h2>
            <p className="text-[12px] sm:text-sm text-muted mt-1.5 sm:mt-2 leading-snug hidden sm:block">
              Was Aachen aktuell am liebsten bestellt.
              Zwei Klicks, und es ist im Warenkorb.
            </p>
          </div>

          {/* Right: Scrollable Top-5 Cards */}
          <div className="flex-1 overflow-x-auto no-scrollbar -mr-5 sm:-mr-8">
            <div className="flex gap-3 pb-1 pr-5 sm:pr-8">
              {topProducts.map((product, i) => (
                <button
                  key={product.id}
                  onClick={() => onAdd(product)}
                  className="relative flex-shrink-0 w-[100px] sm:w-[112px] bg-white rounded-xl p-1.5 sm:p-2 text-left cursor-pointer hover:shadow-md hover:-translate-y-px transition-all border border-line"
                >
                  {/* Rank badge */}
                  <div
                    className="absolute top-1.5 left-1.5 z-10 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold border border-[rgba(228,192,104,0.5)]"
                    style={{ background: "var(--color-sage-dark)", color: "var(--color-gold)" }}
                  >
                    {i + 1}
                  </div>

                  {/* Image */}
                  <div className="w-full aspect-square rounded-lg overflow-hidden mb-2 bg-mint">
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

                  {/* Name */}
                  <div className="text-[11px] font-bold text-sage-dark leading-tight line-clamp-2 mb-0.5">
                    {product.name}
                  </div>

                  {/* Social Proof */}
                  <div className="text-[9px] font-semibold text-sage-dark/55 mb-1 flex items-center gap-0.5">
                    <span className="text-gold-deep">★</span>
                    <span>{(4.5 + (i * 0.07)).toFixed(1)}</span>
                    <span className="mx-0.5">·</span>
                    <span>{70 - i * 8}× heute</span>
                  </div>

                  {/* Price */}
                  <div className="font-display font-black text-[13px] text-gold-deep tabular-nums">
                    {formatPriceRaw(product.preis)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
