"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FilterField } from "@/components/FilterField";
import { IngredientMark } from "@/components/IngredientMark";
import type { Ingredient } from "@/kitchen/kitchen";
import { AddToCombination, useCombination, useKitchen, withSearchParams } from "../combination";
import { IngredientLink } from "../ingredient-link";
import { FIND_AN_INGREDIENT, notInMySous } from "../ingredient-search";

/**
 * Every Ingredient, by kind, with a search that narrows the list in place: the list is the result, so
 * there's no dropdown. Enter opens the one Ingredient that matches. On a wide screen the search and the
 * kinds stay in a sidebar beside the drawings.
 */
export const IngredientFinder = withSearchParams(
  function IngredientFinder() {
    const { kitchen } = useKitchen();
    const { href, combination } = useCombination();
    const router = useRouter();
    const [query, setQuery] = useState("");
    const typed = query.trim();
    const matches = typed ? kitchen.search(typed) : undefined;
    return (
      <FinderLayout
        field={
          <FilterField
            label={FIND_AN_INGREDIENT}
            value={query}
            onChange={setQuery}
            onEnter={() => matches?.length === 1 && router.push(href(`/ingredients/${matches[0].id}`))}
            status={
              !matches
                ? ""
                : matches.length === 0
                  ? notInMySous(typed)
                  : `${matches.length} ${matches.length === 1 ? "ingredient matches" : "ingredients match"}.`
            }
            hint={matches?.length === 0 && "Try another spelling, or clear the search to see every ingredient."}
          />
        }
        matching={matches}
        inBasket={combination.ingredients}
      />
    );
  },
  // Before the browser takes over, every Ingredient, under the same field, disabled so nothing typed is lost.
  function IngredientFinderLoading() {
    return (
      <FinderLayout
        field={<FilterField label={FIND_AN_INGREDIENT} value="" onChange={() => {}} status="" disabled />}
      />
    );
  },
);

type GroupsProps = { matching?: Ingredient[]; inBasket?: Ingredient[] };

/** The kinds with any Ingredients `matching`, when given, each with only those; or every kind. */
function useGroups(matching?: Ingredient[]) {
  const { kitchen } = useKitchen();
  return kitchen
    .ingredientsByCategory()
    .map((group) => ({
      ...group,
      ingredients: group.ingredients.filter((i) => !matching || matching.includes(i)),
    }))
    .filter(({ ingredients }) => ingredients.length > 0);
}

/** The search and an index of the kinds, in a sidebar that stays in view; the drawings beside it. */
function FinderLayout({ field, ...groups }: GroupsProps & { field: React.ReactNode }) {
  return (
    <div className="ingredient-finder">
      <div className="ingredient-sidebar">
        {field}
        <KindIndex matching={groups.matching} />
      </div>
      <div>
        <IngredientGroups {...groups} />
      </div>
    </div>
  );
}

/**
 * A link to each kind on the page, with how many it holds: a column beside the drawings, or a row above them on a
 * phone. Beside the drawings it marks the kind being read and keeps it in view, scrolling on its own when there are
 * more kinds than the window has room for, faded at the edge where more are hidden.
 */
