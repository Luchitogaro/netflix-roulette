describe('MovieTile', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:4000/movies?sortBy=releaseDate&sortOrder=desc', {
      fixture: 'movies.json'
    }).as('getMovies');
    cy.visit('/');
    cy.wait('@getMovies');
  });

  it('should display multiple movies in a grid', () => {
    cy.get('[data-testid="movie-grid"]').should('be.visible');
    cy.get('[data-cy^="movie-tile-"]').should('have.length.at.least', 1);
    
    cy.get('[data-cy^="movie-tile-"]').first().within(() => {
      cy.get('img').should('be.visible');
      cy.get('h3').should('be.visible');
      cy.get('span').should('be.visible');
      cy.get('p').should('be.visible');
    });
  });

  it('should display movie information correctly', () => {
    cy.get('[data-cy^="movie-tile-"]').first().within(() => {
      cy.get('img').should('have.attr', 'src');
      cy.get('h3').should('not.be.empty');
      cy.get('span').should('not.be.empty');
      cy.get('p').should('not.be.empty');
    });
  });

  it('should be clickable and navigate to movie details', () => {
    cy.get('[data-cy^="movie-tile-"]').first().click();
    
    cy.get('[data-cy="movie-details"]').should('be.visible');
    cy.get('[data-cy="back-btn"]').should('be.visible');
  });

  it('should return to movie list from details', () => {
    cy.get('[data-cy^="movie-tile-"]').first().click();
    cy.get('[data-cy="movie-details"]').should('be.visible');
    
    cy.get('[data-cy="back-btn"]').click();
    cy.get('[data-testid="movie-grid"]').should('be.visible');
    cy.get('[data-cy^="movie-tile-"]').should('have.length.at.least', 1);
  });

  it('should display different movies when clicking different tiles', () => {
    cy.get('[data-cy^="movie-tile-"]').first().within(() => {
      cy.get('h3').invoke('text').as('firstMovieTitle');
    });
    
    cy.get('[data-cy^="movie-tile-"]').first().click();
    
    cy.get('@firstMovieTitle').then((title) => {
      cy.get('[data-cy="movie-title"]').should('contain.text', title);
    });
    
    cy.get('[data-cy="back-btn"]').click();
    
    cy.get('[data-cy^="movie-tile-"]').then(($tiles) => {
      if ($tiles.length > 1) {
        cy.wrap($tiles.eq(1)).click();
        cy.get('[data-cy="movie-details"]').should('be.visible');
      }
    });
  });
});
