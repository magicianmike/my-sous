import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { garlic, lemon } from "../../.storybook/fixtures";
import { IngredientMark } from "./IngredientMark";

const meta = {
  component: IngredientMark,
  args: { ingredient: lemon },
} satisfies Meta<typeof IngredientMark>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Decorative: whatever holds it carries the Ingredient's name. */
export const Medium: Story = {
  play: async ({ canvasElement }) => {
    const mark = canvasElement.querySelector(".ingredient-mark")!;
    await expect(mark).toHaveAttribute("aria-hidden", "true");
    await expect(mark.querySelectorAll("svg path").length).toBeGreaterThan(0);
  },
};

export const Small: Story = { args: { size: "sm" } };

export const Large: Story = { args: { ingredient: garlic, size: "lg" } };

/** The lines drawn in on first paint, as the Ingredient page's hero does. */
export const DrawnIn: Story = {
  args: { size: "lg", drawIn: true },
  play: async ({ canvasElement }) => {
    // Each shape is given a length of 1, so a dash of 1 draws it whatever its real length.
    for (const shape of canvasElement.querySelectorAll("svg path")) await expect(shape).toHaveAttribute("pathLength", "1");
  },
};
