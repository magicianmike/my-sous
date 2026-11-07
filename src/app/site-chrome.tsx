"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CombinationLink } from "./combination";

/** Whether this screen is the Case Study, which reads as a document rather than an app screen. */
export function useIsCaseStudy(): boolean {
  return usePathname().startsWith("/case-study");
}

/** The wordmark, home to the app. The Case Study's own title is its only header, so it has none. */
export function Wordmark() {
  if (useIsCaseStudy()) return null;
  return (
    <CombinationLink href="/" className="wordmark">
      MySous
    </CombinationLink>
  );
}

/** The app's one quiet way to the Case Study, beside the theme switch; it never gets in the way of cooking. */
export function CaseStudyLink() {
  if (useIsCaseStudy()) return null;
  return (
    <Link href="/case-study" className="case-study-link">
      <span>How MySous</span> <span>was made</span>
    </Link>
  );
}

/** On the Case Study, the first thing Tab reaches: straight to the reading, or to the chapters. */
export function SkipLinks() {
  if (!useIsCaseStudy()) return null;
  return (
    <nav className="skip-links" aria-label="Skip links">
      <a href="#case-study-content">Skip to the Case Study</a>
      <a href="#chapters">Skip to chapters</a>
    </nav>
  );
}

/**
 * The two ways to browse, on every app screen; the current section is marked, in words and with an
 * underline. The Case Study is a document about MySous, so it keeps a quiet header without it.
 */
export function SiteNav() {
  const pathname = usePathname();
  const isCaseStudy = useIsCaseStudy();
  if (isCaseStudy) return null;
  const sections = [
    { href: "/ingredients", label: "Ingredients" },
    { href: "/cuisines", label: "Cuisines" },
  ];
  return (
    <nav aria-label="Main" className="site-nav">
      <ul>
        {sections.map(({ href, label }) => (
          <li key={href}>
            <CombinationLink href={href} aria-current={pathname.startsWith(href) ? "page" : undefined}>
              {label}
            </CombinationLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
