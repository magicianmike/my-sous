"use client";

// PROTOTYPE: throwaway. Four new layouts of the Ingredients page beside the current one (A), switched by
// `?variant=` (see ./page.tsx). Same fonts, colours, search and quick add; only layout and grouping differ.

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FilterField } from "@/components/FilterField";
import { IngredientMark } from "@/components/IngredientMark";
import type { Ingredient, IngredientGroup } from "@/kitchen/kitchen";
import { useCombination, useKitchen } from "../combination";
import { IngredientLink } from "../ingredient-link";
import { FIND_AN_INGREDIENT, notInMySous } from "../ingredient-search";
import { QuickAdd } from "./quick-add";
import styles from "./ingredients-prototype.module.css";

export const VARIANTS = [
  { key: "A", name: "Current: pills by kind" },
  { key: "B", name: "Kind cards" },
  { key: "C", name: "Sidebar + gallery" },
  { key: "D", name: "A–Z directory" },
  { key: "E", name: "Filter by kind" },
];

type Layout = "B" | "C" | "D" | "E";

/** The search, as on the real page: the list below is the result, and Enter opens a lone match. */
function useFinder() {
  const { kitchen } = useKitchen();
  const { href, combination } = useCombination();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const typed = query.trim();
  const matches = typed ? kitchen.search(typed) : undefined;
  const field = (
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
  );
  const groups = kitchen
    .ingredientsByCategory()
    .map((group) => ({ ...group, ingredients: group.ingredients.filter((i) => !matches || matches.includes(i)) }))
    .filter(({ ingredients }) => ingredients.length > 0);
  return { field, groups, inBasket: combination.ingredients, all: kitchen.ingredientsByCategory() };
}

export function PrototypeFinder({ layout }: { layout: Layout }) {
  const finder = useFinder();
  const Layout = { B: KindCards, C: SidebarGallery, D: Directory, E: FilterByKind }[layout];
  return <Layout {...finder} />;
}

type FinderProps = ReturnType<typeof useFinder>;

