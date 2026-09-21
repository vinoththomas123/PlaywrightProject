
import { test, expect } from '@playwright/test';
test('test', async ({ page }) => {
    test.setTimeout(100000);
    await page.goto('https://cptbwzsqy.fusionapps.ocs.oc-test.com/fscmUI/redwood/license-permit-self-service/public-user/home');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('textbox', { name: 'User ID' }).fill('psc_superuser');
    await page.getByRole('textbox', { name: 'User ID' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('Welcome1');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.goto('https://cptbwzsqy.fusionapps.ocs.oc-test.com/fscmUI/faces/FuseWelcome?_afrLoop=11603634736369713&_afrWindowMode=0&_afrWindowId=null&_adf.ctrl-state=mzfdpcqyh_1&_afrFS=16&_afrMT=screen&_afrMFW=1280&_afrMFH=720&_afrMFDW=1280&_afrMFDH=720&_afrMFC=8&_afrMFCI=0&_afrMFM=0&_afrMFR=96&_afrMFG=0&_afrMFS=0&_afrMFO=0');
    await page.getByRole('link', { name: 'Settings and Actions' }).click();
    await page.getByRole('link', { name: 'Sign Out' }).click();
    await page.getByRole('button', { name: 'Confirm' }).click();
});
