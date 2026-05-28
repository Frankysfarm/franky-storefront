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

export function ProductCard({ product, onAdd, onOpen }: Props) {
  const [liked, setLiked] = useState(false);
  const isTop3 = TOP3_IDS.has(product.id);
  const hasOptions = product.option_groups && product.option_groups.length > 0;

  const seed = (product.id.charCodeAt(0) || 0) + (product.id.charCodeAt(product.id.length - 1) || 0);
  const todayCount = Math.round(product.rating * 12 + (seed % 18));
  const showUrgency = isTop3 || product.badges.includes("star") || todayCount > 50;

  return (
    <div
      className="relative bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer group hover:shadow-md transition-shadow"
      onClick={() => (hasOptions ? onOpen(product) : onAdd(product))}
      role="button"
      tabIndex={0}
    >
      {/* Badges */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-wrap gap-1">
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
        className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-colors ${
          liked ? "text-burgundy" : "text-muted hover:text-sage-dark"
        }`}
        aria-label="Favorit"
      >
        <Heart size={16} fill={liked ? "currentColor" : "none"} strokeWidth={2} />
      </button>

      {/* Image */}
      {product.bild_url ? (
        <img
          src={product.bild_url}
          alt={product.name}
          loading="lazy"
          className="w-full aspect-[4/3] object-cover bg-mint"
        />
      ) : (
        <div className="w-full aspect-[4/3] bg-mint flex items-center justify-center text-muted text-sm font-medium">
          FOTO FOLGT
        </div>
      )}

      {/* Diet Tags */}
      {product.tags.length > 0 && (
        <div className="flex gap-1 px-3 pt-2.5">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                tag === "halal"
                  ? "bg-sage/10 text-sage"
                  : tag === "sp"
                    ? "bg-burgundy/10 text-burgundy"
                    : tag === "vg"
                      ? "bg-sage-bright/10 text-sage-bright"
                      : "bg-sage/10 text-sage"
              }`}
            >
              {DIET_TAG_SHORT[tag as DietTag] ?? tag.toUpperCase()}
            </span>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="px-3 pt-2 pb-3">
        <h3 className="font-display font-bold text-[15px] text-sage-dark leading-tight">
          {product.name}
        </h3>
        <p className="text-xs text-muted mt-0.5 line-clamp-2">
          {product.beschreibung}
        </p>

        {/* Rating + Urgency */}
        <div className="flex items-center gap-1.5 mt-2 text-[11px]">
          <span className="text-gold-deep font-bold">★ {product.rating.toFixed(1)}</span>
          {showUrgency && (
            <span className="text-muted">
              · <b className="text-sage-dark">{todayCount}×</b> heute bestellt
            </span>
          )}
        </div>

        {/* Price + Add */}
        <div className="flex items-center justify-between mt-2.5">
          <div className="tabular-nums font-bold text-sage-dark">
            {hasOptions && (
              <span className="text-xs font-normal text-muted mr-0.5">ab </span>
            )}
            {formatPriceRaw(product.preis)}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              hasOptions ? onOpen(product) : onAdd(product);
            }}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-sage text-white hover:bg-sage-hover transition-colors"
            aria-label="In den Warenkorb"
          >
            <Plus size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
