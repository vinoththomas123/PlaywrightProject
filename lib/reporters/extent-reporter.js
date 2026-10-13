const fs = require('fs');
const path = require('path');

class ExtentReporter {
    constructor() {
        this.results = [];
        this.testLogs = new Map();
        this.outputDir = path.resolve('extent-report');
    }

    onBegin() {
        fs.mkdirSync(this.outputDir, { recursive: true });

        this.results = [];
        this.testLogs.clear();
    }

    /**
     * Capture console.log / logger.info output
     */
    onStdOut(chunk, test) {
        this.addLog(test, chunk, 'info');
    }

    /**
     * Capture console.error / logger.error output
     */
    onStdErr(chunk, test) {
        this.addLog(test, chunk, 'error');
    }

    addLog(test, chunk, type) {
        if (!test || !chunk) {
            return;
        }

        const message = chunk.toString().trim();

        if (!message) {
            return;
        }

        if (!this.testLogs.has(test.id)) {
            this.testLogs.set(test.id, []);
        }

        this.testLogs.get(test.id).push({
            type,
            message
        });
    }

    /**
     * Called when each test finishes
     */
    onTestEnd(test, result) {
        const logs = this.testLogs.get(test.id) || [];

        const screenshots = result.attachments
            .filter(attachment =>
                attachment.contentType?.startsWith('image/')
            )
            .map(attachment => ({
                name: attachment.name || 'Screenshot',
                path: attachment.path
                    ? path.resolve(attachment.path)
                    : null,
                body: attachment.body || null
            }));

        this.results.push({
            title: test.title,
            file: test.location.file,
            status: result.status,
            duration: result.duration,
            error: result.error?.message || '',
            logs,
            screenshots
        });
    }

    /**
     * Escape HTML characters
     */
    escapeHtml(value = '') {
        return String(value)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');
    }

    /**
     * Render logs
     */
    renderLogs(logs) {
        if (!logs.length) {
            return '<em>No logs</em>';
        }

        return logs.map(log => `
            <div class="log ${log.type}">
                <span class="log-type">[${this.escapeHtml(log.type)}]</span>
                <pre>${this.escapeHtml(log.message)}</pre>
            </div>
        `).join('');
    }

    /**
     * Render screenshots
     */
    renderScreenshots(screenshots = []) {
        if (!screenshots.length) {
            return '<em>No screenshots</em>';
        }

        return screenshots.map(screenshot => {

            // Screenshot attached using a file path
            if (screenshot.path) {
                const relativePath = path
                    .relative(this.outputDir, screenshot.path)
                    .replaceAll('\\', '/');

                return `
                <div class="screenshot">
                    <strong>${this.escapeHtml(screenshot.name)}</strong>
                    <br>
                    <img
                        src="${this.escapeHtml(relativePath)}"
                        alt="${this.escapeHtml(screenshot.name)}"
                        width="400"
                    >
                </div>
            `;
            }

            // Screenshot attached using Buffer/body
            if (screenshot.body) {
                const base64Image = Buffer
                    .from(screenshot.body)
                    .toString('base64');

                return `
                <div class="screenshot">
                    <strong>${this.escapeHtml(screenshot.name)}</strong>
                    <br>
                    <img
                        src="data:image/png;base64,${base64Image}"
                        alt="${this.escapeHtml(screenshot.name)}"
                        width="400"
                    >
                </div>
            `;
            }

            return '';

        }).join('');
    }
    

    /**
     * Generate HTML report
     */
    onEnd() {
        const testRows = this.results.map(test => `
            <tr>
                <td>
                    <strong>${this.escapeHtml(test.title)}</strong>
                    <br>
                    <small>${this.escapeHtml(test.file)}</small>
                </td>

                <td class="${this.escapeHtml(test.status)}">
                    ${this.escapeHtml(test.status)}
                </td>

                <td>
                    ${test.duration} ms
                </td>

                <td class="error">
                    ${this.escapeHtml(test.error)}
                </td>

                <td>
                    ${this.renderLogs(test.logs)}
                </td>

                <td>
                    ${this.renderScreenshots(test.screenshots)}
                </td>
            </tr>
        `).join('');

        const html = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">

    <title>Playwright Test Report</title>

    <style>

        body {
            font-family: Arial, sans-serif;
            margin: 30px;
            background: #fafafa;
        }

        h1 {
            margin-bottom: 25px;
        }

        table {
            border-collapse: collapse;
            width: 100%;
            background: white;
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 10px;
            vertical-align: top;
        }

        th {
            background: #f2f2f2;
        }

        .passed {
            color: green;
            font-weight: bold;
        }

        .failed {
            color: red;
            font-weight: bold;
        }

        .skipped {
            color: orange;
            font-weight: bold;
        }

        .timedOut {
            color: red;
            font-weight: bold;
        }

        .error {
            color: red;
            white-space: pre-wrap;
        }

        .log {
            margin-bottom: 8px;
        }

        .log-type {
            font-weight: bold;
        }

        .log.info .log-type {
            color: #333;
        }

        .log.error .log-type {
            color: red;
        }

        .log pre {
            background: #f5f5f5;
            border: 1px solid #ddd;
            padding: 8px;
            margin: 4px 0;
            text-align: left;
            white-space: pre-wrap;
            word-break: break-word;
        }

        .screenshot {
            margin-bottom: 15px;
        }

        .screenshot img {
            border: 1px solid #ccc;
            margin-top: 5px;
        }

        small {
            color: #666;
        }

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
                <th>Logs</th>
                <th>Screenshots</th>
            </tr>
        </thead>

        <tbody>

            ${testRows || `
                <tr>
                    <td colspan="6">
                        <em>No test results found</em>
                    </td>
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

module.exports = ExtentReporter;