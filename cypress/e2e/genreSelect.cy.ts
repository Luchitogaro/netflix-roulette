describe('GenreSelect', () => {
  beforeEach(() => cy.visit('/'));

  it('renders all genres', () => {
    const genres = ['ALL', 'COMEDY', 'HORROR', 'CRIME', 'DOCUMENTARY'];
    genres.forEach((g) =>
      cy.get('[data-cy=genre-select]').contains('button', g)
    );
  });

  it('highlights initially selected genre', () => {
    cy.get('[data-cy=genre-select]')
      .find('button.active')
      .should('have.text', 'ALL');
  });

  it('changes active genre on click', () => {
    cy.get('[data-cy=genre-select]').contains('button', 'CRIME').click();
    cy.get('[data-cy=genre-select]')
      .find('button.active')
      .should('have.text', 'CRIME');
  });
});
