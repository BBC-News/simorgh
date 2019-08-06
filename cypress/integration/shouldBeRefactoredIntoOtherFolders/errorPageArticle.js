import testData from '../../../src/app/lib/config/services';
import config from '../../support/config/services';

const serviceHasNonExistentArticle = service =>
  config[service].pageTypes.errorPage404 !== undefined;

Object.keys(config)
  .filter(serviceHasNonExistentArticle)
  .forEach(service => {
    describe(`${service} Test we get a 404`, () => {
      it('should return a 404 error code', () => {
        cy.testResponseCodeAndType(
          config[service].pageTypes.errorPage404,
          404,
          'text/html',
        );
      });
    });
  });

// These must only ever be run locally as otherwise you're testing
// the mozart page not the response from this application.
Object.keys(config)
  .filter(serviceHasNonExistentArticle)
  .forEach(service => {
    describe(`${service} Article Error Page Tests`, () => {
      //  eslint-disable-next-line no-undef
      before(() => {
        cy.visit(config[service].pageTypes.errorPage404, {
          failOnStatusCode: false,
        });
      });

      it('should have the correct lang & dir attributes', () => {
        cy.hasHtmlLangDirAttributes({
          lang: `${testData[service].lang}`,
          dir: `${testData[service].dir}`,
        });
      });

      it('should display a relevant error message on screen', () => {
        cy.get('h1 span').should(
          'contain',
          `${testData[service].translations.error[404].statusCode}`,
          // eslint-disable-next-line no-undef
        );
        cy.get('h1').should(
          'contain',
          `${testData[service].translations.error[404].title}`,
        );
      });

      it('should have an inline link on the page that is linked to the home page', () => {
        cy.get('main p')
          .eq(1)
          .within(() => {
            cy.get('a').should(
              'have.attr',
              'href',
              `${testData[service].translations.error[404].callToActionLinkUrl}`,
            );
          });
      });

      it('should have a relevant error title in the head', () => {
        cy.renderedTitle(
          `${testData[service].translations.error[404].title} - ${testData[service].brandName}`,
        );
      });
    });
  });
