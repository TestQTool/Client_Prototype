import { expect } from '@playwright/test';
import BasePage from '../core/BasePage.js';

export default class ProductPage extends BasePage {
  constructor(page) {
    super(page);
    this.productLinks = page.locator('.card-title a');
    this.addToCartButton = page.locator('a').filter({ hasText: 'Add to cart' });
  }

  async selectFirstProduct() {
    await this.click(this.productLinks.first());
    await expect(this.addToCartButton).toBeVisible();
  }

  async addProductToCart() {
    await this.click(this.addToCartButton);
    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });
  }
}

