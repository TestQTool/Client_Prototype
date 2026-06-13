import WebActions from '../utils/WebActions.js';

class BasePage {
  constructor(page) {
    this.page = page;
    this.webActions = new WebActions(page);
    this.testData = require('../utils/testdata.json');
  }

  async open(url) {
    return await this.webActions.navigateToURL(url);
  }

  async waitAndClick(locator) {
    return await this.webActions.clickElement(locator);
  }

  async waitAndFill(locator, text) {
    return await this.webActions.enterElementText(locator, text);
  }

  async waitForPageLoad() {
    return await this.webActions.waitForPageNavigation();
  }

  async waitforNetworkIdle() {
    return await this.webActions.waitForNetworkIdle();
  }

  async isElementVisible(locator) {
    return await this.webActions.isElementVisible(locator);
  }

  async verifyElementText(locator, expectedText) {
    return await this.webActions.verifyElementText(locator, expectedText);
  }

  async verifyElementContainsText(locator, expectedText) {
    return await this.webActions.verifyElementContainsText(locator, expectedText);
  }

  async getUrl() {
    return this.page.url();
  }

  async getCount(locator) {
    return await this.webActions.getElementCount(locator);
  }

  async wait(milliseconds = 2000) {
    return await this.webActions.delay(milliseconds);
  }

  getLoginDataByRole(roleName) {
    const credentials = this.testData.credentials || [];
    return credentials.find(cred => cred.role === roleName);
  }
}

export default BasePage;