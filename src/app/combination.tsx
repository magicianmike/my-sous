"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, Suspense, useContext, useMemo, useState } from "react";
import {
  COMBINATION_LIMIT,
  createKitchen,
  type Combination,
  type Ingredient,
  type Kitchen,
  type KitchenContent,
} from "@/kitchen/kitchen";

/** The Combination lives in the URL, as `?with=lemon,garlic`: the source of truth for it. */
const PARAM = "with";

export function hrefWith(path: string, ids: string[]): string {
  return ids.length > 0 ? `${path}?${PARAM}=${ids.join(",")}` : path;
}

type Shared = { kitchen: Kitchen; status: string; announce(message: string): void };

const SharedContext = createContext<Shared | null>(null);

/** Rebuilds the Kitchen in the browser from content validated at build time. */
export function KitchenProvider({
  content,
  children,
}: {
  content: KitchenContent;
  children: React.ReactNode;
}) {
  const kitchen = useMemo(() => createKitchen(content), [content]);
  const [status, setStatus] = useState("");
  return (
    <SharedContext.Provider value={{ kitchen, status, announce: setStatus }}>
      {children}
    </SharedContext.Provider>
  );
}

export function useKitchen(): Shared {
  const shared = useContext(SharedContext);
  if (!shared) throw new Error("useKitchen needs a KitchenProvider");
  return shared;
}

/** The current Combination, read from the URL, and the ways to change it. */
export function useCombination() {
  const { kitchen, announce } = useKitchen();
  const router = useRouter();
  const pathname = usePathname();
  const param = useSearchParams().get(PARAM);
  const combination: Combination = kitchen.combination(param ? param.split(",") : []);
  const ids = combination.ingredients.map(({ id }) => id);

  function go(next: string[]) {
    router.push(hrefWith(pathname, next), { scroll: false });
  }

  return {
    combination,
    href: (path: string) => hrefWith(path, ids),
    add(ingredient: Ingredient) {
      if (ids.length >= COMBINATION_LIMIT) {
        announce(
          `Your Combination already holds ${COMBINATION_LIMIT} Ingredients, the most it can, so Suggestions stay focused. Remove one to add ${ingredient.name}.`,
        );
        return;
      }
      go([...ids, ingredient.id]);
      announce(`${ingredient.name} added to Combination, ${ids.length + 1} of ${COMBINATION_LIMIT}.`);
    },
    remove(ingredient: Ingredient) {
      go(ids.filter((id) => id !== ingredient.id));
      announce(
        `${ingredient.name} removed from Combination, ${ids.length - 1} of ${COMBINATION_LIMIT}.`,
      );
    },
  };
}

/** Wraps components that read the URL, which static pages can only do in the browser. */
export function withSearchParams<P extends object>(
  Component: React.ComponentType<P>,
  Fallback: React.ComponentType<P> = () => null,
) {
  return function WithSearchParams(props: P) {
    return (
      <Suspense fallback={<Fallback {...props} />}>
        <Component {...props} />
      </Suspense>
    );
  };
}

type LinkProps = { href: string; children: React.ReactNode; className?: string };

/** A link to another app screen that keeps the current Combination. */
export const CombinationLink = withSearchParams(
  function CombinationLink({ href, ...props }: LinkProps) {
    return <Link href={useCombination().href(href)} {...props} />;
  },
  ({ href, ...props }: LinkProps) => <Link href={href} {...props} />,
);

export const AddToCombination = withSearchParams(function AddToCombination({
  ingredientId,
}: {
  ingredientId: string;
}) {
  const { kitchen } = useKitchen();
  const { combination, add } = useCombination();
  const ingredient = kitchen.ingredient(ingredientId)!;
  if (combination.ingredients.includes(ingredient)) {
    return <span className="in-combination">In your Combination</span>;
  }
  return (
    <button type="button" onClick={() => add(ingredient)}>
      Add<span className="visually-hidden"> {ingredient.name} to Combination</span>
    </button>
  );
});
