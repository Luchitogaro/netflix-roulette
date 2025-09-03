import { testMovie } from '../fixtures/movieData';

describe('MovieDetails Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display movie details', () => {
    const movie = testMovie;

    cy.get(`[data-cy="movie-tile-${movie.id}"]`).click();

    cy.get('[data-cy="movie-title"]').should('contain.text', movie.title);
    cy.get('[data-cy="movie-rating"]').should('contain.text', String(movie.rating));
    cy.get('[data-cy="movie-year"]').should('contain.text', String(movie.releaseYear));
    cy.get('[data-cy="movie-duration"]').should('contain.text', movie.duration);
    cy.get('[data-cy="movie-description"]').should('contain.text', movie.description);

    cy.get('[data-cy="movie-genres"]').within(() => {
      movie.genres.forEach((genre) => {
        cy.get(`[data-testid="movie-genre-${genre}"]`).should('contain.text', genre);
      });
    });

    cy.get('[data-cy="movie-poster"]').should('have.attr', 'src', movie.posterUrl);
  });
});
