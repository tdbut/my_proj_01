// @ts-check
import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  workers: 1,
  fullyParallel: true,
  testMatch: '**/*.spec.js',
  retries: 2,
  reporter: [['list'], ['html'], ['allure-playwright']],
  use: {
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    actionTimeout: 10000,
  },
  projects: [
    {
      name: 'api',
      testMatch: 'api.spec.js',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'ui-demowebshop',
      testMatch: 'uiTests.spec.js',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://demowebshop.tricentis.com',
      },
    },
    {
      name: 'realworld',
      testMatch: 'page.object.tests.spec.js',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://realworld.qa.guru',
      },
    },
  ],
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
});
