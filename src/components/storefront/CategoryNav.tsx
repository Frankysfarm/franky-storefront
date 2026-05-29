"use client";

import { useEffect, useRef, useState } from "react";
import type { Category } from "@/lib/types";

interface Props {
  categories: Category[];
}

export function CategoryNav({ categories }: Props) {
  const [active, setActive] = useState(categories[0]?.id ?? "");
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const isManualScroll = useRef(false);

  // Scroll detection for nav background change
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Section intersection observer
  useEffect(() => {
    const sections = categories
      .map((c) => ({
        id: c.id,
        el: document.getElementById(`section-${c.id}`),
      }))
      .filter((s) => s.el);

    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScroll.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace("section-", "");
            setActive(id);
          }
        }
      },
      { rootMargin: "-180px 0px -60% 0px", threshold: 0 },
    );

    for (const s of sections) observer.observe(s.el!);
    return () => observer.disconnect();
  }, [categories]);

  // Auto-center active tab in nav
  useEffect(() => {
    const el = itemRefs.current.get(active);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [active]);

  const handleClick = (id: string) => {
    setActive(id);
    isManualScroll.current = true;

    const el = document.getElementById(`section-${id}`);
    if (el) {
      // Header (60px TopBar) + Sticky Nav (~52px) + padding
      const offset = 140;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });

      // Re-enable intersection after scroll settles
      setTimeout(() => {
        isManualScroll.current = false;
      }, 1000);
    }
  };

  return (
    <nav
      ref={navRef}
      className={`sticky top-[60px] z-40 transition-all duration-300 ${
        scrolled ? "shadow-[0_2px_18px_-6px_rgba(42,58,44,0.18)]" : ""
      }`}
      style={{
        background: "rgba(250,247,237,0.95)",
        backdropFilter: "saturate(180%) blur(14px)",
        WebkitBackdropFilter: "saturate(180%) blur(14px)",
        borderBottom: "1px solid rgba(42,38,34,0.06)",
      }}
    >
      <div className="relative">
        <div
          ref={trackRef}
          className="flex gap-1 py-2.5 px-4 overflow-x-auto no-scrollbar"
          style={{ scrollSnapType: "x proximity" }}
        >
          {categories.map((cat) => {
            const isActive = active === cat.id;
            return (
              <button
                key={cat.id}
                ref={(el) => {
                  if (el) itemRefs.current.set(cat.id, el);
                  else itemRefs.current.delete(cat.id);
                }}
                onClick={() => handleClick(cat.id)}
                style={{ scrollSnapAlign: "center" }}
                className={`relative shrink-0 flex items-center gap-1.5 py-2 px-3.5 rounded-full text-[13px] font-bold whitespace-nowrap transition-all duration-300 active:scale-95 ${
                  isActive
                    ? "bg-sage text-white shadow-[0_4px_14px_-3px_rgba(74,94,74,0.5),0_0_0_1px_rgba(228,192,104,0.25)_inset]"
                    : "bg-mint text-[#2a3a2c] hover:bg-mint-deep"
                }`}
              >
                {cat.icon && (
                  <span
                    className={`text-[16px] leading-none transition-all duration-300 ${
                      isActive ? "scale-110" : ""
                    }`}
                    style={{
                      filter: isActive ? "drop-shadow(0 0 4px rgba(228,192,104,0.5))" : "none",
                    }}
                  >
                    {cat.icon}
                  </span>
                )}
                {cat.name}
              </button>
            );
          })}
          {/* Fade edges */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-6"
            style={{ background: "linear-gradient(to right, rgba(250,247,237,1), transparent)" }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-6"
            style={{ background: "linear-gradient(to left, rgba(250,247,237,1), transparent)" }}
          />
        </div>
      </div>
    </nav>
  );
}
