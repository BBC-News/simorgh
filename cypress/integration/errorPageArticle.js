import path from 'ramda/src/path';
import {
  errorMessage,
  errorPageInlineLink,
  errorTitle,
  hasHtmlLangDirAttributes,
} from '../support/bodyTestHelper';
import testData from '../../src/app/lib/config/services';
import services from '../support/config/services';

const nonExistentAsset = 'cxvxrj8tvppo';
const serviceHasNonExistentArticle = service =>
  path(['pageTypes', 'articles', 'nonExistent'], services[service]);

// These must only ever be run locally as otherwise you're testing
// the mozart page not the response from this application.
Object.keys(services)
  .filter(serviceHasNonExistentArticle)
  .forEach(service => {
    describe('Test we get a 404', () => {
      it('should return a 404 error code', () => {
        cy.request({
          url: `/${service}/articles/${nonExistentAsset}`,
          failOnStatusCode: false,
        }).then(({ status }) => {
          expect(status).to.eq(404);
        });
      });
    });

    describe(`${service} Article Error Page Tests`, () => {
      // eslint-disable-next-line no-undef
      beforeEach(() => {
        cy.visit(`/${service}/articles/${nonExistentAsset}`, {
          failOnStatusCode: false,
        });
      });

      it('should return a 404 error code', () => {
        cy.testResponseCodeAndType(
          `/${service}/articles/${nonExistentAsset.asset}`,
          404,
          'text/html',
        );
      });

      it('should have the correct lang & dir attributes', () => {
        hasHtmlLangDirAttributes({
          lang: `${testData[service].lang}`,
          dir: `${testData[service].dir}`,
        });
      });

      it('should display a relevant error message on screen', () => {
        cy.visit(`/${service}/articles/${nonExistentAsset}`, {
          failOnStatusCode: false,
        });
        errorMessage(testData[service]);

        cy.visit(`/${service}/articles/${nonExistentAsset}`, {
          failOnStatusCode: false,
        });
        errorMessage(testData[service]);
      });

      it('should have an inline link on the page that is linked to the home page', () => {
        errorPageInlineLink(testData[service]);
      });

      it('should have a relevant error title in the head', () => {
        errorTitle(testData[service]);
      });
    });
  });
