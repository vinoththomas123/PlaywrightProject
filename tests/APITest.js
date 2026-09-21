import { test, expect, request as playwrightRequest } from '@playwright/test';
import { RestBase } from '../lib/api/ApiBase';

test.describe('API flow', () => {
  //To make the test blocks to run in serial mode
  test.describe.configure({ mode: 'serial' });
  // Command to Run the test: 
  // npx playwright test "tests/APISampleTest.api.test.js"
  let apiContext;
  //This type declaration gives us the intelliSence of the methods and parameters
  /**
  *@type {RestBase}
  */
  let rest;
  let hostName = "cptcgykqy.fusionapps.ocs.oc-test.com";
  const config = {
    headers: {
      'Authorization': 'Basic Q09ERV9FTkZPUkNFTUVOVF9BUFBfQURNSU46V2VsY29tZTE=',
      'Content-Type': 'application/vnd.oracle.adf.resourceItem+json'
    }
  };

  const baseURL = "https://" + hostName + "/fscmRestApi/resources/11.13.18.05";

  let href;

  test.beforeAll(async () => {
    apiContext = await playwrightRequest.newContext();
    rest = new RestBase(apiContext);
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test('GET Request test', async () => {
    let getURI = baseURL + "/publicSectorThemeDefinitions";
    let response = await rest.getRequest(getURI, config);
    // console.log("response: ");
    // console.log(response, null, 2);
    let href = response.items[0].links[0].href;
    console.log("Href: " + href);
    let firstHref = null;

    for (i = 0; i < response.items.length; i++) {
      const links = response.items[i].links;
      if (links && links.length > 0) {
        firstHref = links[0].href;
        break; // stop after getting the first one
      }
    }
    console.log(firstHref);
    for (const i in response.items) {
      const href = response.items[i].links[0].href;
      console.log(href)
    }
  });

  test('Post Request test 2', async () => {
    const postPayload = {
      "ThemeId": "TEST04",
      "Label": "TEST04",
      "Description": "TEST04"
    }
    const response = await rest.postRequest(baseURL + "/publicSectorThemeDefinitions", config, postPayload);
    // console.log("response: ");
    // console.log(response, null, 2);
    href = response.links[0].href;
    console.log("href: ", href);
  });

  test('Patch Request Test', async () => {
    const payload = {
      "Label": "TEST Modified",
    }
    const response = await rest.patchRequest(href, config, payload);
    // console.log("response: ");
    // console.log(response, null, 2);
    let href = response.links[0].href;
    console.log("href: ", href);
  });

  test('Delete Request Test', async () => {
    const response = await rest.deleteRequest(href, config, payload);
    // console.log("response: ");
    // console.log(response, null, 2);
    // let href = response.links[0].href;
    // console.log("href: ", href);
  });
  // it.skip("Get Profile link href", async function () {
  //   let url = baseURL + "publicSectorRegistryItemDefinitions?q=RegistryName%3D%27DEFAULT%27&expand=Attributes,Configurations";
  //   logger.log("URL: " + url);
  //   logger.log("Headers: ");
  //   logger.log(config);
  //   let res = await rest.performGet(url, "response", config, 200);
  //   logger.log('Result Status: ' + res.status + " Result Data: ");
  //   let resData = res.data;
  //   logger.log(resData);
  //   for (let i = 0; i < res.data.count; i++) {
  //    let configCount = res.data.items[i].Configurations.count;
  //    // console.log(configCount);
  //    if (configCount > 0) {
  //     // console.log(res.data.items[i].Configurations)
  //     for (let j = 0; j < configCount; j++) {
  //      try {
  //       let configJson = res.data.items[i].Configurations.items
  //       let itemName: string = jsonpath.query(configJson, '$..ItemName')[0];
  //       let attributeLongValue: string = jsonpath.query(configJson, '$..AttributeLongValue')[0];
  //       console.log(res.data.items[i].Configurations);
  //       if (itemName == "PSCPBL_HEADER_WIDGET_SWITCHPF") {
  //        profilePatchHref = jsonpath.query(configJson, '$..href')[1];
  //        console.log("detected: " + profilePatchHref);
  //        let arrayOfAtrLongVal = attributeLongValue.split("\"}");
  //        await logger.log(arrayOfAtrLongVal);
  //        vb_related_links = arrayOfAtrLongVal[0] + ", " + headerlink + "\"}";
  //        await logger.log(vb_related_links);
  //        break;
  //       }
  //      } catch (error) {
  //       console.log("Catch block.." + i);
  //      }
  //     }
  //     if (vb_related_links!=null)
  //      break;
  //    }
  //   }
  //  });
});
