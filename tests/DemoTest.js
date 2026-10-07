import {test} from '@playwright/test'


test("Test1", async ({page})=>{
   await page.goto("https://playwright.dev/docs/api-testing");
   await page.getByRole("link", {exact:true, name: "API"}).click();
 
})

test("Test2", async ({page})=>{
//    await page.click("//a[text()='API']");

//    let ele = await page.locator("//a[text()='API']")
//    await ele.fill("sdfgsd");

   page.pause();
    page.waitForTimeout(10000);
})


