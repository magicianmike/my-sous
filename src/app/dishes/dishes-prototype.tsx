// PROTOTYPE: throwaway. Five layouts of the Dishes page, switched by `?variant=` (see ./page.tsx).
// Same fonts, colours and content as the real page; only layout, card shape and spacing differ.

import { ContentImage } from "@/components/ContentImage";
import { ListRow } from "@/components/ListRow";
import { MarkGroup } from "@/components/MarkGroup";
import { joinWithAnd, type Formula, type Image, type Ingredient } from "@/kitchen/kitchen";
import { CombinationLink } from "../combination";
import { IngredientMarkLink } from "../ingredient-link";
import styles from "./dishes-prototype.module.css";

export type Dish = { formula: Formula; image?: Image; ingredients: Ingredient[] };

export const VARIANTS = [
  { key: "A", name: "Current: stacked cards" },
  { key: "B", name: "Card grid" },
  { key: "C", name: "Editorial rows" },
  { key: "D", name: "Feature + tiles" },
  { key: "E", name: "Menu" },
];

function partsSentence({ slots }: Formula): string {
  const required = slots.filter(({ required }) => required).map(({ role }) => role);
  const optional = slots.filter(({ required }) => !required).map(({ role }) => role);
  return optional.length === 0
    ? `Parts: ${joinWithAnd(required)}.`
    : `Parts: ${required.join(", ")}, and optionally ${joinWithAnd(optional)}.`;
}

const href = (formula: Formula) => `/formulas/${formula.id}`;

function Marks({ dish, label = "As written" }: { dish: Dish; label?: string }) {
  if (dish.ingredients.length === 0) return null;
  return (
    <MarkGroup
      label={label}
      ingredients={dish.ingredients}
      renderMark={(ingredient) => <IngredientMarkLink ingredient={ingredient} named alone />}
    />
  );
}

function Intro({ className = "" }: { className?: string }) {
  return (
    <header className={className}>
      <h1>Dishes</h1>
      <p className="lede">Each dish has parts, such as an acid or a soft herb, and your ingredients fill them.</p>
    </header>
  );
}

/** A: the page as it is today. */
export function VariantA({ dishes }: { dishes: Dish[] }) {
  return (
    <>
      <Intro />
      <ul className="stack" aria-label="Dishes">
        {dishes.map((dish) => (
          <li key={dish.formula.id}>
            <ListRow
              media={
                dish.image && (
                  <ContentImage image={dish.image} sizes="(min-width: 50rem) 40rem, 100vw" decorative noteOnImage className="card-image" />
                )
              }
              title={
                <h2>
                  <CombinationLink href={href(dish.formula)}>{dish.formula.name}</CombinationLink>
                </h2>
              }
            >
              <p>{dish.formula.description}</p>
              <p className="muted">{partsSentence(dish.formula)}</p>
              <div className="mark-groups">
                <Marks dish={dish} />
              </div>
            </ListRow>
          </li>
        ))}
      </ul>
    </>
  );
}

/** B: a wide grid of portrait cards, the picture leading, words kept short. */
export function VariantB({ dishes }: { dishes: Dish[] }) {
  return (
    <div className={styles.wide}>
      <Intro />
      <ul className={styles.grid} aria-label="Dishes">
        {dishes.map((dish) => (
          <li key={dish.formula.id} className={styles.gridCard}>
            {dish.image && (
              <ContentImage image={dish.image} sizes="(min-width: 56rem) 22rem, (min-width: 36rem) 50vw, 100vw" decorative noteOnImage className={styles.gridImage} />
            )}
            <div className={styles.gridBody}>
              <h2 className={styles.gridTitle}>
                <CombinationLink href={href(dish.formula)}>{dish.formula.name}</CombinationLink>
              </h2>
              <p className={styles.clamp}>{dish.formula.description}</p>
              <p className={`muted ${styles.small}`}>{dish.formula.slots.length} parts</p>
              <div className={styles.pushDown}>
                <Marks dish={dish} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** C: no card surfaces; hairline-ruled rows, a square thumbnail beside the words, lots of air. */
export function VariantC({ dishes }: { dishes: Dish[] }) {
  return (
    <>
      <Intro className={styles.editorialIntro} />
      <ol className={styles.editorial} aria-label="Dishes">
        {dishes.map((dish, i) => (
          <li key={dish.formula.id} className={styles.editorialRow}>
            <span className={styles.number} aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className={styles.editorialText}>
              <h2 className={styles.editorialTitle}>
                <CombinationLink href={href(dish.formula)}>{dish.formula.name}</CombinationLink>
              </h2>
              <p>{dish.formula.description}</p>
              <p className={`muted ${styles.small}`}>{partsSentence(dish.formula)}</p>
              <Marks dish={dish} />
            </div>
            {dish.image && (
              <ContentImage image={dish.image} sizes="12rem" decorative className={styles.thumb} />
            )}
          </li>
        ))}
      </ol>
    </>
  );
}

/** D: the first dish as a large feature, the rest as compact image tiles that open on a click. */
export function VariantD({ dishes }: { dishes: Dish[] }) {
  const [feature, ...rest] = dishes;
  return (
    <div className={styles.wide}>
      <Intro />
      {feature && (
        <article className={styles.feature}>
          {feature.image && (
            <ContentImage image={feature.image} sizes="(min-width: 56rem) 38rem, 100vw" decorative noteOnImage priority className={styles.featureImage} />
          )}
          <div className={styles.featureText}>
            <p className={`muted ${styles.eyebrow}`}>Start here</p>
            <h2 className={styles.featureTitle}>
              <CombinationLink href={href(feature.formula)}>{feature.formula.name}</CombinationLink>
            </h2>
            <p className="lede">{feature.formula.description}</p>
            <p className="muted">{partsSentence(feature.formula)}</p>
            <Marks dish={feature} />
          </div>
        </article>
      )}
      <h2 className={styles.sectionTitle}>More dishes</h2>
      <ul className={styles.tiles} aria-label="More dishes">
        {rest.map((dish) => (
          <li key={dish.formula.id} className={styles.tile}>
            {dish.image && (
              <ContentImage image={dish.image} sizes="(min-width: 56rem) 16rem, 50vw" decorative className={styles.tileImage} />
            )}
            <h3 className={styles.tileTitle}>
              <CombinationLink href={href(dish.formula)} className={styles.stretched}>
                {dish.formula.name}
              </CombinationLink>
            </h3>
            <p className={`muted ${styles.small}`}>{dish.formula.slots.map(({ role }) => role).join(" · ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** E: a restaurant menu. No pictures; the type and the drawings carry it. */
export function VariantE({ dishes }: { dishes: Dish[] }) {
  return (
    <div className={`${styles.menu} ${styles.wide}`}>
      <Intro className={styles.menuIntro} />
      <ul className={styles.menuList} aria-label="Dishes">
        {dishes.map((dish) => (
          <li key={dish.formula.id} className={styles.menuItem}>
            <h2 className={styles.menuTitle}>
              <CombinationLink href={href(dish.formula)}>{dish.formula.name}</CombinationLink>
              <span className={styles.leader} aria-hidden="true" />
              <span className={`muted ${styles.small}`}>{dish.formula.slots.length} parts</span>
            </h2>
            <p className={styles.menuDescription}>{dish.formula.description}</p>
            <div className={styles.menuMarks}>
              <Marks dish={dish} label="Made with" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
