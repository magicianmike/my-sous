/**
 * MySous's design tokens: the one source of every colour, type, spacing, radius, elevation,
 * motion and focus value. `themeCss()` turns them into CSS custom properties; dark is a swap of
 * the colour tokens, chosen by the device's setting unless the Cook picks a theme (see ./theme).
 */

export type Palette = {
  /** Page background. */
  bg: string;
  /** Cards and panels on the page. */
  surface: string;
  /** What floats above the page, such as the docked tray bar; lighter than `surface` in dark. */
  floating: string;
  /** Recessed areas, such as a segmented control's track. */
  sunk: string;
  /** Hairlines and dividers (decorative, not needed to see a control). */
  line: string;
  /** Body text, headings and links. */
  ink: string;
  /** Secondary text; also the border of controls, which must stand out from the page. */
  inkMuted: string;
  /** A link under the pointer; an Ingredient's link takes the Ingredient's own colour instead. */
  linkHover: string;
  /** Something that removes or undoes, under the pointer, such as the tray's bin. */
  danger: string;
  /** Behind guidance the Cook mustn't miss, such as food safety in a recipe's method. */
  caution: string;
  /** The rule beside `caution` guidance, and its label's ground. */
  cautionLine: string;
  /** Text on `cautionLine`, such as the "Food safety" label. */
  cautionInk: string;
  /** Primary actions. */
  accent: string;
  /** Text on `accent`. */
  accentInk: string;
  /** The focus ring. */
  focus: string;
  /** Where the reader is: the Case Study chapter being read, its text and the bar beside it. The bar's shape says so; this echoes it. */
  current: string;
};

export const palettes: Record<"light" | "dark", Palette> = {
  light: {
    bg: "#f8f7f2",
    surface: "#ffffff",
    floating: "#ffffff",
    sunk: "#efeee6",
    line: "#d6d8cd",
    ink: "#1f2620",
    inkMuted: "#4d574f",
    linkHover: "#2f6a3a",
    danger: "#b3261e",
    caution: "#fbefd3",
    cautionLine: "#c98a1b",
    cautionInk: "#1f2620",
    accent: "#1f2620",
    accentInk: "#ffffff",
    focus: "#1f2620",
    current: "#2f6a3a",
  },
  dark: {
    bg: "#121412",
    surface: "#1b1e1b",
    floating: "#2b302b",
    sunk: "#252925",
    line: "#343a35",
    ink: "#ebefe9",
    inkMuted: "#aab3ab",
    linkHover: "#9dd4a6",
    danger: "#ff8f85",
    caution: "#33291a",
    cautionLine: "#d9a03a",
    cautionInk: "#121412",
    accent: "#ebefe9",
    accentInk: "#121412",
    focus: "#ebefe9",
    current: "#9dd4a6",
  },
};

