// PROTOTYPE: throwaway. Five layouts of Home, switched by `?variant=` (see ./page.tsx).
// Same fonts, colours, content and search; only layout, emphasis and spacing differ.

import { BasketIcon } from "@/components/BasketIcon";
import { ContentImage } from "@/components/ContentImage";
import { EmptyMark } from "@/components/EmptyMark";
import { IngredientMark } from "@/components/IngredientMark";
import type { Cuisine, Formula, Image, Ingredient } from "@/kitchen/kitchen";
import { CombinationLink } from "./combination";
import { IngredientSearch } from "./ingredient-search";
import styles from "./home-prototype.module.css";

export const VARIANTS = [
  { key: "A", name: "Current: search, then doors" },
  { key: "B", name: "Search hero" },
  { key: "C", name: "Split with dish collage" },
  { key: "D", name: "How it works" },
  { key: "E", name: "Storefront shelves" },
];

export type HomeData = {
  ingredients: Ingredient[];
  cuisines: Cuisine[];
  formulas: Formula[];
  /** Each dish with its picture, real ones first. */
  dishes: { formula: Formula; image?: Image }[];
};

const GLIMPSE = 5;

const INTRO =
  "Add up to six ingredients you want to cook around to your basket, from your fridge or not, and MySous suggests what to make.";

function Intro({ className = "home-intro" }: { className?: string }) {
  return (
    <p className={className}>
      <BasketIcon />
      <span>{INTRO}</span>
    </p>
  );
}

/** A: Home as it is today. */
export function VariantA({ ingredients, cuisines, formulas }: HomeData) {
  return (
    <>
      <h1>Find what goes with what, and why.</h1>
      <Intro />
      <h2>Start from an ingredient</h2>
      <IngredientSearch />
      <h2>Or browse</h2>
      <ul className="browse-doors">
        <li>
          <CombinationLink href="/ingredients" className="door">
            <span className="door-title">Browse ingredients</span>
            <span className="door-marks" aria-hidden="true">
              {ingredients.slice(0, GLIMPSE).map((ingredient) => (
                <IngredientMark key={ingredient.id} ingredient={ingredient} size="sm" />
              ))}
            </span>
            <span className="door-detail">{ingredients.length} ingredients, by kind</span>
          </CombinationLink>
        </li>
        <li>
          <CombinationLink href="/cuisines" className="door">
            <span className="door-title">Browse cuisines</span>
            <span className="door-detail">{cuisines.map(({ name }) => name).join(" · ")}</span>
          </CombinationLink>
        </li>
        <li>
          <CombinationLink href="/dishes" className="door">
            <span className="door-title">Browse dishes</span>
            <span className="door-detail">{formulas.map(({ name }) => name).join(" · ")}</span>
          </CombinationLink>
        </li>
      </ul>
    </>
  );
}

/** B: the search is the page; centred and large, with three picture doors beneath. */
export function VariantB({ ingredients, cuisines, dishes }: HomeData) {
  const dish = dishes[0];
  return (
    <div className={styles.wide}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Find what goes with what, and why.</h1>
        <div className={styles.heroSearch}>
          <IngredientSearch />
        </div>
        <Intro className={`home-intro ${styles.heroIntro}`} />
      </section>
      <h2 className="visually-hidden">Or browse</h2>
      <ul className={styles.bigDoors}>
        <li>
          <CombinationLink href="/ingredients" className={styles.bigDoor}>
            <span className={styles.bigDoorArt} aria-hidden="true">
              {ingredients.slice(0, 6).map((ingredient) => (
                <IngredientMark key={ingredient.id} ingredient={ingredient} size="md" />
              ))}
            </span>
            <span className={styles.bigDoorTitle}>Ingredients</span>
            <span className="muted">{ingredients.length}, by kind</span>
          </CombinationLink>
        </li>
        <li>
          <CombinationLink href="/cuisines" className={styles.bigDoor}>
            <span className={`${styles.bigDoorArt} ${styles.cuisineNames}`} aria-hidden="true">
              {cuisines.map(({ id, name }) => (
                <span key={id}>{name}</span>
              ))}
            </span>
            <span className={styles.bigDoorTitle}>Cuisines</span>
            <span className="muted">{cuisines.length} cooking traditions</span>
          </CombinationLink>
        </li>
        <li>
          <CombinationLink href="/dishes" className={styles.bigDoor}>
            {dish?.image && (
              <ContentImage image={dish.image} sizes="22rem" decorative noteOnImage className={styles.bigDoorImage} />
            )}
            <span className={styles.bigDoorTitle}>Dishes</span>
            <span className="muted">{dishes.length} to make from your basket</span>
          </CombinationLink>
        </li>
      </ul>
    </div>
  );
}

