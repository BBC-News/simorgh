import config from '../support/configOld';

describe('Header Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit(`${config.assets.newsThreeSubheadlines}`);
  });

  it('should render the BBC News branding', () => {
    cy.get('header a').should('contain', 'BBC News');
  });
});
