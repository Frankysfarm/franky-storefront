"use client";

import { useState } from "react";
import type { DietTag } from "@/lib/types";

const FILTERS: { id: DietTag | "all"; label: string; emoji?: string }[] = [
  { id: "all", label: "Alle" },
  { id: "v", label: "Vegetarisch", emoji: "🌿" },
  { id: "vg", label: "Vegan", emoji: "🌱" },
  { id: "halal", label: "Halal", emoji: "☪️" },
  { id: "lf", label: "Laktosefrei", emoji: "🥛" },
  { id: "sp", label: "Scharf", emoji: "🌶️" },
];

interface Props {
  active: DietTag | "all";
  onChange: (filter: DietTag | "all") => void;
}

export function DietFilter({ active, onChange }: Props) {
  return (
    <div className="max-w-[1240px] mx-auto px-6 mt-4">
      <div className="overflow-x-auto no-scrollbar -mx-6 px-6">
        <div className="flex gap-2 pb-1">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => onChange(f.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                active === f.id
                  ? "bg-sage text-white border-sage"
                  : "bg-white text-sage-dark border-line hover:border-sage/40"
              }`}
            >
              {f.emoji && <span>{f.emoji}</span>}
              {f.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
