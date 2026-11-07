"use client";

import { useEffect } from "react";

/** What scrolls the Case Study: the document on wide screens, .page on a phone. */
export function pageScroller(): Element | null {
  return (
    [document.querySelector(".page"), document.scrollingElement].find(
      (el): el is Element => !!el && el.scrollHeight > el.clientHeight,
    ) ?? null
  );
}

/** Calls `update` now, then once a frame while the page scrolls or resizes. */
export function useOnScroll(update: () => void) {
  useEffect(() => {
    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    schedule();
    // Capture, so a scroll inside .page is heard as well as the document's.
    document.addEventListener("scroll", schedule, { capture: true, passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("scroll", schedule, { capture: true });
      window.removeEventListener("resize", schedule);
    };
  }, [update]);
}
