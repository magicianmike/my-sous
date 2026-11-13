import type { MDXComponents } from "mdx/types";
import { NewTabIcon } from "@/components/NewTabIcon";

/** Links that leave the app: off the site, such as to an ADR on GitHub, or to Storybook, which has no way back. */
const LEAVES_THE_APP = /^(https?:\/\/|\/storybook(\/|$))/;

/**
 * MDX pages use plain elements, except that a link that leaves the app opens in a new tab, so the reader
 * keeps their place. It says so to a screen reader. The Case Study's own components are imported where
 * they're used.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href = "", children, ...props }) =>
      LEAVES_THE_APP.test(href) ? (
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

