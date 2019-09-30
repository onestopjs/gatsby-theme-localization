/// <reference types="Cypress" />

describe("Embed translations", () => {
  it("homepage should NOT fetch translations on direct visit", () => {
    cy.visit("/en/");
    cy.get("#loading").should("not.exist");
  });
  it("about page should NOT fetch translations on direct visit", () => {
    cy.visit("/en/about");
    cy.get("#loading").should("not.exist");
  });
  it("contact page SHOULD fetch translations on direct visit", () => {
    cy.visit("/en/contact");
    cy.get("#loading").should("exist");
  });
});
