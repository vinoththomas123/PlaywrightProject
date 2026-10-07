
import { chromium } from 'playwright';
export class PSC {
 /** @type {boolean} */
 isAppLaunched = false;
 /** @type {Browser|null} */
 browser = null;
 /** @type {BrowserContext|null} */
 context = null;
 /** @type {Page|null} */
 page;
 /**
 * @description
 * @type {string}
 * @memberof PSC
 */
 currentURL = null;
 constructor(page) {
  this.page = page;
 }
 async launchApp(browserType = 'chrome') {
  if (this.isAppLaunched)
   return this.page;
  switch (browserType.toLowerCase()) {
   case 'chrome': {
    // 1. Launch browser
    this.browser = await chromium.launch({
     headless: false,
     args: ['--start-maximized']
    });
    // 2. Create new context (test environment) - Creates an isolated environment (context) inside the browser.
    this.context = await this.browser.newContext({
     viewport: null,       // full window size
     deviceScaleFactor: undefined // avoid conflict
    });
    // 3. Open new browser tab 
    this.page = await this.context.newPage();
    this.isAppLaunched = true;
    console.log('Chrome browser launched successfully.');
    return this.page;
   }
   default:
    throw new Error(`${browserType} is unsupported. Please use Chrome.`);
  }
 }
 async openURL(url, timeout = 60000, waitForElement = "//oj-avatar") {
  // if (!this.page) throw new Error('Browser not launched. Call launchApp() first.');
  await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout });
  await this.page.waitForLoadState('load');
  // if (!this.page.isClosed()) {
  //  await this.page.waitForTimeout(20000);
  // }
  this.currentURL = await this.page.url();
  console.log("Current URL: " + this.currentURL);
  if (this.currentURL.includes('redwood')) {
   let signIn = this.page.getByText('Sign In');
   await signIn.waitFor({ state: 'attached', timeout });
  }
  else
   await this.page.locator(waitForElement).waitFor({ state: 'visible', timeout });
 }
 async closeApp() {
  if (this.browser) {
   await this.browser.close();
   this.isAppLaunched = false;
   this.page = null;
   this.context = null;
   this.browser = null;
   console.log('Browser closed.');
  }
 }
}
