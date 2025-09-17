describe('Netflix Roulette App - Main Integration', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:4000/movies?sortBy=releaseDate&sortOrder=desc', {
      fixture: 'movies.json'
    }).as('getMovies');
    
    cy.visit('/');
    cy.wait('@getMovies');
  });

  describe('App Integration', () => {
    it('should load the main MovieListPage component', () => {
      cy.get('[data-cy="movie-list-page"]').should('be.visible');
      
      cy.contains('netflixroulette').should('be.visible');
      cy.contains('FIND YOUR MOVIE').should('be.visible');
      
      cy.get('[data-cy="search-input"]').should('be.visible');
      cy.get('.genre-select').should('be.visible');
      cy.get('[data-cy="sort-control"]').should('be.visible');
    });

    it('should handle URL parameters correctly', () => {
      cy.intercept('GET', 'http://localhost:4000/movies?search=test&searchBy=title&filter=COMEDY&sortBy=title&sortOrder=desc', {
        fixture: 'searchResults.json'
      }).as('getUrlParams');

      cy.visit('/?query=test&genre=COMEDY&sortBy=title');
      cy.wait('@getUrlParams');

      cy.get('[data-cy="search-input"]').should('have.value', 'test');
      cy.get('.genre-select .active').should('contain.text', 'COMEDY');
      cy.get('[data-cy="sort-select"]').should('have.value', 'title');
    });

    it('should display movies from API', () => {
      cy.get('[data-cy^="movie-tile-"]').should('have.length.at.least', 1);
      
      cy.get('[data-cy^="movie-tile-"]').first().within(() => {
        cy.get('img').should('be.visible');
        cy.get('h3').should('contain.text', 'Bohemian Rhapsody');
      });
    });

    it('should handle complete user workflow', () => {
      cy.intercept('GET', 'http://localhost:4000/movies?search=Bohemian&searchBy=title&sortBy=releaseDate&sortOrder=desc', {
        fixture: 'searchResults.json'
      }).as('searchResults');

      cy.get('[data-cy="search-input"]').type('Bohemian');
      cy.get('[data-cy="search-btn"]').click();
      
      cy.wait('@searchResults');
      cy.url().should('include', 'query=Bohemian');
      
      cy.get('[data-cy^="movie-tile-"]').should('have.length', 1);
      
      cy.intercept('GET', 'http://localhost:4000/movies/1', {
        fixture: 'movieDetails.json'
      }).as('getMovieDetails');
      
      cy.get('[data-cy^="movie-tile-"]').first().click();
      cy.wait('@getMovieDetails');
      
      cy.url().should('match', /\/\d+\?query=Bohemian/);
      cy.get('[data-cy="movie-details"]').should('be.visible');
      
      cy.get('[data-cy="back-btn"]').click();
      
      cy.url().should('include', 'query=Bohemian');
      cy.contains('FIND YOUR MOVIE').should('be.visible');
    });

    it('should maintain app state during navigation', () => {
      cy.get('.genre-select').within(() => {
        cy.contains('COMEDY').click();
      });
      cy.url().should('include', 'genre=COMEDY');
      
      cy.get('[data-cy="sort-select"]').select('title');
      cy.url().should('include', 'sortBy=title');
      
      cy.intercept('GET', 'http://localhost:4000/movies/1', {
        fixture: 'movieDetails.json'
      }).as('getMovieDetails');
      
      cy.get('[data-cy^="movie-tile-"]').first().click();
      cy.wait('@getMovieDetails');
      cy.url().should('match', /\/\d+\?genre=COMEDY&sortBy=title/);
      
      cy.get('[data-cy="back-btn"]').click();
      cy.url().should('include', 'genre=COMEDY&sortBy=title');
      
      cy.get('.genre-select .active').should('contain.text', 'COMEDY');
      cy.get('[data-cy="sort-select"]').should('have.value', 'title');
    });

    it('should handle direct movie URL navigation', () => {
      cy.intercept('GET', 'http://localhost:4000/movies/1', {
        fixture: 'movieDetails.json'
      }).as('getMovieDetails');

      cy.visit('/1?query=test&genre=COMEDY');
      cy.wait('@getMovieDetails');

      cy.url().should('match', /\/1\?query=test&genre=COMEDY/);
      cy.get('[data-cy="movie-details"]').should('be.visible');
    });
  });

  describe('App Performance', () => {
    it('should load quickly', () => {
      const startTime = Date.now();
      
      cy.visit('/').then(() => {
        const loadTime = Date.now() - startTime;
        expect(loadTime).to.be.lessThan(3000);
      });
    });

    it('should handle multiple rapid interactions', () => {
      cy.get('[data-cy="search-input"]').type('Test');
      cy.get('.genre-select').within(() => {
        cy.contains('COMEDY').click();
      });
      cy.get('[data-cy="sort-select"]').select('title');
      cy.get('.genre-select').within(() => {
        cy.contains('ALL').click();
      });
      
      cy.get('[data-cy="movie-list-page"]').should('be.visible');
    });
  });

  describe('App Error Handling', () => {
    it('should handle API failures gracefully', () => {
      cy.intercept('GET', 'http://localhost:4000/movies**', {
        statusCode: 500,
        body: { error: 'Server Error' }
      }).as('serverError');

      cy.visit('/');
      
      cy.get('[data-cy="movie-list-page"]').should('be.visible');
    });
  });
});
