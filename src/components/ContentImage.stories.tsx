import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, waitFor } from "storybook/test";
import { garlicImage, panSauceImage } from "../../.storybook/fixtures";
import { BANNER_SIZES, ContentImage } from "./ContentImage";

const meta = {
  component: ContentImage,
  args: { image: panSauceImage, sizes: BANNER_SIZES },
} satisfies Meta<typeof ContentImage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The image's file arrives and is drawn, not left broken. */
async function loaded(image: HTMLImageElement) {
  await waitFor(() => expect(image.complete && image.naturalWidth > 0).toBe(true), { timeout: 5000 });
}

/** A dish's header: on the first screen, so fetched at once, with what it's made of before the note. */
export const DishHeader: Story = {
  args: { priority: true, caption: "As written: chicken thigh, garlic, lemon and basil." },
  play: async ({ canvas }) => {
    const image = canvas.getByRole<HTMLImageElement>("img", { name: panSauceImage.alt });
    await expect(image).toHaveAttribute("loading", "eager");
    await expect(image).toHaveAttribute("fetchpriority", "high");
    // Its size is given, so its space is kept before it arrives.
    await expect(image).toHaveAttribute("width", "1536");
    await expect(image).toHaveAttribute("height", "1024");
    await expect(canvas.getByRole("figure")).toHaveTextContent(
      "As written: chicken thigh, garlic, lemon and basil. AI-generated image",
    );
    await loaded(image);
  },
};

/** An Ingredient's banner, still a placeholder: the note sits on the image's top corner. */
export const Placeholder: Story = {
  args: { image: garlicImage, priority: true, noteOnImage: true },
  play: async ({ canvas }) => {
    const image = canvas.getByRole<HTMLImageElement>("img", { name: garlicImage.alt });
    await expect(canvas.getByText("Placeholder image")).toBeVisible();
    await loaded(image);
  },
};

/** On a Suggestion card: hidden from screen readers, since the card's heading names the dish, and lazy. */
export const OnACard: Story = {
  args: { decorative: true, sizes: "20rem" },
  decorators: [(Story) => <div style={{ maxWidth: "20rem" }}><Story /></div>],
  play: async ({ canvasElement, canvas }) => {
    const image = canvasElement.querySelector("img")!;
    await expect(image).toHaveAttribute("alt", "");
    await expect(image).toHaveAttribute("loading", "lazy");
    await expect(canvas.queryByRole("img")).toBeNull();
    // The note is still in words beside it.
    await expect(canvas.getByText("AI-generated image")).toBeVisible();
    await loaded(image);
  },
};
