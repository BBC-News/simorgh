import worldServices from '../../support/worldServices';
import { getElement } from '../../support/bodyTestHelper';
import { checkCanonicalURL } from '../../support/metaTestHelper';
import { describeForLocalOnly } from '../../support/limitEnvRuns';

// TODO Enable all disabled tests below once bbc/simorgh#1906 has been merged.
//   The Metadata container performs some AMP work, so the AMP on the front page
//   will not be valid until the Metadata container has been added into the front
//   page container. 🙃
describeForLocalOnly('AMP Tests on a .amp page', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit(`${worldServices.igbo.url}.amp`);
  });

  describe('AMP Status', () => {
    it('should return a 200 response', () => {
      cy.testResponseCodeAndType(
        `${worldServices.igbo.url}.amp`,
        200,
        'text/html',
      );
    });
  });

  it('should error gracefully and return HTML', () => {
    cy.testResponseCodeAndType(
      `${worldServices.igbo.url}.cake`,
      404,
      'text/html',
    );
    cy.testResponseCodeAndType(
      `/amp${worldServices.igbo.url}`,
      404,
      'text/html',
    );
    cy.testResponseCodeAndType(
      `${worldServices.igbo.url}/amp`,
      404,
      'text/html',
    );
    cy.testResponseCodeAndType(`/cake.amp`, 404, 'text/html');
  });

  xit('should have AMP attribute', () => {
    getElement('html').should('have.attr', 'amp');
  });

  it('should load the AMP framework', () => {
    // .eq(1) gets the amp <script> as:
    // the first loaded is a Cypress <script>
    // Once bbc/simorgh#1906 has been merged, this may need to become .eq(2) as:
    //  the second loaded will be the Schema.org metadata script
    // and the below `.eq(x)`s will also need updating
    const ampScript = getElement('head script').eq(1);
    ampScript.should('have.attr', 'src', 'https://cdn.ampproject.org/v0.js');

    const ampGeoScript = getElement('head script').eq(2);
    ampGeoScript.should(
      'have.attr',
      'src',
      'https://cdn.ampproject.org/v0/amp-geo-0.1.js',
    );

    const ampConsentScript = getElement('head script').eq(3);
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
    const storyPromo = getElement('li');
    storyPromo.should('be.visible');
    storyPromo.within(() => {
      getElement('amp-img').should('be.visible');
    });
  });

  xit('should include the canonical URL', () => {
    const { origin } = window.location;
    const canonicalOrigin = origin.includes('localhost')
      ? 'https://www.bbc.com'
      : origin;

    checkCanonicalURL(`${canonicalOrigin}${worldServices.igbo.url}`);
  });

  xit('should not have an AMP attribute on the main article', () => {
    cy.visit(`${worldServices.igbo.url}`);
    getElement('html').should('not.have.attr', 'amp');
  });
});
