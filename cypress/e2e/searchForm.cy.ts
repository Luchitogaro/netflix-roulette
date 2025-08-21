describe('SearchForm', () => {
  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win.console, 'log').as('log');
      },
    });
  });

  it('submits via button click', () => {
    cy.get('[data-cy=search-input]').clear().type('Matrix');
    cy.get('[data-cy=search-btn]').click();
    cy.get('@log').should('have.been.calledOnceWith', 'Matrix');
  });

  it('submits on Enter with button focused', () => {
    cy.get('[data-cy=search-input]').clear().type('Interstellar');
    cy.get('[data-cy=search-btn]').focus().type('{enter}');
    cy.get('@log').should('have.been.calledOnceWith', 'Interstellar');
  });
});
