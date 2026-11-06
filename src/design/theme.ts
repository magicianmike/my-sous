/** The Cook's choice of theme, over the device's setting. */
export const THEMES = ["light", "dark"] as const;

export type Theme = (typeof THEMES)[number];

export function isTheme(value: unknown): value is Theme {
  return THEMES.includes(value as Theme);
}

/** Where the chosen theme is kept: the one thing MySous stores in the browser (ADR 0004). */
export const THEME_KEY = "theme";

/**
 * Applies a chosen theme before the page paints, so it never shows the other first. Inline in the
 * page's head, it runs before the app's scripts load; storage can be unavailable, so it may do nothing.
 */
export const THEME_SCRIPT = `try{var t=localStorage.getItem(${JSON.stringify(THEME_KEY)});if(${JSON.stringify(THEMES)}.indexOf(t)>=0)document.documentElement.dataset.theme=t}catch(e){}`;
