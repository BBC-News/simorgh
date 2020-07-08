import config from '../../../support/config/services';
import getPaths from '../../../support/helpers/getPaths';
import serviceHasPageType from '../../../support/helpers/serviceHasPageType';
import testsForCanonicalOnly from './testsForCanonicalOnly';
import testsForAMPOnly from './testsForAMPOnly';
import visitPage from '../../../support/helpers/visitPage';

const pageType = 'onDemandTV';
Object.keys(config)
  .filter(service => serviceHasPageType(service, pageType))
  .forEach(service => {
    const { variant } = config[service];
    const paths = getPaths(service, pageType);
    paths.forEach(currentPath => {
      describe(`${pageType} - ${currentPath}`, () => {
        before(() => {
          Cypress.env('currentPath', currentPath);
          visitPage(currentPath, pageType);
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
          testsForAMPOnly({
            service,
            pageType,
            variant,
          });
        });
      });
  });
