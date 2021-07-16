import path from 'ramda/src/path';
import config from '../../../support/config/services';

export default ({ service, pageType, variant }) => {
  describe(`No testsToAlwaysRun to run for ${service} ${pageType}`, () => {
    describe(`Tests for ${service} ${pageType}`, () => {
      describe('Most Read component', () => {
        before(() => {
          cy.getToggles(config[service].name);
        });

        // Allows constructing most watched path with variant
        const serviceVariant = variant === 'default' ? '' : `/${variant}`;

        const mostReadPath = `/${config[service].name}/mostread${serviceVariant}.json`;
        it('should show/not show the Most Read component if the toggle is enabled for the service', function test() {
          // Find if the service has component enabled in toggles, unless it is live environment which does not have mostRead toggle
          if (Cypress.env('APP_ENV') !== 'live') {
            cy.fixture(`toggles/${config[service].name}.json`).then(toggles => {
              const mostReadIsEnabled = path(['mostRead', 'enabled'], toggles);
              cy.log(`Service toggle enabled ${mostReadIsEnabled}`);
              // If toggle is enabled for that service, also check there are more than 0 records to show
              if (mostReadIsEnabled) {
                cy.request(mostReadPath).then(({ body: mostReadJson }) => {
                  if (mostReadJson.totalRecords > 0) {
                    cy.get('[data-e2e="most-read"]').within(() => {
                      cy.get('li').should('exist');
                    });
                  } else {
                    cy.log('Not enough records to show component');
                    cy.task('log', 'Not enough records to show component');
                    cy.get('[data-e2e="most-read"]').within(() => {
                      cy.get('li').should('not.exist');
                    });
                  }
                });
              }
            });
          } else {
            cy.request(mostReadPath).then(({ body: mostReadJson }) => {
              if (mostReadJson.totalRecords > 0) {
                cy.get('[data-e2e="most-read"]').within(() => {
                  cy.get('li').should('exist');
                });
              } else {
                cy.log('Not enough records to show component');
                cy.task('log', 'Not enough records to show component');
                cy.get('[data-e2e="most-read"]').within(() => {
                  cy.get('li').should('not.exist');
                });
              }
            });
          }
        });
      });
    });
  });
};
