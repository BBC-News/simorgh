describe('Storybook Article', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit('/');
    // uncollapse all stories (first is open by default)
    cy.get('div[role="menuitem"]').each($story => {
      cy.wrap($story).click();
    });
  });

  it('should render a title', () => {
    cy.title().should('eq', 'Storybook');
  });

  it('each story render panel should not be blank', () => {
    cy.get('div[role="menuitem"]').each($a => {
      cy.wrap($a).click({ force: true });
      cy.get('#storybook-preview-iframe').then($iframe => {
        // .sb-show-main is the class of the storybook display panel
        const $root = $iframe.contents().find('body.sb-show-main #root');
        cy.wrap($root)
          .children()
          .should('exist');
      });
    });
  });
});
