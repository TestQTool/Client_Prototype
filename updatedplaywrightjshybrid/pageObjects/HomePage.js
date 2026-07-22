import { expect } from '@playwright/test';
import BasePage from '../core/BasePage.js';

export default class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.homeLink = page.getByRole('link', { name: 'Home (current)' });
    this.productLinks = page.locator('.card-title a');
  }

  async navigateToHome() {
    await this.open('/');
  }

  async expectHomePageLoaded() {
    await expect(this.page).toHaveURL(/demoblaze\.com/);
    await expect(this.page).toHaveTitle(/STORE/);
  }

  async selectProduct(productName) {
    const productLink = this.page.locator('.card-title a').filter({ hasText: productName }).first();
    await this.click(productLink);
  }

  async selectFirstProduct() {
    await this.click(this.productLinks.first());
  }
}

