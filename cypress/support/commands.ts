/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      getBySel(value: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}
Cypress.Commands.add('getBySel', (selector) =>
  cy.get(`[data-cy="${selector}"]`)
);

export {};
