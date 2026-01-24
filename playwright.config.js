// @ts-check
import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',

  workers: 1,

  fullyParallel: false,

  retries: 0,

  reporter: 'html',

  use: {
    baseURL: 'https://realworld.qa.guru',

    screenshot: 'only-on-failure',

    trace: 'retain-on-failure',

    actionTimeout: 10000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  timeout: 30000,

  expect: {
    timeout: 5000,
  },
});