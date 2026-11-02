"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { Ingredient } from "@/kitchen/kitchen";
import { useKitchen } from "./combination";
import { IngredientLink } from "./ingredient-link";

/**
 * The Pantry lives in this browser's localStorage, as a list of Ingredient ids. Every access is
 * guarded: when storage is blocked or full, the Pantry lasts for the visit, in memory, and says so.
 */
const KEY = "mysous.pantry";

/** The Pantry's ids, and whether they'll still be here on the next visit. */
type Snapshot = { ids: string[]; remembered: boolean };

/** Before the browser takes over, there's no Pantry to read; it fills in once the page is live. */
const SERVER_SNAPSHOT: Snapshot = { ids: [], remembered: true };

const listeners = new Set<() => void>();
let snapshot: Snapshot | undefined;

function load(): Snapshot {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    const ids = Array.isArray(stored) ? stored.filter((id): id is string => typeof id === "string") : [];
    return { ids, remembered: true };
  } catch {
    return { ids: snapshot?.ids ?? [], remembered: false };
  }
}

/** One object per change, so React only re-renders when the Pantry changes. */
function getSnapshot(): Snapshot {
  return (snapshot ??= load());
}

function save(ids: string[]) {
  let remembered = true;
  try {
    localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {
    remembered = false;
  }
  snapshot = { ids, remembered };
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Another tab changed the Pantry.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== KEY) return;
    snapshot = load();
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function ingredientCount(size: number): string {
  return `${size} ingredient${size === 1 ? "" : "s"}`;
}

/** The Cook's Pantry, in the order they added things, and the ways to change it. */
export function usePantry() {
  const { kitchen, announce } = useKitchen();
  const { ids, remembered } = useSyncExternalStore(subscribe, getSnapshot, () => SERVER_SNAPSHOT);
  // Ids MySous no longer knows are left out, not shown as errors.
  const ingredients = useMemo(() => ids.flatMap((id) => kitchen.ingredient(id) ?? []), [ids, kitchen]);
  const has = (ingredient: Ingredient) => ingredients.includes(ingredient);

  return {
    ingredients,
    /** False when this browser won't keep the Pantry past this visit. */
    remembered,
    has,
    add(ingredient: Ingredient) {
      if (has(ingredient)) {
        announce(`${ingredient.name} is already in your Pantry.`);
        return;
      }
      const next = [...ingredients, ingredient];
      save(next.map(({ id }) => id));
      announce(`${ingredient.name} added to your Pantry, ${ingredientCount(next.length)}.`);
    },
    remove(ingredient: Ingredient) {
      const next = ingredients.filter((other) => other !== ingredient);
      save(next.map(({ id }) => id));
      announce(`${ingredient.name} removed from your Pantry, ${ingredientCount(next.length)}.`);
    },
  };
}

/** "in Pantry" after an Ingredient's name, when it is; assistive technology hears it after a comma. */
export function InPantryNote({ ingredient }: { ingredient: Ingredient }) {
  const { has } = usePantry();
  return (
    has(ingredient) && (
      <span className="in-pantry">
        <span className="visually-hidden">,</span> in Pantry
      </span>
    )
  );
}

/** A basket Ingredient's name, as a link, noting when it's already in the Pantry. */
export function BasketName({ ingredient }: { ingredient: Ingredient }) {
  return (
    <>
      <IngredientLink ingredient={ingredient} />
      <InPantryNote ingredient={ingredient} />
    </>
  );
}
