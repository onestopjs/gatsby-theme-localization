/// <reference types="Cypress" />

describe('Redirect', () => {
  it('root should redirect to default language', () => {
    cy.visit('/');
    // optional trailing slash
    cy.location('pathname').should('match', /^\/en\/?$/);
  });

  it('should redirect to bg', () => {
    cy.get('#switchLanguage').click();
    // optional trailing slash
    cy.location('pathname').should('match', /^\/bg\/?$/);
  });

  it('should redirect to bulgarian version of page', () => {
    cy.visit('/en/about');
    cy.wait(0); // idk why but it doesnt work without this
    cy.get('#switchLanguage').click();
    cy.location('pathname').should('match', /^\/bg\/about\/?$/);
  });
});
