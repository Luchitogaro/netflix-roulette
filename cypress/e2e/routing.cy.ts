describe('React Router Integration', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:4000/movies?sortBy=releaseDate&sortOrder=desc', {
      fixture: 'movies.json'
    }).as('getInitialMovies');
  });

  describe('URL Parameter Handling', () => {
    it('should handle query parameter in URL', () => {
      cy.intercept('GET', 'http://localhost:4000/movies?search=test&searchBy=title&sortBy=releaseDate&sortOrder=desc', {
        fixture: 'searchResults.json'
      }).as('getSearchResults');

      cy.visit('/?query=test');
      cy.wait('@getSearchResults');

      cy.get('[data-cy="search-input"]').should('have.value', 'test');
      cy.url().should('include', 'query=test');
    });

    it('should handle genre parameter in URL', () => {
      cy.intercept('GET', 'http://localhost:4000/movies?filter=COMEDY&sortBy=releaseDate&sortOrder=desc', {
        body: { data: [] }
      }).as('getGenreResults');

      cy.visit('/?genre=COMEDY');
      cy.wait('@getGenreResults');

      cy.get('.genre-select .active').should('contain.text', 'COMEDY');
      cy.url().should('include', 'genre=COMEDY');
    });

    it('should handle sortBy parameter in URL', () => {
      cy.intercept('GET', 'http://localhost:4000/movies?sortBy=title&sortOrder=desc', {
        fixture: 'sortedResults.json'
      }).as('getSortResults');

      cy.visit('/?sortBy=title');
      cy.wait('@getSortResults');

      cy.get('[data-cy="sort-select"]').should('have.value', 'title');
      cy.url().should('include', 'sortBy=title');
    });

    it('should handle multiple parameters in URL', () => {
      cy.intercept('GET', 'http://localhost:4000/movies?search=test&searchBy=title&filter=COMEDY&sortBy=title&sortOrder=desc', {
        fixture: 'searchResults.json'
      }).as('getMultipleParams');

      cy.visit('/?query=test&genre=COMEDY&sortBy=title');
      cy.wait('@getMultipleParams');

      cy.get('[data-cy="search-input"]').should('have.value', 'test');
      cy.get('.genre-select .active').should('contain.text', 'COMEDY');
      cy.get('[data-cy="sort-select"]').should('have.value', 'title');
      cy.url().should('include', 'query=test&genre=COMEDY&sortBy=title');
    });
  });

  describe('Movie Details Route', () => {
    it('should navigate to movie details route', () => {
      cy.visit('/');
      cy.wait('@getInitialMovies');

      cy.intercept('GET', 'http://localhost:4000/movies/1', {
        fixture: 'movieDetails.json'
      }).as('getMovieDetails');

      cy.get('[data-cy^="movie-tile-"]').first().click();
      cy.wait('@getMovieDetails');
      cy.url().should('match', /\/\d+/);
      cy.get('[data-cy="movie-details"]').should('be.visible');
    });

    it('should preserve search parameters when navigating to movie details', () => {
      cy.intercept('GET', 'http://localhost:4000/movies?search=test&searchBy=title&sortBy=releaseDate&sortOrder=desc', {
        fixture: 'searchResults.json'
      }).as('getSearchResults');

      cy.visit('/?query=test');
      cy.wait('@getSearchResults');

      cy.intercept('GET', 'http://localhost:4000/movies/1', {
        fixture: 'movieDetails.json'
      }).as('getMovieDetails');

      cy.get('[data-cy^="movie-tile-"]').first().click();
      cy.wait('@getMovieDetails');
      cy.url().should('match', /\/\d+\?query=test/);
      cy.get('[data-cy="movie-details"]').should('be.visible');
    });

    it('should handle direct movie URL access', () => {
      cy.intercept('GET', 'http://localhost:4000/movies/1', {
        fixture: 'movieDetails.json'
      }).as('getMovieDetails');

      cy.visit('/1');
      cy.wait('@getMovieDetails');

      cy.url().should('match', /\/1$/);
      cy.get('[data-cy="movie-details"]').should('be.visible');
    });

    it('should handle direct movie URL with search parameters', () => {
      cy.intercept('GET', 'http://localhost:4000/movies/1', {
        fixture: 'movieDetails.json'
      }).as('getMovieDetails');

      cy.visit('/1?query=test&genre=COMEDY');
      cy.wait('@getMovieDetails');

      cy.url().should('match', /\/1\?query=test&genre=COMEDY/);
      cy.get('[data-cy="movie-details"]').should('be.visible');
    });
  });

  describe('Navigation and Back Button', () => {
    it('should navigate back to home with preserved parameters', () => {
      cy.intercept('GET', 'http://localhost:4000/movies?search=test&searchBy=title&sortBy=title&sortOrder=desc', {
        fixture: 'searchResults.json'
      }).as('getSearchResults');

      cy.visit('/?query=test&sortBy=title');
      cy.wait('@getSearchResults');

      cy.intercept('GET', 'http://localhost:4000/movies/1', {
        fixture: 'movieDetails.json'
      }).as('getMovieDetails');

      cy.get('[data-cy^="movie-tile-"]').first().click();
      cy.wait('@getMovieDetails');
      cy.url().should('match', /\/\d+\?query=test&sortBy=title/);

      cy.get('[data-cy="back-btn"]').click();
      cy.url().should('include', 'query=test&sortBy=title');
      cy.get('[data-cy="search-input"]').should('have.value', 'test');
      cy.get('[data-cy="sort-select"]').should('have.value', 'title');
    });

    it('should navigate back to home without parameters', () => {
      cy.visit('/');
      cy.wait('@getInitialMovies');

      cy.intercept('GET', 'http://localhost:4000/movies/1', {
        fixture: 'movieDetails.json'
      }).as('getMovieDetails');

      cy.get('[data-cy^="movie-tile-"]').first().click();
      cy.wait('@getMovieDetails');
      cy.url().should('match', /\/\d+/);

      cy.get('[data-cy="back-btn"]').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/');
      cy.contains('FIND YOUR MOVIE').should('be.visible');
    });
  });

  describe('URL State Persistence', () => {
    it('should maintain state after page refresh', () => {
      cy.intercept('GET', 'http://localhost:4000/movies?search=refresh&searchBy=title&filter=COMEDY&sortBy=title&sortOrder=desc', {
        fixture: 'searchResults.json'
      }).as('getRefreshResults');

      cy.visit('/?query=refresh&genre=COMEDY&sortBy=title');
      cy.wait('@getRefreshResults');

      cy.reload();
      cy.wait('@getRefreshResults');

      cy.get('[data-cy="search-input"]').should('have.value', 'refresh');
      cy.get('.genre-select .active').should('contain.text', 'COMEDY');
      cy.get('[data-cy="sort-select"]').should('have.value', 'title');
    });

    it('should maintain movie details state after page refresh', () => {
      cy.intercept('GET', 'http://localhost:4000/movies/1', {
        fixture: 'movieDetails.json'
      }).as('getMovieDetails');

      cy.visit('/1?query=test');
      cy.wait('@getMovieDetails');

      cy.reload();
      cy.wait('@getMovieDetails');

      cy.url().should('match', /\/1\?query=test/);
      cy.get('[data-cy="movie-details"]').should('be.visible');
    });
  });
});
