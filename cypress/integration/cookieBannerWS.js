import config from '../support/cookieConfig';
import { worldServiceCookieBannerTranslations } from '../support/bodyTestHelper';
import describeForEuOnly from '../support/describeForEuOnly';
import describeForLocalOnly from '../support/describeForLocalOnly';

const services = Object.keys(config);

// These tests work locally, but fail on Test & Live environments since they have
// not yet been set up to have the correct translated cookie banners on the error pages
describeForLocalOnly('World Service Cookie banner Translations', () => {
  describe('Canonical', () => {
    services.forEach(serviceName => {
      it(`should load the relevant translations for ${serviceName}`, () => {
        worldServiceCookieBannerTranslations(
          `${config[serviceName].assets.privacyStatement}`,
          `${config[serviceName].assets.performanceStatement}`,
          `${config[serviceName].assets.mockArticleURL}`,
          `${config[serviceName].assets.privacyAgreement}`,
          `${config[serviceName].assets.cookieAgreement}`,
        );
      });
    });
  });

  describeForEuOnly('AMP', () => {
    services.forEach(serviceName => {
      it(`should load the relevant translations for ${serviceName}`, () => {
        worldServiceCookieBannerTranslations(
          `${config[serviceName].assets.privacyStatement}`,
          `${config[serviceName].assets.performanceStatement}`,
          `${config[serviceName].assets.mockAmpArticleURL}`,
          `${config[serviceName].assets.privacyAgreement}`,
          `${config[serviceName].assets.cookieAgreement}`,
        );
      });
    });
  });
});
