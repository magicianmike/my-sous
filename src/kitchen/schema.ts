import { z } from "zod";
import { INGREDIENT_CATEGORIES, PAIRING_REASON_CATEGORIES } from "./categories";

/** The content format, as checked at build time. */

export const cuisineSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
});

const hex = z.string().regex(/^#[0-9a-f]{6}$/i, "use a six-digit hex colour, such as #2f5714");

const citationSchema = z.object({
  title: z.string().min(1),
  url: z.url().optional(),
});

/** What safety-sensitive steps need to know about an Ingredient, and where that comes from. */
export const SAFETY_TOPICS = ["handling", "cooking"] as const;

const safetyGuidanceSchema = z.object({
  note: z.string().min(1),
  citations: z.array(citationSchema).min(1, "cite at least one source for safety guidance"),
});

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
  /** Conservative, cited guidance for an Ingredient that needs it, such as poultry. */
  safety: z.partialRecord(z.enum(SAFETY_TOPICS), safetyGuidanceSchema).optional(),
  /** Single-line drawing on a 48-unit grid: the inside of an <svg viewBox="0 0 48 48">. */
  drawing: z.string(),
});

const pairingReasonSchema = z.object({
  category: z.enum(PAIRING_REASON_CATEGORIES),
  note: z.string().min(1),
  detail: z.string().min(1).optional(),
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
  /** How many Ingredients the Slot can hold, such as 2 aromatics; one unless it says. */
});

export const formulaSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  slots: z.array(slotSchema).min(1),
  /** Steps that refer to Slots as {slotId}. */
  method: z.array(z.string().min(1)).min(1),
});

// Strict, so a stray key fails: an unquoted comma in a YAML `{ … }` line splits a note into one.
const recipeIngredientSchema = z
  .strictObject({
    /** How much, in plain words, such as "2 cloves" or "1 tbsp": for a Slot, whatever fills it. */
    amount: z.string().min(1),
    /** The Slot whose Ingredient this is; or, for something outside the Formula, its name. */
    slot: z.string().min(1).optional(),
    name: z.string().min(1).optional(),
    /** For a Slot, the note for whatever fills it without one of its own. */
    note: z.string().min(1).optional(),
    /**
     * For a Slot: particular Ingredients that can fill it, by id, with their own amount, a note, and
     * the name as it reads after that amount (a plural, such as "limes").
     */
    for: z
      .record(
        z.string(),
        z.strictObject({
          amount: z.string().min(1),
          name: z.string().min(1).optional(),
          note: z.string().min(1).optional(),
        }),
      )
      .optional(),
  })
  .refine(({ slot, name }) => (slot === undefined) !== (name === undefined), {
    message: "give either a slot or a name",
  });

const recipeStepSchema = z.object({
  /** Refers to Slots as {slotId}, like a Formula's method. */
  text: z.string().min(1),
  /** A step whose safety depends on what fills a Slot; it shows that Ingredient's guidance on the topic. */
  safety: z.object({ slot: z.string().min(1), about: z.enum(SAFETY_TOPICS) }).optional(),
});

export const recipeSchema = z.object({
  serves: z.number().int().positive(),
  /** In minutes. */
  time: z.object({ prep: z.number().int().nonnegative(), cook: z.number().int().nonnegative() }),
  /** The recipe as written: each Slot's Ingredients (one, or a list), by Slot id, for parts the basket leaves empty. */
  fills: z.record(
    z.string(),
    z.union([z.string(), z.array(z.string()).min(1)]).transform((ids) => (typeof ids === "string" ? [ids] : ids)),
  ),
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
export type SafetyGuidance = z.infer<typeof safetyGuidanceSchema>;
/** A Formula's Recipe, named by the Formula it belongs to. */
export type RecipeContent = { formula: string } & z.infer<typeof recipeSchema>;

/** Validated content, plain data: what a Kitchen is built from, on the server or in the browser. */
export type KitchenContent = {
  cuisines: Cuisine[];
  ingredients: IngredientContent[];
  pairings: PairingContent[];
  formulas: Formula[];
  recipes: RecipeContent[];
};
