class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
  }

  async navigateToLoginPage(url) {
    await this.page.goto(url);
  }

  async enterUsername(username) {
    await this.usernameInput.waitFor({ state: 'visible' });
    await this.usernameInput.fill(username);
  }

  async enterPassword(password) {
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }
}

module.exports = LoginPage;