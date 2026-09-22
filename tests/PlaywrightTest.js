// const { chromium } = require("@playwright/test");

// let sq = (a)=>{
//     return a * a;
// }

// const fn1 = function(a){
//     return a * a;
// }

// console.log(sq(10));
// console.log(fn1(10));


import {Browser, chromium, test} from '@playwright/test'
let browser;
let page;

test.beforeAll("Before All", async()=>{
    browser = await chromium.launch();
    let context = await browser.newContext();
    page = await context.newPage();
})

test("Test1", async ()=>{
   await page.goto("https://playwright.dev/docs/api-testing");
})

test("Test2", async ()=>{
   await page.click("//a[text()='API']");
   await page.fill("//a[text()='API']");

   await page.locator("//a[text()='API']").click()
})

test("Test3", async ()=>{
   await page.goto("https://playwright.dev/docs/api-testing");
})
