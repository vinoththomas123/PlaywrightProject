class ScreenReader {

    constructor(page, testInfo) {
        this.page = page
        this.testInfo = testInfo
    }
    
    async addScreenshot(name = 'Screenshot') {
        const screenshot = await this.page.screenshot({
            fullPage: true
        });

        await this.testInfo.attach(name, {
            body: screenshot,
            contentType: 'image/png'
        });
    }
}

module.exports = {
    ScreenReader
}

