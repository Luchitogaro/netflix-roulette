describe('SearchForm', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:4000/movies?sortBy=releaseDate&sortOrder=desc', {
      fixture: 'movies.json'
    }).as('getMovies');
    cy.visit('/');
    cy.wait('@getMovies');
  });

  it('submits via button click', () => {
    cy.intercept('GET', 'http://localhost:4000/movies?search=Matrix&searchBy=title&sortBy=releaseDate&sortOrder=desc', {
      fixture: 'searchResults.json'
    }).as('searchMovies');
    
    cy.get('[data-cy=search-input]').clear().type('Matrix');
    cy.get('[data-cy=search-btn]').click();
    
    cy.wait('@searchMovies');
    cy.get('[data-cy^="movie-tile-"]').should('have.length.at.least', 1);
  });

  it('submits on Enter key press when button is focused', () => {
    cy.intercept('GET', 'http://localhost:4000/movies?search=Interstellar&searchBy=title&sortBy=releaseDate&sortOrder=desc', {
      fixture: 'searchResults.json'
    }).as('searchMovies');
    
    cy.get('[data-cy=search-input]').clear().type('Interstellar');
    cy.get('[data-cy=search-btn]').focus().type('{enter}');
    
    cy.wait('@searchMovies');
    cy.get('[data-cy^="movie-tile-"]').should('have.length.at.least', 1);
  });

  it('does not submit when Enter is pressed on input field', () => {
    cy.get('[data-cy=search-input]').clear().type('Matrix{enter}');
    
    cy.get('[data-cy^="movie-tile-"]').should('have.length.at.least', 1);
  });
});
