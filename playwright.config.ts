import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  webServer: {
    command: "npm run dev",
    port: 5173,
    timeout: 120000,
    reuseExistingServer: !process.env.CI,
  },
  use: { baseURL: "http://localhost:5173" },
};
export default config;
