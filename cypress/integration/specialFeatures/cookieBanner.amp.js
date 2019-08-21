import config from '../../support/config/services';
import appConfig from '../../../src/app/lib/config/services';
import describeForEuOnly from '../../support/describeForEuOnly';
import shouldSmokeTest from '../../support/shouldSmokeTest';

// Limited to 1 UK & 1 WS service for now due to time test takes to run per page.
const serviceFilter = service => ['news', 'persian'].includes(service);

const filterPageTypes = (service, pageType) =>
  config[service].pageTypes[pageType].path !== undefined;

const getPrivacyBanner = service =>
  cy.contains(appConfig[service].translations.consentBanner.privacy.title);

const getCookieBanner = service =>
  cy.contains(appConfig[service].translations.consentBanner.cookie.title);

const getPrivacyAccept = service =>
  cy.contains(appConfig[service].translations.consentBanner.privacy.accept);

const getCookieAccept = service =>
  cy.contains(appConfig[service].translations.consentBanner.cookie.accept);

const getCookieReject = service =>
  cy.contains(appConfig[service].translations.consentBanner.cookie.reject);

const visitPage = (service, pageType) => {
  cy.visit(`${config[service].pageTypes[pageType].path}.amp`, {
    failOnStatusCode: !pageType.includes('error'),
  });
};

Object.keys(config)
  .filter(serviceFilter)
  .forEach(service => {
    Object.keys(config[service].pageTypes)
      .filter(pageType => shouldSmokeTest(pageType, service))
      .filter(pageType => filterPageTypes(service, pageType))
      .forEach(pageType => {
        describeForEuOnly(
          `Amp Cookie Banner Test for ${service} ${pageType}`,
          () => {
            beforeEach(() => {
              visitPage(service, pageType);
            });

            it('should have a privacy & cookie banner, which disappears once "accepted" ', () => {
              getPrivacyBanner(service).should('be.visible');
              getCookieBanner(service).should('not.be.visible');

              getPrivacyAccept(service).click();

              getCookieBanner(service).should('be.visible');
              getPrivacyBanner(service).should('not.be.visible');

              getCookieAccept(service).click();

              getCookieBanner(service).should('not.be.visible');
              getPrivacyBanner(service).should('not.be.visible');
            });

            it('should show privacy banner if cookie banner isnt accepted, on reload', () => {
              getPrivacyAccept(service).click();

              visitPage(service, pageType);

              getPrivacyBanner(service).should('be.visible');
              getCookieBanner(service).should('not.be.visible');
            });

            it('should not show privacy & cookie banners once both accepted, on reload', () => {
              getPrivacyAccept(service).click();
              getCookieAccept(service).click();

              visitPage(service, pageType);

              getPrivacyBanner(service).should('not.be.visible');
              getCookieBanner(service).should('not.be.visible');
            });

            it('should not show privacy & cookie banners once cookie banner declined, on reload', () => {
              getPrivacyBanner(service).should('be.visible');
              getCookieBanner(service).should('not.be.visible');

              getPrivacyAccept(service).click();
              getCookieReject(service).click();

              visitPage(service, pageType);

              getPrivacyBanner(service).should('not.be.visible');
              getCookieBanner(service).should('not.be.visible');
            });
          },
        );
      });
  });
