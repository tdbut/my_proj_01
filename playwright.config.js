// @ts-check
import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',

  workers: 1,

  fullyParallel: true,

  testMatch: '**/*.spec.js',
  
  retries: 2,

  reporter: 'html',

  use: {
    baseURL: 'https://realworld.qa.guru',

    screenshot: 'only-on-failure',

    // @ts-ignore
    trace:  'on-first-retry',

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