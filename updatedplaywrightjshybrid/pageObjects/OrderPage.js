import { expect } from '@playwright/test';
import BasePage from '../core/BasePage.js';

export default class OrderPage extends BasePage {
  constructor(page) {
    super(page);
    this.nameInput = page.locator('#name');
    this.countryInput = page.locator('#country');
    this.cityInput = page.locator('#city');
    this.creditCardInput = page.locator('#card');
    this.monthInput = page.locator('#month');
    this.yearInput = page.locator('#year');
    this.purchaseButton = page.locator('button').filter({ hasText: 'Purchase' });
    this.confirmationModal = page.locator('.sweet-alert');
    this.confirmationMessage = page.locator('.sweet-alert h2');
    this.confirmationDetails = page.locator('.sweet-alert .lead');
    this.confirmOkButton = page.locator('.confirm');
  }

  async verifyOrderFormOpen() {
    await expect(this.nameInput).toBeVisible();
    await expect(this.purchaseButton).toBeVisible();
  }

  async fillOrderDetails(orderData) {
    await this.fill(this.nameInput, orderData.name);
    await this.fill(this.countryInput, orderData.country);
    await this.fill(this.cityInput, orderData.city);
    await this.fill(this.creditCardInput, orderData.creditCard);
    await this.fill(this.monthInput, orderData.month);
    await this.fill(this.yearInput, orderData.year);
  }

  async verifyAllOrderFieldsPopulated() {
    await expect(this.nameInput).not.toBeEmpty();
    await expect(this.countryInput).not.toBeEmpty();
    await expect(this.cityInput).not.toBeEmpty();
    await expect(this.creditCardInput).not.toBeEmpty();
    await expect(this.monthInput).not.toBeEmpty();
    await expect(this.yearInput).not.toBeEmpty();
  }

  async clickPurchase() {
    await this.click(this.purchaseButton);
  }

  async verifyOrderProcessedSuccessfully() {
    await expect(this.confirmationModal).toBeVisible({ timeout: 10000 });
  }

  async verifyOrderConfirmationWithDetails() {
    await expect(this.confirmationMessage).toBeVisible();
    await expect(this.confirmationMessage).toContainText('Thank you for your purchase!');
    await expect(this.confirmationDetails).toBeVisible();
    await expect(this.confirmationDetails).toContainText('Id:');
    await expect(this.confirmationDetails).toContainText('Amount:');
  }
}

