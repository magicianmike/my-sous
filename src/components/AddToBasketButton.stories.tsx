import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { expect, fn } from "storybook/test";
import { AddToBasketButton } from "./AddToBasketButton";

const meta = {
  component: AddToBasketButton,
  args: { name: "Garlic", onClick: fn() },
} satisfies Meta<typeof AddToBasketButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A basket and a plus on screen; the words in its name. */
export const Add: Story = {
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Add Garlic to your basket" }));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

/** Outlined, for where many sit together, such as the Ingredients list. */
export const Secondary: Story = {
  args: { emphasis: "secondary" },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Add Garlic to your basket" });
    await expect(getComputedStyle(button).backgroundColor).toBe("rgba(0, 0, 0, 0)");
  },
};

export const Added: Story = {
  args: { added: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Remove Garlic from your basket" })).toHaveTextContent(/^Remove/);
  },
};

/** The same button turns to Remove, so keyboard focus stays on it after a press. */
export const AddThenRemove: Story = {
  render: function Render(args) {
    const [added, setAdded] = useState(false);
    return <AddToBasketButton {...args} added={added} onClick={() => setAdded(!added)} />;
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    await userEvent.keyboard("{Enter}");
    const button = canvas.getByRole("button", { name: "Remove Garlic from your basket" });
    await expect(button).toHaveFocus();
  },
};
