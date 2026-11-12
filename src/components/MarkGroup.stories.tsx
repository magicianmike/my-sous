import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { basil, chickenThigh, garlic, lemon } from "../../.storybook/fixtures";
import type { IngredientLook } from "./IngredientMark";
import { MarkGroup } from "./MarkGroup";

const meta = {
  component: MarkGroup<IngredientLook>,
  args: { label: "Yours", ingredients: [chickenThigh, garlic] },
} satisfies Meta<typeof MarkGroup<IngredientLook>>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Assistive technology hears the label, then each name. */
export const Yours: Story = {
  play: async ({ canvas }) => {
    const group = canvas.getByRole("group", { name: "Yours" });
    for (const name of ["Chicken thigh", "Garlic"]) await expect(group).toHaveTextContent(name);
  },
};

/** With parts nothing fills yet, as empty circles that say so. */
export const WithEmptyParts: Story = {
  args: { label: "Suggested", ingredients: [lemon, basil], empty: { count: 2, label: "2 parts nothing pairs with yet" } },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByRole("group", { name: "Suggested" })).toHaveTextContent("2 parts nothing pairs with yet");
    await expect(canvasElement.querySelectorAll("[class*=empty]")).toHaveLength(2);
  },
};

/** Links to each Ingredient, as a container provides them; each carries the name. */
export const AsLinks: Story = {
  args: {
    renderMark: (ingredient) => (
      <a href={`#${ingredient.id}`} className="mark-link" aria-label={ingredient.name}>
        <span className="visually-hidden">{ingredient.name}</span>
      </a>
    ),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Chicken thigh" })).toBeInTheDocument();
  },
};
