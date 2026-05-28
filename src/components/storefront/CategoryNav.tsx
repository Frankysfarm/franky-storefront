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
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  // Scroll detection for sticky nav background change
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

  // Animated indicator that follows active tab
  useEffect(() => {
    const el = itemRefs.current.get(active);
    const track = trackRef.current;
    if (el && track) {
      const trackRect = track.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setIndicator({
        left: elRect.left - trackRect.left + track.scrollLeft,
        width: elRect.width,
        opacity: 1,
      });
      // Auto-scroll active tab into view
      el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [active]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(`section-${id}`);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 150;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`sticky top-[60px] z-40 transition-all duration-300 ${
        scrolled
          ? "shadow-[0_2px_18px_-6px_rgba(42,58,44,0.18)]"
          : ""
      }`}
      style={{
        background: scrolled
          ? "rgba(250,247,237,0.92)"
          : "rgba(250,247,237,0.55)",
        backdropFilter: "saturate(180%) blur(14px)",
        WebkitBackdropFilter: "saturate(180%) blur(14px)",
        borderBottom: scrolled ? "1px solid var(--color-line)" : "1px solid rgba(0,0,0,0.03)",
      }}
    >
      <div className="max-w-[1240px] mx-auto px-6">
        <div
          ref={trackRef}
          className="relative flex gap-1 py-2.5 overflow-x-auto no-scrollbar"
        >
          {/* Animated indicator background */}
          <div
            className="absolute top-2.5 bottom-2.5 rounded-full transition-all duration-[400ms] pointer-events-none"
            style={{
              left: indicator.left,
              width: indicator.width,
              opacity: indicator.opacity,
              background:
                "linear-gradient(135deg, var(--color-sage) 0%, var(--color-sage-hover) 100%)",
              boxShadow:
                "0 4px 14px -3px rgba(74,94,74,0.45), 0 0 0 1px rgba(228,192,104,0.18) inset",
              transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          />

          {categories.map((cat) => {
            const isActive = active === cat.id;
            return (
              <button
                key={cat.id}
                ref={(el) => {
                  if (el) itemRefs.current.set(cat.id, el);
                  else itemRefs.current.delete(cat.id);
                }}
                onClick={() => {
                  setActive(cat.id);
                  scrollTo(cat.id);
                }}
                className={`relative z-[1] flex items-center gap-2 py-2 px-4 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "text-white scale-100"
                    : "text-[#2a3a2c] hover:text-sage hover:scale-[1.04] active:scale-95"
                }`}
                style={{
                  letterSpacing: isActive ? "0" : "-0.005em",
                }}
              >
                {cat.icon && (
                  <span
                    className={`text-[18px] leading-none transition-all duration-300 ${
                      isActive ? "text-gold scale-110" : ""
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
        </div>
      </div>
    </nav>
  );
}
