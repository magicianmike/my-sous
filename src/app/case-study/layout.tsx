import Link from "next/link";
import { BackToTop } from "./back-to-top";
import { CaseStudyTitle } from "./case-study-title";
import { ChapterNav } from "./chapter-nav";

/**
 * The Case Study reads as a document: chapters alongside on wide screens, above on a phone, with a
 * way back to the app above them and back to the top below them.
 */
export default function CaseStudyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="case-study">
      <div className="case-study-aside">
        <Link href="/" className="back-to-app">
          <span aria-hidden="true">←</span> Back to MySous
        </Link>
        <ChapterNav />
        <BackToTop />
      </div>
      <article id="case-study-content" className="case-study-content" tabIndex={-1}>
        <CaseStudyTitle />
        {children}
      </article>
    </div>
  );
}
