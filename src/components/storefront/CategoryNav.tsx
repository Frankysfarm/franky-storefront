"use client";

import { useEffect, useRef, useState } from "react";
import type { Category } from "@/lib/types";

interface Props {
  categories: Category[];
}

export function CategoryNav({ categories }: Props) {
  const [active, setActive] = useState(categories[0]?.id ?? "");
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = categories
      .map((c) => ({
        id: c.id,
        el: document.getElementById(`section-${c.id}`),
      }))
      .filter((s) => s.el);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace("section-", "");
            setActive(id);
          }
        }
      },
      { rootMargin: "-160px 0px -60% 0px", threshold: 0 },
    );

    for (const s of sections) observer.observe(s.el!);
    return () => observer.disconnect();
  }, [categories]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(`section-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className="sticky top-[60px] z-40 bg-[rgba(250,247,237,0.95)] border-b border-line"
      style={{
        backdropFilter: "saturate(180%) blur(8px)",
        WebkitBackdropFilter: "saturate(180%) blur(8px)",
      }}
    >
      <div className="max-w-[1240px] mx-auto px-6 overflow-x-auto no-scrollbar">
        <div className="flex gap-1 py-2.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollTo(cat.id)}
              className={`flex items-center gap-2 py-2 px-3.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all border ${
                active === cat.id
                  ? "bg-sage text-white border-sage shadow-[0_4px_12px_-2px_rgba(74,94,74,0.4),0_0_0_1px_rgba(255,255,255,0.18)_inset]"
                  : "bg-mint text-[#2a3a2c] border-transparent hover:bg-mint-deep hover:-translate-y-px"
              }`}
            >
              {cat.icon && (
                <span
                  className={`text-[18px] leading-none ${active === cat.id ? "text-gold" : ""}`}
                >
                  {cat.icon}
                </span>
              )}
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
