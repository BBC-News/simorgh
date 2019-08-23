import appConfig from '../../../../src/app/lib/config/services';
import config from '../../../support/config/services';

// Limited to 1 UK & 1 WS service when a smoke test due to time test takes to run per page.
// This is why this file doesn't check smoke test values.
const serviceFilter = service =>
  Cypress.env('SMOKE') ? ['news', 'persian'].includes(service) : service;

const assertCookieValue = (cookieName, value) => {
  cy.getCookie(cookieName).should('have.property', 'value', value);
};

const assertCookieExpiryDate = (cookieName, timestamp) => {
  const testBuffer = 60;
  cy.getCookie(cookieName).then(c => {
    expect(c.expiry).to.be.within(
      timestamp - testBuffer,
      timestamp + testBuffer,
    );
  });
};

const filterPageTypes = (pageType, service) =>
  config[service].pageTypes[pageType].path !== undefined;

const getPrivacyBanner = service =>
  cy.contains(appConfig[service].translations.consentBanner.privacy.title);
const getCookieBanner = service =>
  cy.contains(appConfig[service].translations.consentBanner.cookie.title);
const getPrivacyBannerContainer = service => getPrivacyBanner(service).parent();
const getCookieBannerContainer = service => getCookieBanner(service).parent();
const getPrivacyBannerAccept = service =>
  getPrivacyBannerContainer(service).contains(
    appConfig[service].translations.consentBanner.privacy.accept,
  );
const getCookieBannerAccept = service =>
  getCookieBannerContainer(service).contains(
    appConfig[service].translations.consentBanner.cookie.accept,
  );
const getCookieBannerReject = service =>
  getCookieBannerContainer(service).contains(
    appConfig[service].translations.consentBanner.cookie.reject,
  );

const ensureCookieExpiryDates = () => {
  const inOneYear = (new Date() / 1000 + 60 * 60 * 24 * 365).toFixed();
  assertCookieExpiryDate('ckns_explicit', inOneYear);
  assertCookieExpiryDate('ckns_policy', inOneYear);
  assertCookieExpiryDate('ckns_privacy', inOneYear);
};

const assertCookieValues = cookies => {
  Object.keys(cookies).forEach(cookie => {
    assertCookieValue(cookie, cookies[cookie]);
  });
};

const visitPage = (service, pageType) => {
  cy.visit(config[service].pageTypes[pageType].path, {
    failOnStatusCode: !pageType.includes('error'),
  });
};

Object.keys(config)
  .filter(serviceFilter)
  .forEach(service => {
    Object.keys(config[service].pageTypes)
      .filter(pageType => filterPageTypes(pageType, service))
      .forEach(pageType => {
        describe(`Canonical Cookie Banner Test for ${service} ${pageType}`, () => {
          it('should have a privacy & cookie banner, which disappears once "accepted" ', () => {
            cy.clearCookies();
            visitPage(service, pageType);

            getPrivacyBanner(service).should('be.visible');
            getCookieBanner(service).should('not.be.visible');

            assertCookieValues({
              ckns_privacy: '1',
              ckns_policy: '000',
            });

            getPrivacyBannerAccept(service).click();

            getCookieBanner(service).should('be.visible');
            getPrivacyBanner(service).should('not.be.visible');

            getCookieBannerAccept(service).click();

            assertCookieValues({
              ckns_explicit: '1',
              ckns_privacy: '1',
              ckns_policy: '111',
            });

            getCookieBanner(service).should('not.be.visible');
            getPrivacyBanner(service).should('not.be.visible');

            ensureCookieExpiryDates();
          });

          it('should have a privacy banner that disappears once accepted but a cookie banner that is rejected', () => {
            cy.clearCookies();
            visitPage(service, pageType);

            getPrivacyBanner(service).should('be.visible');
            getCookieBanner(service).should('not.be.visible');

            assertCookieValues({
              ckns_privacy: '1',
              ckns_policy: '000',
            });

            getPrivacyBannerAccept(service).click();
            getCookieBannerReject(service).click();

            visitPage(service, pageType);

            assertCookieValues({
              ckns_explicit: '1',
              ckns_privacy: '1',
              ckns_policy: '000',
            });

            getCookieBanner(service).should('not.be.visible');
            getPrivacyBanner(service).should('not.be.visible');

            ensureCookieExpiryDates();
          });

          it("should show cookie banner (and NOT privacy banner) if user has visited the page before and didn't explicitly 'accept' cookies", () => {
            cy.clearCookies();
            cy.setCookie('ckns_privacy', '1');
            visitPage(service, pageType);

            getPrivacyBanner(service).should('not.be.visible');
            getCookieBanner(service).should('be.visible');
          });

          it("should not override the user's default cookie policy", () => {
            cy.clearCookies();
            cy.setCookie('ckns_policy', 'made_up_value');
            visitPage(service, pageType);

            assertCookieValues({
              ckns_policy: 'made_up_value',
            });
          });
        });
      });
  });
