import BasePage from '../core/BasePage.js';
import { expect } from '@playwright/test';

export default class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    // TODO: Verify selectors with actual application
    this.dashboardContainer = page.locator('[data-testid="dashboard"], .dashboard, #dashboard').first();
    this.homePageIndicator = page.locator('h1, [role="heading"]').first();
  }

  async verifyUserRedirectedToDashboard() {
    await expect(this.page).toHaveURL(/dashboard|home/i);
    await expect(this.dashboardContainer.or(this.homePageIndicator)).toBeVisible();
  }
}

