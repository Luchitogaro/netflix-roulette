describe('Dialog', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should open dialog when Edit button is clicked', () => {
    cy.get('[data-cy="menu-1"]').click();
    cy.get('[data-testid="edit-btn"]').click();
    cy.get('[data-cy="dialog"]').should('be.visible');
  });

  it('should close dialog when close button (×) is clicked', () => {
    cy.get('[data-cy="menu-1"]').click();
    cy.get('[data-testid="edit-btn"]').click();
    cy.get('[data-cy="dialog-close-btn"]').click();
    cy.get('[data-cy="dialog"]').should('not.exist');
  });

  it('should close dialog when clicking outside the dialog', () => {
    cy.get('[data-cy="menu-1"]').click();
    cy.get('[data-testid="edit-btn"]').click();
    cy.get('[data-cy="dialog-overlay"]').click({ force: true });
    cy.get('[data-cy="dialog"]').should('not.exist');
  });

  it('should show dialog content', () => {
    cy.get('[data-cy="menu-1"]').click();
    cy.get('[data-testid="edit-btn"]').click();
    cy.get('[data-cy="dialog-body"]').should('contain.text', 'Edit movie:');
    cy.get('[data-cy="dialog-body"]').should('contain.text', 'Bohemian Rhapsody');
  });
});
