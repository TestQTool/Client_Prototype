import { expect } from '@playwright/test';

class WebActions {
  constructor(page) {
    this.page = page;
  }

  async navigateToURL(url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async clickElement(locator) {
    await this.page.locator(locator).click();
  }

  async enterElementText(locator, text) {
    await this.page.locator(locator).fill(text);
  }

  async waitForPageNavigation() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async waitForNetworkIdle() {
    await this.page.waitForLoadState('networkidle');
  }

  async isElementVisible(locator, timeout = 10000) {
    try {
      await this.page.locator(locator).waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }

  async verifyElementText(locator, expectedText) {
    const element = this.page.locator(locator);
    await expect(element).toHaveText(expectedText);
  }

  async verifyElementContainsText(locator, expectedText) {
    const element = this.page.locator(locator);
    await expect(element).toContainText(expectedText);
  }

  async getElementCount(locator) {
    return await this.page.locator(locator).count();
  }

  async delay(milliseconds) {
    await this.page.waitForTimeout(milliseconds);
  }
}

export default WebActions;