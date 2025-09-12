describe('SearchForm', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:4000/movies?sortBy=releaseDate&sortOrder=desc', {
      fixture: 'movies.json'
    }).as('getMovies');
    cy.visit('/');
    cy.wait('@getMovies');
  });

  it('submits via button click', () => {
    cy.intercept('GET', 'http://localhost:4000/movies?search=Matrix&sortBy=releaseDate&sortOrder=desc', {
      fixture: 'searchResults.json'
    }).as('searchMovies');
    
    cy.get('[data-cy=search-input]').clear().type('Matrix');
    cy.get('[data-cy=search-btn]').click();
    
    cy.wait('@searchMovies');
    cy.get('[data-cy^="movie-tile-"]').should('have.length.at.least', 1);
  });

  it('submits on Enter key press', () => {
    cy.intercept('GET', 'http://localhost:4000/movies*', {
      fixture: 'searchResults.json'
    }).as('searchMovies');
    
    cy.get('[data-cy=search-input]').clear().type('Interstellar{enter}');
    
    cy.wait('@searchMovies');
    cy.get('[data-cy^="movie-tile-"]').should('have.length.at.least', 1);
  });
});
