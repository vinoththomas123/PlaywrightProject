import { test, expect } from '@playwright/test'

let baseURL;
let config;

test.beforeAll('Before', () => {
    baseURL = "https://jsonplaceholder.typicode.com/posts/"

    config = {
        headers: {
            "Content-Type": "application/json"

        }
    }
});

test('Get Request', async ({ request }) => {
    let url = baseURL + "1";
    let response = await request.get(url, { ...config, timeout: 30000 });
    let json = await response.json();
    console.log(json.id);
    console.log(response.status());
})

test('Post Request', async ({ request }) => {
    const payload = {
        "title": "Test title",
        "body": "Test content",
        "userId": 1
    }

    let response = await request.post(baseURL, { ...config, data: payload, timeout: 30000 });
    console.log(response.status());
    expect(response.status()).toBe(201);
    console.log(await response.json());
})
