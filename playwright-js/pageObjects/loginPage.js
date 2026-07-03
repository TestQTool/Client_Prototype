class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailField = 'input[name="email"], input[type="email"], #email';
    this.passwordField = 'input[name="password"], input[type="password"], #password';
    this.loginButton = 'button[type="submit"], button:has-text("Login"), input[type="submit"]';
    this.registerLink = 'a:has-text("Register"), a[href*="register"]';
  }

  async navigateToLoginPage(baseUrl) {
    await this.page.goto(baseUrl);
  }

  async isLoginPageDisplayed() {
    const emailVisible = await this.page.locator(this.emailField).isVisible();
    const passwordVisible = await this.page.locator(this.passwordField).isVisible();
    const loginButtonVisible = await this.page.locator(this.loginButton).isVisible();
    const registerLinkVisible = await this.page.locator(this.registerLink).isVisible();
    return emailVisible && passwordVisible && loginButtonVisible && registerLinkVisible;
  }

  async enterEmail(email) {
    await this.page.locator(this.emailField).fill(email);
  }

  async enterPassword(password) {
    await this.page.locator(this.passwordField).fill(password);
  }

  async clickLoginButton() {
    await this.page.locator(this.loginButton).click();
  }

  async login(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }
}

module.exports = LoginPage;