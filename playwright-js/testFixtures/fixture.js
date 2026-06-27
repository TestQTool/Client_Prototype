import { test as base } from "@playwright/test";

// ── Import page classes here as they are generated ───────────────────────────
// The NextGenAI ScriptGenerationAgent will add imports and fixtures automatically.
// import LoginPage from "../pages/loginPage.js";
// import DashboardPage from "../pages/dashboardPage.js";

/**
 * Central fixture file.
 * All tests import from here: import test from '../testFixtures/fixture'
 * 
 * To add a new page:
 * 1. import FeaturePage from '../pages/featurePage.js'
 * 2. Add: featurePage: async ({ page }, use) => { await use(new FeaturePage(page)); },
 */
const test = base.extend({
    // ── Fixtures are added here by ScriptGenerationAgent ──────────────────
    // loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
});

export default test;
