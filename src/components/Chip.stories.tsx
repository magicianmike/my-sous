import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Chip } from "./Chip";
import { lemon } from "../../.storybook/fixtures";
import { PlusIcon } from "./PlusIcon";

const meta = {
  component: Chip,
  args: { children: "Lemon" },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};

/** On an Ingredient's wash, which the theme swaps for its dark pair. */
export const OnItsWash: Story = {
  args: { colour: lemon.colour },
  play: async ({ canvas }) => {
    const chip = canvas.getByText("Lemon").parentElement!;
    await expect(chip).toHaveClass("hue");
    await expect(chip.style.getPropertyValue("--wash-light")).toBe(lemon.colour.wash);
  },
};

/** Not in the basket yet. */
export const Dashed: Story = {
  args: { dashed: true },
};

/** An offer to add, as Suggestions shows one: the whole chip is the button. */
export const AnOfferToAdd: Story = {
  args: {
    colour: lemon.colour,
    dashed: true,
    trailing: <PlusIcon className="button-icon" />,
    children: (
      <>
        <span className="visually-hidden">Add </span>
        Lemon
        <span className="visually-hidden"> to your basket</span>
      </>
    ),
  },
  // In the Suggestions page's "Pairs well" section, whose styles unframe the button.
  render: (args) => (
    <section className="pairs-well" aria-label="Pairs well">
      <button type="button">
        <Chip {...args} />
      </button>
    </section>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Add Lemon to your basket" })).toBeVisible();
  },
};
