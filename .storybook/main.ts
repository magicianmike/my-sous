import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import type { StorybookConfig } from "@storybook/nextjs-vite";
import type { Plugin } from "vite";

/**
 * An SVG imported with `?raw` as its text, as Vite does it, before the Next.js framework's image
 * plugin claims every .svg as an image. Stories read Ingredients' drawings from content/ this way.
 */
const rawSvg: Plugin = {
  name: "my-sous:raw-svg",
  enforce: "pre",
  resolveId(source, importer) {
    // Resolved by hand: through Vite, the image plugin would claim the bare .svg too.
    if (!source.endsWith(".svg?raw") || !importer) return null;
    return `\0raw-svg:${resolve(dirname(importer), source.slice(0, -"?raw".length))}`;
  },
  async load(id) {
    if (!id.startsWith("\0raw-svg:")) return null;
    return `export default ${JSON.stringify(await readFile(id.slice("\0raw-svg:".length), "utf8"))};`;
  },
};

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.tsx"],
  addons: ["@storybook/addon-vitest", "@storybook/addon-a11y"],
  framework: "@storybook/nextjs-vite",
  viteFinal: (config) => ({
    ...config,
    // Not the site's public/, which Vite copies in by default: Storybook is built into it, at
    // /storybook, and its stories need none of it.
    publicDir: false,
    plugins: [rawSvg, ...(config.plugins ?? [])],
  }),
};

export default config;
