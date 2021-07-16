import path from 'ramda/src/path';
import config from '../../../support/config/services';

export default ({ service, pageType, variant }) => {
  describe(`Tests for ${service} ${pageType}`, () => {
    describe('Most Watched component', () => {
      before(() => {
        cy.getToggles(config[service].name);
      });
      // Allows constructing most watched path with variant
      const serviceVariant = variant === 'default' ? '' : `/${variant}`;

      const mostWatchedPath = `/${config[service].name}/mostwatched${serviceVariant}.json`;
      it('should show/not show the Most Watched component if the toggle is enabled for the service', function test() {
        // Find if the service has component enabled in toggles
        cy.fixture(`toggles/${config[service].name}.json`).then(toggles => {
          const mostWatchedIsEnabled = path(
            ['mostPopularMediaPage', 'enabled'],
            toggles,
          );
          cy.log(`Service toggle enabled ${mostWatchedIsEnabled}`);
          // If toggle is enabled for that service, also check there are more than 0 records to show
          if (mostWatchedIsEnabled) {
            cy.request(mostWatchedPath).then(({ body: mostWatchedJson }) => {
              if (mostWatchedJson.totalRecords > 0) {
                cy.get('[data-e2e="most-watched-heading"]').should('exist');
              } else {
                cy.log('Not enough records to show component');
                cy.task('log', 'Not enough records to show component');

                cy.get('[data-e2e="most-watched-heading"]').should('not.exist');
              }
            });
          } else {
            cy.get('[data-e2e="most-watched-heading"]').should('not.exist');
          }
        });
      });
      it('should show correct number of items', function test() {
        cy.fixture(`toggles/${config[service].name}.json`).then(toggles => {
          const mostWatchedIsEnabled = path(
            ['mostPopularMediaPage', 'enabled'],
            toggles,
          );

          cy.request(mostWatchedPath).then(({ body: mostWatchedJson }) => {
            if (mostWatchedIsEnabled && mostWatchedJson.totalRecords > 0) {
              const maxNumberofItems = path(
                ['mostPopularMediaPage', 'value'],
                toggles,
              );
              cy.log(
                `Max number of items is ${maxNumberofItems}. Number of items is ${mostWatchedJson.totalRecords}`,
              );
              // Compares number of items in json to number of items shown in the component
              // If there is only one record, the item is not in a list
              // If the max number of items is 5 and the records are >= 5, checks it shows 5
              // If the max number of items is 10 and the records are >= 10, checks it shows 10
              const expectedNumberOfItems = Math.min(
                mostWatchedJson.totalRecords,
                maxNumberofItems,
              );

              if (
                mostWatchedJson.totalRecords === 1 ||
                maxNumberofItems === '1'
              ) {
                cy.get('[data-e2e="most-watched-heading"]').within(() => {
                  cy.get('[data-e2e="story-promo"]')
                    .its('length')
                    .should('eq', 1);
                });
              } else {
                cy.log(maxNumberofItems);
                cy.get('[data-e2e="most-watched-heading"]').within(() => {
                  cy.get('[data-e2e="most-watched-ol"]')
                    .find('>li')
                    .its('length')
                    .should('eq', expectedNumberOfItems);
                });
              }
            }
          });
        });
      });
    });
  });
};
