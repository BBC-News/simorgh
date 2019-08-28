import envConfig from '../../support/config/envs';
import config from '../../support/config/services';

const serviceIsGNL = service => service === 'japanese';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRunForAllAMPPages = ({ service, pageType }) => {
  describe(`No testsToAlwaysRunForAMPPages to run for ${service} ${pageType}`, () => {});
};

// For testing feastures that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForAllAMPPages = ({
  service,
  pageType,
}) => {
  describe(`Running testsForAllAMPPages for ${service} ${pageType}`, () => {
    if (pageType !== 'errorPage404') {
      it('should have an AMP attribute on the page', () => {
        cy.get('html').should('have.attr', 'amp');
      });
      describe('ATI', () => {
        it('should have an amp-analytics tag with the ati url', () => {
          if (service === serviceIsGNL) {
            cy.hasAmpAnalyticsAtiUrl(
              envConfig.atiUrl,
              envConfig.atiAnalyticsGNLBucket,
            );
          } else if (config[service].isWorldService) {
            cy.hasAmpAnalyticsAtiUrl(
              envConfig.atiUrl,
              envConfig.atiAnalyticsWSBucket,
            );
          } else {
            cy.hasAmpAnalyticsAtiUrl(envConfig.atiUrl, '');
          }
        });
      });
    }
  });
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForAllAMPPages = ({
  service,
  pageType,
}) => {
  describe(`No testsToNeverSmokeTestForAMPPages to run for ${service} ${pageType}`, () => {});
};
