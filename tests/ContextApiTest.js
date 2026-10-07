import { test, expect, request as PlaywrightRequest } from '@playwright/test'

let baseURL;
let config;
let apiContext;

test.beforeAll('Before', async () => {
    baseURL = "https://jsonplaceholder.typicode.com/posts/"

    config = {
        headers: {
            "Content-Type": "application/json"

        }
    }
    apiContext = await PlaywrightRequest.newContext();
});

test('Get Request', async ({ }) => {            //When using context do not pass it in the fixture
    let url = baseURL + "1";
    let response = await apiContext.get(url, { ...config, timeout: 30000 });
    let json = await response.json();
    console.log(json.id);
    console.log(response.status());
})

test('Post Request', async ({ }) => {        //When using context do not pass it in the fixture
    const payload = {
        "title": "Test title",
        "body": "Test content",
        "userId": 2
    }

    let response = await apiContext.post(baseURL, { ...config, data: payload, timeout: 30000 });
    console.log(response.status());
    expect(response.status()).toBe(201);
    console.log(await response.json());
})

test.afterAll("After All", async () => {
    await apiContext.dispose();
});
