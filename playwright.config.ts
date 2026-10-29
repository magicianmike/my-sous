import { defineConfig, devices } from "@playwright/test";

const port = 4173;

/** Runs against the static export in `out/`, so `npm run build` must run first. */
export default defineConfig({
  testDir: "e2e",
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? "github" : "list",
  use: { baseURL: `http://localhost:${port}` },
  projects: [
    { name: "phone", use: { ...devices["Pixel 7"] } },
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: `npx serve out --listen ${port} --no-request-logging`,
    port,
    reuseExistingServer: !process.env.CI,
  },
});
