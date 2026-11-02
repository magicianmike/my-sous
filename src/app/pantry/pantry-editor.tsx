"use client";

import { useRef } from "react";
import { Button } from "@/components/Button";
import { Chip } from "@/components/Chip";
import { Combobox } from "@/components/Combobox";
import { IngredientMark } from "@/components/IngredientMark";
import { TickIcon } from "@/components/TickIcon";
import { TrashIcon } from "@/components/TrashIcon";
import type { Ingredient } from "@/kitchen/kitchen";
import { useKitchen } from "../combination";
import { IngredientLink, IngredientMarkLink } from "../ingredient-link";
import { usePantry } from "../pantry";

/** The Pantry: what's in it, then two ways to add more, by name or by tapping a staple. */
export function PantryEditor() {
  const { kitchen } = useKitchen();
  const pantry = usePantry();
  const heading = useRef<HTMLHeadingElement>(null);
  const count = pantry.ingredients.length;

  return (
    <>
      {!pantry.remembered && (
        <p className="notice">
          This browser isn&rsquo;t letting MySous save, so your Pantry lasts until you close this page.
        </p>
      )}

      <section className="pantry-section" aria-labelledby="pantry-heading">
        <h2 id="pantry-heading" ref={heading} tabIndex={-1}>
          In your Pantry <span className="heading-count">{count}</span>
        </h2>
        {count === 0 ? (
          <p className="muted">Nothing here yet. Add what you have by name, or tap your staples below.</p>
        ) : (
          <ul className="chips pantry-items">
            {pantry.ingredients.map((ingredient) => (
              <li key={ingredient.id}>
                <Chip
                  colour={ingredient.colour}
                  leading={<IngredientMarkLink ingredient={ingredient} />}
                  trailing={
                    <Button
                      variant="quiet"
                      className="pantry-remove"
                      onClick={() => {
                        pantry.remove(ingredient);
                        // The button goes with the Ingredient, so focus returns to the list's heading.
                        heading.current?.focus();
                      }}
                    >
                      <TrashIcon className="button-icon" />
                      <span className="visually-hidden">Remove {ingredient.name} from your Pantry</span>
                    </Button>
                  }
                >
                  <IngredientLink ingredient={ingredient} />
                </Chip>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="pantry-section" aria-labelledby="pantry-add-heading">
        <h2 id="pantry-add-heading">Add what you have</h2>
        <Combobox<Ingredient>
          label="Find an ingredient to add"
          search={kitchen.search}
          getKey={({ id }) => id}
          getLabel={({ name }) => name}
          onChoose={pantry.add}
          clearOnChoose
          countNoun={["ingredient", "ingredients"]}
          listboxLabel="Matching ingredients"
          noMatch={(query) => `“${query}” isn’t in MySous yet.`}
        />
        <h3>Staples</h3>
        <p className="muted">Tap what you usually keep.</p>
        <ul className="staples">
          {kitchen.staples().map((ingredient) => {
            const inPantry = pantry.has(ingredient);
            return (
              <li key={ingredient.id}>
                <button
                  type="button"
                  className="staple"
                  aria-pressed={inPantry}
                  onClick={() => (inPantry ? pantry.remove(ingredient) : pantry.add(ingredient))}
                >
                  <IngredientMark ingredient={ingredient} size="sm" />
                  <span className="staple-name">{ingredient.name}</span>
                  {/* A tick when it's in, so the state never rests on colour. */}
                  <TickIcon className="staple-tick" />
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
