"use client";

import { useRef } from "react";
import { COMBINATION_LIMIT } from "@/kitchen/kitchen";
import { CombinationLink, useCombination, useKitchen, withSearchParams } from "./combination";

export const CombinationTray = withSearchParams(function CombinationTray() {
  const { status } = useKitchen();
  const { combination, remove } = useCombination();
  const heading = useRef<HTMLHeadingElement>(null);
  const { ingredients, unknown, overLimit } = combination;

  return (
    <aside className="tray" aria-labelledby="tray-heading">
      <h2 id="tray-heading" ref={heading} tabIndex={-1}>
        Your Combination{" "}
        <span className="count">
          {ingredients.length} of {COMBINATION_LIMIT}
        </span>
      </h2>
      {unknown.length > 0 && (
        <p className="notice">
          Some Ingredients in this link aren&rsquo;t in MySous yet, so they&rsquo;re left out:{" "}
          {unknown.join(", ")}.
        </p>
      )}
      {overLimit.length > 0 && (
        <p className="notice">
          A Combination holds up to {COMBINATION_LIMIT} Ingredients, so these are left out:{" "}
          {overLimit.map(({ name }) => name).join(", ")}.
        </p>
      )}
      {ingredients.length === 0 ? (
        <p>Add an Ingredient to start a Combination.</p>
      ) : (
        <>
          <ul>
            {ingredients.map((ingredient) => (
              <li key={ingredient.id}>
                {ingredient.name}
                <button
                  type="button"
                  onClick={() => {
                    remove(ingredient);
                    heading.current?.focus();
                  }}
                >
                  Remove<span className="visually-hidden"> {ingredient.name}</span>
                </button>
              </li>
            ))}
          </ul>
          <CombinationLink href="/suggestions" className="primary">
            See what to make
          </CombinationLink>
        </>
      )}
      <p role="status" className="notice">
        {status}
      </p>
    </aside>
  );
});
