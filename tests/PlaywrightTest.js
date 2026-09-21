import { test } from '@playwright/test';

test('First Test', async ({page}) => {
    await page.goto ("https://www.google.co.in")
});