/** C: words and search on the left, a collage of dishes on the right; browsing a quiet row below. */
export function VariantC({ ingredients, cuisines, dishes }: HomeData) {
  const collage = dishes.filter(({ image }) => image?.made === "ai-generated").slice(0, 4);
  return (
    <div className={styles.wide}>
      <section className={styles.split}>
        <div className={styles.splitText}>
          <h1>Find what goes with what, and why.</h1>
          <Intro />
          <IngredientSearch />
        </div>
        <ul className={styles.collage} aria-label="Some dishes">
          {collage.map(({ formula, image }) => (
            <li key={formula.id}>
              <CombinationLink href={`/formulas/${formula.id}`} className={styles.collageLink}>
                <ContentImage image={image!} sizes="16rem" decorative noteOnImage />
                <span className={styles.collageName}>{formula.name}</span>
              </CombinationLink>
            </li>
          ))}
        </ul>
      </section>
      <nav aria-label="Browse" className={styles.browseRow}>
        <CombinationLink href="/ingredients">Browse {ingredients.length} ingredients →</CombinationLink>
        <CombinationLink href="/cuisines">Browse {cuisines.length} cuisines →</CombinationLink>
        <CombinationLink href="/dishes">Browse {dishes.length} dishes →</CombinationLink>
      </nav>
    </div>
  );
}

/** D: the one idea taught in three steps, the search inside the first. */
export function VariantD({ ingredients, cuisines, dishes }: HomeData) {
  const dish = dishes[0];
  const basket = ingredients.filter(({ id }) => ["chicken-thigh", "garlic", "lemon"].includes(id));
  return (
    <div className={styles.wide}>
      <h1 className={styles.centred}>Find what goes with what, and why.</h1>
      <ol className={styles.steps}>
        <li className={styles.step}>
          <span className={styles.stepNumber}>1</span>
          <h2 className={styles.stepTitle}>Find an ingredient</h2>
          <p className="muted">From your fridge or not. Open it to see what pairs with it, and why.</p>
          <IngredientSearch />
        </li>
        <li className={styles.step}>
          <span className={styles.stepNumber}>2</span>
          <h2 className={styles.stepTitle}>Fill your basket</h2>
          <p className="muted">Up to six ingredients you want to cook around.</p>
          <span className={styles.basket} aria-hidden="true">
            <BasketIcon />
            {basket.map((ingredient) => (
              <IngredientMark key={ingredient.id} ingredient={ingredient} size="sm" />
            ))}
            {Array.from({ length: 6 - basket.length }, (_, i) => (
              <EmptyMark key={i} />
            ))}
          </span>
        </li>
        <li className={styles.step}>
          <span className={styles.stepNumber}>3</span>
          <h2 className={styles.stepTitle}>See what to make</h2>
          <p className="muted">Dishes your basket fits, each with a recipe.</p>
          {dish?.image && (
            <CombinationLink href={`/formulas/${dish.formula.id}`} className={styles.stepDish}>
              <ContentImage image={dish.image} sizes="20rem" decorative noteOnImage />
              <span className={styles.collageName}>{dish.formula.name}</span>
            </CombinationLink>
          )}
        </li>
      </ol>
      <section aria-labelledby="browse-by" className={styles.browseSection}>
        <h2 id="browse-by" className={styles.browseHeading}>
          Or browse by
        </h2>
        <ul className={styles.browseCards}>
          <li>
            <CombinationLink href="/ingredients" className={styles.browseCard}>
              <span className={`${styles.browseArt} ${styles.markGrid}`} aria-hidden="true">
                {ingredients.slice(0, 6).map((ingredient) => (
                  <IngredientMark key={ingredient.id} ingredient={ingredient} size="md" />
                ))}
              </span>
              <span className={styles.browseBody}>
                <span className={styles.browseTitle}>Ingredients</span>
                <span className="muted">
                  All {ingredients.length}, by kind, each with what pairs with it and why.
                </span>
                <span className={styles.browseCue}>Browse ingredients →</span>
              </span>
            </CombinationLink>
          </li>
          <li>
            <CombinationLink href="/cuisines" className={styles.browseCard}>
              <span className={`${styles.browseArt} ${styles.nameCloud}`} aria-hidden="true">
                {cuisines.map(({ id, name }) => (
                  <span key={id}>{name}</span>
                ))}
              </span>
              <span className={styles.browseBody}>
                <span className={styles.browseTitle}>Cuisines</span>
                <span className="muted">
                  {cuisines.length} cooking traditions, and what&rsquo;s common and pairs in each.
                </span>
                <span className={styles.browseCue}>Browse cuisines →</span>
              </span>
            </CombinationLink>
          </li>
          <li>
            <CombinationLink href="/dishes" className={styles.browseCard}>
              {dishes[1]?.image && (
                // Each picture says what it is on it, so the band holds one, large enough to carry the note.
                <ContentImage
                  image={dishes[1].image}
                  sizes="22rem"
                  decorative
                  noteOnImage
                  className={`${styles.browseArt} ${styles.dishArt}`}
                />
              )}
              <span className={styles.browseBody}>
                <span className={styles.browseTitle}>Dishes</span>
                <span className="muted">
                  {dishes.length} dishes, each with parts your ingredients fill.
                </span>
                <span className={styles.browseCue}>Browse dishes →</span>
              </span>
            </CombinationLink>
          </li>
        </ul>
      </section>
    </div>
  );
}

