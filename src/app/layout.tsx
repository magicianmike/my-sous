import type { Metadata } from "next";
import { CombinationLink, KitchenProvider } from "./combination";
import { CombinationTray } from "./combination-tray";
import "./globals.css";
import { getKitchen } from "./kitchen";

export const metadata: Metadata = {
  title: { default: "MySous", template: "%s · MySous" },
  description: "Find what goes with what, and why.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const kitchen = await getKitchen();
  return (
    <html lang="en">
      <body>
        <KitchenProvider content={kitchen.content}>
          <header>
            <CombinationLink href="/">MySous</CombinationLink>
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
