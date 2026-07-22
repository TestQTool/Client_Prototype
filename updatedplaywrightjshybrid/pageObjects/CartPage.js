import { expect } from '@playwright/test';
import BasePage from '../core/BasePage.js';

export default class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartLink = page.locator('#cartur');
    this.cartProductTitle = page.locator('.success td').nth(1);
    this.placeOrderButton = page.locator('button').filter({ hasText: 'Place Order' });
  }

  async navigateToCart() {
    await this.click(this.cartLink);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifyProductInCart() {
    await expect(this.cartProductTitle).toBeVisible();
  }

  async clickPlaceOrder() {
    await this.click(this.placeOrderButton);
  }
}

