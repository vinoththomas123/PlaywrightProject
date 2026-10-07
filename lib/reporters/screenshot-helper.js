const fs = require('node:fs/promises');
const path = require('node:path');

class ScreenshotHelper {
    constructor(page, testInfo) {
        this.page = page;
        this.testInfo = testInfo;
    }

    setTestInfo(testInfo) {
        this.testInfo = testInfo;
    }

    async takeScreenshot(testName = this.testInfo.title) {
        if (!this.page) {
            throw new Error('ScreenshotHelper requires a page instance.');
        }

        if (!this.testInfo?.attach) {
            throw new Error('ScreenshotHelper requires the current testInfo.');
        }

        const screenshotsDirectory = path.resolve(
            process.cwd(),
            'test-results',
            'screenshots'
        );

        await fs.mkdir(screenshotsDirectory, {
            recursive: true
        });

        const safeTestName = `${this.testInfo.testId}-${testName}`
            .replace(/[<>:"/\\|?*]/g, '-')
            .replace(/[. ]+$/g, '')
            .trim() || 'screenshot';

        const screenshotPath = path.join(
            screenshotsDirectory,
            `${safeTestName}.png`
        );

        await this.page.screenshot({
            path: screenshotPath,
            fullPage: true
        });

        await this.testInfo.attach('screenshot', {
            path: screenshotPath,
            contentType: 'image/png'
        });

        return screenshotPath;
    }
}

module.exports = { ScreenshotHelper };
