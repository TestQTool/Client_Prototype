class BasePage {
  constructor() {
    this.testData = {};
  }

  visit(url) {
    cy.visit(url);
  }

  getElement(selector) {
    return cy.get(selector);
  }

  click(selector) {
    cy.get(selector).click();
  }

  type(selector, text) {
    cy.get(selector).type(text);
  }

  clear(selector) {
    cy.get(selector).clear();
  }

  verifyVisible(selector) {
    cy.get(selector).should('be.visible');
  }

  verifyText(selector, text) {
    cy.get(selector).should('contain.text', text);
  }

  verifyUrl(fragment) {
    cy.url().should('include', fragment);
  }

  wait(milliseconds = 1000) {
    cy.wait(milliseconds);
  }
}

export default BasePage;

