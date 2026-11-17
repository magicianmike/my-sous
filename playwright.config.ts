import { defineConfig, devices } from "@playwright/test";

const port = 4173;

/** Runs against the static export in `out/`, so `npm run build` must run first. */
export default defineConfig({
  testDir: "e2e",
  forbidOnly: !!process.env.CI,
  // Tests run in parallel within a file too, so CI's shards split evenly; CI's runners have four cores.
  fullyParallel: true,
  workers: process.env.CI ? 4 : undefined,
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
