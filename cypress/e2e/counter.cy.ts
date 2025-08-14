describe('Counter', () => {
  beforeEach(() => cy.visit('/'));

  it('starts at 5', () => {
    cy.get('[data-cy=counter-value]').should('have.text', '5');
  });

  it('increments on + click', () => {
    cy.get('[data-cy=counter-btn-inc]').click();
    cy.get('[data-cy=counter-value]').should('have.text', '6');
  });

  it('decrements on - click', () => {
    cy.get('[data-cy=counter-btn-dec]').click();
    cy.get('[data-cy=counter-value]').should('have.text', '4');
  });
});
