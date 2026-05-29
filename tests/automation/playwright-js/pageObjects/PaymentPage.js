const { expect } = require('@playwright/test');

class PaymentPage {
  constructor(page) {
    this.page = page;
    this.paymentMethodDropdown = page.locator('select[name="paymentMethod"], #paymentMethod, [data-testid="payment-method"]');
    this.cardNumberInput = page.locator('input[name="cardNumber"], #cardNumber, [data-testid="card-number"]');
    this.cardHolderInput = page.locator('input[name="cardHolder"], #cardHolder, [data-testid="card-holder"]');
    this.expiryDateInput = page.locator('input[name="expiry"], #expiry, [data-testid="expiry-date"]');
    this.cvvInput = page.locator('input[name="cvv"], #cvv, [data-testid="cvv"]');
    this.amountInput = page.locator('input[name="amount"], #amount, [data-testid="amount"]');
    this.payNowButton = page.locator('button:has-text("Pay Now"), button:has-text("Submit Payment"), #payNow');
    this.paymentSuccessMessage = page.locator('[data-testid="payment-success"], .payment-success, .success-message');
    this.paymentErrorMessage = page.locator('[data-testid="payment-error"], .payment-error, .error-message');
    this.transactionIdText = page.locator('[data-testid="transaction-id"], .transaction-id, #transactionId');
  }

  async navigate(baseUrl) {
    await this.page.goto(`${baseUrl}/payment`);
  }

  async selectPaymentMethod(method) {
    await this.paymentMethodDropdown.selectOption(method);
  }

  async enterCardDetails(cardData) {
    await this.cardNumberInput.fill(cardData.cardNumber);
    await this.cardHolderInput.fill(cardData.cardHolder);
    await this.expiryDateInput.fill(cardData.expiryDate);
    await this.cvvInput.fill(cardData.cvv);
  }

  async enterAmount(amount) {
    await this.amountInput.fill(amount.toString());
  }

  async clickPayNow() {
    await this.payNowButton.click();
  }

  async makePayment(paymentData) {
    if (paymentData.paymentMethod) {
      await this.selectPaymentMethod(paymentData.paymentMethod);
    }
    await this.enterCardDetails(paymentData);
    if (paymentData.amount) {
      await this.enterAmount(paymentData.amount);
    }
    await this.clickPayNow();
  }

  async verifyPaymentSuccess() {
    await expect(this.paymentSuccessMessage).toBeVisible({ timeout: 15000 });
  }

  async verifyPaymentError() {
    await expect(this.paymentErrorMessage).toBeVisible({ timeout: 10000 });
  }

  async getTransactionId() {
    return await this.transactionIdText.textContent();
  }
}

module.exports = { PaymentPage };
