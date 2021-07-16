import config from '../../../support/config/services';
import getPaths from '../../../support/helpers/getPaths';
import serviceHasPageType from '../../../support/helpers/serviceHasPageType';
import testsForCanonicalOnly from './testsForCanonicalOnly';
import crossPlatformTests from './tests';
import visitPage from '../../../support/helpers/visitPage';

const pageType = 'mostReadPage';
Object.keys(config)
  .filter(service => serviceHasPageType(service, pageType))
  .forEach(serviceId => {
    // eslint-disable-next-line prefer-const
    let { variant, name: service } = config[serviceId];
    if (variant !== 'default') {
      const capitaliseVariant =
        variant.charAt(0).toUpperCase() + variant.slice(1);
      service += capitaliseVariant;
    }
    const paths = getPaths(serviceId, pageType);
    paths.forEach(currentPath => {
      describe(`${pageType} - ${currentPath}`, () => {
        before(() => {
          Cypress.env('currentPath', currentPath);
          visitPage(currentPath, pageType);
        });
        crossPlatformTests({
          service,
          pageType,
          variant,
        });
        testsForCanonicalOnly({
          service,
          pageType,
          variant,
        });
      });
    });
    paths
      .map(path => `${path}.amp`)
      .forEach(currentPath => {
        describe(`${pageType} - ${currentPath}`, () => {
          before(() => {
            Cypress.env('currentPath', currentPath);
            visitPage(currentPath, pageType);
          });
          crossPlatformTests({
            service,
            pageType,
            variant,
            isAmp: true,
          });
        });
      });
  });
