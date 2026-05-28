"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { Search, X, Plus } from "lucide-react";
import type { Product, DietTag } from "@/lib/types";
import { DIET_TAG_SHORT } from "@/lib/types";
import { formatPriceRaw } from "@/lib/format";

const POPULAR_CHIPS = [
  { label: "Carbonara", query: "Carbonara" },
  { label: "Ravioli", query: "Ravioli" },
  { label: "Tiramisu", query: "Tiramisu" },
  { label: "Pesto", query: "Pesto" },
  { label: "Vegan", query: "vegan" },
  { label: "Trüffel", query: "Trüffel" },
  { label: "Scharf 🌶️", query: "scharf" },
];

interface Props {
  open: boolean;
  onClose: () => void;
  products: Product[];
  onAdd: (product: Product) => void;
}

export function SearchOverlay({ open, onClose, products, onAdd }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.beschreibung?.toLowerCase().includes(q)) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [query, products]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[105] bg-bone/98 flex flex-col">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 border-b border-line">
        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-line focus-within:border-sage focus-within:ring-2 focus-within:ring-sage/20 transition-all">
            <Search size={20} className="text-muted flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Wonach hast du Lust? — Pasta, Tiramisu, Pesto..."
              className="flex-1 bg-transparent outline-none text-base text-sage-dark placeholder:text-muted"
              autoComplete="off"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-muted hover:text-sage-dark transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-sm font-semibold text-sage hover:text-sage-hover transition-colors whitespace-nowrap"
          >
            Abbrechen
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {!query.trim() ? (
          <div>
            <div className="text-xs font-bold text-muted uppercase tracking-wider mb-3">
              Beliebte Suchen
            </div>
            <div className="flex flex-wrap gap-2">
              {POPULAR_CHIPS.map((chip) => (
                <button
                  key={chip.query}
                  onClick={() => setQuery(chip.query)}
                  className="px-4 py-2 bg-white rounded-full text-sm font-medium text-sage-dark border border-line hover:border-sage hover:bg-sage/5 transition-all"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="text-4xl mb-3">🔍</span>
            <div className="font-bold text-sage-dark">
              Nix gefunden für "{query}"
            </div>
            <div className="text-sm text-muted mt-1">
              Probier mal "Pasta", "Tiramisu" oder "Pesto"
            </div>
          </div>
        ) : (
          <div>
            <div className="text-xs font-bold text-muted uppercase tracking-wider mb-3">
              {results.length} Ergebnis{results.length !== 1 ? "se" : ""}
            </div>
            <div className="space-y-2">
              {results.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 p-3 bg-white rounded-xl cursor-pointer hover:shadow-sm transition-shadow"
                  onClick={() => {
                    onAdd(product);
                    onClose();
                  }}
                >
                  {product.bild_url && (
                    <div
                      className="w-14 h-14 rounded-lg bg-cover bg-center flex-shrink-0"
                      style={{ backgroundImage: `url(${product.bild_url})` }}
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm text-sage-dark flex items-center gap-1.5">
                      {product.name}
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-bold px-1 py-0.5 bg-sage/10 text-sage rounded"
                        >
                          {DIET_TAG_SHORT[tag as DietTag] ?? tag}
                        </span>
                      ))}
                    </div>
                    <div className="text-xs text-muted truncate mt-0.5">
                      {product.beschreibung}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="font-bold text-sm tabular-nums text-sage-dark">
                      {formatPriceRaw(product.preis)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAdd(product);
                      }}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-sage text-white hover:bg-sage-hover transition-colors"
                    >
                      <Plus size={16} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
