// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/** @type {import('@playwright/test').PlaywrightTestConfig} */
module.exports = defineConfig({
  testDir: './tests',
  testMatch: ['**/*Test.js', '**/*spec.js'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,  //if CI is non empty in .env file then retry is set to 2 else 1
  workers: process.env.CI ? 1 : undefined,
  timeout: Number(process.env.TIMEOUT || 30*1000),    //Set timeout in playwright.config.js. It controls the maximum duration of each test, in milliseconds.
  // reporter: [['html', { open: 'never' }], ['list']],
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
    ['./lib/reporters/extent-reporter.js']
  ],
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true,
    actionTimeout: 10 * 1000,      // click, fill, etc.
    navigationTimeout: 20 * 1000,  // page.goto(), reload(), etc.
    
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


