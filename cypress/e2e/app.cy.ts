describe('Netflix Roulette – full page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads and shows all three components', () => {
    cy.get('[data-cy=counter]').should('contain.text', '5');
    cy.get('[data-cy=search-input]').should('have.value', 'Avengers');
    cy.get('[data-cy=genre-select]').within(() => {
      cy.contains('button.active', 'ALL');
    });
  });
});
