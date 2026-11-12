import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
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
  viteFinal: (config, { configType }) => ({
    ...config,
    // The site's public/ is served while working, for content images at /images. It's not copied into
    // the build, which Vite does by default: Storybook is built into public/, at /storybook, and there
    // the site itself serves /images.
    publicDir: configType === "PRODUCTION" ? false : fileURLToPath(new URL("../public", import.meta.url)),
    plugins: [rawSvg, ...(config.plugins ?? [])],
  }),
};

export default config;
