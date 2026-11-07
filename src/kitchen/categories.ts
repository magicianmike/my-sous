/** The kinds of Pairing Reason, in the order an Ingredient's Pairings are grouped. */
export const PAIRING_REASON_CATEGORIES = ["contrast", "aromatic bridge", "texture", "tradition"] as const;

export type PairingReasonCategory = (typeof PAIRING_REASON_CATEGORIES)[number];

/** How each category is headed for the Cook. */
export const PAIRING_REASON_HEADINGS: Record<PairingReasonCategory, string> = {
  contrast: "Contrast",
  "aromatic bridge": "Aromatic bridge",
  texture: "Texture",
  tradition: "Tradition",
};

/** The kinds of Ingredient, in the order the Ingredients page lists them. */
export const INGREDIENT_CATEGORIES = [
  "herb",
  "allium",
  "aromatic",
  "spice",
  "citrus",
  "produce",
  "meat",
  "seafood",
  "egg",
  "dairy",
  "grain",
  "condiment",
  "blend",
] as const;

export type IngredientCategory = (typeof INGREDIENT_CATEGORIES)[number];

/** How each kind is headed for the Cook. */
export const INGREDIENT_CATEGORY_HEADINGS: Record<IngredientCategory, string> = {
  herb: "Herbs",
  allium: "Alliums",
  aromatic: "Aromatics",
  spice: "Spices",
  citrus: "Citrus",
  produce: "Produce",
  meat: "Meat",
  seafood: "Fish and seafood",
  egg: "Eggs",
  dairy: "Dairy",
  grain: "Grains and bread",
  condiment: "Condiments",
  blend: "Blends",
};
