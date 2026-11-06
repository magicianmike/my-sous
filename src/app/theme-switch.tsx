"use client";

import { useEffect, useState } from "react";
import { SegmentedControl } from "@/components/SegmentedControl";
import { MoonIcon, SunIcon } from "@/components/ThemeIcons";
import { THEME_KEY } from "@/design/tokens";

type Theme = "light" | "dark";

const DARK_DEVICE = "(prefers-color-scheme: dark)";

/** The theme in force: the Cook's choice, applied to the page, or else the device's setting. */
function currentTheme(): Theme {
  const chosen = document.documentElement.dataset.theme;
  if (chosen === "light" || chosen === "dark") return chosen;
  return matchMedia(DARK_DEVICE).matches ? "dark" : "light";
}

/**
 * Light or Dark, in the header. Until the Cook chooses, the page follows the device and this shows
 * which that is; a choice overrides it, and is kept in the browser for later visits (ADR 0004).
 */
export function ThemeSwitch() {
  // Unknown until the page is live, since the static page can't see the device or the choice.
  const [theme, setTheme] = useState<Theme>();
  useEffect(() => {
    setTheme(currentTheme());
    // While nothing's chosen, follow the device as it changes.
    const device = matchMedia(DARK_DEVICE);
    const follow = () => setTheme(currentTheme());
    device.addEventListener("change", follow);
    return () => device.removeEventListener("change", follow);
  }, []);

  return (
    <SegmentedControl
      label="Theme"
      iconsOnly
      options={[
        { value: "light", label: "Light", icon: <SunIcon /> },
        { value: "dark", label: "Dark", icon: <MoonIcon /> },
      ]}
      value={theme}
      onChange={(chosen) => {
        document.documentElement.dataset.theme = chosen;
        try {
          localStorage.setItem(THEME_KEY, chosen);
        } catch {
          // Storage can be unavailable (a private window, say); the choice still holds for this page.
        }
        setTheme(chosen);
      }}
    />
  );
}
