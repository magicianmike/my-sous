/// <reference types="vite/client" />
// Ingredients for stories, read from content/ so their names, colours and drawings stay the real ones.
import { parse } from "yaml";
import type { IngredientLook } from "@/components/IngredientMark";
import basilDrawing from "../content/ingredients/basil.svg?raw";
import basilMarkdown from "../content/ingredients/basil.md?raw";
import chickenThighDrawing from "../content/ingredients/chicken-thigh.svg?raw";
import chickenThighMarkdown from "../content/ingredients/chicken-thigh.md?raw";
import garlicDrawing from "../content/ingredients/garlic.svg?raw";
import garlicMarkdown from "../content/ingredients/garlic.md?raw";
import lemonDrawing from "../content/ingredients/lemon.svg?raw";
import lemonMarkdown from "../content/ingredients/lemon.md?raw";

function ingredient(id: string, markdown: string, drawing: string): IngredientLook {
  const { name, colour } = parse(markdown.split("---")[1]);
  return { id, name, colour, drawing };
}

export const lemon = ingredient("lemon", lemonMarkdown, lemonDrawing);
export const garlic = ingredient("garlic", garlicMarkdown, garlicDrawing);
export const chickenThigh = ingredient("chicken-thigh", chickenThighMarkdown, chickenThighDrawing);
export const basil = ingredient("basil", basilMarkdown, basilDrawing);
