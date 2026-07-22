import { test as base, expect } from '@playwright/test';
import LoginPage from '../pageObjects/LoginPage.js';
import ProductPage from '../pageObjects/ProductPage.js';
import CartPage from '../pageObjects/CartPage.js';
import OrderPage from '../pageObjects/OrderPage.js';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  orderPage: async ({ page }, use) => {
    await use(new OrderPage(page));
  }
});

export { expect };

