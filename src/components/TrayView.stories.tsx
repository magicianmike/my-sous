import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { expect, fn } from "storybook/test";
import { COMBINATION_LIMIT } from "@/kitchen/kitchen";
import { basil, chickenThigh, garlic, lemon } from "../../.storybook/fixtures";
import { buttonClass } from "./Button";
import type { IngredientLook } from "./IngredientMark";
import { TrayView } from "./TrayView";

const meta = {
  component: TrayView<IngredientLook>,
  args: {
    ingredients: [lemon, garlic],
    titleId: "your-basket",
    limit: COMBINATION_LIMIT,
    onRemove: fn(),
    renderName: ({ id, name }) => <a href={`#${id}`}>{name}</a>,
    action: (
      <a href="#suggestions" className={buttonClass("primary")}>
        See what to make
      </a>
    ),
  },
  // Holds the basket and says what changed, as its container does.
  render: function Render(args) {
    const [ingredients, setIngredients] = useState(args.ingredients);
    const [status, setStatus] = useState<string>();
    return (
      <TrayView
        {...args}
        ingredients={ingredients}
        status={status}
        onRemove={(removed) => {
          args.onRemove(removed);
          const left = ingredients.filter(({ id }) => id !== removed.id);
          setIngredients(left);
          setStatus(`${removed.name} removed from your basket, ${left.length} of ${args.limit}.`);
        }}
      />
    );
  },
} satisfies Meta<typeof TrayView<IngredientLook>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: { ingredients: [] },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("complementary", { name: `Your basket 0 of ${COMBINATION_LIMIT}` })).toBeVisible();
    await expect(canvas.getByText("Add an Ingredient to start a basket.")).toBeVisible();
    await expect(canvas.queryByRole("link", { name: "See what to make" })).toBeNull();
  },
};

/** Remove takes it out and says so, for the Cook who can't see it go. */
export const Remove: Story = {
  play: async ({ canvas, userEvent, args }) => {
    const names = () => canvas.getAllByRole("link").filter(({ textContent }) => textContent !== "See what to make");
    await expect(names().map(({ textContent }) => textContent)).toEqual(["Lemon", "Garlic"]);

    await userEvent.click(canvas.getByRole("button", { name: "Remove Garlic" }));
    await expect(args.onRemove).toHaveBeenCalledWith(garlic);
    await expect(canvas.getByRole("status")).toHaveTextContent(`Garlic removed from your basket, 1 of ${COMBINATION_LIMIT}.`);
    await expect(canvas.getByRole("heading", { name: `Your basket 1 of ${COMBINATION_LIMIT}` })).toBeVisible();
    await expect(names().map(({ textContent }) => textContent)).toEqual(["Lemon"]);
  },
};

export const Full: Story = {
  args: { ingredients: [lemon, garlic, chickenThigh, basil] },
};

/** A link's Ingredients that aren't in MySous, or past the limit, are left out, and it says which. */
export const LeftOut: Story = {
  args: { ingredients: [lemon, garlic], unknown: ["yuzu"], overLimit: [chickenThigh, basil], limit: 2 },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/aren’t in MySous yet, so they’re left out: yuzu\./)).toBeVisible();
    await expect(canvas.getByText(/A basket holds up to 2 Ingredients, so these are left out: Chicken thigh, Basil\./i)).toBeVisible();
  },
};
