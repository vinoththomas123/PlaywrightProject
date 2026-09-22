import { test } from '@playwright/test'



test.describe("API Suite", () => {
    let baseURL = "https://jsonplaceholder.typicode.com/posts/1";
    let config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    test("get Request", async ({ request }) => {
        
        let response = await request.get(baseURL, {
            ...config,
            timeout: 30000
        })

        console.log(response.json());
        let result = await response.json();
        let jsonStr = JSON.stringify(result, null, 2);
        console.log('Response data:  ---> ', jsonStr);
    });

    test("patch Request", async ({ request }) => {
        let response = await request.get(baseURL, {
            ...config,
            timeout: 30000,
            data: { "title": "Modified Title" }
        })

        console.log(response.json());
        let result = await response.json();
        let jsonStr = JSON.stringify(result, null, 2);
        console.log('Response data:  ---> ', jsonStr);
    });
});
