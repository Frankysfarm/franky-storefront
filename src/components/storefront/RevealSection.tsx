"use client";

import { useRevealStagger } from "@/lib/use-reveal";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function RevealSection({ children }: Props) {
  const ref = useRevealStagger();

  return (
    <div ref={ref} className="reveal-stagger">
      {children}
    </div>
  );
}
