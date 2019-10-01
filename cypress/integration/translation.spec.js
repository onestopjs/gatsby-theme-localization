/// <reference types="Cypress" />

describe('Text is translated', () => {
  it('title in about page is in english', () => {
    cy.visit('/en/about');
    cy.get('#pageTitle')
      .invoke('text')
      .should('eq', 'About us');
  });
  it('title in about page is in bulgarian', () => {
    cy.visit('/bg/about');
    cy.get('#pageTitle')
      .invoke('text')
      .should('eq', 'За нас');
  });
  it('title in contact page is in english', () => {
    cy.visit('/en/contact');
    cy.get('#pageTitle')
      .invoke('text')
      .should('eq', 'Contact me');
  });
  it('title in contact page is in bulgarian', () => {
    cy.visit('/bg/contact');
    cy.get('#pageTitle')
      .invoke('text')
      .should('eq', 'Свържете се');
  });
});
