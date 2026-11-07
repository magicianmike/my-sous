"use client";

import { useCallback, useState } from "react";
import { pageScroller, useOnScroll } from "./reading";

/** Back to top, at the foot of the window, offered once the reader has scrolled down. */
export function BackToTop() {
  const [scrolledDown, setScrolledDown] = useState(false);
  useOnScroll(useCallback(() => setScrolledDown((pageScroller()?.scrollTop ?? 0) > innerHeight / 2), []));
  return (
    <a href="#top" className="back-to-top" hidden={!scrolledDown}>
      <span aria-hidden="true">↑</span> Back to top
    </a>
  );
}
