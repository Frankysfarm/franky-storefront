"use client";

import { useMemo } from "react";
import { Plus } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPriceRaw } from "@/lib/format";

interface Props {
  cartProductIds: string[];
  allProducts: Product[];
  onAdd: (product: Product) => void;
}

export function CrossSell({ cartProductIds, allProducts, onAdd }: Props) {
  const suggestions = useMemo(() => {
    if (cartProductIds.length === 0) return [];

    const cartCategories = new Set(
      cartProductIds
        .map((id) => allProducts.find((p) => p.id === id)?.category_id)
        .filter(Boolean),
    );

    const hasPasta = cartCategories.has("pasta") || cartCategories.has("pizza");
    const hasOnlyDesserts =
      cartCategories.size === 1 && cartCategories.has("desserts");

    let pool: Product[];
    if (hasOnlyDesserts) {
      pool = allProducts.filter(
        (p) => p.category_id === "pasta" || p.category_id === "sides",
      );
    } else if (hasPasta) {
      pool = allProducts.filter(
        (p) => p.category_id === "desserts" || p.category_id === "drinks",
      );
    } else {
      pool = allProducts.filter(
        (p) => p.category_id === "pasta" || p.category_id === "desserts",
      );
    }

    return pool
      .filter((p) => !cartProductIds.includes(p.id))
      .sort((a, b) => (b.beliebt ? 1 : 0) - (a.beliebt ? 1 : 0))
      .slice(0, 3);
  }, [cartProductIds, allProducts]);

  if (suggestions.length === 0) return null;

  return (
    <div className="mt-4 pt-3 border-t border-line">
      <div className="text-xs font-bold text-muted uppercase tracking-wider mb-2">
        Dazu passt...
      </div>
      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 pb-1">
        {suggestions.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-[120px] bg-cream-soft rounded-xl overflow-hidden cursor-pointer hover:shadow-sm transition-shadow"
            onClick={() => onAdd(product)}
          >
            {product.bild_url && (
              <div
                className="w-full h-[70px] bg-cover bg-center"
                style={{ backgroundImage: `url(${product.bild_url})` }}
              />
            )}
            <div className="p-2">
              <div className="text-[11px] font-bold text-sage-dark leading-tight line-clamp-2">
                {product.name}
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[11px] font-bold text-sage tabular-nums">
                  {formatPriceRaw(product.preis)}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAdd(product);
                  }}
                  className="w-5 h-5 flex items-center justify-center rounded bg-sage text-white"
                >
                  <Plus size={12} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
