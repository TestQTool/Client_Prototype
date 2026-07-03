class LoginPageObject {
  constructor(page) {
    this.page = page;
    this.emailField = page.locator('input[type="email"], input[name="email"], input[id="email"]');
    this.passwordField = page.locator('input[type="password"], input[name="password"], input[id="password"]');
    this.loginButton = page.locator('button:has-text("Login"), button[type="submit"]');
    this.registerLink = page.locator('a:has-text("Register"), a[href*="register"]');
  }

  async isLoginPageDisplayed() {
    await this.emailField.waitFor({ state: 'visible' });
    await this.passwordField.waitFor({ state: 'visible' });
    await this.loginButton.waitFor({ state: 'visible' });
    await this.registerLink.waitFor({ state: 'visible' });
    return true;
  }

  async fillEmail(email) {
    await this.emailField.fill(email);
  }

  async fillPassword(password) {
    await this.passwordField.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async isRegisterLinkVisible() {
    return await this.registerLink.isVisible();
  }
}

module.exports = LoginPageObject;