import type { MDXComponents } from "mdx/types";

/**
 * MDX pages use plain elements, except that a link off the site, such as to an ADR on GitHub, opens in a
 * new tab, so the reader keeps their place. It says so to a screen reader. The Case Study's own components
 * are imported where they're used.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href = "", children, ...props }) =>
      /^https?:\/\//.test(href) ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="new-tab-link" {...props}>
          {children}
          <NewTabIcon />
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      ) : (
        <a href={href} {...props}>
          {children}
        </a>
      ),
    ...components,
  };
}

/** A box with an arrow leaving it: the link opens in a new tab. The words beside it say so to a screen reader. */
function NewTabIcon() {
  return (
    <svg
      className="new-tab-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </svg>
  );
}
