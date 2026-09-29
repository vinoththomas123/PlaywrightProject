const fs = require('fs');
const path = require('path');

class ExtentReport {
    constructor() {
        this.results = [];
        this.testLogs = new Map();
        this.outputDir = path.resolve('extent-report');
        this.testInfo = null;
    }

    onBegin() {
        fs.mkdirSync(this.outputDir, { recursive: true });
        this.results = [];
        this.testLogs.clear();
    }

    setTestInfo(testInfo) {
        this.testInfo = testInfo;
    }

    async addLog(message, type = 'info') {
        if (!this.testInfo?.attach) {
            throw new Error(
                'ExtentReport requires the current testInfo. ' +
                'Call setTestInfo() before addLog().'
            );
        }

        await this.testInfo.attach(`log-${type}`, {
            body: Buffer.from(String(message)),
            contentType: 'text/plain'
        });
    }

    recordTestLog(test, message, type = 'info') {
        if (!test || !message) {
            return;
        }

        if (!this.testLogs.has(test.id)) {
            this.testLogs.set(test.id, []);
        }

        this.testLogs.get(test.id).push({
            type,
            message: String(message)
        });
    }

    onStdOut(chunk, test) {
        this.recordTestLog(test, chunk.toString().trim(), 'info');
    }

    onStdErr(chunk, test) {
        this.recordTestLog(test, chunk.toString().trim(), 'error');
    }

    onTestEnd(test, result) {
        const attachedLogs = result.attachments
            .filter(item =>
                item.contentType === 'text/plain' && item.body
            )
            .map(item => ({
                type: item.name.replace(/^log-/, ''),
                message: item.body.toString()
            }));

        const screenshots = result.attachments
            .filter(item =>
                item.path && item.contentType?.startsWith('image/')
            )
            .map(item => ({
                name: item.name || 'Screenshot',
                path: path.resolve(item.path)
            }));

        this.results.push({
            id: test.id,
            title: test.title,
            file: test.location.file,
            status: result.status,
            duration: result.duration,
            error: result.error?.message || '',
            logs: [
                ...(this.testLogs.get(test.id) || []),
                ...attachedLogs
            ],
            screenshots
        });
    }

    escapeHtml(value = '') {
        return String(value)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');
    }

    renderLogs(logs = []) {
        if (!logs.length) {
            return '<em>No logs</em>';
        }

        return logs.map(log => `
            <pre class="logs">[${this.escapeHtml(log.type)}]
${this.escapeHtml(log.message)}</pre>
        `).join('');
    }

    renderScreenshots(screenshots = []) {
        if (!screenshots.length) {
            return '<em>No screenshots</em>';
        }

        return screenshots.map(screenshot => {
            const relativePath = path
                .relative(this.outputDir, screenshot.path)
                .replaceAll('\\', '/');

            return `
                <div class="screenshot">
                    <strong>${this.escapeHtml(screenshot.name)}</strong><br>
                    <img
                        src="${this.escapeHtml(relativePath)}"
                        alt="${this.escapeHtml(screenshot.name)}"
                        width="400"
                    >
                </div>
            `;
        }).join('');
    }

    onEnd() {
        const testRows = this.results.map(test => `
            <tr>
                <td>${this.escapeHtml(test.title)}</td>
                <td class="${this.escapeHtml(test.status)}">
                    ${this.escapeHtml(test.status)}
                </td>
                <td>${test.duration} ms</td>
                <td class="error">${this.escapeHtml(test.error)}</td>
                <td>${this.renderLogs(test.logs)}</td>
                <td>${this.renderScreenshots(test.screenshots)}</td>
            </tr>
        `).join('');

        const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Playwright Extent Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 30px; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 10px; vertical-align: top; }
        th { background-color: #f2f2f2; }
        .passed { color: green; font-weight: bold; }
        .failed { color: red; font-weight: bold; }
        .skipped { color: orange; font-weight: bold; }
        .error { color: red; white-space: pre-wrap; }
        .logs {
            background-color: #f5f5f5;
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
            white-space: pre-wrap;
            max-width: 500px;
            overflow-x: auto;
        }
        .screenshot { margin-bottom: 15px; }
        .screenshot img { border: 1px solid #ccc; margin-top: 5px; }
    </style>
</head>
<body>
    <h1>Playwright Test Report</h1>
    <table>
        <thead>
            <tr>
                <th>Test</th>
                <th>Status</th>
                <th>Duration</th>
                <th>Error</th>
                <th>Console Logs</th>
                <th>Screenshots</th>
            </tr>
        </thead>
        <tbody>
            ${testRows || `
                <tr>
                    <td colspan="6"><em>No test results found</em></td>
                </tr>
            `}
        </tbody>
    </table>
</body>
</html>
`;

        fs.writeFileSync(
            path.join(this.outputDir, 'index.html'),
            html,
            'utf8'
        );
    }
}

module.exports = ExtentReport;
