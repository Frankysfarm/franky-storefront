"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { Category } from "@/lib/types";

interface Props {
  categories: Category[];
}

export function CategoryNav({ categories }: Props) {
  const [active, setActive] = useState(categories[0]?.id ?? "");
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const isManualScroll = useRef(false);
  const manualScrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Center active tab horizontally in the nav (without affecting page scroll)
  const centerActiveTabInNav = useCallback((id: string) => {
    const track = trackRef.current;
    const btn = itemRefs.current.get(id);
    if (!track || !btn) return;
    const trackRect = track.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const target = btn.offsetLeft - track.clientWidth / 2 + btn.clientWidth / 2;
    track.scrollTo({ left: target, behavior: "smooth" });
  }, []);

  // Scroll page to section
  const scrollPageToSection = useCallback((id: string) => {
    const el = document.getElementById(`section-${id}`);
    if (!el) return;
    // TopBar (~60px) + Sticky Nav (~52px) + small gap
    const offset = 130;
    const target = window.scrollY + el.getBoundingClientRect().top - offset;
    window.scrollTo({ top: target, behavior: "smooth" });
  }, []);

  const handleClick = useCallback(
    (id: string) => {
      // Lock observer during programmatic scroll
      if (manualScrollTimer.current) clearTimeout(manualScrollTimer.current);
      isManualScroll.current = true;

      setActive(id);
      scrollPageToSection(id);
      centerActiveTabInNav(id);

      manualScrollTimer.current = setTimeout(() => {
        isManualScroll.current = false;
      }, 1200);
    },
    [scrollPageToSection, centerActiveTabInNav],
  );

  // Observe sections to update active during natural scroll
  useEffect(() => {
    const sections = categories
      .map((c) => ({ id: c.id, el: document.getElementById(`section-${c.id}`) }))
      .filter((s) => s.el);

    let latestActive = active;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScroll.current) return;
        // Find the entry closest to the top of the viewport (after sticky offset)
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          const id = (visible[0].target as HTMLElement).id.replace("section-", "");
          if (id !== latestActive) {
            latestActive = id;
            setActive(id);
            centerActiveTabInNav(id);
          }
        }
      },
      { rootMargin: "-140px 0px -55% 0px", threshold: [0, 0.2, 0.5] },
    );

    for (const s of sections) observer.observe(s.el!);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  return (
    <nav
      className="sticky top-[60px] z-40"
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
                className={`relative shrink-0 flex items-center gap-1.5 py-2.5 px-4 rounded-full text-[13px] min-h-[44px] font-bold whitespace-nowrap transition-all duration-300 active:scale-95 ${
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
        </div>

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
    </nav>
  );
}
