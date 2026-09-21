/**
* @typedef {Object} LocatorOptions
* @property {string} [css]
* @property {string} [xpath]
* @property {string} [text]
* @property {boolean} [exact]
* @property {string} [role]
* @property {string} [name]
* @property {string} [placeholder]
* @property {string} [label]
* @property {string} [testId]
* @property {number} [timeout]
*/
export class Elements {
    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page) {
        this.page = page;
        this.defaultTimeout = 30000;
    }
    async sleep(timeout) {
        await this.page.waitForTimeout(timeout);
    }
    /**
    * Find an element using multiple strategies
    * @param {LocatorOptions} options
    * @returns {import('@playwright/test').Locator}
    */
    async findElement(options) {
        const { css, xpath, text, exact = true, role, name, placeholder, label, testId, id, timeout = this.defaultTimeout, state = 'visible' } = options;
        let element;
        if (css) element = this.page.locator(css);
        else if (xpath) element = this.page.locator(`xpath=${xpath}`);   //is same as this.page.locator('//xapth')
        else if (text && exact) element = this.page.getByText(text, { exact: true });
        else if (text && !exact) element = this.page.getByText(text, { exact: false });
        else if (role && name) element = this.page.getByRole(role, { name }); //need to pass arguments as page.findElement ("role" {name: "namevalue"});
        else if (role) element = this.page.getByRole(role);
        else if (placeholder) element = this.page.getByPlaceholder(placeholder);
        else if (label) element = this.page.getByLabel(label);
        else if (testId) element = this.page.getByTestId(testId);
        else if (id) element = this.page.locator(`#${id}`);   //is same as this.page.locator('id='+ idValue)
        else throw new Error("❌ Please provide a valid locator option");
        await element.waitFor({ state: state, timeout });
        return element;
    }
    /**
    * Get text or input value
    * @param {LocatorOptions} options
    * @returns {Promise<string>}
    */
    async getText(options) {
        const element = await this.findElement(options);
        const tagName = await element.evaluate(el => el.tagName.toLowerCase());
        if (tagName === 'input' || tagName === 'textarea') {
            try {
                return await element.inputValue();
            } catch {
                return await element.evaluate(el => el.value || '');
            }
        } else {
            return await element.textContent() || '';
        }
    }
    /**
    * Get attribute or text
    * @param {LocatorOptions} options
    * @param {string} attribute
    * @returns {Promise<string | null>}
    */
    async getAttribute(options, attribute) {
        const element = await this.findElement(options);
        if (attribute === "text") return await this.getText(options);
        return await element.getAttribute(attribute);
    }
    /**
    * Click an element
    * @param {LocatorOptions} options
    */
    async click(options) {
        const element = await this.findElement(options);
        await element.click();
    }
    /**
    * Fill an input or textarea element
    * @param {LocatorOptions} options
    * @param {string} value
    */
    async fill(options, value) {
        const element = await this.findElement(options);
        await element.fill(value);
    }
}