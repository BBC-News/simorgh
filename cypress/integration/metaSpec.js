import { getElement, getSecondElement } from '../support/testHelper';

describe('Article Meta Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    // Only 'c0000000025o' & 'c0000000027o' are available within the PROD enviroment
    cy.visit('/news/articles/c0000000025o');
  });

  it('should have a nofollow meta tag', () => {
    const metaElement = getElement('head meta[name="robots"]');
    metaElement.should('have.attr', 'content', 'nofollow');
  });

  it('should load a maximum of two Reith font files', () => {
    const fontFamiliesArray = [];
    cy.get('*')
      .each(element => {
        const fontFamily = Cypress.$(element).css('font-family');
        if (
          fontFamily &&
          !fontFamiliesArray.includes(fontFamily) &&
          fontFamily.startsWith('Reith')
        ) {
          fontFamiliesArray.push(fontFamily);
        }
      })
      .then(() => {
        expect(fontFamiliesArray.length).to.be.lessThan(3);
        expect(fontFamiliesArray.length).to.be.greaterThan(0);
      });
  });

  // Testing the actual fetch is not currently possible
  it('should have script to fetch bundle', () => {
    cy.get('script')
      .last()
      .should('have.attr', 'src')
      .and('match', /(\/static\/js\/client-\w+\.\w+\.js)/g);
  });

  it('should have resource hints', () => {
    const resources = [
      'https://ichef.bbci.co.uk',
      'https://static.bbci.co.uk',
      'https://gel.files.bbci.co.uk',
    ];

    resources.forEach(resource => {
      const selector = `head link[href="${resource}"]`;
      const firstElement = getElement(selector);
      firstElement.should('have.attr', 'rel', 'preconnect');
      const secondElement = getSecondElement(selector);
      secondElement.should('have.attr', 'rel', 'dns-prefetch');
    });
  });
});
