import { z } from "zod";
import { INGREDIENT_CATEGORIES, PAIRING_REASON_CATEGORIES } from "./categories";

/** The content format, as checked at build time. */

export const cuisineSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
});

const hex = z.string().regex(/^#[0-9a-f]{6}$/i, "use a six-digit hex colour, such as #2f5714");

/** An Ingredient's own colours: its drawing's stroke sits on its wash, in each theme. */
const ingredientColourSchema = z.object({
  wash: hex,
  washDark: hex,
  stroke: hex,
  strokeDark: hex,
});

export const ingredientSchema = z.object({
  name: z.string().min(1),
  category: z.enum(INGREDIENT_CATEGORIES),
  /** For a Blend: what it typically includes, in plain words. */
  typicallyIncludes: z.array(z.string().min(1)).optional(),
  cuisines: z.array(z.string()).default([]),
  slotTypes: z.array(z.string().min(1)).default([]),
  tip: z.string().min(1),
  culturalContext: z.string().min(1).optional(),
  essay: z.string().min(1, "the Ingredient needs an essay below its frontmatter"),
  colour: ingredientColourSchema,
  /** Single-line drawing on a 48-unit grid: the inside of an <svg viewBox="0 0 48 48">. */
  drawing: z.string(),
});

const pairingReasonSchema = z.object({
  category: z.enum(PAIRING_REASON_CATEGORIES),
  note: z.string().min(1),
  detail: z.string().min(1).optional(),
});

const citationSchema = z.object({
  title: z.string().min(1),
  url: z.url().optional(),
});

export const pairingSchema = z.object({
  ingredients: z.tuple([z.string(), z.string()]),
  reasons: z.array(pairingReasonSchema).default([]),
  cuisines: z.array(z.string()).default([]),
  citations: z.array(citationSchema).default([]),
});

const slotSchema = z.object({
  id: z.string().min(1),
  /** What the Slot asks for, in words, such as "an acid". */
  role: z.string().min(1),
  /** The Slot type an Ingredient must list to fill this Slot. */
  accepts: z.string().min(1),
  required: z.boolean().default(true),
});

export const formulaSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  slots: z.array(slotSchema).min(1),
  /** Steps that refer to Slots as {slotId}. */
  method: z.array(z.string().min(1)).min(1),
});

const recipeIngredientSchema = z
  .object({
    /** How much, in plain words, such as "2 cloves" or "1 tbsp". */
    amount: z.string().min(1),
    /** The Slot whose Ingredient this is; or, for something outside the Formula, its name. */
    slot: z.string().min(1).optional(),
    name: z.string().min(1).optional(),
    note: z.string().min(1).optional(),
  })
  .refine(({ slot, name }) => (slot === undefined) !== (name === undefined), {
    message: "give either a slot or a name",
  });

const recipeStepSchema = z.object({
  /** Refers to Slots as {slotId}, like a Formula's method. */
  text: z.string().min(1),
  /** Poultry and pork temperatures, cooked rice, quick pickles: guidance that must be cited. */
  safety: z.boolean().default(false),
  citations: z.array(citationSchema).default([]),
});

export const showcaseSchema = z.object({
  name: z.string().min(1),
  intro: z.string().min(1, "the Showcase Recipe needs an intro below its frontmatter"),
  serves: z.number().int().positive(),
  /** In minutes. */
  time: z.object({ prep: z.number().int().nonnegative(), cook: z.number().int().nonnegative() }),
  /** Each Slot's Ingredient, by Slot id. */
  fills: z.record(z.string(), z.string()),
  ingredients: z.array(recipeIngredientSchema).min(1),
  steps: z.array(recipeStepSchema).min(1),
});

export type Cuisine = z.infer<typeof cuisineSchema>;
export type PairingReason = z.infer<typeof pairingReasonSchema>;
export type Citation = z.infer<typeof citationSchema>;
export type Slot = z.infer<typeof slotSchema>;
export type Formula = z.infer<typeof formulaSchema>;
export type IngredientContent = { id: string } & z.infer<typeof ingredientSchema>;
export type PairingContent = z.infer<typeof pairingSchema>;
/** A Showcase Recipe, named by the Formula it's a worked example of. */
export type ShowcaseContent = { formula: string } & z.infer<typeof showcaseSchema>;

/** Validated content, plain data: what a Kitchen is built from, on the server or in the browser. */
export type KitchenContent = {
  cuisines: Cuisine[];
  ingredients: IngredientContent[];
  pairings: PairingContent[];
  formulas: Formula[];
  showcases: ShowcaseContent[];
};
