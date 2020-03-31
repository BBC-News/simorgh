import envConfig from '../../../support/config/envs';
import config from '../../../support/config/services';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import { getEmbedUrl } from './helpers';

export default ({ service, variant }) => {
  describe('Media Player', () => {
    const language = appConfig[config[service].name][variant].lang;
    let embedUrl;

    before(() => {
      cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
        embedUrl = getEmbedUrl({ body, language, isAmp: true });
      });
    });

    it('embed URL should be reachable', () => {
      cy.testResponseCodeAndType(embedUrl, 200, 'text/html');
    });
  });

  describe('Chartbeat', () => {
    if (envConfig.chartbeatEnabled) {
      it('should have correct config UID', () => {
        cy.hasAmpChartbeatConfigUid();
      });
    } else {
      it('is not enabled', () => {});
    }
  });
};
