describe("The Login Page", () => {
  let token = null;
  it("succesfully loads", () => {
    cy.viewport(1024, 768);
    cy.visit("/");
  });

  describe("Register", () => {
    beforeEach(() => {
      cy.viewport(1024, 768);
    })
    it("should register 'pepe' with password '1234' succesfully", () => {
      cy.visit("/");

      cy.get("input[name=username]").eq(1).type("pepe");
      cy.get("input[name=password]").eq(1).type("1234");
      cy.get("input[name=confirm-password]").type("1234");
      cy.wait(1000);
      cy.get("button").eq(1).click();

      cy.get("#message").should("exist");
    });
  });

  describe("Login", () => {
    beforeEach(() => {
      cy.viewport(1024, 768);
    })
    it("should not login 'pepe' with password 'as'", () => {
      cy.visit("/");

      cy.get("input[name=username]").first().type("pepe");
      cy.get("input[name=password]").first().type("as");
      cy.wait(1000);
      cy.get("button").first().click();

      cy.get("#error").should("exist");
    });

    it("should login 'pepe' with password '1234' succesfully", () => {
      cy.visit("/");

      cy.get("input[name=username]").first().type("pepe");
      cy.get("input[name=password]").first().type("1234");
      cy.wait(1000);
      cy.get("button").first().click();

      cy.get("#token").should("exist");
      cy.get("#token")
        .invoke("text")
        .then((text) => (token = text));
    });
  });

  after(() => {
    cy.request({
      url: "/user",
      method: "DELETE",
      auth: {
        bearer: token,
      },
    });
  });
});
