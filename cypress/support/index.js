import './commands';

Cypress.Screenshot.defaults({
  screenshotOnRunFailure: false,
});

Cypress.on(`window:before:load`, win => {
  cy.stub(win.console, `error`, msg => {
    cy.now(`task`, `error`, msg);
    throw new Error(msg);
  });
});

// Workaround for AMP Analytics bug - there is a pending fix here: https://github.com/ampproject/amphtml/pull/28448
// Can be removed when this is resolved.
// eslint-disable-next-line consistent-return
Cypress.on('uncaught:exception', () => {
  // returning false here prevents Cypress from failing the test
  // if (
  //   err.message &&
  //   err.message.includes(
  //     'Inline or remote config should not overwrite vendor transport settings',
  //   )
  // ) {
  //   return false;
  // }
  return false;
});
