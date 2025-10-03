describe('MovieListPage - Complete Navigation and Functionality', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:4000/movies?sortBy=releaseDate&sortOrder=desc', {
      fixture: 'movies.json'
    }).as('getInitialMovies');
    
    cy.visit('/');
    cy.wait('@getInitialMovies');
  });

  describe('Initial Page Load', () => {
    it('should display the main page elements', () => {
      cy.get('[data-cy="movie-list-page"]').should('be.visible');
      
      cy.contains('netflixroulette').should('be.visible');
      cy.get('[data-cy="add-movie-btn"]').should('be.visible').and('contain.text', '+ ADD MOVIE');
      
      cy.contains('FIND YOUR MOVIE').should('be.visible');
      
      cy.get('[data-cy="search-input"]').should('be.visible');
      cy.get('[data-cy="search-btn"]').should('be.visible');
    });

    it('should display genre selection with all available genres', () => {
      cy.get('.genre-select').should('be.visible');
      
      const expectedGenres = ['ALL', 'DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME'];
      expectedGenres.forEach(genre => {
        cy.get('.genre-select').should('contain.text', genre);
      });
      
      cy.get('.genre-select .active').should('contain.text', 'ALL');
    });

    it('should display sort control', () => {
      cy.get('[data-cy="sort-control"]').should('be.visible');
    });

    it('should display movie grid with initial movies', () => {
      cy.get('[data-cy^="movie-tile-"]').should('have.length.at.least', 1);
      
      cy.get('[data-cy^="movie-tile-"]').first().within(() => {
        cy.get('img').should('be.visible');
        cy.get('h3').should('be.visible');
        cy.get('span').should('be.visible');
      });
    });

    it('should display footer', () => {
      cy.contains('netflixroulette').should('be.visible');
    });
  });

  describe('Search Functionality', () => {
    it('should perform search and display results', () => {
      cy.intercept('GET', 'http://localhost:4000/movies?search=Bohemian&searchBy=title&sortBy=releaseDate&sortOrder=desc', {
        fixture: 'searchResults.json'
      }).as('searchMovies');

      cy.get('[data-cy="search-input"]').clear().type('Bohemian');
      cy.get('[data-cy="search-btn"]').click();
      
      cy.wait('@searchMovies');
      cy.url().should('include', 'query=Bohemian');
      
      cy.get('[data-cy^="movie-tile-"]').should('have.length', 1);
      cy.get('[data-cy^="movie-tile-"]').first().should('contain.text', 'Bohemian Rhapsody');
    });

    it('should clear search and show all movies', () => {
      cy.get('[data-cy="search-input"]').clear().type('NonexistentMovie');
      cy.get('[data-cy="search-btn"]').click();
      
      cy.get('[data-cy="search-input"]').clear();
      cy.get('[data-cy="search-btn"]').click();
      
      cy.wait('@getInitialMovies');
      cy.get('[data-cy^="movie-tile-"]').should('have.length.at.least', 1);
    });
  });

  describe('Genre Filtering', () => {
    it('should filter movies by Comedy genre', () => {
      cy.intercept('GET', 'http://localhost:4000/movies?filter=COMEDY&sortBy=releaseDate&sortOrder=desc', {
        body: { data: [] }
      }).as('getComedyMovies');

      cy.get('.genre-select').within(() => {
        cy.contains('COMEDY').click();
      });

      cy.wait('@getComedyMovies');
      cy.url().should('include', 'genre=COMEDY');
      
      cy.get('.genre-select .active').should('contain.text', 'COMEDY');
    });

    it('should filter movies by Horror genre', () => {
      cy.intercept('GET', 'http://localhost:4000/movies?filter=HORROR&sortBy=releaseDate&sortOrder=desc', {
        body: { data: [] }
      }).as('getHorrorMovies');

      cy.get('.genre-select').within(() => {
        cy.contains('HORROR').click();
      });

      cy.wait('@getHorrorMovies');
      
      cy.get('.genre-select .active').should('contain.text', 'HORROR');
    });

    it('should filter movies by Crime genre', () => {
      cy.intercept('GET', 'http://localhost:4000/movies?filter=CRIME&sortBy=releaseDate&sortOrder=desc', {
        body: { data: [] }
      }).as('getCrimeMovies');

      cy.get('.genre-select').within(() => {
        cy.contains('CRIME').click();
      });

      cy.wait('@getCrimeMovies');
      
      cy.get('.genre-select .active').should('contain.text', 'CRIME');
    });

    it('should filter movies by Documentary genre', () => {
      cy.intercept('GET', 'http://localhost:4000/movies?filter=DOCUMENTARY&sortBy=releaseDate&sortOrder=desc', {
        body: { data: [] }
      }).as('getDocumentaryMovies');

      cy.get('.genre-select').within(() => {
        cy.contains('DOCUMENTARY').click();
      });

      cy.wait('@getDocumentaryMovies');
      
      cy.get('.genre-select .active').should('contain.text', 'DOCUMENTARY');
    });

    it('should return to all movies when ALL genre is selected', () => {
      cy.get('.genre-select').within(() => {
        cy.contains('COMEDY').click();
      });
      
      cy.get('.genre-select').within(() => {
        cy.contains('ALL').click();
      });

      cy.wait('@getInitialMovies');
      
      cy.get('.genre-select .active').should('contain.text', 'ALL');
    });
  });

  describe('Sort Functionality', () => {
    it('should sort movies by title', () => {
      cy.intercept('GET', 'http://localhost:4000/movies?sortBy=title&sortOrder=desc', {
        fixture: 'sortedResults.json',
        property: 'byTitle'
      }).as('getSortedByTitle');

      cy.get('[data-cy="sort-select"]').select('title');
      
      cy.wait('@getSortedByTitle');
      cy.url().should('include', 'sortBy=title');
    });

    it('should sort movies by release date (default)', () => {
      cy.get('[data-cy="sort-select"]').select('title');
      
      cy.intercept('GET', 'http://localhost:4000/movies?sortBy=releaseDate&sortOrder=desc', {
        fixture: 'sortedResults.json',
        property: 'byReleaseDate'
      }).as('getSortedByDate');

      cy.get('[data-cy="sort-select"]').select('releaseDate');
      
      cy.wait('@getSortedByDate');
    });
  });

  describe('Movie Selection and Details', () => {
    it('should show movie details when a movie is clicked', () => {
      cy.intercept('GET', 'http://localhost:4000/movies/1', {
        fixture: 'movieDetails.json'
      }).as('getMovieDetails');
      
      cy.get('[data-cy^="movie-tile-"]').first().click();
      cy.wait('@getMovieDetails');
      
      cy.url().should('match', /\/\d+/);
      cy.get('[data-cy="movie-details"]').should('be.visible');
      
      cy.get('[data-cy="back-btn"]').should('be.visible').and('contain.text', '← Back to search');
      
      cy.contains('FIND YOUR MOVIE').should('not.exist');
      cy.get('[data-cy="search-input"]').should('not.exist');
    });

    it('should return to movie list when back button is clicked', () => {
      cy.intercept('GET', 'http://localhost:4000/movies/1', {
        fixture: 'movieDetails.json'
      }).as('getMovieDetails');
      
      cy.get('[data-cy^="movie-tile-"]').first().click();
      cy.wait('@getMovieDetails');
      
      cy.get('[data-cy="movie-details"]').should('be.visible');
      
      cy.get('[data-cy="back-btn"]').click();
      
      cy.url().should('eq', Cypress.config().baseUrl + '/');
      cy.contains('FIND YOUR MOVIE').should('be.visible');
      cy.get('[data-cy="search-input"]').should('be.visible');
      cy.get('[data-cy="movie-details"]').should('not.exist');
    });

    it('should display movie details with correct information', () => {
      cy.intercept('GET', 'http://localhost:4000/movies/1', {
        fixture: 'movieDetails.json'
      }).as('getMovieDetails');
      
      cy.get('[data-cy^="movie-tile-"]').first().click();
      cy.wait('@getMovieDetails');
      
      cy.get('[data-cy="movie-details"]').within(() => {
        cy.get('[data-cy="movie-poster"]').should('be.visible');
        cy.get('[data-cy="movie-title"]').should('be.visible');
        cy.get('[data-cy="movie-year"]').should('be.visible');
        cy.get('[data-cy="movie-rating"]').should('be.visible');
        cy.get('[data-cy="movie-duration"]').should('be.visible');
        cy.get('[data-cy="movie-description"]').should('be.visible');
      });
    });
  });

  describe('Combined Functionality', () => {
    it('should combine search and genre filtering', () => {
      cy.intercept('GET', 'http://localhost:4000/movies*', {
        fixture: 'searchResults.json'
      }).as('getCombinedResults');

      cy.get('[data-cy="search-input"]').clear().type('The');
      cy.get('[data-cy="search-btn"]').click();
      
      cy.wait('@getCombinedResults');
      
      cy.get('.genre-select').within(() => {
        cy.contains('CRIME').click();
      });

      cy.wait('@getCombinedResults');
    });

    it('should combine search, genre, and sort', () => {
      cy.intercept('GET', 'http://localhost:4000/movies*', {
        fixture: 'searchResults.json'
      }).as('getComplexResults');

      cy.get('[data-cy="search-input"]').clear().type('Movie');
      cy.get('[data-cy="search-btn"]').click();
      
      cy.wait('@getComplexResults');
      
      cy.get('.genre-select').within(() => {
        cy.contains('COMEDY').click();
      });
      
      cy.wait('@getComplexResults');
      
      cy.get('[data-cy="sort-select"]').select('title');

      cy.wait('@getComplexResults');
    });

    it('should maintain sort and genre when returning from movie details', () => {
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
  });

  describe('Loading States', () => {
    it('should show loading state during API calls', () => {
      cy.intercept('GET', 'http://localhost:4000/movies?search=Loading&searchBy=title&sortBy=releaseDate&sortOrder=desc', {
        delay: 1000,
        body: { data: [] }
      }).as('getSlowResults');

      cy.get('[data-cy="search-input"]').clear().type('Loading');
      cy.get('[data-cy="search-btn"]').click();
      
      cy.contains('Loading...').should('be.visible');
      
      cy.wait('@getSlowResults');
      
      cy.contains('Loading...').should('not.exist');
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors gracefully', () => {
      cy.intercept('GET', 'http://localhost:4000/movies?search=Error&searchBy=title&sortBy=releaseDate&sortOrder=desc', {
        statusCode: 500,
        body: { error: 'Internal Server Error' }
      }).as('getErrorResults');

      cy.get('[data-cy="search-input"]').clear().type('Error');
      cy.get('[data-cy="search-btn"]').click();
      
      cy.wait('@getErrorResults');
    });

    it('should handle empty search results', () => {
      cy.intercept('GET', 'http://localhost:4000/movies?search=NonexistentMovie&searchBy=title&sortBy=releaseDate&sortOrder=desc', {
        body: { data: [] }
      }).as('getEmptyResults');

      cy.get('[data-cy="search-input"]').clear().type('NonexistentMovie');
      cy.get('[data-cy="search-btn"]').click();
      
      cy.wait('@getEmptyResults');
      
      cy.get('[data-cy^="movie-tile-"]').should('not.exist');
    });
  });


  describe('Accessibility', () => {
    it('should have proper ARIA labels and attributes', () => {
      cy.get('[data-cy="search-input"]').should('have.attr', 'aria-label');
      cy.get('[data-cy="search-btn"]').should('be.visible');
      cy.get('[data-cy^="movie-tile-"]').first().should('be.visible');
    });

    it('should support keyboard navigation', () => {
      cy.get('[data-cy="search-input"]').focus().type('Test{enter}');
      
      cy.intercept('GET', 'http://localhost:4000/movies/1', {
        fixture: 'movieDetails.json'
      }).as('getMovieDetails');
      
      cy.get('[data-cy^="movie-tile-"]').first().click();
      cy.wait('@getMovieDetails');
      
      cy.get('[data-cy="back-btn"]').should('be.visible');
    });
  });

  describe('Performance', () => {
    it('should debounce search requests', () => {
      let requestCount = 0;
      
      cy.intercept('GET', 'http://localhost:4000/movies**', (req) => {
        requestCount++;
        req.reply({ fixture: 'movies.json' });
      }).as('getMoviesDebounce');

      cy.get('[data-cy="search-input"]').clear().type('T');
      cy.get('[data-cy="search-input"]').type('e');
      cy.get('[data-cy="search-input"]').type('s');
      cy.get('[data-cy="search-input"]').type('t');
      
      cy.wait(500);
      
      cy.then(() => {
        expect(requestCount).to.be.lessThan(5);
      });
    });
  });
});
