"use client";

import { useEffect, useRef } from "react";
import { buttonClass } from "@/components/Button";
import { NewTabIcon } from "@/components/NewTabIcon";

/** The repository, for a reader who wants to check the code. */
const REPOSITORY = "https://github.com/magicianmike/my-sous";

/**
 * The Case Study's title, which stays at the top while reading, with the way to the code beside it, so a
 * reader scanning for it finds it at once. It shares its height, so a chapter scrolled to lands below it.
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
      <a href={REPOSITORY} target="_blank" rel="noopener noreferrer" className={buttonClass()}>
        <CodeIcon />
        View the code on GitHub
        <NewTabIcon />
        <span className="visually-hidden"> (opens in a new tab)</span>
      </a>
    </div>
  );
}

/** Angle brackets around a slash: code. The words beside it carry the meaning. */
function CodeIcon() {
  return (
    <svg
      className="button-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
    </svg>
  );
}
