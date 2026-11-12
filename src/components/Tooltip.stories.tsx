import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, waitFor } from "storybook/test";
import { lemon } from "../../.storybook/fixtures";
import { IngredientMark } from "./IngredientMark";
import { Tooltip } from "./Tooltip";

const meta = {
  component: Tooltip,
  args: {
    label: "Lemon",
    children: (
      <a href="#lemon" className="mark-link mark-alone" aria-label="Lemon">
        <IngredientMark ingredient={lemon} size="sm" />
      </a>
    ),
  },
  // Room above, where it shows.
  decorators: [(Story) => <div style={{ paddingTop: "var(--space-6)" }}><Story /></div>],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Visual only: the control's own name already has its words. */
export const OnHover: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    const link = canvas.getByRole("link", { name: "Lemon" });
    await userEvent.hover(link);
    const tooltip = await waitFor(() => canvasElement.ownerDocument.querySelector<HTMLElement>("[class*=tooltip]")!);
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveTextContent("Lemon");
    await expect(tooltip).toHaveAttribute("aria-hidden", "true");

    await userEvent.unhover(link);
    await waitFor(() => expect(canvasElement.ownerDocument.querySelector("[class*=tooltip]")).toBeNull());
  },
};

/** Shows on keyboard focus too, and Escape dismisses it (WCAG 1.4.13). */
export const OnFocus: Story = {
  play: async ({ canvasElement, userEvent }) => {
    const shown = () => canvasElement.ownerDocument.querySelector<HTMLElement>("[class*=tooltip]");
    await userEvent.tab();
    await waitFor(() => expect(shown()).toBeVisible());

    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(shown()).toBeNull());
  },
};

/** Describes the control, for a link that only says "Source". */
export const Describes: Story = {
  args: {
    label: "Salt, Fat, Acid, Heat (Samin Nosrat, 2017)",
    describes: true,
    children: <a href="#source">Source</a>,
  },
  play: async ({ canvas }) => {
    // In the page while hidden, so it's read as the link's description.
    await expect(canvas.getByRole("link", { name: "Source" })).toHaveAccessibleDescription(
      "Salt, Fat, Acid, Heat (Samin Nosrat, 2017)",
    );
  },
};

/** No label: nothing shows, and the control stays where it is. */
export const NoLabel: Story = {
  args: { label: null },
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.hover(canvas.getByRole("link", { name: "Lemon" }));
    await expect(canvasElement.ownerDocument.querySelector("[class*=tooltip]")).toBeNull();
  },
};
