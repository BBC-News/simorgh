/* eslint-disable consistent-return */
import path from 'ramda/src/path';
import {
  isAvailable,
  overrideRendererOnTest,
  getEmbedUrl,
  isBrand,
} from '../../../support/helpers/onDemandRadioTv';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import getDataUrl from '../../../support/helpers/getDataUrl';
import config from '../../../support/config/services';

export default ({ service, pageType, variant, isAmp }) => {
  describe(`Tests for ${service} ${pageType}`, () => {
    describe('Video Player', () => {
      it('should render an iframe with a valid URL', () => {
        cy.request(
          `${Cypress.env('currentPath')}.json${overrideRendererOnTest()}`,
        ).then(({ body: jsonData }) => {
          if (!isAvailable(jsonData)) {
            return cy.log(
              `Episode is not available: ${Cypress.env('currentPath')}`,
            );
          }

          const language = appConfig[service][variant].lang;
          const embedUrl = getEmbedUrl({ body: jsonData, language, isAmp });
          const isBrandPage = isBrand(jsonData);

          cy.get('iframe').then(iframe => {
            // If a brand, get the src of the iframe, otherwise, use the embed URL from the data
            const iframeURL = isBrandPage ? iframe.prop('src') : embedUrl;

            cy.get(`iframe[src*="${iframeURL}"]`).should('be.visible');
            cy.testResponseCodeAndTypeRetry({
              path: embedUrl,
              responseCode: 200,
              type: 'text/html',
              allowFallback: true,
            });
          });
        });
      });
    });
    describe(`Tests for ${service} ${pageType} ${variant} with toggle use`, () => {
      before(() => {
        cy.getToggles(config[service].name);
      });
      describe('Recent Episodes component', () => {
        it('should be displayed if the toggle is on, and shows the expected number of items (does not run on local)', function test() {
          if (Cypress.env('APP_ENV') === 'local') {
            cy.log('Does not run on local');
          } else {
            cy.fixture(`toggles/${config[service].name}.json`).then(toggles => {
              const recentEpisodesEnabled = path(
                ['recentVideoEpisodes', 'enabled'],
                toggles,
              );
              cy.log(
                `Recent Episodes component enabled? ${recentEpisodesEnabled}`,
              );

              if (recentEpisodesEnabled) {
                // There cannot be more episodes shown than the max allowed
                const recentEpisodesMaxNumber = path(
                  ['recentVideoEpisodes', 'value'],
                  toggles,
                );
                cy.log(`Recent Episodes max limit? ${recentEpisodesMaxNumber}`);
                const currentPath = Cypress.env('currentPath');
                const url =
                  Cypress.env('APP_ENV') === 'test'
                    ? `${currentPath}?renderer_env=live`
                    : `${currentPath}`;

                cy.request(getDataUrl(url)).then(({ body }) => {
                  // Count the number of episodes that are available and so will show (there can be unavailable episodes in the list)
                  const expectedNumberOfEpisodes = body.relatedContent.groups[0].promos
                    .filter(({ media }) => media.versions.length)
                    .slice(0, recentEpisodesMaxNumber).length;

                  cy.log(
                    `Number of available episodes? ${expectedNumberOfEpisodes}`,
                  );
                  if (expectedNumberOfEpisodes > 1) {
                    cy.get("ul[class*='css-1ddpce6-StyledEpisodeList']").should(
                      'exist',
                    );

                    cy.get("ul[class*='css-1ddpce6-StyledEpisodeList']").within(
                      () => {
                        cy.get("li[class*='css-9kvqqh-StyledEpisodeListItem']")
                          .its('length')
                          .should('eq', expectedNumberOfEpisodes);
                      },
                    );
                  }
                  // If there is only one item, it is not in a list
                  else if (expectedNumberOfEpisodes === 1) {
                    cy.get("div[class*='css-1sel12u-Wrapper emzt7w80']").should(
                      'exist',
                    );
                  } else {
                    cy.get("ul[class*='css-1ddpce6-StyledEpisodeList']").should(
                      'not.exist',
                    );
                    cy.log('No episodes present or available');
                  }
                });
              } else {
                cy.get("ul[class*='css-1ddpce6-StyledEpisodeList']").should(
                  'not.exist',
                );
                cy.log('Recent episodes is not toggled on for this service');
              }
            });
          }
        });
      });
    });
  });
};
