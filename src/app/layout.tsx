import type { Metadata } from "next";
import { Fraunces, Nunito } from "next/font/google";
import { themeCss } from "@/design/tokens";
import { CombinationLink, KitchenProvider } from "./combination";
import { CombinationTray } from "./combination-tray";
import "./globals.css";
import { getKitchen } from "./kitchen";
import { SiteFooter, SiteLabel, SkipLinks } from "./site-chrome";

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
    <html lang="en" className={`${display.variable} ${text.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeCss() }} />
      </head>
      <body>
        <KitchenProvider content={kitchen.content}>
          <SkipLinks />
          <header className="site-header">
            <CombinationLink href="/" className="wordmark">
              MySous
            </CombinationLink>
            <SiteLabel />
          </header>
          <div className="app">
            <main id="main">{children}</main>
            {/* Before the tray, so on a phone the docked bar still meets the foot of the screen. */}
            <SiteFooter />
            <CombinationTray />
          </div>
        </KitchenProvider>
      </body>
    </html>
  );
}
