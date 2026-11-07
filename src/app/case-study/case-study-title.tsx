"use client";

import { useEffect, useRef } from "react";

/**
 * The Case Study's title, which stays at the top while reading. It shares its height, so a chapter
 * scrolled to lands below it.
 */
export function CaseStudyTitle() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement.style;
    const observer = new ResizeObserver(([entry]) =>
      root.setProperty("--case-study-title-height", `${entry.borderBoxSize[0].blockSize}px`),
    );
    observer.observe(bar.current!);
    return () => {
      observer.disconnect();
      root.removeProperty("--case-study-title-height");
    };
  }, []);

  return (
    <div ref={bar} className="case-study-title">
      <h1>How MySous was made: a Case Study</h1>
    </div>
  );
}
