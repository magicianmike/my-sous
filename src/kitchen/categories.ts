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
