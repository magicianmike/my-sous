/**
 * MySous's design tokens: the one source of every colour, type, spacing, radius, elevation,
 * motion and focus value. `themeCss()` turns them into CSS custom properties; dark is a swap of
 * the colour tokens, chosen by the system setting.
 */

export type Palette = {
  /** Page background. */
  bg: string;
  /** Cards and panels on the page. */
  surface: string;
  /** Recessed areas, such as a segmented control's track. */
  sunk: string;
  /** Hairlines and dividers (decorative, not needed to see a control). */
  line: string;
  /** Body text, headings and links. */
  ink: string;
  /** Secondary text; also the border of controls, which must stand out from the page. */
  inkMuted: string;
  /** Primary actions. */
  accent: string;
  /** Text on `accent`. */
  accentInk: string;
  /** The focus ring. */
  focus: string;
};

export const palettes: Record<"light" | "dark", Palette> = {
  light: {
    bg: "#f8f7f2",
    surface: "#ffffff",
    sunk: "#efeee6",
    line: "#d6d8cd",
    ink: "#1f2620",
    inkMuted: "#4d574f",
    accent: "#1f2620",
    accentInk: "#ffffff",
    focus: "#1f2620",
  },
  dark: {
    bg: "#121412",
    surface: "#1b1e1b",
    sunk: "#252925",
    line: "#343a35",
    ink: "#ebefe9",
    inkMuted: "#aab3ab",
    accent: "#ebefe9",
    accentInk: "#121412",
    focus: "#ebefe9",
  },
};

/** Every foreground/background pairing used for text; each must meet WCAG 2.2 AA (4.5:1). */
export const textPairings: [keyof Palette, keyof Palette][] = [
  ["ink", "bg"],
  ["ink", "surface"],
  ["ink", "sunk"],
  ["inkMuted", "bg"],
  ["inkMuted", "surface"],
  ["inkMuted", "sunk"],
  ["accentInk", "accent"],
];

/** Pairings that make a control or its state visible; each must meet 3:1 (SC 1.4.11). */
export const nonTextPairings: [keyof Palette, keyof Palette][] = [
  ["inkMuted", "bg"],
  ["inkMuted", "surface"],
  ["focus", "bg"],
  ["focus", "surface"],
  ["focus", "sunk"],
  ["accent", "bg"],
  ["accent", "surface"],
];

const scales = {
  // Type: Fraunces (display) for headings, Nunito (text) for everything else.
  "text-xs": "0.8125rem",
  "text-sm": "0.875rem",
  "text-base": "1.0625rem",
  "text-lg": "1.1875rem",
  "text-xl": "1.5rem",
  "text-2xl": "1.75rem",
  "text-display": "clamp(2.875rem, 2rem + 3vw, 4rem)",
  "leading-tight": "1.1",
  "leading-body": "1.55",
  // Spacing, on a 4px rhythm.
  "space-1": "0.25rem",
  "space-2": "0.5rem",
  "space-3": "0.75rem",
  "space-4": "1rem",
  "space-5": "1.5rem",
  "space-6": "2rem",
  "space-7": "3rem",
  "space-8": "4rem",
  "measure": "40rem",
  "page-width": "66rem",
  // Radius.
  "radius-sm": "0.625rem",
  "radius-md": "0.875rem",
  "radius-lg": "1.25rem",
  "radius-pill": "999px",
  // Elevation.
  "shadow-raised": "0 1px 3px rgb(0 0 0 / 0.12)",
  "shadow-floating": "0 10px 40px -8px rgb(0 0 0 / 0.35)",
  // Touch targets: the smallest a tappable control may be.
  "target": "2.75rem",
  // Focus.
  "focus-width": "3px",
  "focus-offset": "2px",
  // Motion: calm, and only on first paint or for the thing that changed.
  "ease-out": "cubic-bezier(0.2, 0.7, 0.2, 1)",
};

/** Motion durations; all become 0ms when the Cook asks for reduced motion. */
export const motion = {
  "motion-fast": "150ms",
  "motion-base": "200ms",
  "motion-slow": "400ms",
  "motion-draw": "1400ms",
};

const kebab = (key: string) => key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
const declarations = (tokens: Record<string, string>) =>
  Object.entries(tokens)
    .map(([key, value]) => `--${kebab(key)}: ${value};`)
    .join(" ");

/** The tokens as CSS custom properties, for the document head. */
export function themeCss(): string {
  return [
    `:root { color-scheme: light dark; ${declarations(palettes.light)} ${declarations(scales)} ${declarations(motion)} }`,
    `@media (prefers-color-scheme: dark) { :root { ${declarations(palettes.dark)} } }`,
    `@media (prefers-reduced-motion: reduce) { :root { ${declarations(
      Object.fromEntries(Object.keys(motion).map((key) => [key, "0ms"])),
    )} } }`,
  ].join("\n");
}

/** WCAG 2.2 contrast ratio between two six-digit hex colours. */
export function contrastRatio(a: string, b: string): number {
  const luminance = (hex: string) => {
    const [r, g, b] = [1, 3, 5].map((i) => {
      const c = parseInt(hex.slice(i, i + 2), 16) / 255;
      return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
