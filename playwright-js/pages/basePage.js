export default class BasePage {
  constructor(page) {
    this.page = page;
    this.testData = {};
  }

  async open(url) {
    await this.page.goto(url);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async waitforNetworkIdle() {
    await this.page.waitForLoadState('networkidle');
  }

  async wait(ms = 500) {
    await this.page.waitForTimeout(ms);
  }

  async waitAndFill(selector, value) {
    await this.page.locator(selector).first().fill(String(value ?? ''));
  }

  async waitAndClick(selector) {
    await this.page.locator(selector).first().click();
  }

  async isElementVisible(selector) {
    return await this.page.locator(selector).first().isVisible().catch(() => false);
  }

  async verifyElementContainsText(selector, expectedText) {
    await this.page.locator(selector).first().waitFor({ state: 'visible' });
    const text = await this.page.locator(selector).first().innerText();
    if (!text.includes(expectedText)) {
      throw new Error(`Expected ${selector} to contain "${expectedText}" but found "${text}"`);
    }
  }

  async getUrl() {
    return this.page.url();
  }

  async getCount(selector) {
    return await this.page.locator(selector).count();
  }

  getLoginDataByRole() {
    return {
      username: process.env.TEST_USERNAME || process.env.USERNAME || 'Admin',
      password: process.env.TEST_PASSWORD || process.env.PASSWORD || 'admin123'
    };
  }
}