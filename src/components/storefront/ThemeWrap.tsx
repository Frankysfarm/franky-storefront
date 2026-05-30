import type { CSSProperties } from "react";

interface Props {
  primaryColor?: string | null;
  accentColor?: string | null;
}

/**
 * Wraps children in a div with tenant-specific theme color CSS variables.
 * Override default --color-sage and --color-gold values by setting them inline.
 */
export function ThemeWrap({ primaryColor, accentColor, children }: Props & { children: React.ReactNode }) {
  // Slightly darker shade for hover state (mix with 18% black)
  const darken = (hex: string, amount = 0.18): string => {
    const clean = hex.replace("#", "");
    if (clean.length !== 6) return hex;
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    if ([r, g, b].some((n) => Number.isNaN(n))) return hex;
    const m = (n: number) => Math.max(0, Math.round(n * (1 - amount)));
    return `#${[m(r), m(g), m(b)].map((n) => n.toString(16).padStart(2, "0")).join("")}`;
  };

  const style: CSSProperties & Record<string, string | undefined> = {};

  if (primaryColor) {
    style["--color-sage"] = primaryColor;
    style["--color-sage-hover"] = darken(primaryColor);
  }
  if (accentColor) {
    style["--color-gold"] = accentColor;
    style["--color-gold-deep"] = darken(accentColor, 0.12);
  }

  return <div style={style}>{children}</div>;
}
