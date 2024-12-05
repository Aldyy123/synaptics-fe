/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(): Chainable<Subject>;
  }
}

Cypress.Commands.add('login', () => {
  const { TEST_USER_NAME, TEST_TOKEN } = Cypress.env();
  cy.window().then((win) => {
    win.localStorage.setItem('userName', TEST_USER_NAME);
    win.localStorage.setItem('token', TEST_TOKEN);
  });
});

