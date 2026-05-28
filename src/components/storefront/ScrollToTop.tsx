"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 right-5 z-50 w-11 h-11 bg-sage text-white rounded-full shadow-lg flex items-center justify-center hover:bg-sage-hover transition-all animate-[reveal-up_0.2s_ease-out]"
      aria-label="Nach oben"
    >
      <ArrowUp size={20} strokeWidth={2.5} />
    </button>
  );
}
