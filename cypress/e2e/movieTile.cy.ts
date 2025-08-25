describe('MovieTile', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the movie title and year', () => {
    cy.get('[data-cy="movie-tile-1"]').should(
      'contain.text',
      'Bohemian Rhapsody'
    );
    cy.get('[data-cy="movie-tile-1"]').should('contain.text', '2018');
  });

  it('should open the popup menu and contain Edit and Delete buttons', () => {
    cy.get('[data-cy="menu-1"]').click();
    cy.get('[data-testid="popup"]').should('be.visible');
    cy.get('[data-testid="edit-btn"]').should('be.visible');
    cy.get('[data-testid="delete-btn"]').should('be.visible');
  });

  it('should call Edit and Delete functions when respective buttons are clicked', () => {
    cy.get('[data-cy="menu-1"]').click();
    cy.get('[data-testid="edit-btn"]').click();
    cy.get('[data-testid="delete-btn"]').click();
  });
});
