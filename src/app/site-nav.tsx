"use client";

import { usePathname } from "next/navigation";
import { CombinationLink } from "./combination";
import { usePantry } from "./pantry";

/** The top-level navigation: the Pantry, with how many Ingredients are in it once there are any. */
export function SiteNav() {
  const { ingredients } = usePantry();
  const current = usePathname() === "/pantry";
  return (
    <nav aria-label="Main" className="site-nav">
      <CombinationLink href="/pantry" aria-current={current ? "page" : undefined}>
        Pantry
        {ingredients.length > 0 && (
          <span className="nav-count">
            <span aria-hidden="true">·</span>
            {ingredients.length}
            <span className="visually-hidden"> ingredients</span>
          </span>
        )}
      </CombinationLink>
    </nav>
  );
}
