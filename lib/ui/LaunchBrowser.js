
import { test, exact, chromium, Browser, Page } from '@playwright/test';
import { before } from 'node:test';
/** @type {Browser|null} */
let browser;
/** @type {Page|null} */
let page
/** @type {BrowserContext|null} */
let context
test.beforeAll('Before block', async () => {
    browser = await chromium.launch({
        arg: ['--start-maximized'],
        headless: false
    });
    context = await browser.newContext({
        viewport: null,
        deviceScaleFactor: undefined,
    });
    page = await context.newPage();
    await page.goto("https://www.google.co.in");
})
test('Test1', async () => {
    await page.goto("https://www.google.co.in");
    await page.locator("textarea[name='q']").fill("hi vinoth");
});
