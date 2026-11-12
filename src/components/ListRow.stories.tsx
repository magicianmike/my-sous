import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { garlic, panSauceImage } from "../../.storybook/fixtures";
import { AddToBasketButton } from "./AddToBasketButton";
import { ContentImage } from "./ContentImage";
import { Disclosure } from "./Disclosure";
import { IngredientMark } from "./IngredientMark";
import { ListRow } from "./ListRow";
import { Readiness } from "./Readiness";

const meta = {
  component: ListRow,
  args: { title: <a href="#garlic">Garlic</a> },
} satisfies Meta<typeof ListRow>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A Pairing, as an Ingredient page lists it. */
export const Pairing: Story = {
  args: {
    mark: <IngredientMark ingredient={garlic} />,
    action: <AddToBasketButton name="Garlic" />,
    children: (
      <>
        <p>Lemon&rsquo;s sharpness cuts through the richness of garlic cooked in oil or butter.</p>
        <Disclosure summary="More" hiddenSummary="about lemon and garlic">
          <p>Add the lemon off the heat or at the very end.</p>
        </Disclosure>
      </>
    ),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Garlic" })).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Add Garlic to your basket" })).toBeVisible();
  },
};

/** A dish, with its image across the top and a quiet note in the corner. */
export const Dish: Story = {
  args: {
    media: <ContentImage image={panSauceImage} sizes="20rem" decorative />,
    title: (
      <h3>
        <a href="#pan-sauce">Pan sauce</a>
      </h3>
    ),
    action: <Readiness missing={0} />,
    children: <p>Chicken thigh, garlic, lemon and basil.</p>,
  },
  decorators: [(Story) => <div style={{ maxWidth: "24rem" }}><Story /></div>],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("heading", { name: "Pan sauce" })).toBeVisible();
    await expect(canvas.getByText("Ready")).toBeVisible();
  },
};

export const TitleOnly: Story = {};
