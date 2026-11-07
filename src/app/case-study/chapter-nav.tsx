"use client";

import { useCallback, useState } from "react";
import { CHAPTERS, type ChapterId } from "./chapters";
import { pageScroller, useOnScroll } from "./reading";

/**
 * The chapter being read: the last whose top has reached the sticky title, give or take a tenth of
 * the screen, or the last chapter once the page can scroll no further, since a short final chapter
 * may never reach the title.
 */
function chapterInView(): ChapterId {
  const scroller = pageScroller();
  if (scroller && scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2) return CHAPTERS.at(-1)!.id;
  const title = document.querySelector(".case-study-title")?.getBoundingClientRect().bottom ?? 0;
  const line = title + innerHeight * 0.1;
  let current: ChapterId = CHAPTERS[0].id;
  for (const { id } of CHAPTERS) {
    const top = document.getElementById(id)?.getBoundingClientRect().top;
    if (top !== undefined && top <= line) current = id;
  }
  return current;
}

/** The Case Study's chapters, with the one being read marked as the current location. */
export function ChapterNav() {
  const [current, setCurrent] = useState<ChapterId | null>(null);
  useOnScroll(useCallback(() => setCurrent(chapterInView()), []));

  return (
    <nav id="chapters" className="chapter-nav" aria-label="Chapters" tabIndex={-1}>
      <ol>
        {CHAPTERS.map(({ id, title }) => (
          <li key={id}>
            <a href={`#${id}`} aria-current={id === current ? "location" : undefined}>
              {title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
