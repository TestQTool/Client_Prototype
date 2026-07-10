import BasePage from './base.page';

class LoginPage extends BasePage {
  get usernameInput() {
    return $('input[name="username"]');
  }

  get passwordInput() {
    return $('input[name="password"]');
  }

  get loginButton() {
    return $('button[type="submit"]');
  }

  async login(username: string, password: string) {
    await this.usernameInput.waitForDisplayed();
    await this.usernameInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.loginButton.click();
  }
}

export default new LoginPage();
