import { expect } from '@playwright/test';
import BasePage from '../core/BasePage.js';

export default class ProductPage extends BasePage {
  constructor(page) {
    super(page);
    this.addToCartButton = page.locator('.btn-success').filter({ hasText: 'Add to cart' });
    this.productTitle = page.locator('.name');
  }

  async expectProductDetailPageOpen() {
    await expect(this.productTitle).toBeVisible();
    await expect(this.addToCartButton).toBeVisible();
  }

  async clickAddToCart() {
    await this.click(this.addToCartButton);
  }

  async expectProductAddedConfirmation() {
    this.page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('Product added');
      await dialog.accept();
    });
  }
}

