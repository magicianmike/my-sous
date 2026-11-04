"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Whether this screen is the Case Study, which reads as a document rather than an app screen. */
export function useIsCaseStudy(): boolean {
  return usePathname().startsWith("/case-study");
}

/** Beside the wordmark on the Case Study, so a reader knows where they are. */
export function SiteLabel() {
  return useIsCaseStudy() ? <span className="site-label">Case Study</span> : null;
}

/** The app's one quiet way to the Case Study; it never gets in the way of cooking. */
export function SiteFooter() {
  if (useIsCaseStudy()) return null;
  return (
    <footer className="site-footer">
      <Link href="/case-study">How MySous was made</Link>
    </footer>
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
