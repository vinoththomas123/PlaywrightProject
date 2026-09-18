// import { request as playwrightRequest } from '@playwright/test';
export class RestBase {
  defaultTimeout = 30000;
  constructor(apiContext) {
    this.apiContext = apiContext; // store APIRequestContext
  }
  // 🔹 GET Request
  async getRequest(uri, config = {}, timeout = this.defaultTimeout) {
    console.log("GET Request");
    console.log("Request URI:", uri);
    console.log("Request Config:", config);
    const context = this.apiContext || (await playwrightRequest.newContext());
    let response;
    try {
      response = await context.get(uri, {
        ...config,
        timeout: timeout
      });
      console.log('Status:', response.status());
      return await this.checkAndLogResponse(response);
    } catch (err) {
      // 🔹 Network or DNS errors
      console.error('❌ Network Error while sending GET request');
      console.error('Error name:', err.name);
      console.error('Error message:', err.message);
      // throw new Error(`Network error calling ${uri}: ${err.message}`);
    }
    if (!this.apiContext) await context.dispose();
    return response;
  }
  // 🔹 POST Request
  async postRequest(uri, config = {}, payload = {}, timeout = this.defaultTimeout) {
    console.log("POST Request");
    console.log("Request URI:", uri);
    console.log("Request Config:", config);
    console.log("Payload:", payload, null, 2);
    const context = this.apiContext || (await playwrightRequest.newContext());
    let response;
    try {
      response = await context.post(uri, {
        ...config,
        data: payload, // ✅ this is how you send JSON body
        timeout: timeout
      });
      console.log('Status:', response.status());
      return await this.checkAndLogResponse(response);
    } catch (err) {
      // 🔹 Network or DNS errors
      console.error('❌ Network Error while sending Post request');
      console.error('Error name:', err.name);
      console.error('Error message:', err.message);
    }
    if (!this.apiContext) await context.dispose();
    return response;
  }
  async patchRequest(url, config = {}, payload, timeout = this.defaultTimeout) {
    console.log("Patch Request: " + url);
    console.log(config);
    console.log(payload);
    const context = this.apiContext || (await playwrightRequest.newContext());
    let response;
    try {
      response = await context.patch(url, {
        ...config,
        timeout: timeout,
        data: payload
      });
      console.log("Response Status: " + response.status());
      return await this.checkAndLogResponse(response);
    } catch (err) {
      console.error('❌ Network Error while sending Patch request');
      console.error('Error name:', err.name);
      console.error('Error message:', err.message);
    }
    if (!this.apiContext) await context.dispose();
    return null
  }
  async deleteRequest(url, config = {}, timeout = this.defaultTimeout) {
    console.log("Delete Request: " + url);
    console.log(config);
    const context = this.apiContext || (await playwrightRequest.newContext());
    let response;
    try {
      response = await context.delete(url, {
        ...config,
        timeout: timeout
      });
      console.log("Response Status: " + response.status());
      return await this.checkAndLogResponse(response);
    } catch (err) {
      console.error('❌ Network Error while sending Delete request');
      console.error('Error name:', err.name);
      console.error('Error message:', err.message);
    }
    if (!this.apiContext) await context.dispose();
    return null
  }
  async checkAndLogResponse(response) {
    try {
      let result = await response.json();
      let jsonStr = JSON.stringify(result, null, 2);
      console.log('✅ Proper json response obtained:', jsonStr);
      return result;
    } catch (error) {
      console.log("Catched Error while manipulating response json: " + error);
      const responseText = await response.text();
      console.log('❌ Non-JSON response:', responseText);
      return responseText;
    }
  }
}