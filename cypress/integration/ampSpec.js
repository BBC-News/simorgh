import config from '../support/config';
import { getElement } from '../support/bodyTestHelper';
import { testResponseCode, checkCanonicalURL } from '../support/metaTestHelper';

describe('AMP Tests on a .amp page', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit(`/news/articles/${config.specialAssets.news}.amp`);
  });

  describe('AMP Status', () => {
    it('should return a 200 response', () => {
      testResponseCode(`/news/articles/${config.specialAssets.news}.amp`, 200);
    });
  });

  it('should error gracefully', () => {
    testResponseCode(`/news/articles/${config.specialAssets.news}.cake`, 404);
    testResponseCode(`/news/lol/${config.specialAssets.news}.amp`, 404);
    testResponseCode(`/cake/articles/${config.specialAssets.news}.amp`, 404);
  });

  it('should have AMP attribute', () => {
    getElement('html').should('have.attr', 'amp');
  });

  it('should load the AMP framework', () => {
    // .eq(2) gets the amp <script> as:
    // the first loaded is a Cypress <script>
    // the second loaded is the Schema.org metadata script
    const ampScript = getElement('head script').eq(2);
    ampScript.should('have.attr', 'src', 'https://cdn.ampproject.org/v0.js');

    const ampGeoScript = getElement('head script').eq(3);
    ampGeoScript.should(
      'have.attr',
      'src',
      'https://cdn.ampproject.org/v0/amp-geo-0.1.js',
    );

    const ampConsentScript = getElement('head script').eq(4);
    ampConsentScript.should(
      'have.attr',
      'src',
      'https://cdn.ampproject.org/v0/amp-consent-0.1.js',
    );
  });

  it('should load the AMP body scripts', () => {
    const ampGeoScript = getElement('body script').eq(0);
    ampGeoScript.should('have.attr', 'type', 'application/json');

    const ampConsentScript = getElement('body script').eq(1);
    ampConsentScript.should('have.attr', 'type', 'application/json');
  });

  it('should have any correct amp scripts in the body and the head', () => {
    getElement('body script')
      .its('length')
      .should('be', 2); // 1 for amp-geo + 1 for amp-consent
    getElement('head script')
      .its('length')
      .should('be', 4); // 1 for amp.js + 1 for amp-geo + 1 for amp-consent + 1 that Cypress injects into the head
  });

  it('should contain an amp-img', () => {
    const figure = getElement('figure').eq(0);
    figure.should('be.visible');
    figure.within(() => {
      getElement('amp-img').should('be.visible');
    });
  });

  it('should include the canonical URL', () => {
    const { origin } = window.location;
    const canonicalOrigin = origin.includes('localhost')
      ? 'https://www.bbc.co.uk'
      : origin;
    cy.log(canonicalOrigin);
    checkCanonicalURL(
      `${canonicalOrigin}/news/articles/${config.specialAssets.news}`,
    );
  });

  it('should not have an AMP attribute on the main article', () => {
    cy.visit(`/news/articles/${config.specialAssets.news}`);
    getElement('html').should('not.have.attr', 'amp');
  });
});
