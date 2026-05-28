"use client";

import { Plus } from "lucide-react";
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
    <section className="max-w-[1240px] mx-auto mt-6 px-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[11px] font-extrabold tracking-[1.8px] text-sage-dark uppercase">
          Bestseller
        </span>
        <span className="text-[11px] text-gold-deep font-bold">🔥 Top {items.length}</span>
      </div>
      <div className="overflow-x-auto no-scrollbar -mx-6 px-6">
        <div className="flex gap-3 pb-2">
          {items.map((product, i) => (
            <div
              key={product.id}
              onClick={() => onAdd(product)}
              className="relative flex-shrink-0 w-[140px] bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow group"
              role="button"
            >
              {/* Rank */}
              <div className="absolute top-2 left-2 z-10 w-6 h-6 bg-gold text-sage-dark text-[11px] font-extrabold rounded-full flex items-center justify-center">
                {i + 1}
              </div>
              {/* Quick Add */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAdd(product);
                }}
                className="absolute top-2 right-2 z-10 w-6 h-6 bg-sage text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Hinzufügen"
              >
                <Plus size={14} strokeWidth={3} />
              </button>
              {/* Image */}
              <div
                className="w-full h-[100px] bg-mint bg-cover bg-center"
                style={
                  product.bild_url
                    ? { backgroundImage: `url(${product.bild_url})` }
                    : undefined
                }
              />
              {/* Info */}
              <div className="px-2.5 py-2">
                <div className="text-[12px] font-bold text-sage-dark leading-tight line-clamp-2">
                  {product.name}
                </div>
                <div className="text-[12px] font-bold text-sage tabular-nums mt-1">
                  {formatPriceRaw(product.preis)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
