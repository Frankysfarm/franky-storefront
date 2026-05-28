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
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                active === cat.id
                  ? "bg-sage text-white shadow-sm"
                  : "text-sage-dark hover:bg-mint"
              }`}
            >
              {cat.icon && <span>{cat.icon}</span>}
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
