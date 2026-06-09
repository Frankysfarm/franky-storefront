"use client";

import type { Product } from "@/lib/types";
import { formatPriceRaw } from "@/lib/format";

interface Props {
  topProducts: Product[];
  onAdd: (product: Product) => void;
}

export function WelcomeBanner({ topProducts, onAdd }: Props) {
  if (topProducts.length === 0) return null;

  return (
    <section className="max-w-[1240px] mx-auto mt-4 px-6">
      <div
        className="relative overflow-hidden rounded-[20px] border-[1.5px] border-line-strong p-5 sm:p-8"
        style={{
          background: `radial-gradient(ellipse at top right, rgba(228,192,104,0.28) 0%, transparent 55%),
                       linear-gradient(135deg, var(--color-cream-deep) 0%, var(--color-cream-soft) 100%)`,
        }}
      >
        {/* Decorative pasta swirl — bottom right corner, matches mockup */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-40px] bottom-[-40px] w-[180px] h-[180px] opacity-100"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><g stroke='%234a5e4a' stroke-width='2' fill='none' stroke-linecap='round' opacity='0.18'><path d='M10 50 Q 25 25 50 35 T 90 50'/><path d='M10 60 Q 30 40 50 50 T 90 60'/><path d='M15 40 Q 35 55 55 35 T 90 45'/><path d='M20 70 Q 40 50 60 70 T 90 65'/></g></svg>")`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-start sm:items-center">
          {/* Left: Title + Subtext */}
          <div className="flex-shrink-0 sm:w-[280px]">
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-extrabold tracking-[1.4px] sm:tracking-[1.8px] text-sage-dark mb-1.5 sm:mb-2">
              <span
                className="w-[7px] h-[7px] rounded-full bg-green-400 flex-shrink-0"
                style={{ animation: "bb-live-pulse 1.8s ease-out infinite" }}
              />
              DIESE WOCHE TRENDING
            </span>
            <h2
              className="font-display font-black leading-[1.02] text-sage-dark"
              style={{ fontSize: "clamp(26px, 3.6vw, 38px)", letterSpacing: "-0.02em" }}
            >
              Mamma Mia —{" "}
              <span className="italic text-burgundy">die Top&nbsp;5</span>
            </h2>
            <p className="text-[12px] sm:text-sm text-muted mt-1.5 sm:mt-2 leading-snug">
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
                  className="relative flex-shrink-0 w-[108px] sm:w-[120px] bg-white rounded-xl p-1.5 sm:p-2 text-left cursor-pointer hover:shadow-md hover:-translate-y-px transition-all border border-line"
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
