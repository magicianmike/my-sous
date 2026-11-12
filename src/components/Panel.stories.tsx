import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Button } from "./Button";
import { Panel } from "./Panel";

const meta = {
  component: Panel,
  args: {
    title: "Not everything pairs yet",
    titleId: "not-everything-pairs",
    children: (
      <>
        <p>Chicken thigh and basil don&rsquo;t have a Pairing in MySous.</p>
        <Button variant="primary">Swap basil for cilantro</Button>
      </>
    ),
  },
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Its heading names the landmark. */
export const Section: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("region", { name: "Not everything pairs yet" })).toBeVisible();
    // Focusable from script, so a container can move focus to it, but not a tab stop.
    await expect(canvas.getByRole("heading", { name: "Not everything pairs yet" })).toHaveAttribute("tabindex", "-1");
  },
};

/** Complementary content, with something beside its title. */
export const Aside: Story = {
  args: { as: "aside", title: "Your basket", titleId: "your-basket", titleExtra: "2 of 6", children: <p>Lemon, garlic</p> },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("complementary", { name: "Your basket 2 of 6" })).toBeVisible();
  },
};
