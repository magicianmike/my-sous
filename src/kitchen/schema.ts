import { z } from "zod";

/** The content format, as checked at build time. */

export const cuisineSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
});

export const ingredientSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  /** For a Blend: what it typically includes, in plain words. */
  typicallyIncludes: z.array(z.string().min(1)).optional(),
  cuisines: z.array(z.string()).default([]),
  slotTypes: z.array(z.string().min(1)).default([]),
  tip: z.string().min(1),
  culturalContext: z.string().min(1).optional(),
  essay: z.string().min(1, "the Ingredient needs an essay below its frontmatter"),
});

const pairingReasonSchema = z.object({
  category: z.enum(["contrast", "aromatic bridge", "texture", "tradition"]),
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

export type Cuisine = z.infer<typeof cuisineSchema>;
export type PairingReason = z.infer<typeof pairingReasonSchema>;
export type Citation = z.infer<typeof citationSchema>;
export type Slot = z.infer<typeof slotSchema>;
export type Formula = z.infer<typeof formulaSchema>;
export type IngredientContent = { id: string } & z.infer<typeof ingredientSchema>;
export type PairingContent = z.infer<typeof pairingSchema>;

/** Validated content, plain data: what a Kitchen is built from, on the server or in the browser. */
export type KitchenContent = {
  cuisines: Cuisine[];
  ingredients: IngredientContent[];
  pairings: PairingContent[];
  formulas: Formula[];
};
