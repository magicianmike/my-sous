import { CHAPTERS } from "./chapters";

/** The Case Study reads as a document: chapters alongside on wide screens, above on a phone. */
export default function CaseStudyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="case-study">
      <nav id="chapters" className="chapter-nav" aria-labelledby="chapters-heading" tabIndex={-1}>
        <h2 id="chapters-heading">Chapters</h2>
        <ol>
          {CHAPTERS.map(({ id, title }) => (
            <li key={id}>
              <a href={`#${id}`}>{title}</a>
            </li>
          ))}
        </ol>
      </nav>
      <article id="case-study-content" className="case-study-content" tabIndex={-1}>
        {children}
      </article>
    </div>
  );
}
