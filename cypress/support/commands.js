
// Addding Cypress Commands is safe, add away...
Cypress.Commands.add('testResponseCodeAndType', (path, responseCode, type) => {
  cy.request({ url: path, failOnStatusCode: false }).then(
    ({ status, headers }) => {
      expect(status).to.eq(responseCode);
      expect(headers['content-type']).to.include(type);
      // Always ensure we're not seeing the Mozart fallback
      expect(headers).not.to.have.property('x-mfa');
    },
  );
});
