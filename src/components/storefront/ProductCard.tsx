"use client";

import { Plus, Heart } from "lucide-react";
import { useState } from "react";
import type { Product, DietTag } from "@/lib/types";
import { DIET_TAG_SHORT } from "@/lib/types";
import { formatPriceRaw } from "@/lib/format";
import { TOP3_IDS } from "@/lib/mock-data";

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
  onOpen: (product: Product) => void;
}

const DIET_TAG_STYLES: Record<string, string> = {
  halal: "bg-sage text-gold",
  v:     "bg-mint text-sage",
  vg:    "bg-mint-deep text-sage-hover",
  sp:    "bg-[#f8dcd8] text-[#5e221f]",
};

export function ProductCard({ product, onAdd, onOpen }: Props) {
  const [liked, setLiked] = useState(false);
  const isTop3 = TOP3_IDS.has(product.id);
  const hasOptions = product.option_groups && product.option_groups.length > 0;

  const seed = (product.id.charCodeAt(0) || 0) + (product.id.charCodeAt(product.id.length - 1) || 0);
  const todayCount = Math.round(product.rating * 12 + (seed % 18));
  const showUrgency = isTop3 || product.badges.includes("star") || todayCount > 50;

  return (
    <div
      className="relative bg-white rounded-[18px] p-[14px] cursor-pointer group border border-line transition-all duration-[250ms] hover:-translate-y-[6px] hover:shadow-[0_18px_36px_-10px_rgba(156,68,34,0.18),0_8px_16px_-4px_rgba(74,94,74,0.10)] hover:border-[rgba(156,68,34,0.25)]"
      onClick={() => (hasOptions ? onOpen(product) : onAdd(product))}
      role="button"
      tabIndex={0}
    >
      {/* Image container */}
      <div className="h-[300px] rounded-[14px] overflow-hidden mb-3 relative bg-mint">
        {/* Badges over image */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
          {isTop3 && (
            <span className="px-2 py-0.5 bg-gold text-sage-dark text-[10px] font-bold rounded-full">
              ⭐ Beliebt
            </span>
          )}
          {product.badges.includes("new") && (
            <span className="px-2 py-0.5 bg-sage text-white text-[10px] font-bold rounded-full">
              NEU
            </span>
          )}
          {product.badges.includes("best_preis") && (
            <span className="px-2 py-0.5 bg-burgundy text-white text-[10px] font-bold rounded-full">
              BEST PREIS
            </span>
          )}
          {product.badges.includes("tradition") && (
            <span className="px-2 py-0.5 bg-cream-deep text-sage-dark text-[10px] font-bold rounded-full">
              TRADITION
            </span>
          )}
        </div>

        {/* Heart */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          className={`absolute top-3 right-3 z-10 w-[34px] h-[34px] flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm border border-line transition-colors ${
            liked ? "text-burgundy" : "text-muted hover:text-sage-dark"
          }`}
          aria-label="Favorit"
        >
          <Heart size={15} fill={liked ? "currentColor" : "none"} strokeWidth={2} />
        </button>

        {product.bild_url ? (
          <img
            src={product.bild_url}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted text-sm font-medium">
            FOTO FOLGT
          </div>
        )}

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(42,58,44,0.04)] pointer-events-none" />
      </div>

      {/* Diet tags */}
      {product.tags.length > 0 && (
        <div className="flex gap-1 mb-2 flex-wrap">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded tracking-[0.5px] ${
                DIET_TAG_STYLES[tag as DietTag] ?? "bg-sage/10 text-sage"
              }`}
            >
              {DIET_TAG_SHORT[tag as DietTag] ?? tag.toUpperCase()}
            </span>
          ))}
        </div>
      )}

      {/* Name */}
      <h3 className="font-display font-black text-[18px] leading-[1.2] text-[#2a3a2c] mb-1.5">
        {product.name}
      </h3>

      {/* Description */}
      <p className="text-xs text-muted leading-[1.4] mb-2 min-h-[34px] line-clamp-2">
        {product.beschreibung}
      </p>

      {/* Rating */}
      <div className="flex items-center gap-1 text-xs text-[#2a3a2c] font-semibold mb-2.5">
        <span className="text-amber">★</span>
        <span>{product.rating.toFixed(1)}</span>
        {showUrgency && (
          <span className="text-muted font-medium">
            · <b className="text-[#5e221f] font-extrabold">{todayCount}×</b> heute
          </span>
        )}
      </div>

      {/* Price + Add */}
      <div className="flex items-end justify-between gap-2.5 mt-auto">
        <div className="tabular-nums">
          {hasOptions && (
            <span className="text-xs font-normal text-muted mr-0.5">ab </span>
          )}
          <span className="font-display font-black text-[24px] text-[#2a3a2c] leading-none">
            {formatPriceRaw(product.preis)}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            hasOptions ? onOpen(product) : onAdd(product);
          }}
          className="w-11 h-11 bg-sage rounded-[12px] text-white flex items-center justify-center flex-shrink-0 shadow-[0_4px_10px_-2px_rgba(74,94,74,0.35),0_0_0_1px_rgba(255,255,255,0.15)_inset] hover:bg-sage-hover transition-all active:scale-95"
          aria-label="In den Warenkorb"
        >
          <Plus size={20} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
