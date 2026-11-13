// PROTOTYPE: throwaway. Five layouts of the Cuisines page, switched by `?variant=` (see ./page.tsx).
// Same fonts, colours and content as the real page; only layout, card shape and emphasis differ.

import { IngredientMark } from "@/components/IngredientMark";
import { joinWithAnd, type CuisineView } from "@/kitchen/kitchen";
import { CombinationLink } from "../combination";
import { IngredientLink } from "../ingredient-link";
import styles from "./cuisines-prototype.module.css";

export const VARIANTS = [
  { key: "A", name: "Current: ruled rows" },
  { key: "B", name: "Card grid" },
  { key: "C", name: "Pantry shelves" },
  { key: "D", name: "Signature pairing" },
  { key: "E", name: "Index table" },
];

const GLIMPSE = 5;

const href = (view: CuisineView) => `/cuisines/${view.cuisine.id}`;
const count = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

/** The cluster of drawings the current page uses, one image named by its Ingredients. */
function Cluster({ view, size = "sm", glimpse = GLIMPSE }: { view: CuisineView; size?: "sm" | "md"; glimpse?: number }) {
  const shown = view.mostPaired.slice(0, glimpse);
  return (
    <span className={`${styles.cluster} ${size === "md" ? styles.clusterMd : ""}`} role="img" aria-label={joinWithAnd(shown.map(({ name }) => name))}>
      {shown.map((ingredient) => (
        <IngredientMark key={ingredient.id} ingredient={ingredient} size={size} />
      ))}
    </span>
  );
}

/** The Pairing whose two Ingredients the Cuisine leans on most: its most telling one. */
function signature({ mostPaired, pairings }: CuisineView) {
  const rank = (id: string) => mostPaired.findIndex((ingredient) => ingredient.id === id);
  return pairings.toSorted(
    (a, b) => rank(a.ingredients[0].id) + rank(a.ingredients[1].id) - (rank(b.ingredients[0].id) + rank(b.ingredients[1].id)),
  )[0];
}

function Intro({ className = "" }: { className?: string }) {
  return (
    <header className={className}>
      <h1>Cuisines</h1>
      <p className="lede">What&rsquo;s common in a cooking tradition, and what pairs in it.</p>
    </header>
  );
}

