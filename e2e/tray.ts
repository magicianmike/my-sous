import type { Page } from "@playwright/test";

/** The tray, once it has rendered in the browser: its heading on desktop, its bar on a phone. */
export function trayShown(page: Page) {
  const heading = page.getByRole("heading", { name: /Your basket/ });
  return heading.or(page.getByRole("button", { name: /^Your basket/ })).first();
}
