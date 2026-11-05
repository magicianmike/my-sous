# 0015 · Pairing rows settle once

A fix, not a milestone. The motion test "Pairing rows settle in one after another, once" failed now and then on CI, desktop only. It first failed on `main` after Cuisines (#38), then again on the Recipes PR (#40). Each time it read empty animation styles from the first row.

## Cause

Since Cuisines, `PairingFilter` reads `?cuisine=` from the URL, through `withSearchParams`. A static page can only read the URL in the browser. So the page as sent holds a fallback list, and about 50 ms after load React replaces it with the live list, as new elements. A test that read a row during that swap read a detached element, which has no computed style.

The swap also broke the promise in the test's name. Measured in Chromium on `/ingredients/chicken-thigh`, the settle animation started 8 times for 7 rows: the first row began on the fallback, then every row began again on the live list. On a fast machine that's barely visible. On a slow phone, where the swap comes later, rows would visibly restart.

## Fix

The list now stays mounted from first paint. Only a small child, `CuisineParam`, sits inside `Suspense`. It reads the Cuisine from the URL and passes it up before paint, so Back and Forward never show a frame of the old filter. Until it has, the requested Cuisine is `undefined`: every Pairing shows, with no Cuisine control, just as the fallback did. After the fix the same measurement shows 7 starts for 7 rows, none replaced.

`withSearchParams` is still right for the other components that use it. Its doc comment now says the swap replaces the elements, so anything the fallback started (an animation, focus) starts again, and it points here for the alternative.

## The test

It now records each element that starts to settle, from before the page is live. It waits for the Cuisine control, which appears only once the page is live, and then requires every row to have settled once with none replaced. So it uses garlic, which has Cuisines; chicken thigh has none. Against the old code it failed 20 times in 20. With the fix it passed 120 times in 120 (30 runs of each of the four motion and device combinations), and the full suite passes.

## Noticed in review, not changed

- Opening a `?cuisine=` link: the filter status ("N Pairings common in X cooking.") now fills in once the page is live, in a region that was already there. So a screen reader probably announces it on load. Before, the region arrived with its text, which usually isn't announced. That seems helpful, but it's for the next VoiceOver pass to confirm.
- Opening a `?cuisine=` link, then pressing Back without touching a filter: rows hidden by the filter come back with the settle animation, though journal 0009 says filtering doesn't replay it. This happened before this change too.
