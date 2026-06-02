"use client";

import { useMemo } from "react";
import { Plus, Sparkles, X } from "lucide-react";
import type { Product, Category } from "@/lib/types";
import { useCartStore } from "@/lib/store";
import { formatPriceRaw } from "@/lib/format";

interface Props {
  allProducts: Product[];
  productMap: Map<string, Product>;
  categories: Category[];
  onSkip: () => void;
}

export function UpsellStep({ allProducts, productMap, categories, onSkip }: Props) {
  const rawItems = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const items = useMemo(() => useCartStore.getState().getComputedItems(productMap), [rawItems, productMap]);

  // Map category_id → normalized name for real Supabase UUIDs
  const catName = useMemo(() => {
    const m = new Map<string, string>();
    for (const c of categories) m.set(c.id, c.name.toLowerCase());
    return m;
  }, [categories]);

  const isCat = (p: Product, name: string) => (catName.get(p.category_id) ?? p.category_id) === name;

  // SMART UPSELL: contextual suggestions
  const suggestions = useMemo(() => {
    const inCart = new Set(items.map((i) => i.product.id));

    const hasPasta = items.some((i) => isCat(i.product, "pasta"));
    const hasPizza = items.some((i) => isCat(i.product, "pizza"));
    const hasDrink = items.some((i) => isCat(i.product, "drinks"));
    const hasDessert = items.some((i) => isCat(i.product, "desserts"));
    const hasSide = items.some((i) => isCat(i.product, "sides") || isCat(i.product, "vorspeisen"));

    const score = (p: Product): number => {
      if (inCart.has(p.id)) return -1;
      let s = 0;
      if (!hasDrink && isCat(p, "drinks")) s += 100;
      if (!hasDessert && isCat(p, "desserts")) s += 90;
      if (!hasSide && (isCat(p, "sides") || isCat(p, "vorspeisen")) && (hasPasta || hasPizza)) s += 85;
      if (p.beliebt) s += 30;
      s += (p.rating ?? 4) * 3;
      return s;
    };

    return [...allProducts]
      .map((p) => ({ p, s: score(p) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 4)
      .map((x) => x.p);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProducts, items, catName]);

  const taglineFor = (p: Product): string => {
    const name = catName.get(p.category_id) ?? p.category_id;
    if (name === "drinks") return "Perfekt dazu";
    if (name === "desserts") return "Süßer Abschluss";
    if (name === "sides" || name === "vorspeisen") return "Beilage zur Hauptspeise";
    return p.beliebt ? "Bestseller" : "Empfehlung";
  };

  if (suggestions.length === 0) {
    // No suggestions, skip automatically
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div
          className="flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #e4c068 0%, #c9a227 100%)",
            boxShadow: "0 4px 12px rgba(201,162,39,0.35)",
          }}
        >
          <Sparkles size={20} className="text-sage-dark" strokeWidth={2.5} />
        </div>
        <div className="flex-1">
          <div className="font-display font-black text-[18px] text-sage-dark leading-tight">
            Vergiss nichts!
          </div>
          <div className="text-[12px] text-sage-dark/70 mt-0.5 leading-snug">
            Andiamo! Mit diesen Kleinigkeiten wird&apos;s richtig italienisch 🇮🇹
          </div>
        </div>
      </div>

      {/* Suggestion cards */}
      <div className="grid grid-cols-2 gap-2.5">
        {suggestions.map((p) => (
          <button
            key={p.id}
            onClick={() => addItem(p, 1, null)}
            className="group relative bg-white rounded-2xl p-2 text-left transition-all duration-200 active:scale-[0.97] hover:-translate-y-[2px] hover:shadow-[0_8px_24px_-8px_rgba(74,94,74,0.25)]"
            style={{
              border: "1.5px solid var(--color-line)",
            }}
          >
            {/* Image */}
            <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-mint relative">
              {p.bild_url ? (
                <img
                  src={p.bild_url}
                  alt={p.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl">
                  {isCat(p, "drinks") ? "🥤" : isCat(p, "desserts") ? "🍰" : "🍽️"}
                </div>
              )}
              {/* Add Button overlay */}
              <div
                className="absolute bottom-1.5 right-1.5 w-7 h-7 rounded-full flex items-center justify-center transition-transform group-active:scale-90"
                style={{
                  background: "linear-gradient(135deg, var(--color-sage) 0%, var(--color-sage-hover) 100%)",
                  boxShadow: "0 4px 10px rgba(74,94,74,0.4)",
                }}
              >
                <Plus size={14} className="text-white" strokeWidth={3} />
              </div>
            </div>

            {/* Tagline */}
            <div
              className="text-[9.5px] font-extrabold tracking-[0.5px] uppercase mb-0.5"
              style={{ color: "var(--color-gold-deep)" }}
            >
              ✨ {taglineFor(p)}
            </div>

            {/* Name */}
            <div className="text-[12px] font-bold text-sage-dark leading-tight line-clamp-2 mb-1">
              {p.name}
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <span className="font-display font-black text-[13px] text-gold-deep tabular-nums">
                +{formatPriceRaw(p.preis)}
              </span>
              <span className="text-[10px] text-sage-dark/55">★ {(p.rating ?? 4.5).toFixed(1)}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Skip */}
      <button
        onClick={onSkip}
        className="w-full text-[12px] text-sage-dark/60 hover:text-sage-dark transition-colors py-1.5 underline-offset-4 hover:underline"
      >
        Nein danke, weiter zur Übersicht
      </button>
    </div>
  );
}
