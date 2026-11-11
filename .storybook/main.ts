import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.tsx"],
  addons: ["@storybook/addon-vitest", "@storybook/addon-a11y"],
  framework: "@storybook/nextjs-vite",
  // Not the site's public/, which Vite copies in by default: Storybook is built into it, at /storybook,
  // and its stories need none of it.
  viteFinal: (config) => ({ ...config, publicDir: false }),
};

export default config;
