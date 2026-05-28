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
      {/* Animated Bonus Banner over Bestseller column */}
      <div
        className="relative overflow-hidden rounded-t-xl border-x-[1.5px] border-t-[1.5px] border-line-strong px-5 py-2 text-[12px] font-bold text-gold tracking-[1px] flex items-center justify-center gap-3"
        style={{
          background: 'linear-gradient(135deg, var(--color-sage-dark) 0%, var(--color-sage-hover) 100%)',
        }}
      >
        <span className="text-base animate-[icon-bob_3s_ease-in-out_infinite]">🎁</span>
        <span className="uppercase">FRANKY&apos;S BONUS-CLUB</span>
        <span className="opacity-50">·</span>
        <span className="normal-case">Jede <span className="italic text-white font-extrabold">5. Bestellung</span> = 1 Pasta gratis</span>
        <span className="hidden md:flex items-center gap-1 ml-2">
          {[1,2,3,4,5].map(i => (
            <span key={i} className={`w-1.5 h-1.5 rounded-full ${i <= 3 ? "bg-gold animate-[loyalty-glow-pulse_2.5s_ease-in-out_infinite]" : "bg-gold/25"}`} style={{ animationDelay: `${i*0.2}s` }}/>
          ))}
          <span className="ml-1 font-mono text-[10px] opacity-80"><b>3</b>/5</span>
        </span>
        {/* Shine sweep overlay */}
        <span
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(228,192,104,0.18) 50%, transparent 100%)',
            animation: 'loyalty-shine-sweep 4s ease-in-out infinite',
            mixBlendMode: 'overlay',
          }}
        />
      </div>

      <div
        className="relative overflow-hidden rounded-b-xl border-[1.5px] border-line-strong border-t-0 p-5 sm:p-8"
        style={{
          background: `radial-gradient(ellipse at top right, rgba(228,192,104,0.28) 0%, transparent 55%),
                       linear-gradient(135deg, var(--color-cream-deep) 0%, var(--color-cream-soft) 100%)`,
        }}
      >
        <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
          {/* Left: Title + Subtext */}
          <div className="flex-shrink-0 sm:w-[260px]">
            <span className="inline-block text-[11px] font-extrabold tracking-[1.8px] text-burgundy-dark mb-2">
              ✦ DIESE WOCHE TRENDING
            </span>
            <h2
              className="font-display font-black leading-[1.02] text-sage-dark"
              style={{ fontSize: "clamp(22px, 3vw, 30px)", letterSpacing: "-0.02em" }}
            >
              Mamma Mia —{" "}
              <span className="italic text-sage">die Top&nbsp;5</span>
            </h2>
            <p className="text-sm text-muted mt-2 leading-snug">
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
                  className="relative flex-shrink-0 w-[112px] bg-white rounded-xl p-2 text-left cursor-pointer hover:shadow-md hover:-translate-y-px transition-all border border-line"
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
                  <div className="text-[11px] font-bold text-sage-dark leading-tight line-clamp-2 mb-1">
                    {product.name}
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
