import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn } from "storybook/test";
import { COMBINATION_LIMIT } from "@/kitchen/kitchen";
import { garlic, lemon } from "../../.storybook/fixtures";
import { buttonClass } from "./Button";
import type { IngredientLook } from "./IngredientMark";
import { TrayBar } from "./TrayBar";

const meta = {
  component: TrayBar<IngredientLook>,
  args: {
    ingredients: [lemon, garlic],
    limit: COMBINATION_LIMIT,
    onOpen: fn(),
    action: (
      <a href="#suggestions" className={buttonClass("primary")}>
        See what to make
      </a>
    ),
  },
} satisfies Meta<typeof TrayBar<IngredientLook>>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Its name starts with the words on screen, for voice control, then names what's in it. */
export const Glance: Story = {
  play: async ({ canvas, canvasElement, userEvent, args }) => {
    const opener = canvas.getByRole("button", { name: `Your basket 2 of ${COMBINATION_LIMIT}: Lemon, Garlic` });
    await expect(opener).toHaveAttribute("aria-haspopup", "dialog");
    // Two drawings, and an empty circle for each place still free.
    await expect(canvasElement.querySelectorAll(".ingredient-mark")).toHaveLength(2);
    await expect(canvasElement.querySelectorAll("[class*=free]")).toHaveLength(COMBINATION_LIMIT - 2);

    await userEvent.click(opener);
    await expect(args.onOpen).toHaveBeenCalledOnce();
  },
};

/** Nothing to glance at yet: no drawings, no empty circles, no action. */
export const Empty: Story = {
  args: { ingredients: [] },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByRole("button", { name: `Your basket 0 of ${COMBINATION_LIMIT}` })).toBeVisible();
    await expect(canvasElement.querySelectorAll("[class*=free]")).toHaveLength(0);
    await expect(canvas.queryByRole("link", { name: "See what to make" })).toBeNull();
  },
};