/** A: the page as it is today. */
export function VariantA({ views }: { views: CuisineView[] }) {
  return (
    <>
      <Intro />
      <ul className="cuisine-list" aria-label="Cuisines" style={{ "--glimpse": GLIMPSE } as React.CSSProperties}>
        {views.map((view) => (
          <li key={view.cuisine.id}>
            <div>
              <h2>
                <CombinationLink href={href(view)}>{view.cuisine.name}</CombinationLink>
              </h2>
              <p className="muted">{view.cuisine.description}</p>
              <p className="cuisine-count">{count(view.ingredients.length, "common ingredient", "common ingredients")}</p>
            </div>
            <span className="cuisine-marks" role="img" aria-label={joinWithAnd(view.mostPaired.slice(0, GLIMPSE).map(({ name }) => name))}>
              {view.mostPaired.slice(0, GLIMPSE).map((ingredient) => (
                <IngredientMark key={ingredient.id} ingredient={ingredient} size="sm" />
              ))}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

/** B: cards like the Dishes page, the drawings large on a sunk band where a dish has its picture. */
export function VariantB({ views }: { views: CuisineView[] }) {
  return (
    <div className={styles.wide}>
      <Intro />
      <ul className={styles.grid} aria-label="Cuisines">
        {views.map((view) => (
          <li key={view.cuisine.id} className={styles.card}>
            <div className={styles.band}>
              <Cluster view={view} size="md" glimpse={4} />
            </div>
            <div className={styles.cardBody}>
              <h2 className={styles.cardTitle}>
                <CombinationLink href={href(view)} className={styles.stretched}>
                  {view.cuisine.name}
                </CombinationLink>
              </h2>
              <p>{view.cuisine.description}</p>
              <p className={`muted ${styles.meta}`}>
                {count(view.ingredients.length, "ingredient", "ingredients")} · {count(view.pairings.length, "pairing", "pairings")}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** C: each Cuisine a shelf of what it leans on, named and one tap from its page; words over pictures. */
export function VariantC({ views }: { views: CuisineView[] }) {
  return (
    <>
      <Intro />
      <ul className={styles.shelves} aria-label="Cuisines">
        {views.map((view) => (
          <li key={view.cuisine.id} className={styles.shelf}>
            <div className={styles.shelfHead}>
              <h2 className={styles.shelfTitle}>
                <CombinationLink href={href(view)}>{view.cuisine.name}</CombinationLink>
              </h2>
              <CombinationLink href={href(view)} className={`muted ${styles.meta} ${styles.seeAll}`}>
                All {view.ingredients.length} →
              </CombinationLink>
            </div>
            <p className="muted">{view.cuisine.description}</p>
            <ul className={styles.chips} aria-label={`Leaned on in ${view.cuisine.name} cooking`}>
              {view.mostPaired.slice(0, 8).map((ingredient) => (
                <li key={ingredient.id}>
                  <IngredientLink ingredient={ingredient} className={styles.chip}>
                    <IngredientMark ingredient={ingredient} size="sm" />
                    {ingredient.name}
                  </IngredientLink>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}

/** D: each Cuisine introduced by the one Pairing that says it best, big, with the reason it works. */
export function VariantD({ views }: { views: CuisineView[] }) {
  return (
    <div className={styles.wide}>
      <Intro />
      <ul className={styles.pairGrid} aria-label="Cuisines">
        {views.map((view) => {
          const pairing = signature(view);
          return (
            <li key={view.cuisine.id} className={styles.pairCard}>
              <h2 className={styles.pairCuisine}>
                <CombinationLink href={href(view)}>{view.cuisine.name}</CombinationLink>
              </h2>
              {pairing && (
                <>
                  <div className={styles.pair} aria-hidden="true">
                    <IngredientMark ingredient={pairing.ingredients[0]} size="md" />
                    <span className={styles.plus}>+</span>
                    <IngredientMark ingredient={pairing.ingredients[1]} size="md" />
                  </div>
                  <p className={styles.pairNames}>
                    <IngredientLink ingredient={pairing.ingredients[0]} /> and <IngredientLink ingredient={pairing.ingredients[1]} />
                  </p>
                  {/* A Pairing's reasons can speak of other Cuisines; the one naming this Cuisine says it best. */}
                  {(() => {
                    const firstWord = view.cuisine.name.split(" ")[0];
                    const reason = pairing.reasons.find(({ note }) => note.includes(firstWord)) ?? pairing.reasons[0];
                    return reason && <p className={`muted ${styles.pairNote}`}>{reason.note}</p>;
                  })()}
                </>
              )}
              <p className={`muted ${styles.pairWhere} ${styles.pushDown}`}>
                {view.cuisine.description}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** E: a dense index, one line each, for comparing at a glance; the numbers lead. */
export function VariantE({ views }: { views: CuisineView[] }) {
  return (
    <div className={styles.wide}>
      <Intro />
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Cuisine</th>
            <th scope="col" className={styles.hideNarrow}>Where</th>
            <th scope="col" className={styles.num}>Ingredients</th>
            <th scope="col" className={styles.num}>Pairings</th>
            <th scope="col" className={styles.hideNarrow}>Leans on</th>
          </tr>
        </thead>
        <tbody>
          {views.map((view) => (
            <tr key={view.cuisine.id}>
              <th scope="row" className={styles.tableName}>
                <CombinationLink href={href(view)}>{view.cuisine.name}</CombinationLink>
              </th>
              <td className={`muted ${styles.hideNarrow} ${styles.where}`}>{view.cuisine.description}</td>
              <td className={styles.num}>{view.ingredients.length}</td>
              <td className={styles.num}>{view.pairings.length}</td>
              <td className={styles.hideNarrow}>
                <Cluster view={view} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
