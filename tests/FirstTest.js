// @ts-check
import { test, expect } from '@playwright/test';

test.beforeAll('Before All', async () => {  //before all and after all cannot have the page fixture passed as an argument
    console.log("Before All");
});

test.beforeEach('has title', async ({  }) => {
    console.log("Before Each");
});

test.afterAll('After All', async () => {
    console.log("After All");
});

test('has title', async ({ page }) => {
    console.log("Test1");
    await page.goto('https://playwright.dev/');
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
    console.log("Test2");
    await page.goto('https://playwright.dev/');
    // Click the get started link.
    // await page.getByRole('link', { name: 'Get started' }).click();
    await page.click("//*[text()='Get started']");
    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
    let title = await page.getByRole('heading', { name: 'Installing PlaywrightDirect' }).getAttribute("id");

    expect(title).toBe("installing-playwright");
});

test('First Test', async (fixtures) => {
    await fixtures.page.goto ("www.google.com")
});