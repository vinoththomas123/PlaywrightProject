import { test, expect } from '@playwright/test';
import { ScreenReader } from '../lib/reporters/screenshots';


test('test', async ({ page }, testInfo) => {
  let screenReader = new ScreenReader(page, testInfo);

  await page.goto('https://playwright.dev/');
  console.log("Log 1")
  await screenReader.addScreenshot();
  
  await page.getByRole('link', { name: 'Get started' }).click();
  await page.getByRole('link', { name: 'Command line' }).click();
  let element = page.getByRole('heading', { name: 'Run TestsDirect link to Run' })
  await expect(element).toHaveCount(1);
  await screenReader.addScreenshot();
  console.log("Log 2")
  await page.getByRole('link', { name: 'Writing tests', exact: true }).click();
  await page.getByRole('link', { name: 'How to write the first test' }).click();
  await page.getByRole('heading', { name: 'First testDirect link to' }).click();
  await page.getByRole('link', { name: 'Installation', exact: true }).click();
  await page.getByRole('link', { name: 'Next Writing tests »' }).click();
  console.log("Log 3")
  await screenReader.addScreenshot();
});