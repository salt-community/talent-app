describe("Home page tests", () => {
  it("Checks the homepage has loaded properly", () => {
    cy.visit("http://localhost:3000/");
    cy.title().should("contain", "Salt Talent Pool");
    cy.get('[data-cy="loading-shimmer"]').should("be.visible");
    cy.wait(100);
    cy.get("[data-cy='dev-list']").as("devList");
    cy.get("@devList").then(($list) => {
      if ($list.find("a").length > 0) {
        cy.log("Developers Exist");
        cy.get('[data-cy="no-listings"]').should("not.exist");
        cy.get("@devList").find('[data-cy="developer"]').should("be.visible");
      } else {
        cy.log("No Developers Exist");
        cy.get('[data-cy="no-listings"]').should("be.visible");
        cy.get("@devList").find('[data-cy="developer"]').should("not.exist");
      }
    });
    cy.get('[data-cy="loading-shimmer"]').should("not.exist");
    cy.get('[data-cy="logo"]').should("be.visible");
    cy.get('[data-cy="client-sign-in"]').should("be.visible");
    cy.get('[data-cy="salt-sign-in"]').should("be.visible");
    cy.get('[data-cy="searchbar"]').should("be.visible");
    cy.get('[data-cy="search-submit"]').should("be.visible");
  });
});
