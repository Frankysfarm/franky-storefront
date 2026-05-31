"use client";

import { useEffect, useState } from "react";
import { X, Check } from "lucide-react";
// Check is still used in tracking steps below

interface Props {
  orderId: string;
  customerName: string;
  deliveryTimeMin: number;
  onClose: () => void;
}

const TRACKING_STEPS = [
  { id: 1, title: "Bestellung eingegangen", icon: "📋" },
  { id: 2, title: "Vom Restaurant angenommen", icon: "👨‍🍳" },
  { id: 3, title: "In Zubereitung", icon: "🍝" },
  { id: 4, title: "Fahrer ist unterwegs", icon: "🛵" },
  { id: 5, title: "Geliefert · Buon appetito!", icon: "✅" },
];

function calcEta(deliveryTimeMin: number) {
  const lo = new Date();
  lo.setMinutes(lo.getMinutes() + deliveryTimeMin - 10);
  const hi = new Date();
  hi.setMinutes(hi.getMinutes() + deliveryTimeMin + 10);
  return {
    min: lo.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }),
    max: hi.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }),
  };
}

export function TrackingScreen({ orderId, customerName, deliveryTimeMin, onClose }: Props) {
  const [activeStep, setActiveStep] = useState(1);
  const [eta] = useState(() => calcEta(deliveryTimeMin));

  useEffect(() => {
    const timers = [
      setTimeout(() => setActiveStep(2), 5000),
      setTimeout(() => setActiveStep(3), 12000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 z-[120] bg-bone flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-end px-5 py-4">
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-cream hover:bg-cream-deep transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-8">
        {/* Hero */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto bg-sage rounded-full flex items-center justify-center mb-4 text-4xl animate-[bump_0.5s_ease-out] shadow-[0_0_0_8px_rgba(74,94,74,0.15)]">
            🛵
          </div>
          <h2 className="font-display font-black text-2xl text-sage-dark">
            Bestellung aufgegeben!
          </h2>
          <p className="text-sm text-muted mt-2">
            Vielen Dank, <b>{customerName || "Gast"}</b>. Wir warten auf die Bestätigung vom Restaurant...
          </p>
          <div className="inline-block mt-3 px-4 py-1.5 bg-cream-soft rounded-full text-sm font-bold text-sage-dark">
            Bestellnummer: <span className="font-mono">{orderId}</span>
          </div>
        </div>

        {/* Steps */}
        <div className="max-w-sm mx-auto space-y-0">
          {TRACKING_STEPS.map((step, i) => {
            const isActive = step.id === activeStep;
            const isDone = step.id < activeStep;
            const isPending = step.id > activeStep;

            return (
              <div key={step.id} className="flex gap-4">
                {/* Line + Dot */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${
                      isDone
                        ? "bg-sage text-white"
                        : isActive
                          ? "bg-gold text-sage-dark shadow-[0_0_0_4px_rgba(228,192,104,0.3),0_0_12px_rgba(228,192,104,0.4)] animate-[glow-pulse_2s_ease-in-out_infinite]"
                          : "bg-cream-deep text-muted"
                    }`}
                  >
                    {isDone ? <Check size={14} strokeWidth={3} /> : step.icon}
                  </div>
                  {i < TRACKING_STEPS.length - 1 && (
                    <div
                      className={`w-0.5 h-8 transition-colors ${
                        isDone ? "bg-sage" : "bg-cream-deep"
                      }`}
                    />
                  )}
                </div>

                {/* Text */}
                <div className="pt-1 pb-4">
                  <div
                    className={`text-sm font-semibold ${
                      isPending ? "text-muted" : "text-sage-dark"
                    }`}
                  >
                    {step.title}
                  </div>
                  <div className="text-xs text-muted mt-0.5">
                    {isDone
                      ? "erledigt"
                      : isActive
                        ? "gerade eben"
                        : "in Kürze"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ETA Card */}
        <div className="max-w-sm mx-auto mt-6 p-5 bg-cream-soft rounded-xl text-center">
          <div className="text-[10px] font-extrabold tracking-[2px] text-muted uppercase mb-1">
            VORAUSSICHTLICHE LIEFERUNG
          </div>
          <div className="font-display font-black text-3xl text-sage-dark tabular-nums">
            {eta.min}–{eta.max}
          </div>
          <div className="text-xs text-muted mt-1">
            Wir melden uns sobald das Restaurant bestätigt hat.
          </div>
        </div>
      </div>

      {/* Close Button */}
      <div className="px-6 py-4 border-t border-line">
        <button
          onClick={onClose}
          className="w-full h-12 bg-sage text-white font-bold rounded-xl hover:bg-sage-hover transition-colors"
        >
          Schließen
        </button>
      </div>
    </div>
  );
}