/** Every foreground/background pairing used for text; each must meet WCAG 2.2 AA (4.5:1). */
export const textPairings: [keyof Palette, keyof Palette][] = [
  ["ink", "bg"],
  ["ink", "surface"],
  ["ink", "floating"],
  ["ink", "sunk"],
  ["inkMuted", "bg"],
  ["inkMuted", "surface"],
  ["inkMuted", "floating"],
  ["inkMuted", "sunk"],
  ["linkHover", "bg"],
  ["linkHover", "surface"],
  ["linkHover", "floating"],
  ["linkHover", "sunk"],
  ["danger", "bg"],
  ["danger", "surface"],
  ["danger", "floating"],
  ["danger", "sunk"],
  ["ink", "caution"],
  ["inkMuted", "caution"],
  ["linkHover", "caution"],
  ["cautionInk", "cautionLine"],
  ["accentInk", "accent"],
  ["current", "bg"],
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
  ["accent", "floating"],
  ["focus", "floating"],
  ["current", "bg"],
  ["focus", "caution"],
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
  // The Case Study's sticky title: smaller than a display heading, since it stays on screen.
  "text-title": "clamp(1.875rem, 1.5rem + 1.25vw, 2.5rem)",
  "leading-tight": "1.1",
  "leading-body": "1.55",
  "weight-regular": "400",
  "weight-display": "600",
  "weight-bold": "700",
  "weight-heavy": "800",
  "tracking-tight": "-0.01em",
  "tracking-caps": "0.08em",
  "underline-offset": "3px",
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
  // The Ingredient page's two columns: the Ingredient and its Pairings.
  "page-width-wide": "78rem",
  "ingredient-column": "24rem",
  "tray-width": "20rem",
  // The Case Study's chapter list, beside its text on wide screens.
  "chapter-nav-width": "14rem",
  // The bar beside the Case Study chapter being read.
  "chapter-marker-width": "0.3125rem",
  // The Case Study's top row, where Back to MySous and the theme switch sit in the window's corners.
  "case-study-top-row": "3.5rem",
  // The Case Study's sticky title, so a chapter scrolled to lands below it. The title measures
  // itself once the page is live; this is its height on a wide screen until then.
  "case-study-title-height": "6rem",
  // Case Study screenshots sit side by side only when each is this wide.
  "shot-min-width": "18rem",
  "tile-min": "11rem",
  // Home's two browse cards sit side by side only when each has this much room.
  "door-min": "16rem",
  // The open tray sheet's Close and See what to make share a row only when each is this wide.
  "sheet-action-min": "12rem",
  // Borders: hairlines for decoration, a heavier line for controls.
  "border-hairline": "1px",
  "border-control": "2px",
  // Radius.
  // A checkbox's corner: any rounder and it reads as a radio.
  "radius-xs": "0.25rem",
  "radius-sm": "0.625rem",
  "radius-md": "0.875rem",
  "radius-lg": "1.25rem",
  "radius-pill": "999px",
  // Elevation.
  "shadow-raised": "0 1px 3px rgb(0 0 0 / 0.12)",
  "shadow-floating": "0 10px 40px -8px rgb(0 0 0 / 0.35)",
  // Cast upward, by what's docked to the foot of the screen.
  "shadow-docked": "0 -8px 28px -4px rgb(0 0 0 / 0.4), 0 -1px 2px rgb(0 0 0 / 0.16)",
  // A sheet leaves some of the page in view above it, so it reads as on top of the page.
  "sheet-max-height": "85dvh",
  // The docked tray bar's height; the tray measures and sets it while the bar shows.
  "tray-dock-height": "0px",
  // The open tray sheet's height, measured the same way, so its toast sits just above it.
  "tray-sheet-height": "0px",
  // How long a toast stays before it fades; not motion, so reduced motion keeps it.
  "toast-hold": "5s",
  // Dims and blurs the page behind a modal sheet.
  "scrim": "rgb(0 0 0 / 0.45)",
  "scrim-blur": "6px",
  // Touch targets: the smallest a tappable control may be.
  "target": "2.75rem",
  "chip-height": "2rem",
  // The box a checkbox draws; the whole row around it is the target.
  "check-size": "1.25rem",
  // Ingredient marks: the drawing's plate, and the drawing on it.
  "mark-sm": "2.25rem",
  "mark-sm-drawing": "1.75rem",
  "mark-md": "4.25rem",
  "mark-md-drawing": "2.875rem",
  "mark-lg": "11rem",
  "mark-lg-drawing": "8rem",
  // Content images: the most a banner (an Ingredient's, a dish's header) stands.
  "hero-image-height": "24rem",
  // Focus.
  "focus-width": "3px",
  "focus-offset": "2px",
  // Motion: calm, and only on first paint or for the thing that changed.
  "ease-out": "cubic-bezier(0.2, 0.7, 0.2, 1)",
  // A slight overshoot, for an Ingredient arriving in the tray.
  "ease-overshoot": "cubic-bezier(0.34, 1.4, 0.64, 1)",
  // How small an arriving Ingredient starts before it grows in.
  "scale-arrive": "0.6",
};

/** Motion durations; all become 0ms when the Cook asks for reduced motion. */
export const motion = {
  "motion-fast": "150ms",
  "motion-base": "200ms",
  "motion-slow": "400ms",
  "motion-draw": "1400ms",
  // The gap between one Pairing row settling in and the next.
  "motion-stagger": "45ms",
};

const kebab = (key: string) => key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
const declarations = (tokens: Record<string, string>) =>
  Object.entries(tokens)
    .map(([key, value]) => `--${kebab(key)}: ${value};`)
    .join(" ");

/**
 * The tokens as CSS custom properties, for the document head. The dark palette applies under the
 * device's dark setting unless the Cook chose Light, and whenever they chose Dark (`data-theme`).
 */
export function themeCss(): string {
  // The dark theme for whatever `root` selects, its Ingredient colours included. Content images are
  // a little less bright in it, so a light one doesn't glare from a dark page.
  const dark = (root: string) =>
    `${root} { color-scheme: dark; ${declarations(palettes.dark)} --image-filter: brightness(0.85); } ${root} .hue { --wash: var(--wash-dark); --stroke: var(--stroke-dark); }`;
  return [
    `:root { color-scheme: light; ${declarations(palettes.light)} ${declarations(scales)} ${declarations(motion)} --image-filter: none; }`,
    // An Ingredient's colours arrive as --wash-light, --wash-dark and so on (see hueStyle);
    // .hue picks the pair for the theme, so dark stays a token swap.
    `.hue { --wash: var(--wash-light); --stroke: var(--stroke-light); }`,
    // Dark when the device is, unless the Cook chose Light; and whenever they chose Dark.
    `@media (prefers-color-scheme: dark) { ${dark(':root:not([data-theme="light"])')} }`,
    dark(':root[data-theme="dark"]'),
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
