"use client";

import { useEffect, useState } from "react";
import { X, Check } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store";

interface Props {
  drinks: Product[];
  allProducts?: Product[];
  settings?: {
    enabled?: boolean;
    title?: string;
    title_emphasis?: string;
    subtitle?: string;
    free_product_ids?: string[];
    delay_ms?: number;
  };
}

const STORAGE_KEY = "franky_free_drink_chosen";

export function WelcomePopup({ drinks, allProducts, settings }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [claimed, setClaimed] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (settings?.enabled === false) return;
    const already = typeof window !== "undefined" && sessionStorage.getItem(STORAGE_KEY);
    if (already) return;
    const t = setTimeout(() => setOpen(true), settings?.delay_ms ?? 1500);
    return () => clearTimeout(t);
  }, []);

  const customProductIds = settings?.free_product_ids ?? [];
  const choices = customProductIds.length > 0 && allProducts
    ? (customProductIds.map(id => allProducts.find(p => p.id === id)).filter(Boolean) as Product[])
    : drinks.slice(0, 4);
  if (choices.length < 1) return null;

  const close = () => {
    sessionStorage.setItem(STORAGE_KEY, "skipped");
    setOpen(false);
  };

  const handleClaim = () => {
    if (!selected) return;
    const drink = choices.find((d) => d.id === selected);
    if (drink) addItem({ ...drink, preis: 0 } as Product, 1, null);
    sessionStorage.setItem(STORAGE_KEY, selected);
    setClaimed(true);
    setTimeout(() => setOpen(false), 1400);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/45 animate-[fade-in_0.25s_ease-out]"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-popup-title"
    >
      <div
        className="relative bg-bone w-full max-w-sm rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl animate-[reveal-up_0.3s_cubic-bezier(0.34,1.56,0.64,1)]"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxHeight: "min(78dvh, 78vh)",
          border: "1.5px solid rgba(228,192,104,0.4)",
        }}
      >
        {/* Mobile drag handle */}
        <div className="sm:hidden flex justify-center pt-1.5 pb-1">
          <div className="w-10 h-1 bg-sage-dark/15 rounded-full" />
        </div>

        {/* Close */}
        <button
          onClick={close}
          className="absolute top-1.5 right-2 z-20 w-7 h-7 rounded-full bg-white/85 hover:bg-white flex items-center justify-center"
          aria-label="Schließen"
        >
          <X size={14} className="text-sage-dark" />
        </button>

        {/* Compact Header — single row with icon + text */}
        <div
          className="relative px-4 py-3 flex items-center gap-3 overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at top right, rgba(228,192,104,0.35) 0%, transparent 60%), linear-gradient(135deg, #2a3a2c 0%, #4a5e4a 100%)",
            color: "var(--color-cream)",
          }}
        >
          {/* Gift icon */}
          <div
            className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-2xl"
            style={{
              background: "linear-gradient(135deg, #e4c068 0%, #c9a227 100%)",
              boxShadow: "0 4px 12px rgba(201,162,39,0.35)",
              animation: "loyalty-icon-bob 2.5s ease-in-out infinite",
            }}
          >
            🎁
          </div>

          <div className="flex-1 min-w-0">
            <div
              className="text-[9px] font-extrabold tracking-[1.5px]"
              style={{ color: "var(--color-gold)" }}
            >
              {(settings?.title || settings?.title_emphasis) ? "GESCHENK FÜR DICH" : "GESCHENK FÜR DICH"}
            </div>
            <div
              id="welcome-popup-title"
              className="font-display font-black leading-tight mt-0.5"
              style={{ fontSize: "16px", letterSpacing: "-0.01em" }}
            >
              {settings?.title ?? "1 Getränk"}{" "}
              <em className="not-italic italic" style={{ color: "var(--color-gold)" }}>
                {settings?.title_emphasis ?? "gratis 🍝"}
              </em>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-3 pb-3 pt-3">
          {claimed ? (
            <div className="py-6 text-center">
              <div
                className="inline-flex w-12 h-12 rounded-full items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, var(--color-sage) 0%, var(--color-sage-hover) 100%)",
                  boxShadow: "0 6px 16px rgba(74,94,74,0.3)",
                }}
              >
                <Check size={22} className="text-gold" strokeWidth={3} />
              </div>
              <div className="font-display font-black text-base text-sage-dark mt-2">
                Andiamo! 🍝
              </div>
              <div className="text-xs text-sage-dark/70 mt-0.5">
                Im Warenkorb
              </div>
            </div>
          ) : (
            <>
              {/* 4 drinks: 2x2 compact grid */}
              <div className="grid grid-cols-2 gap-2">
                {choices.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSelected(d.id)}
                    className={`relative overflow-hidden rounded-xl p-1.5 text-left transition-all duration-150 active:scale-[0.96] ${
                      selected === d.id
                        ? "shadow-[0_4px_14px_-4px_rgba(74,94,74,0.4)]"
                        : "hover:-translate-y-px"
                    }`}
                    style={{
                      background: selected === d.id ? "var(--color-sage)" : "white",
                      border: "1.5px solid",
                      borderColor: selected === d.id ? "var(--color-sage)" : "var(--color-line)",
                    }}
                  >
                    {selected === d.id && (
                      <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-gold flex items-center justify-center z-10">
                        <Check size={9} className="text-sage-dark" strokeWidth={3} />
                      </div>
                    )}

                    {/* Image */}
                    <div className="aspect-square rounded-lg overflow-hidden mb-1 bg-mint">
                      {d.bild_url ? (
                        <img src={d.bild_url} alt={d.name} loading="lazy" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl">🥤</div>
                      )}
                    </div>

                    {/* Name + Price */}
                    <div
                      className={`text-[10.5px] font-bold leading-tight line-clamp-2 ${
                        selected === d.id ? "text-white" : "text-sage-dark"
                      }`}
                    >
                      {d.name}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span
                        className={`text-[9px] line-through ${
                          selected === d.id ? "text-white/55" : "text-sage-dark/40"
                        }`}
                      >
                        2,50€
                      </span>
                      <span
                        className="text-[8.5px] font-extrabold uppercase px-1 py-px rounded leading-tight"
                        style={{
                          background: selected === d.id ? "var(--color-gold)" : "var(--color-gold-soft)",
                          color: "var(--color-sage-dark)",
                        }}
                      >
                        GRATIS
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* CTAs */}
              <button
                onClick={handleClaim}
                disabled={!selected}
                aria-disabled={!selected}
                className={`w-full mt-2.5 h-11 rounded-xl font-bold text-[13.5px] flex items-center justify-center gap-1.5 transition-all duration-300 ${
                  selected
                    ? "text-white shadow-[0_6px_18px_-6px_rgba(74,94,74,0.5)] active:scale-[0.98]"
                    : "bg-mint-deep/55 text-sage-dark/35 cursor-not-allowed"
                }`}
                style={
                  selected
                    ? { background: "linear-gradient(135deg, var(--color-sage) 0%, var(--color-sage-hover) 100%)" }
                    : undefined
                }
              >
                {selected ? "Geschenk sichern 🎁" : "Erst wählen ↑"}
              </button>

              <button
                onClick={close}
                className="w-full mt-1.5 text-[11px] text-sage-dark/50 hover:text-sage-dark transition-colors py-1"
              >
                Nein danke
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
