import config from '../../../support/config/services';
import envConfig from '../../../support/config/envs';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRunForCanonicalOnly = ({ service, pageType }) => {
  describe(`No testsToAlwaysRunForCanonicalOnly to run for ${service} ${pageType}`, () => {});
};

// For testing feastures that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForCanonicalOnly = ({
  service,
  pageType,
}) =>
  describe(`Canonical Tests for ${service} ${pageType}`, () => {
    describe('ATI', () => {
      it('should have a noscript tag with an 1px image with the ati url', () => {
        cy.hasNoscriptImgAtiUrl(
          envConfig.atiUrl,
          config[service].isWorldService ? envConfig.atiAnalyticsWSBucket : '',
        );
      });
    });

    // TODO Chartbeat not yet implemented
    describe('Chartbeat', () => {
      if (envConfig.chartbeatEnabled) {
        it.skip('should have a script with src value set to chartbeat source', () => {
          cy.hasScriptWithChartbeatSrc();
        });
        it.skip('should have chartbeat config set to window object', () => {
          cy.hasGlobalChartbeatConfig();
        });
      }
    });
  });

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForCanonicalOnly = ({
  service,
  pageType,
}) => {
  describe(`No testsToNeverSmokeTestForCanonicalOnly to run for ${service} ${pageType}`, () => {});
};
