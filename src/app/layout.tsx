import type { Metadata } from "next";
import { Fraunces, Nunito } from "next/font/google";
import { themeCss } from "@/design/tokens";
import { CombinationLink, KitchenProvider } from "./combination";
import { CombinationTray } from "./combination-tray";
import "./globals.css";
import { getKitchen } from "./kitchen";

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
          <header className="site-header">
            <CombinationLink href="/" className="wordmark">
              MySous
            </CombinationLink>
          </header>
          <div className="app">
            <main>{children}</main>
            <CombinationTray />
          </div>
        </KitchenProvider>
      </body>
    </html>
  );
}
