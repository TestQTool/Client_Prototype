import { expect } from '@playwright/test';
import BasePage from '../core/BasePage.js';

export default class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartLink = page.locator('#cartur');
    this.cartItems = page.locator('#tbodyid tr');
    this.productTitles = page.locator('#tbodyid .success td:nth-child(2)');
  }

  async navigateToCart() {
    await this.click(this.cartLink);
  }

  async expectCartPageDisplayed() {
    await expect(this.page).toHaveURL(/cart\.html/);
    await expect(this.cartItems.first()).toBeVisible();
  }

  async expectProductInCart() {
    await expect(this.productTitles.first()).toBeVisible();
  }
}