/** E: a storefront; a slim search up top, then a shelf of each way in, to scroll along. */
export function VariantE({ ingredients, cuisines, dishes }: HomeData) {
  return (
    <div className={styles.wide}>
      <section className={styles.topRow}>
        <div>
          <h1 className={styles.smallTitle}>Find what goes with what, and why.</h1>
          <Intro />
        </div>
        <IngredientSearch />
      </section>

      <Shelf title="Dishes to make" href="/dishes" all={`All ${dishes.length}`}>
        {dishes.map(({ formula, image }) => (
          <li key={formula.id} className={styles.shelfDish}>
            <CombinationLink href={`/formulas/${formula.id}`} className={styles.collageLink}>
              {image && <ContentImage image={image} sizes="14rem" decorative noteOnImage />}
              <span className={styles.collageName}>{formula.name}</span>
            </CombinationLink>
          </li>
        ))}
      </Shelf>

      <Shelf title="Cuisines" href="/cuisines" all={`All ${cuisines.length}`}>
        {cuisines.map(({ id, name }) => (
          <li key={id}>
            <CombinationLink href={`/cuisines/${id}`} className={styles.shelfChip}>
              {name}
            </CombinationLink>
          </li>
        ))}
      </Shelf>

      <Shelf title="Ingredients" href="/ingredients" all={`All ${ingredients.length}`}>
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            <CombinationLink href={`/ingredients/${ingredient.id}`} className={styles.shelfIngredient}>
              <IngredientMark ingredient={ingredient} size="md" />
              {ingredient.name}
            </CombinationLink>
          </li>
        ))}
      </Shelf>
    </div>
  );
}

function Shelf({ title, href, all, children }: { title: string; href: string; all: string; children: React.ReactNode }) {
  return (
    <section className={styles.shelf} aria-label={title}>
      <div className={styles.shelfHead}>
        <h2 className={styles.shelfTitle}>{title}</h2>
        <CombinationLink href={href} className={styles.seeAll}>
          {all} →
        </CombinationLink>
      </div>
      <ul className={styles.shelfRow}>{children}</ul>
    </section>
  );
}
