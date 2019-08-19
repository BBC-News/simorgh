import envConfig from '../../../support/config/envs';
import config from '../../../support/config/services';

export default ({ service }) =>
  describe('Amp Tests', () => {
    describe('AMP Status', () => {
      it('should return a 200 response', () => {
        cy.testResponseCodeAndType(
          `${config[service].pageTypes.liveRadio.path}.amp`,
          200,
          'text/html',
        );
      });
    });

    describe('ATI', () => {
      it.skip('should have an amp-analytics tag with the ati url', () => {
        cy.hasAmpAnalyticsAtiUrl(
          envConfig.atiUrl,
          config[service].isWorldService ? envConfig.atiAnalyticsWSBucket : '',
        );
      });
    });

    describe('Chartbeat', () => {
      if (envConfig.chartbeatEnabled) {
        it.skip('should have chartbeat config UID', () => {
          cy.hasAmpChartbeatConfigUid();
        });
      }
    });

    it('should have AMP attribute', () => {
      cy.get('html').should('have.attr', 'amp');
    });

    // TODO - Refactor or review this. Can it be a puppeteer test?
    it('should load the AMP framework', () => {
      // .eq(2) gets the amp <script> as:
      // the first loaded is a Cypress <script>
      // the second loaded is the Schema.org metadata script
      cy.get('head script')
        .eq(2)
        .should('have.attr', 'src', 'https://cdn.ampproject.org/v0.js');

      cy.get('head script')
        .eq(3)
        .should(
          'have.attr',
          'src',
          'https://cdn.ampproject.org/v0/amp-geo-0.1.js',
        );

      cy.get('head script')
        .eq(4)
        .should(
          'have.attr',
          'src',
          'https://cdn.ampproject.org/v0/amp-consent-0.1.js',
        );

      cy.get('head script')
        .eq(5)
        .should(
          'have.attr',
          'src',
          'https://cdn.ampproject.org/v0/amp-analytics-0.1.js',
        );
    });

    it('should load the AMP body scripts', () => {
      cy.get('body script')
        .eq(0)
        .should('have.attr', 'type', 'application/json');
      cy.get('body script')
        .eq(1)
        .should('have.attr', 'type', 'application/json');
    });

    it('should have any correct amp scripts in the body and the head', () => {
      cy.get('body script')
        .its('length')
        .should('be', 2); // 1 for amp-geo + 1 for amp-consent
      cy.get('head script')
        .its('length')
        .should('be', 5); // 1 for amp.js + 1 for amp-geo + 1 for amp-consent + 1 for amp-analytics + 1 that Cypress injects into the head
    });
  });
