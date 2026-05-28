"use client";

import type { Tenant } from "@/lib/types";

interface Props {
  tenant: Tenant;
}

export function WelcomeBanner({ tenant }: Props) {
  return (
    <section className="max-w-[1240px] mx-auto mt-4 px-6">
      <div
        className="relative overflow-hidden rounded-xl border-[1.5px] border-line-strong p-6 sm:p-8 grid sm:grid-cols-[1.4fr_1fr] gap-6 items-center"
        style={{
          background: `radial-gradient(ellipse at top right, rgba(228,192,104,0.25) 0%, transparent 55%),
                       linear-gradient(135deg, var(--color-cream-deep) 0%, var(--color-cream-soft) 100%)`,
        }}
      >
        <div className="relative z-[1]">
          <span className="inline-block text-[11px] font-extrabold tracking-[1.8px] text-burgundy-dark mb-2">
            HALAL · FRISCH · AACHEN
          </span>
          <h1
            className="font-display font-black leading-[1.02] tracking-tight"
            style={{ fontSize: "clamp(26px, 3.6vw, 38px)", letterSpacing: "-0.02em" }}
          >
            Pasta wie bei{" "}
            <span className="italic text-sage">Mamma</span>
            <br />
            — direkt vor deine Tür.
          </h1>
          <p className="text-sm text-muted mt-3 max-w-md">
            Frische Pasta, knusprige Focaccina-Pizza und hausgemachte Desserts.
            Halal-zertifiziert, aus Aachen, in {tenant.durchschnittliche_lieferzeit_min - 5}–{tenant.durchschnittliche_lieferzeit_min + 5} Min bei dir.
          </p>
        </div>

        {/* Bonus Card */}
        <div
          className="relative rounded-xl p-5 border border-[rgba(228,192,104,0.4)] animate-[glow-pulse_3s_ease-in-out_infinite]"
          style={{
            background: "linear-gradient(135deg, #f3e7bd 0%, #efe2c2 50%, #f6ecc8 100%)",
          }}
        >
          <div className="overflow-hidden absolute inset-0 rounded-xl pointer-events-none">
            <div className="absolute inset-0 w-[30%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shine-sweep_3s_ease-in-out_infinite]" />
          </div>
          <div className="relative z-[1]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl animate-[icon-bob_2s_ease-in-out_infinite]">🎁</span>
              <span className="text-[11px] font-extrabold tracking-[1.5px] text-amber">
                BONUS-CLUB
              </span>
            </div>
            <div className="font-display font-black text-sage-dark text-lg leading-tight">
              Jede 5. Bestellung
              <br />
              = 1 Pasta gratis
            </div>
            <div className="mt-3 flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border ${
                    i <= 0
                      ? "bg-sage text-white border-sage"
                      : "bg-white/60 text-muted border-[rgba(42,38,34,0.12)]"
                  }`}
                >
                  {i === 5 ? "🍝" : i}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
