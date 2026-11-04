import type { MDXComponents } from "mdx/types";

/** MDX pages use plain elements; the Case Study's own components are imported where they're used. */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return components;
}
