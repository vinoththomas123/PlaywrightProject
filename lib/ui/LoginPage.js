const { Page } = require('@playwright/test');
// import {test} from playwright;
const { Elements } = require('./elements');
export class LoginPage {
  /**
  * @param {Page} page
  */
  
  constructor(page) {
    /** @type {Page} */
    this.page = page
    this.elements = new Elements(this.page);
  }
  async signIn(username, password) {
    console.log("Sign in to the application");
    await this.page.locator("//oj-avatar").waitFor({ state: 'visible', timeout: 30000 });
    await this.page.locator("oj-avatar").click();
    // await this.page.waitForTimeout(2000);
    console.log("Click on Sign In option");
    await this.page.getByText("Sign In").click();
    await this.page.getByPlaceholder("User name or email").fill(username);
    await this.page.locator("//*[@id='idcs-signin-basic-signin-form-password|input']").fill(password);
    await this.page.locator("//*[text()='Sign In']").click();
    await this.page.waitForTimeout(3000);
    await this.page.waitForLoadState('domcontentloaded', { 'timeout': 30000 });
    console.log("Sign in to the application completed");
  }
  async signIn2(username, password) {
    console.log("Sign in to the application");
    this.currentURL = await this.page.url();
    if (this.currentURL.includes('redwood')){
      await this.page.locator("//oj-avatar").waitFor({ state: 'attached', timeout: 30000 });
      await jetSignIn.click();
    }
    // else{
    //   let vbSignIn = await this.elements.findElement({ text: "Sign in" });
    //   if (vbSignIn)
    //     await vbSignIn.click();
    // }
    // await this.page.waitForTimeout(2000);
    // console.log("Click on Sign In option");
    // // await this.page.getByText("Sign In").click();
    // await this.elements.click({ text: "Sign In" });
    // await this.page.getByPlaceholder("User name or email").fill(username);
    // await this.elements.fill({ id: "idcs-signin-basic-signin-form-username|input"}, username);
    await this.elements.fill({ xpath: "//*[@id='idcs-signin-basic-signin-form-username|input']"}, username);
    await this.elements.fill({ xpath: "//*[@id='idcs-signin-basic-signin-form-password|input']" }, password);
    await this.page.locator("//*[@id='idcs-signin-basic-signin-form-password|input']").fill(password);
    // await this.page.locator("//*[text()='Sign In']").click();
    // await this.page.waitForTimeout(3000);
    // await this.elements.waitForElement(3000);
    await this.page.waitForLoadState('domcontentloaded', { 'timeout': 30000 });
    console.log("Sign in to the application completed");
  }
}
