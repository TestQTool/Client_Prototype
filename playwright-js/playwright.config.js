// @ts-check
import os from 'os';
import CustomReporter from "./CustomReporter.js";

export const testDir = 'tests';
export const timeout = 150000;
export const workers = process.env.CI ? 4 : 3;
export const retries = process.env.CI ? 1 : 0;
export const fullyParallel = true;
export const globalTeardown = require.resolve('./global-teardown.js');

// ── Timestamped report folder ──────────────────────────────────────────────
const now = new Date();
const ts = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}_${String(now.getHours()).padStart(2,'0')}-${String(now.getMinutes()).padStart(2,'0')}-${String(now.getSeconds()).padStart(2,'0')}`;

import 'dotenv/config';

// ── Reporters ───────────────────────────────────────────────────────────────
export const reporter = [
    ['html',    { outputFolder: `playwright-report/playwright-report-${ts}` }],
    ['json',    { outputFile: './test-report/test-execution-report.json' }],
    ['junit',   { outputFile: 'results.xml' }],
    ['allure-playwright'],
    ['line'],
    ['./CustomReporter.js'],
];

// ── Browser projects ─────────────────────────────────────────────────────────
const allProjects = [
    {
        name: 'Chrome',
        use: {
            browserName: 'chromium', channel: 'chrome',
            headless: process.env.CI === 'true',
            viewport: { width: 1720, height: 850 },
            screenshot: 'only-on-failure', video: 'retain-on-failure', trace: 'retain-on-failure',
        }
    },
    {
        name: 'Firefox',
        use: {
            browserName: 'firefox',
            headless: true,
            viewport: { width: 1720, height: 850 },
            ignoreHTTPSErrors: true,
            screenshot: 'only-on-failure', video: 'retain-on-failure', trace: 'retain-on-failure',
        }
    },
    {
        name: 'Edge',
        use: {
            browserName: 'chromium', channel: 'msedge',
            viewport: { width: 1720, height: 850 },
            ignoreHTTPSErrors: true,
            screenshot: 'only-on-failure', video: 'retain-on-failure', trace: 'retain-on-failure',
        }
    },
    {
        name: 'Safari',
        use: {
            browserName: 'webkit',
            viewport: { width: 1720, height: 850 },
            ignoreHTTPSErrors: true,
            screenshot: 'only-on-failure', video: 'retain-on-failure', trace: 'retain-on-failure',
        }
    },
];

// Mac → Chrome + Firefox + Safari | Windows/Linux → Chrome + Firefox + Edge
export const projects = (() => {
    const isMac = os.platform() === 'darwin';
    return isMac
        ? allProjects.filter(p => ['Chrome', 'Firefox', 'Safari'].includes(p.name))
        : allProjects.filter(p => ['Chrome', 'Firefox', 'Edge'].includes(p.name));
})();
