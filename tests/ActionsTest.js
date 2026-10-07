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
import { ScreenshotHelper } from '../lib/reporters/screenshot-helper';
import ExtentReport from '../lib/reporters/extent-reporter';

test.describe('Actions Suite', () => {
    const timeout = { timeout: 30000 };
    let page;
    let browser;
    let context;
    let screenshots;
    let logger;
    const url = 'https://rahulshettyacademy.com/AutomationPractice/';

    test.describe.configure({ mode: 'serial' });

    test.beforeAll('before All', async ({}, testInfo) => {
        test.setTimeout(60000);

        browser = await chromium.launch();
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto(url, timeout);
        await page.waitForLoadState('domcontentloaded');

        logger = new ExtentReport();
        screenshots = new ScreenshotHelper(page, testInfo);
    });

    test.beforeEach(async ({}, testInfo) => {
        logger.setTestInfo(testInfo);
        screenshots.setTestInfo(testInfo);
    });

    test('Test -Checkbox check', async () => {
        const element = page.locator('#checkBoxOption1');
        await element.check();
        await screenshots.takeScreenshot();
        await logger.addLog('Vinoth Test');
    });

    test('Test - Radio check', async () => {
        const element = page.locator("input[value='radio1']");
        await element.check();
    });

    test('Test - press keys', async () => {
        const element = page.getByPlaceholder('Type to Select Countries');
        await element.clear();
        await element.pressSequentially('India');
        await page.locator("//div[text()='India' and @class='ui-menu-item-wrapper']")
            .waitFor({ state: 'visible' });
        await page.click("//div[text()='India' and @class='ui-menu-item-wrapper']");
    });

    test('Test - Select Option', async () => {
        await page.locator('#dropdown-class-example').selectOption('Option1');
        await screenshots.takeScreenshot();
    });

    test('Test - Mouseover', async () => {
        const element = page.getByText('Mouse Hover', { exact: true });
        await element.scrollIntoViewIfNeeded();
        await element.hover();
        await page.getByText('Top', { exact: true }).click();
    });

    test('Test -Mouse Down/Up -Moving to new tab and reading titles', async () => {
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
    });

    test('Switching to the new tab - iFrame', async () => {
        const pages = context.pages();
        const newPage = pages[1];

        if (!newPage) {
            throw new Error('The new tab was not opened.');
        }

        const frame = newPage.frameLocator('iframe[allow*="microphone"]');
        await frame.locator("//*[text()='What happened?']").click();
    });

    test.afterAll(async () => {
        await browser?.close();
    });
});
