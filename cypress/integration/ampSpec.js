import { getElement } from '../support/bodyTestHelper';
import { testResponseCode } from '../support/metaTestHelper';

describe('AMP Tests on a .amp page', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    // Only 'c9rpqy7pmypo' & 'c85pqyj5m2ko' are available within the PROD enviroment
    cy.visit('/news/articles/c85pqyj5m2ko.amp');
  });

  describe('AMP Status', () => {
    it('should return a 200 response', () => {
      testResponseCode('/news/articles/c85pqyj5m2ko.amp', 200);
    });
  });

  it('should error gracefully', () => {
    testResponseCode('/news/articles/c85pqyj5m2ko.cake', 404);
    testResponseCode('/news/lol/c85pqyj5m2ko.amp', 404);
    testResponseCode('/cake/articles/c85pqyj5m2ko.amp', 404);
  });

  it('should have AMP attribute', () => {
    getElement('html').should('have.attr', 'amp');
  });

  it('should load the AMP framework', () => {
    // .eq(1) gets the amp <script> as the first loaded is a Cypress <script>
    const ampScript = getElement('head script').eq(1);
    ampScript.should('have.attr', 'src', 'https://cdn.ampproject.org/v0.js');
  });

  it('should not have any non-amp scripts in the body or the head', () => {
    getElement('body script').should('not.exist');
    getElement('head script')
      .its('length')
      .should('be', 2); // 1 for amp.js + 1 that Cypress injects into the head
  });

  it('should contain an amp-img', () => {
    const figure = getElement('figure').eq(0);
    figure.should('be.visible');
    figure.within(() => {
      getElement('amp-img').should('be.visible');
    });
  });

  it('should not have an AMP attribute on the main article', () => {
    cy.visit('/news/articles/c85pqyj5m2ko');
    getElement('html').should('not.have.attr', 'amp');
  });
});
