describe('SortControl Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders and changes selection', () => {
    cy.get('[data-cy="sort-control"]').should('exist');
    cy.get('[data-cy="sort-label"]').should('contain.text', 'SORT BY');
    cy.get('[data-cy="sort-select"]').select('TITLE');
    cy.get('[data-cy="sort-select"]').should('have.value', 'title');
    cy.get('[data-cy="sort-select"]').select('RELEASE DATE');
    cy.get('[data-cy="sort-select"]').should('have.value', 'releaseDate');
  });
});
