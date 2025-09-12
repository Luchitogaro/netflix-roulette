describe('MovieDetails Component', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:4000/movies?sortBy=releaseDate&sortOrder=desc', {
      fixture: 'movies.json'
    }).as('getMovies');
    cy.visit('/');
    cy.wait('@getMovies');
  });

  it('should display movie details', () => {
    cy.get('[data-cy^="movie-tile-"]').first().click();

    cy.get('[data-cy="movie-details"]').should('be.visible');
    cy.get('[data-cy="movie-title"]').should('be.visible');
    cy.get('[data-cy="movie-year"]').should('be.visible');
    cy.get('[data-cy="movie-duration"]').should('be.visible');
    cy.get('[data-cy="movie-description"]').should('be.visible');
    cy.get('[data-cy="movie-poster"]').should('be.visible');

    cy.get('[data-cy="movie-genres"]').should('be.visible');
    
    cy.get('[data-cy="back-btn"]').should('be.visible');
  });
});
