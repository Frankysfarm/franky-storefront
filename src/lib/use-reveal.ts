"use client";

import { useEffect, useRef } from "react";

export function useRevealStagger() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Always show after a short delay (smooth fade-in)
    const showTimer = setTimeout(() => el.classList.add("in"), 100);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      clearTimeout(showTimer);
      el.classList.add("in");
      return;
    }

    // Also trigger on scroll into view (for off-screen sections)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in");
          observer.unobserve(el);
        }
      },
      { threshold: 0.01, rootMargin: "200px 0px 0px 0px" },
    );

    observer.observe(el);
    return () => {
      clearTimeout(showTimer);
      observer.disconnect();
    };
  }, []);

  return ref;
}
