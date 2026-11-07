import type { Metadata } from "next";
import { Fraunces, Nunito } from "next/font/google";
import { THEME_SCRIPT } from "@/design/theme";
import { themeCss } from "@/design/tokens";
import { KitchenProvider } from "./combination";
import { CombinationTray } from "./combination-tray";
import "./globals.css";
import { getKitchen } from "./kitchen";
import { CaseStudyLink, SiteNav, SkipLinks, Wordmark } from "./site-chrome";
import { ThemeSwitch } from "./theme-switch";

const display = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  style: ["normal", "italic"],
  variable: "--font-display",
  fallback: ["Georgia", "serif"],
});
const text = Nunito({
  subsets: ["latin"],
  variable: "--font-text",
  fallback: ["ui-rounded", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  // Link previews need absolute URLs; the production site unless the build says otherwise.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://my-sous.vercel.app"),
  title: { default: "MySous", template: "%s · MySous" },
  description: "Find what goes with what, and why.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const kitchen = await getKitchen();
  return (
    // The theme script sets data-theme before React takes over, so the attribute differs by design.
    <html lang="en" className={`${display.variable} ${text.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <style dangerouslySetInnerHTML={{ __html: themeCss() }} />
      </head>
      <body>
        <KitchenProvider content={kitchen.content}>
          <SkipLinks />
          {/* On a phone, the page scrolls above the basket bar, which keeps a row of its own. */}
          <div className="shell">
            <div className="page">
              <header id="top" className="site-header">
                <Wordmark />
                <SiteNav />
                <div className="site-theme">
                  <CaseStudyLink />
                  <ThemeSwitch />
                </div>
              </header>
              <div className="app">
                <main id="main">{children}</main>
              </div>
            </div>
            <CombinationTray />
          </div>
        </KitchenProvider>
      </body>
    </html>
  );
}
