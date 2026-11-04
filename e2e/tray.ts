import type { Page } from "@playwright/test";

/**
 * Something that shows once a screen has rendered in the browser: the tray (its heading on desktop,
 * its bar on a phone), or, on the Case Study, which has no tray, its first live component.
 */
export function screenShown(page: Page, path: string) {
  return path.startsWith("/case-study") ? page.getByRole("figure").first() : trayShown(page);
}

/** The tray, once it has rendered in the browser: its heading on desktop, its bar on a phone. */
export function trayShown(page: Page) {
  const heading = page.getByRole("heading", { name: /Your basket/ });
  return heading.or(page.getByRole("button", { name: /^Your basket/ })).first();
}
