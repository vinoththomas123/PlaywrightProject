
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../lib/ui/LoginPage');
const { PSC } = require('../lib/ui/psc');
//Run tests command: npx playwright test "tests/LoginToPSC.test.js" --project=chromium
/** @type {PSC} */
let psc; // shared PSC instance
let page;
// 🔄 Run tests in serial mode
test.describe.configure({ mode: 'serial' });
const url = "https://cptcgykqy.fusionapps.ocs.oc-test.com/fscmUI/redwood/";
const username = "psc_superuser";
const password = "Welcome1";

test.beforeAll(async () => {
    console.log("⚡ Before All: launching app...");
    test.setTimeout(100000);
    psc = new PSC();
    await psc.launchApp('chrome');
    page = psc.page;
});
test.beforeEach(async () => {
    console.log("➡️ Before Each test");
});

test('Test 1: Lauch url', async () => {
    console.log("🧪 Test 1: Navigating to Avatar URL");
    await psc.openURL(url, 90000);
    console.log("✅ Launch app test completed");
}, 100000);

test('Test 2: Login to application', async () => {
    console.log("🧪 Test 1: Navigating to Avatar URL");
    // test.setTimeout(300000);
    const loginPage = new LoginPage(page);
    // await loginPage.signIn(username, password);
    await loginPage.signIn2(username, password);
    console.log("✅ Login to app test completed");
}, 100000);

test.afterAll(async () => {
    console.log("🛑 After All: closing app...");
    if (psc) await psc.closeApp();
});
