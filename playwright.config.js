// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/** @type {import('@playwright/test').PlaywrightTestConfig} */
module.exports = defineConfig({
  testDir: './tests',
  testMatch: '**/*Test.js',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'api',
      testMatch: ['**/*ApiTest.js', '**/*APITest.js'],
      use: { baseURL: process.env.API_BASE_URL }
    },
    {
      name: 'chromium',
      testIgnore: ['**/*ApiTest.js', '**/*APITest.js'],
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      testIgnore: ['**/*ApiTest.js', '**/*APITest.js'],
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      testIgnore: ['**/*ApiTest.js', '**/*APITest.js'],
      use: { ...devices['Desktop Safari'] }
    }
  ],
  outputDir: 'test-results'
});


