describe('GenreSelect', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:4000/movies?sortBy=releaseDate&sortOrder=desc', {
      fixture: 'movies.json'
    }).as('getMovies');
    cy.visit('/');
    cy.wait('@getMovies');
  });

  it('renders all genres', () => {
    const genres = ['ALL', 'DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME'];
    genres.forEach((g) =>
      cy.get('.genre-select').contains('button', g)
    );
  });

  it('highlights initially selected genre', () => {
    cy.get('.genre-select')
      .find('button.active')
      .should('have.text', 'ALL');
  });

  it('changes active genre on click', () => {
    cy.intercept('GET', 'http://localhost:4000/movies*', {
      fixture: 'genreResults.json'
    }).as('getGenreMovies');
    
    cy.get('.genre-select').contains('button', 'CRIME').click();
    cy.wait('@getGenreMovies');
    
    cy.get('.genre-select')
      .find('button.active')
      .should('have.text', 'CRIME');
  });
});
