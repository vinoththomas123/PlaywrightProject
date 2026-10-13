//click
//fill
//check checkbox/radio
//select dropdown
//mover over
//focus
//key press
//type chars
//drag and drop
//mousedown mouse up
//file upload
import { test, chromium } from '@playwright/test';
// import { ScreenshotHelper } from '../lib/reporters/screenshot-helper';
import ExtentReport from '../lib/reporters/extent-reporter';
import { ScreenReader } from '../lib/reporters/screenshots';

test.describe('Actions Suite', () => {
    const timeout = { timeout: 30000 };
    let page;
    let browser;
    let context;
    let screenshots;
    const url = 'https://rahulshettyacademy.com/AutomationPractice/';

    test.describe.configure({ mode: 'serial' });

    test.beforeAll('before All', async ({}, testInfo) => {
        test.setTimeout(60000);

        browser = await chromium.launch();
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto(url, timeout);
        await page.waitForLoadState('domcontentloaded');

        screenshots = new ScreenReader(page, testInfo);
    });

    test.beforeEach(async ({}, testInfo) => {
    });

    test('Test -Checkbox check', async () => {
        const element = page.locator('#checkBoxOption1');
        await element.check();
        await screenshots.addScreenshot();
        console.log('Vinoth Test');
        await screenshots.addScreenshot();
    });

    test('Test - Radio check', async () => {
        console.log("Test Radio");
        const element = page.locator("input[value='radio1']");
        await element.check();
        await screenshots.addScreenshot();
    });

    test('Test - press keys', async () => {
        console.log("Test Press Keys");
        const element = page.getByPlaceholder('Type to Select Countries');
        await element.clear();
        await element.pressSequentially('India');
        await page.locator("//div[text()='India' and @class='ui-menu-item-wrapper']")
            .waitFor({ state: 'visible' });
        await page.click("//div[text()='India' and @class='ui-menu-item-wrapper']");
        await screenshots.addScreenshot();
    });

    test('Test - Select Option', async () => {
        console.log("Test DD");
        await page.locator('#dropdown-class-example').selectOption('Option1');
        await screenshots.addScreenshot();
    });

    test('Test - Mouseover', async () => {
        console.log("Test Hover");
        const element = page.getByText('Mouse Hover', { exact: true });
        await element.scrollIntoViewIfNeeded();
        await element.hover();
        await page.getByText('Top', { exact: true }).click();
        await screenshots.addScreenshot();
    });

    test('Test -Mouse Down/Up -Moving to new tab and reading titles', async () => {
        console.log("Test Mouse clicks");
        const element = page.getByText('Open Tab');
        await element.scrollIntoViewIfNeeded();
        await element.focus();
        console.log('Is Visible: ' + await element.isVisible());
        await element.hover();
        await page.mouse.down();
        await element.hover();
        await page.mouse.up();
        await page.waitForTimeout(5000);

        const pages = context.pages();
        console.log(pages.length);

        for (const currentPage of pages) {
            console.log(await currentPage.title());
        }
        await screenshots.addScreenshot();
    });

    test('Switching to the new tab - iFrame', async () => {
        console.log("Test Switching windows");
        const pages = context.pages();
        const newPage = pages[1];

        if (!newPage) {
            throw new Error('The new tab was not opened.');
        }

        const frame = newPage.frameLocator('iframe[allow*="microphone"]');
        await frame.locator("//*[text()='What happened?']").click();
        await screenshots.addScreenshot();
    });

    test.afterAll(async () => {
        await browser?.close();
    });
});
