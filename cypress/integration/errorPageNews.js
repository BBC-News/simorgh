import config from '../support/config';
import {
  errorMessage,
  errorPageInlineLink,
  errorTitle,
} from '../support/bodyTestHelper';
import { testResponseCode } from '../support/metaTestHelper';
import news from '../../src/app/lib/config/services/news';

describe('Article Body Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit(`/news/articles/${config.assets.nonExistent}`, {
      failOnStatusCode: false,
    });
  });

  it('should return a 404 error code', () => {
    testResponseCode(`/news/articles/${config.assets.nonExistent}`, 404);
  });

  it('should display a relevant error message on screen', () => {
    cy.visit(`/news/articles/${config.assets.nonExistent}`, {
      failOnStatusCode: false,
    });
    errorMessage(news);

    cy.visit(`/news/articles/${config.assets.nonExistent}`, {
      failOnStatusCode: false,
    });
    errorMessage(news);
  });

  it('should have an inline link on the page that is linked to the home page', () => {
    errorPageInlineLink(news);
  });

  it('should have a relevant error title in the head', () => {
    errorTitle(news);
  });
});
