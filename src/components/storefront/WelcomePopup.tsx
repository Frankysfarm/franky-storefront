"use client";

import { useEffect, useState } from "react";
import { X, Gift, Check } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store";

interface Props {
  drinks: Product[];
}

const STORAGE_KEY = "franky_free_drink_chosen";

export function WelcomePopup({ drinks }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [claimed, setClaimed] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    const already = typeof window !== "undefined" && sessionStorage.getItem(STORAGE_KEY);
    if (already) return;
    const t = setTimeout(() => setOpen(true), 1500);
    return () => clearTimeout(t);
  }, []);

  if (drinks.length < 4) return null;
  const choices = drinks.slice(0, 4);

  const close = () => {
    sessionStorage.setItem(STORAGE_KEY, "skipped");
    setOpen(false);
  };

  const handleClaim = () => {
    if (!selected) return;
    const drink = choices.find((d) => d.id === selected);
    if (drink) {
      // Add to cart as free item (price will be auto-discounted via special promo handling)
      addItem({ ...drink, preis: 0 } as Product, 1, null);
    }
    sessionStorage.setItem(STORAGE_KEY, selected);
    setClaimed(true);
    setTimeout(() => setOpen(false), 1800);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/55 backdrop-blur-sm animate-[fade-in_0.25s_ease-out]"
      onClick={close}
    >
      <div
        className="relative bg-bone w-full max-w-md sm:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl animate-[reveal-up_0.35s_cubic-bezier(0.34,1.56,0.64,1)]"
        onClick={(e) => e.stopPropagation()}
        style={{
          border: "1.5px solid rgba(228,192,104,0.4)",
        }}
      >
        {/* Close button */}
        <button
          onClick={close}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-sm transition-all hover:scale-105"
          aria-label="Schließen"
        >
          <X size={18} className="text-sage-dark" />
        </button>

        {/* Header with golden gradient */}
        <div
          className="relative px-6 pt-7 pb-5 text-center overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(228,192,104,0.5) 0%, transparent 60%), linear-gradient(135deg, #2a3a2c 0%, #4a5e4a 100%)",
            color: "var(--color-cream)",
          }}
        >
          {/* Shine sweep */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute top-0 bottom-0 w-[30%] opacity-50"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
                animation: "loyalty-shine-sweep 3s ease-in-out infinite",
              }}
            />
          </div>

          {/* Gift icon with glow */}
          <div className="relative inline-flex">
            <div
              className="absolute inset-0 -m-3 rounded-full blur-xl opacity-60"
              style={{
                background:
                  "radial-gradient(circle, rgba(228,192,104,0.8) 0%, transparent 70%)",
                animation: "loyalty-glow-pulse 3s ease-in-out infinite",
              }}
            />
            <div
              className="relative w-16 h-16 rounded-2xl flex items-center justify-center text-4xl"
              style={{
                background: "linear-gradient(135deg, #e4c068 0%, #c9a227 100%)",
                boxShadow: "0 8px 24px rgba(201,162,39,0.4)",
                animation: "loyalty-icon-bob 2.5s ease-in-out infinite",
              }}
            >
              🎁
            </div>
          </div>

          <div
            className="mt-3 text-[10px] font-extrabold tracking-[2px]"
            style={{ color: "var(--color-gold)" }}
          >
            GESCHENK FÜR DICH
          </div>

          <h2
            className="font-display font-black mt-1 leading-tight"
            style={{
              fontSize: "clamp(22px, 5vw, 28px)",
              letterSpacing: "-0.02em",
            }}
          >
            Dein Getränk ist <em className="not-italic italic" style={{ color: "var(--color-gold)" }}>geschenkt</em> 🍝
          </h2>

          <p className="text-[13px] text-cream/85 mt-2 max-w-xs mx-auto">
            Such dir eins aus — wir packen&apos;s gratis zu deiner heutigen Bestellung
          </p>
        </div>

        {/* Drink choices */}
        <div className="px-5 pb-4 pt-5">
          {claimed ? (
            <div className="py-10 text-center">
              <div
                className="inline-flex w-16 h-16 rounded-full items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, var(--color-sage) 0%, var(--color-sage-hover) 100%)",
                  boxShadow: "0 8px 20px rgba(74,94,74,0.35)",
                }}
              >
                <Check size={32} className="text-gold" strokeWidth={3} />
              </div>
              <div className="font-display font-black text-xl text-sage-dark mt-3">
                Andiamo! 🍝
              </div>
              <div className="text-sm text-sage-dark/70 mt-1">
                Im Warenkorb wartet&apos;s auf dich
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2.5">
                {choices.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSelected(d.id)}
                    className={`relative overflow-hidden rounded-2xl p-2.5 text-left transition-all duration-200 active:scale-[0.97] ${
                      selected === d.id
                        ? "bg-sage text-white border-sage shadow-[0_8px_22px_-6px_rgba(74,94,74,0.4)]"
                        : "bg-white border-line hover:border-sage/40 hover:-translate-y-[2px]"
                    }`}
                    style={{ border: "1.5px solid", borderColor: selected === d.id ? "var(--color-sage)" : "var(--color-line)" }}
                  >
                    {selected === d.id && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-gold flex items-center justify-center z-10">
                        <Check size={12} className="text-sage-dark" strokeWidth={3} />
                      </div>
                    )}

                    {/* Image */}
                    <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-mint">
                      {d.bild_url ? (
                        <img
                          src={d.bild_url}
                          alt={d.name}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl">🥤</div>
                      )}
                    </div>

                    {/* Name */}
                    <div
                      className={`text-[11px] font-bold leading-tight line-clamp-2 ${
                        selected === d.id ? "text-white" : "text-sage-dark"
                      }`}
                    >
                      {d.name}
                    </div>

                    {/* Crossed-out price */}
                    <div className="flex items-center gap-1.5 mt-1">
                      <span
                        className={`text-[10px] line-through ${
                          selected === d.id ? "text-white/60" : "text-sage-dark/50"
                        }`}
                      >
                        2,50 €
                      </span>
                      <span
                        className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded"
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

              {/* CTA + Skip */}
              <button
                onClick={handleClaim}
                disabled={!selected}
                className={`w-full mt-4 h-12 rounded-2xl font-bold text-[15px] flex items-center justify-center gap-2 transition-all duration-300 ${
                  selected
                    ? "text-white shadow-[0_10px_28px_-8px_rgba(74,94,74,0.55)] active:scale-[0.98]"
                    : "bg-mint-deep/60 text-sage-dark/40 cursor-not-allowed"
                }`}
                style={
                  selected
                    ? {
                        background:
                          "linear-gradient(135deg, var(--color-sage) 0%, var(--color-sage-hover) 100%)",
                      }
                    : undefined
                }
              >
                <Gift size={18} strokeWidth={2.5} />
                {selected ? "Geschenk sichern" : "Erst auswählen"}
              </button>

              <button
                onClick={close}
                className="w-full mt-2 text-[12px] text-sage-dark/55 hover:text-sage-dark transition-colors py-1.5"
              >
                Später vielleicht
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