/** B: each kind a card of its own, packed in columns; inside, a tidy list with Add at each row's end. */
function KindCards({ field, groups, inBasket }: FinderProps) {
  return (
    <div className={styles.wide}>
      <div className={styles.measure}>{field}</div>
      <div className={styles.masonry}>
        {groups.map(({ category, heading, ingredients }) => (
          <section key={category} className={styles.kindCard} aria-labelledby={`b-${category}`}>
            <h2 id={`b-${category}`} className={styles.kindTitle}>
              {heading} <span className={styles.count}>{ingredients.length}</span>
            </h2>
            <ul className={styles.rows}>
              {ingredients.map((ingredient) => (
                <li key={ingredient.id} className={`${styles.row} ${inBasket.includes(ingredient) ? styles.chosen : ""}`}>
                  <IngredientLink ingredient={ingredient} className={styles.rowLink}>
                    <IngredientMark ingredient={ingredient} size="sm" />
                    {ingredient.name}
                  </IngredientLink>
                  <QuickAdd ingredientId={ingredient.id} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

/** C: the kinds as a sticky index down the side; the drawings large, as a gallery, on the right. */
function SidebarGallery({ field, groups, inBasket }: FinderProps) {
  return (
    <div className={`${styles.wide} ${styles.sidebarLayout}`}>
      <aside className={styles.sidebar}>
        {field}
        <nav aria-label="Kinds of ingredient">
          <ul className={styles.index}>
            {groups.map(({ category, heading, ingredients }) => (
              <li key={category}>
                <a href={`#c-${category}`}>
                  {heading} <span className={styles.count}>{ingredients.length}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div>
        {groups.map(({ category, heading, ingredients }) => (
          <section key={category} aria-labelledby={`c-${category}`} className={styles.gallerySection}>
            <h2 id={`c-${category}`} className={styles.galleryHeading}>
              {heading}
            </h2>
            <Tiles ingredients={ingredients} inBasket={inBasket} />
          </section>
        ))}
      </div>
    </div>
  );
}

function Tiles({ ingredients, inBasket, withTip = false }: { ingredients: Ingredient[]; inBasket: Ingredient[]; withTip?: boolean }) {
  return (
    <ul className={withTip ? styles.tipTiles : styles.tiles}>
      {ingredients.map((ingredient) => (
        <li key={ingredient.id} className={`${styles.tile} ${inBasket.includes(ingredient) ? styles.chosen : ""}`}>
          <IngredientLink ingredient={ingredient} className={styles.tileLink}>
            <IngredientMark ingredient={ingredient} size="md" />
            <span className={styles.tileName}>{ingredient.name}</span>
            {withTip && <span className={styles.tip}>{ingredient.tip}</span>}
          </IngredientLink>
          <span className={styles.tileAdd}>
            <QuickAdd ingredientId={ingredient.id} />
          </span>
        </li>
      ))}
    </ul>
  );
}

/** D: no kinds at all; every Ingredient A to Z, in newspaper columns, its kind a quiet note. */
function Directory({ field, groups, inBasket }: FinderProps) {
  const kindOf = new Map(groups.flatMap(({ heading, ingredients }) => ingredients.map((i) => [i.id, heading] as const)));
  const sorted = groups.flatMap(({ ingredients }) => ingredients).toSorted((a, b) => a.name.localeCompare(b.name));
  const letters = Map.groupBy(sorted, (ingredient) => ingredient.name[0].toUpperCase());
  return (
    <div className={styles.wide}>
      <div className={styles.measure}>{field}</div>
      <nav aria-label="Letters" className={styles.letterBar}>
        {[...letters.keys()].map((letter) => (
          <a key={letter} href={`#d-${letter}`}>
            {letter}
          </a>
        ))}
      </nav>
      <div className={styles.directory}>
        {[...letters].map(([letter, ingredients]) => (
          <section key={letter} aria-labelledby={`d-${letter}`} className={styles.letterSection}>
            <h2 id={`d-${letter}`} className={styles.letter}>
              {letter}
            </h2>
            <ul className={styles.dirList}>
              {ingredients.map((ingredient) => (
                <li key={ingredient.id} className={`${styles.dirItem} ${inBasket.includes(ingredient) ? styles.chosenText : ""}`}>
                  <IngredientLink ingredient={ingredient} className={styles.dirLink}>
                    <IngredientMark ingredient={ingredient} size="sm" />
                    <span>
                      {ingredient.name}
                      <span className={styles.kind}>{kindOf.get(ingredient.id)}</span>
                    </span>
                  </IngredientLink>
                  <QuickAdd ingredientId={ingredient.id} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

/** E: one kind at a time, picked from a row of pills; each Ingredient a card with its tip. */
function FilterByKind({ field, groups, inBasket, all }: FinderProps & { all: IngredientGroup[] }) {
  const [kind, setKind] = useState<string>("all");
  const shown = kind === "all" ? groups : groups.filter(({ category }) => category === kind);
  return (
    <div className={styles.wide}>
      <div className={styles.measure}>{field}</div>
      <div className={styles.pills} role="radiogroup" aria-label="Show a kind of ingredient">
        {[{ category: "all", heading: "All" }, ...all].map(({ category, heading }) => (
          <label key={category} className={`${styles.pill} ${kind === category ? styles.pillOn : ""}`}>
            <input type="radio" name="kind" className="visually-hidden" checked={kind === category} onChange={() => setKind(category)} />
            {heading}
          </label>
        ))}
      </div>
      {shown.map(({ category, heading, ingredients }) => (
        <section key={category} aria-labelledby={`e-${category}`}>
          <h2 id={`e-${category}`} className={styles.galleryHeading}>
            {heading}
          </h2>
          <Tiles ingredients={ingredients} inBasket={inBasket} withTip />
        </section>
      ))}
    </div>
  );
}
