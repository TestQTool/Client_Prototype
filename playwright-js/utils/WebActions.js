import { expect } from '@playwright/test';

class WebActions {
  constructor(page) {
    this.page = page;
  }

  async open(url) {
    await this.page.goto(url);
  }

  async waitAndClick(selector, timeout = 10000) {
    await this.page.waitForSelector(selector, { timeout });
    await this.page.click(selector);
  }

  async waitAndFill(selector, text, timeout = 10000) {
    await this.page.waitForSelector(selector, { timeout });
    await this.page.fill(selector, text);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('load');
  }

  async waitforNetworkIdle() {
    await this.page.waitForLoadState('networkidle');
  }

  async isElementVisible(selector, timeout = 5000) {
    try {
      await this.page.waitForSelector(selector, { state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }

  async verifyElementText(selector, expectedText) {
    const element = await this.page.locator(selector);
    await expect(element).toHaveText(expectedText);
  }

  async verifyElementContainsText(selector, expectedText) {
    const element = await this.page.locator(selector);
    await expect(element).toContainText(expectedText);
  }

  async getUrl() {
    return this.page.url();
  }

  async getCount(selector) {
    return await this.page.locator(selector).count();
  }

  async wait(milliseconds = 1000) {
    await this.page.waitForTimeout(milliseconds);
  }
}

export default WebActions;

