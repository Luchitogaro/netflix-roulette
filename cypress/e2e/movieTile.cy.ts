describe('MovieTile', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display multiple movies in a grid', () => {
    cy.get('[data-cy="movies-grid"]').should('be.visible');
    cy.get('[data-cy="movie-tile-1"]').should('contain.text', 'Bohemian Rhapsody');
    cy.get('[data-cy="movie-tile-1"]').should('contain.text', '2018');
    cy.get('[data-cy="movie-tile-2"]').should('contain.text', 'The Shawshank Redemption');
    cy.get('[data-cy="movie-tile-2"]').should('contain.text', '1994');
    cy.get('[data-cy="movie-tile-3"]').should('contain.text', 'Inception');
    cy.get('[data-cy="movie-tile-3"]').should('contain.text', '2010');
  });

  it('should open the popup menu and contain Edit and Delete buttons', () => {
    cy.get('[data-cy="menu-1"]').click();
    cy.get('[data-testid="popup"]').should('be.visible');
    cy.get('[data-testid="edit-btn"]').should('be.visible');
    cy.get('[data-testid="delete-btn"]').should('be.visible');
  });

  it('should call Edit and Delete functions when respective buttons are clicked', () => {
    // Test Edit action
    cy.get('[data-cy="menu-1"]').click();
    cy.get('[data-testid="edit-btn"]').click();
    cy.get('[data-cy="last-action"]').should('contain.text', 'Last action: edit for movie 1');
    
    // Verify popup closes after action
    cy.get('[data-testid="popup"]').should('not.exist');
    
    // Test Delete action
    cy.get('[data-cy="menu-1"]').click();
    cy.get('[data-testid="delete-btn"]').click();
    cy.get('[data-cy="last-action"]').should('contain.text', 'Last action: delete for movie 1');
    
    // Verify popup closes after action
    cy.get('[data-testid="popup"]').should('not.exist');
  });

  it('should pass correct movie ID to callbacks', () => {
    // Verify the movie ID is correctly passed to edit callback
    cy.get('[data-cy="menu-1"]').click();
    cy.get('[data-testid="edit-btn"]').click();
    cy.get('[data-cy="last-action"]').should('contain.text', 'movie 1');
    
    // Verify the movie ID is correctly passed to delete callback
    cy.get('[data-cy="menu-1"]').click();
    cy.get('[data-testid="delete-btn"]').click();
    cy.get('[data-cy="last-action"]').should('contain.text', 'movie 1');
  });

  it('should display movie details when clicking on different movies', () => {
    // Click on first movie (Bohemian Rhapsody)
    cy.get('[data-cy="movie-tile-1"]').click();
    cy.get('[data-cy="movie-title"]').should('contain.text', 'Bohemian Rhapsody');
    cy.get('[data-cy="movie-year"]').should('contain.text', '2018');
    
    // Click on second movie (The Shawshank Redemption)
    cy.get('[data-cy="movie-tile-2"]').click();
    cy.get('[data-cy="movie-title"]').should('contain.text', 'The Shawshank Redemption');
    cy.get('[data-cy="movie-year"]').should('contain.text', '1994');
    
    // Click on third movie (Inception)
    cy.get('[data-cy="movie-tile-3"]').click();
    cy.get('[data-cy="movie-title"]').should('contain.text', 'Inception');
    cy.get('[data-cy="movie-year"]').should('contain.text', '2010');
  });
});
