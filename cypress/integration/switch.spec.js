/// <reference types="Cypress" />

describe('Switch language', () => {
  it('language should be en', () => {
    cy.visit('/en/');
    cy.get('#currentLanguage')
      .invoke('text')
      .should('eq', 'en');
  });

  it('switching language should change it to bg', () => {
    cy.get('#switchLanguage').click();
    cy.get('#currentLanguage')
      .invoke('text')
      .should('eq', 'bg');
  });
});
