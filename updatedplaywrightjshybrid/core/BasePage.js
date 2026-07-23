export default class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(path = '') {
    await this.page.goto(path);
  }

  async click(selector) {
    await this.page.locator(selector).click();
  }

  async fill(selector, value) {
    await this.page.locator(selector).fill(String(value ?? ''));
  }

  async text(selector) {
    return this.page.locator(selector).textContent();
  }
}
