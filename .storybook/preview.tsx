import type { Preview } from "@storybook/nextjs-vite";
import { Fraunces, Nunito } from "next/font/google";
import { useEffect } from "react";
import { themeCss } from "@/design/tokens";
import "../src/app/globals.css";

// The app's fonts, as the root layout loads them.
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

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Light or dark, as the Cook's theme switch sets it",
      toolbar: { title: "Theme", icon: "contrast", items: ["light", "dark"], dynamicTitle: true },
    },
  },
  initialGlobals: { theme: "light" },
  decorators: [
    (Story, { globals }) => {
      // The theme sits on <html>, where the app's theme script puts it.
      useEffect(() => {
        document.documentElement.dataset.theme = globals.theme;
        document.documentElement.classList.add(display.variable, text.variable);
      }, [globals.theme]);
      return (
        <>
          <style>{themeCss()}</style>
          <Story />
        </>
      );
    },
  ],
  parameters: {
    // Any axe violation fails the story's test.
    a11y: { test: "error" },
  },
};

export default preview;
