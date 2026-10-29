import { join, relative } from "node:path";
import { loadKitchen, type Kitchen } from "@/kitchen";

let kitchen: Promise<Kitchen> | undefined;

/** The Kitchen built from the real content. Any ContentError fails the build. */
export function getKitchen(): Promise<Kitchen> {
  kitchen ??= loadKitchen(join(process.cwd(), "content")).then((result) => {
    if (result.ok) return result.kitchen;
    const lines = result.errors.map((e) => `  ${relative(process.cwd(), e.file)}: ${e.message}`);
    throw new Error(`Content errors:\n${lines.join("\n")}`);
  });
  return kitchen;
}
