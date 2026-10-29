"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Ingredient } from "@/kitchen/kitchen";
import { useCombination, useKitchen, withSearchParams } from "./combination";

const LISTBOX = "ingredient-search-results";
const optionId = (ingredient: Ingredient) => `ingredient-search-${ingredient.id}`;

function SearchField(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      <label htmlFor="ingredient-search">Find an ingredient</label>
      <input id="ingredient-search" type="text" autoComplete="off" {...props} />
    </>
  );
}

/** Type-to-find over the curated Ingredients, following the ARIA combobox pattern. */
export const IngredientSearch = withSearchParams(
  function IngredientSearch() {
    const { kitchen } = useKitchen();
    const { href } = useCombination();
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(-1);
    const results = kitchen.search(query);
    const expanded = open && results.length > 0;
    const typed = query.trim();

    function choose(ingredient: Ingredient) {
      router.push(href(`/ingredients/${ingredient.id}`));
    }

    function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
      if ((event.key === "ArrowDown" || event.key === "ArrowUp") && results.length > 0) {
        event.preventDefault();
        setOpen(true);
        // From no selection, Down goes to the first match and Up to the last; both wrap.
        const n = results.length;
        setActive((current) =>
          event.key === "ArrowDown" ? (current + 1) % n : current <= 0 ? n - 1 : current - 1,
        );
      } else if (event.key === "Enter" && expanded) {
        event.preventDefault();
        choose(results[Math.max(active, 0)]);
      } else if (event.key === "Escape") {
        // First Escape closes the list; a second clears the field.
        if (expanded) setOpen(false);
        else setQuery("");
        setActive(-1);
      }
    }

    return (
      <div className="search">
        <SearchField
          role="combobox"
          aria-expanded={expanded}
          aria-controls={LISTBOX}
          aria-autocomplete="list"
          aria-activedescendant={expanded && active >= 0 ? optionId(results[active]) : undefined}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onKeyDown={onKeyDown}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
        />
        <ul id={LISTBOX} role="listbox" aria-label="Matching ingredients" hidden={!expanded}>
          {results.map((ingredient, i) => (
            <li
              key={ingredient.id}
              id={optionId(ingredient)}
              role="option"
              aria-selected={i === active}
              // Keep focus in the field, so a click doesn't close the list before it lands.
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => choose(ingredient)}
            >
              {ingredient.name}
            </li>
          ))}
        </ul>
        <p role="status" className="notice">
          {!typed
            ? ""
            : results.length === 0
              ? `“${typed}” isn’t in MySous yet.`
              : expanded
                ? `${results.length} ${results.length === 1 ? "ingredient" : "ingredients"} found.`
                : ""}
        </p>
        {typed && results.length === 0 && (
          <p>
            Try another spelling, or <a href="#all-ingredients">browse every ingredient</a>.
          </p>
        )}
      </div>
    );
  },
  () => (
    <div className="search">
      <SearchField disabled />
    </div>
  ),
);
