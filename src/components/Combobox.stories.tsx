import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn } from "storybook/test";
import { Combobox } from "./Combobox";

type Ingredient = { id: string; name: string };

const ingredients: Ingredient[] = [
  { id: "garlic", name: "Garlic" },
  { id: "ginger", name: "Ginger" },
  { id: "lemon", name: "Lemon" },
  { id: "lime", name: "Lime" },
];

const meta = {
  component: Combobox<Ingredient>,
  args: {
    label: "Find an ingredient",
    search: (query: string) =>
      query.trim() ? ingredients.filter(({ name }) => name.toLowerCase().includes(query.trim().toLowerCase())) : [],
    getKey: ({ id }: Ingredient) => id,
    getLabel: ({ name }: Ingredient) => name,
    onChoose: fn(),
    countNoun: ["ingredient", "ingredients"],
    noMatch: (query: string) => `“${query}” isn’t in MySous yet.`,
  },
} satisfies Meta<typeof Combobox<Ingredient>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  play: async ({ canvas }) => {
    const field = canvas.getByRole("combobox", { name: "Find an ingredient" });
    await expect(field).toHaveAttribute("aria-expanded", "false");
    await expect(canvas.getByRole("listbox", { hidden: true })).not.toBeVisible();
  },
};

/** Typing shows the matches and says how many there are. */
export const Matches: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("combobox"), "li");
    await expect(canvas.getByRole("combobox")).toHaveAttribute("aria-expanded", "true");
    await expect(canvas.getAllByRole("option").map((option) => option.textContent)).toEqual(["Garlic", "Lime"]);
    await expect(canvas.getByRole("status")).toHaveTextContent("2 ingredients found.");
  },
};

/** Down and Up move through the matches, wrapping; Enter chooses. */
export const ChooseFromTheKeyboard: Story = {
  play: async ({ canvas, userEvent, args }) => {
    const field = canvas.getByRole("combobox");
    await userEvent.type(field, "l");
    // Garlic, Lemon, Lime: Up from nothing goes to the last.
    await userEvent.keyboard("{ArrowUp}");
    await expect(canvas.getByRole("option", { name: "Lime" })).toHaveAttribute("aria-selected", "true");
    await expect(field).toHaveAttribute("aria-activedescendant", canvas.getByRole("option", { name: "Lime" }).id);

    await userEvent.keyboard("{ArrowDown}");
    await expect(canvas.getByRole("option", { name: "Garlic" })).toHaveAttribute("aria-selected", "true");

    await userEvent.keyboard("{Enter}");
    await expect(args.onChoose).toHaveBeenCalledWith({ id: "garlic", name: "Garlic" });
  },
};

export const ChooseWithAClick: Story = {
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.type(canvas.getByRole("combobox"), "gin");
    await userEvent.click(canvas.getByRole("option", { name: "Ginger" }));
    await expect(args.onChoose).toHaveBeenCalledWith({ id: "ginger", name: "Ginger" });
  },
};

/** The first Escape closes the list; a second clears the field. */
export const Escape: Story = {
  play: async ({ canvas, userEvent }) => {
    const field = canvas.getByRole("combobox");
    await userEvent.type(field, "lem");
    await userEvent.keyboard("{Escape}");
    await expect(field).toHaveAttribute("aria-expanded", "false");
    await expect(field).toHaveValue("lem");

    await userEvent.keyboard("{Escape}");
    await expect(field).toHaveValue("");
  },
};

export const NoMatch: Story = {
  args: { noMatchHint: "Try a broader word, such as “citrus”." },
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("combobox"), "yuzu");
    await expect(canvas.getByRole("status")).toHaveTextContent("“yuzu” isn’t in MySous yet.");
    await expect(canvas.getByText("Try a broader word, such as “citrus”.")).toBeVisible();
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("combobox")).toBeDisabled();
  },
};
