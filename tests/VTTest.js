import {test, expect, Browser, chromium, Page} from '@playwright/test'

test("Test 1", async ({page})=>{
    await page.goto("https://practice.expandtesting.com/");
    await page.click("//*[text()='Test Login Page']");

    // await page.getByText("Test Login Page", {exact: true}).click();

    // await page.locator ("//*[text()='Test Login Page']").click();

    // await page.getByRole("link", {exact: true, name: 'Test Login Page'});

    // await expect (page).toHaveTitle("Test Login Page for Automation Testing Practice")


    // let count = await page.getByRole ("label", {"name": Username, exact:true}).count();
    // console.log(count);
});


test("Browser Test", async ({})=>{
    let browser = await chromium.launch();
    let context = await browser.newContext();
    let page = await context.newPage();
    await page.goto("https://practice.expandtesting.com/");
});