function KindIndex({ matching }: GroupsProps) {
  const groups = useGroups(matching);
  const categories = groups.map(({ category }) => category);
  const current = useKindInView(categories);
  const list = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const ul = list.current;
    const link = ul?.querySelector<HTMLElement>("[aria-current]");
    // Only when the list scrolls up and down, beside the drawings; never the window.
    if (!ul || !link || ul.scrollHeight <= ul.clientHeight) return;
    if (link.offsetTop < ul.scrollTop) ul.scrollTop = link.offsetTop;
    else if (link.offsetTop + link.offsetHeight > ul.scrollTop + ul.clientHeight)
      ul.scrollTop = link.offsetTop + link.offsetHeight - ul.clientHeight;
  }, [current]);
  useFitToWindow(list, categories.join());
  if (groups.length === 0) return null;
  return (
    <nav aria-label="Kinds of ingredient">
      <ul className="kind-index" ref={list}>
        {groups.map(({ category, heading, ingredients }) => (
          <li key={category}>
            <a href={`#category-${category}`} aria-current={category === current ? "location" : undefined}>
              {heading} <span className="kind-count">{ingredients.length}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** The kind whose section is at the top of the window, or the first: the one being read. */
function useKindInView(categories: string[]): string | undefined {
  const [current, setCurrent] = useState<string>();
  const key = categories.join();
  useEffect(() => {
    const sections = categories.flatMap(
      (category) => document.getElementById(`category-${category}`)?.parentElement ?? [],
    );
    const inBand = new Set<Element>();
    // A kind is being read while its section crosses the window's top third.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting } of entries) isIntersecting ? inBand.add(target) : inBand.delete(target);
        const first = sections.find((section) => inBand.has(section));
        if (first) setCurrent(first.querySelector("h2")!.id.replace("category-", ""));
      },
      { rootMargin: "0px 0px -66% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    // The last kind may be too short to reach the top third, so at the very end of the page it's the one being read.
    const atEnd = ({ target }: Event) => {
      const scroller = target === document ? document.scrollingElement : (target as Element);
      const last = sections.at(-1);
      if (scroller?.contains(last ?? null) && scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1)
        setCurrent(categories.at(-1));
    };
    addEventListener("scroll", atEnd, { capture: true, passive: true });
    return () => {
      observer.disconnect();
      removeEventListener("scroll", atEnd, { capture: true });
    };
    // `key` stands for the categories, so the observer is rebuilt only when they change.
  }, [key]);
  return current && categories.includes(current) ? current : categories[0];
}

/**
 * Fits a list that scrolls up and down to the window: as tall as the room between its top and the basket bar, which
 * grows as the page scrolls and the sidebar rises to its place. And marks where more of it is hidden, above or
 * below, so its edge there can fade.
 */
function useFitToWindow(list: React.RefObject<HTMLElement | null>, contents: string) {
  useEffect(() => {
    const element = list.current;
    if (!element) return;
    const fit = () => {
      // Only beside the drawings; on a phone the list is a row that scrolls sideways.
      if (getComputedStyle(element).overflowY !== "auto") return element.style.removeProperty("max-height");
      const root = getComputedStyle(document.documentElement);
      const below = parseFloat(root.getPropertyValue("--tray-dock-height")) + parseFloat(root.fontSize);
      element.style.maxHeight = `${Math.max(innerHeight - element.getBoundingClientRect().top - below, 0)}px`;
      element.toggleAttribute("data-more-above", element.scrollTop > 0);
      element.toggleAttribute("data-more-below", element.scrollTop + element.clientHeight < element.scrollHeight - 1);
    };
    fit();
    // Heard while capturing, so any scroll counts: the window's, the page column's a little narrower, and the list's.
    addEventListener("scroll", fit, { capture: true, passive: true });
    addEventListener("resize", fit);
    // The basket bar sets its height on the page's root once it has measured itself, and again as it changes.
    const bar = new MutationObserver(fit);
    bar.observe(document.documentElement, { attributes: true, attributeFilter: ["style"] });
    return () => {
      removeEventListener("scroll", fit, { capture: true });
      removeEventListener("resize", fit);
      bar.disconnect();
    };
  }, [list, contents]);
}

/**
 * The Ingredients by kind, or only those `matching` when given, leaving out kinds with none of them. Each is a
 * tile with its drawing large and an outlined Add, quieter than an Ingredient's page's own, since there are dozens;
 * those `inBasket` are marked as chosen.
 */
function IngredientGroups({ matching, inBasket = [] }: GroupsProps) {
  return useGroups(matching).map(({ category, heading, ingredients }) => (
    <section key={category} className="ingredient-group" aria-labelledby={`category-${category}`}>
      <h2 id={`category-${category}`}>{heading}</h2>
      <ul className="ingredient-gallery">
        {ingredients.map((ingredient) => (
          <li key={ingredient.id} className={inBasket.includes(ingredient) ? "in-basket" : undefined}>
            <IngredientLink ingredient={ingredient}>
              <IngredientMark ingredient={ingredient} size="md" />
              {ingredient.name}
            </IngredientLink>
            <span className="tile-add">
              <AddToCombination ingredientId={ingredient.id} emphasis="secondary" />
            </span>
          </li>
        ))}
      </ul>
    </section>
  ));
}
