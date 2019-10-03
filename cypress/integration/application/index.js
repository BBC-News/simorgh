import config from '../../support/config/services';
import appConfig from '../../../src/testHelpers/serviceConfigs';

const serviceHasPageType = (service, pageType) =>
  config[service].pageTypes[pageType].path !== undefined;

const servicesUsingArticlePaths = ['news', 'scotland'];

describe('Application', () => {
  Object.keys(config)
    .filter(service => !servicesUsingArticlePaths.includes(service))
    .filter(service =>
      Object.keys(config[service].pageTypes).some(pageType =>
        serviceHasPageType(service, pageType),
      ),
    )
    .forEach(service => {
      it(`should return a 200 status code for ${service}'s service worker`, () => {
        cy.testResponseCodeAndType(
          `/${service}/sw.js`,
          200,
          'application/javascript',
        );
      });

      it(`should return a 200 status code for ${service} manifest file`, () => {
        cy.testResponseCodeAndType(
          `/${service}/manifest.json`,
          200,
          'application/json',
        );
      });
    });
});

describe('Application', () => {
  servicesUsingArticlePaths.forEach(service => {
    it(`should return a 200 status code for the ${service} service worker`, () => {
      cy.testResponseCodeAndType(
        `/${service}/articles/sw.js`,
        200,
        'application/javascript',
      );
    });

    it(`should return a 200 status code for ${service} manifest file`, () => {
      cy.testResponseCodeAndType(
        `/${service}/articles/manifest.json`,
        200,
        'application/json',
      );
    });
  });
});

describe('Application unknown route error pages', () => {
  if (Cypress.env('APP_ENV') === 'local') {
    const unknownRoutes = [
      '/foobar',
      '/foobar.amp',
      '/igbo/foobar',
      'igbo/foobar.amp',
    ];
    unknownRoutes.forEach(url => {
      it('should display a news canonical error page', () => {
        cy.testResponseCodeAndType(url, 404, 'text/html');
        cy.visit(url, { failOnStatusCode: false });
        const service = url.includes('igbo') ? 'igbo' : 'news';
        cy.get('h1 span').should(
          'contain',
          `${appConfig[service].default.translations.error[404].statusCode}`,
        );
        cy.get('h1').should(
          'contain',
          `${appConfig[service].default.translations.error[404].title}`,
        );
      });
    });
  }
});
