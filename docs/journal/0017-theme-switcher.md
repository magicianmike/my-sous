# 0017 · Theme switcher

Milestone: #42 (part of #2). MySous has always followed the device's light or dark setting. Now a sun and a moon in the header's top right let the Cook choose, and the choice is remembered.

## Before and after

| | Before | After |
| --- | --- | --- |
| Header, desktop | ![](0017-theme-switcher/before-header-desktop-light.png) | ![](0017-theme-switcher/after-header-desktop-light.png) |
| Header, phone | ![](0017-theme-switcher/before-header-phone-light.png) | ![](0017-theme-switcher/after-header-phone-light.png) |
| Dark chosen on a light device, desktop | | ![](0017-theme-switcher/after-dark-chosen-desktop-light.png) |
| Dark chosen on a light device, phone | | ![](0017-theme-switcher/after-dark-chosen-phone-light.png) |

## Decisions

The author chose each of these from options.

**Light and Dark, no System.** Two icons, starting from whatever the device uses, which shows as chosen. Once the Cook picks one, it holds; there's no way back to following the device, short of clearing the site's data. A System choice was offered and declined, to keep the control to two icons.

**Remembered, with ADR 0004 amended.** The choice is stored in `localStorage` as `theme`. It's the one thing MySous keeps in the browser: a display preference, not app state, so the basket still lives only in the URL. ADR 0004 now says so.

**Its own ticket.** It's on its own branch and PR, separate from imagery (#32), so each can be reviewed and reverted alone.

## How it works

- **No flash.** A one-line script in the page's head reads the stored choice and sets `data-theme` on the page before it paints, before the app's scripts load. If storage is unavailable (a private window, say), it does nothing and the device's setting applies.
- **Still one source of tokens.** `themeCss()` writes the dark palette, Ingredient colours included, twice: under the device's dark setting unless Light is chosen, and whenever Dark is chosen. Each sets `color-scheme` to match, so form controls and scrollbars follow.
- **The control.** `SegmentedControl` gains icons and an icons-only mode, with each label still there for screen readers. The theme is a radio group named "Theme" with "Light" and "Dark", so arrow keys move the choice, and screen readers say which is on. Each segment is a full 44 px target. `ThemeSwitch` (in `src/app`) keeps the state: it reads the page's theme once it's live, follows the device while nothing's chosen, and stores a choice.

## Noticed

- **On a phone, the switch wraps to its own row.** The wordmark, the nav and the switch don't fit across 390 pixels. The switch sits at the right of a second header row, which costs about 50 pixels at the top of every page. Add to basket still clears the docked basket on an Ingredient's page (checked by #32's tests, once merged).
- **Imagery (#32) styles one thing for dark directly:** it dims images under the device's dark setting. Whichever merges second makes that follow a chosen theme too.

## Tests

- **Playwright:**
  - with nothing chosen, the page follows the device, light or dark, and the matching radio is on;
  - choosing Dark switches the page and an Ingredient's colours, and holds across a link and a reload;
  - choosing Light wins over a dark device, across a reload;
  - with the app's scripts blocked, a stored choice still applies on load, so there's no flash;
  - arrow keys move the choice.
- **axe** runs on every screen with Dark chosen on a light device and Light chosen on a dark one, as well as in both device themes. The tap-target and focus-ring checks cover the header's new control.
- **Not in Vitest.** The issue planned a Vitest check of `themeCss()`. The Playwright checks test the same rules through what the browser paints, so a test of the CSS text would only restate the code.

## VoiceOver pass (for the author)

In Safari, with VoiceOver on: Tab into the header after the nav. It reads "Light, radio button, 1 of 2, Theme" (or Dark, if that's what's on). Press Right Arrow: the page turns dark, and VoiceOver reads "Dark, selected".
