import config from '../../support/config/services';

describe('Static Articles data', () => {
  it('should return a 200 status code', () => {
    cy.testResponseCodeAndType(
      `${config.news.pageTypes.articles}.json`,
      200,
      'application/json',
    );
  });
});
