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
import { expect,test, Browser, chromium  } from '@playwright/test';

test.describe("Actions Suite", () => {
    let timeout = { timeout: 30000 };

    let page

    let browser


    let context

    test.describe.configure({ mode: 'serial' });

    test.beforeAll("before All", async () => {
        test.setTimeout(60000);
        browser = await chromium.launch();
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/", timeout);
        await page.waitForLoadState("domcontentloaded");
    })

    test("Test -Mouse Down/Up -Moving to new tab and reading titles", async ({ }) => {
        let element = page.getByText("Open Tab")
        if (element)
            await element.scrollIntoViewIfNeeded();
        await element.focus();
        let isVisible = await element.isVisible();
        console.log("Is Visible: " + isVisible);
        await element.hover();
        await page.mouse.down();
        await element.hover();
        await page.mouse.up();
        await page.pause();
        await page.waitForTimeout(5000);
        
        //New Tab reading titles 
        const pages = context.pages();
        console.log(pages.length);

        for (const p of pages) {
            console.log(await p.title());
        }
    });

    test("Switching to the new tab - iFrame", async ({ }) => {
        let pages = await context.pages();
        let newPage = await pages[1];
        // let frame = await newPage.frameLocator("//iframe[@allow='microphone']");

        

    const frame = await newPage.frameLocator('iframe[allow*="microphone"]');
    await expect(frame).toHaveCount(1);
    // const cloudflareLink = frame.locator('a[href*="cloudflare.com/5xx-error-landing"]');

    // await cloudflareLink.waitFor({ state: "visible", timeout: 30000 });
    // await cloudflareLink.click();
    // console.log("Clicked Cloudflare link inside iframe");
  

        await frame.locator("//*[text()='What happened?']").click();
        
    });

    test("Test -Checkbox check", async ({ }) => {
        let element = page.locator("#checkBoxOption1");
        if (element)
            await element.check();
        await page.pause();
    });

    test("Test - Radio check", async ({ }) => {


        let element = page.locator("input[value='radio1']");

        await element.check();
        await page.pause();
    });



    test("Test - press keys", async ({ }) => {
        let element = page.getByPlaceholder("Type to Select Countries");
        await element.clear();
        await element.pressSequentially("India");
        await page.locator("//div[text()='India' and @class='ui-menu-item-wrapper']").waitFor({ state: "visible" });
        await page.click("//div[text()='India' and @class='ui-menu-item-wrapper']");
        await page.pause();
    });

    test("Test - Select Option", async ({ }) => {
        await page.locator("#dropdown-class-example").selectOption('Option1')
        await page.pause();
        await page.screenshot();
    });


    test("Test - Mouseover", async ({ }) => {
        let element = page.getByText("Mouse Hover", { exact: true });
        await element.scrollIntoViewIfNeeded();
        await element.hover();
        await page.getByText("Top", { exact: true }).click();
        await page.pause();
    });


    // test("Test - Switch to Frame", async ({page})=>{
    //     await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //     await page.frame()
    //     await page.getByRole("link", {name: "Top", exact: true}).click();
    //     await page.pause();
    // });
})


