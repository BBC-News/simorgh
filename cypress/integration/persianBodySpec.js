import config from '../support/config';
import { describeForLocalAndTest } from '../support/limitEnvRuns';
import {
  copyrightDataWindow,
  firstHeadlineDataWindow,
  firstParagraphDataWindow,
  getElement,
  placeholderImageLoaded,
  renderedTitle,
  visibleImageNoCaption,
  visibleImageWithCaption,
} from '../support/bodyTestHelper';

describeForLocalAndTest('Article Body Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit(`/persian/articles/${config.assets.persian}`);
  });

  it('should render an H1, which contains/displays a styled headline', () => {
    firstHeadlineDataWindow();
  });

  it('should render a paragraph, which contains/displays styled text', () => {
    firstParagraphDataWindow();
  });

  it('should have a placeholder image', () => {
    placeholderImageLoaded(getElement('figure div').eq(0));
  });

  it('should have an image copyright label with styling', () => {
    copyrightDataWindow();
  });

  it('should have a visible image without a caption', () => {
    visibleImageNoCaption(getElement('figure').eq(0));
  });

  it('should have a visible image with a caption', () => {
    getElement('figure')
      .eq(2)
      .as('figure')
      .within(() =>
        getElement('div div').should('have.class', 'lazyload-placeholder'),
      )
      .scrollIntoView()
      .then(() => visibleImageWithCaption(getElement('@figure')))
      .within(() => {
        getElement('noscript').contains('<img ');
        getElement('div div').should('not.have.class', 'lazyload-placeholder');
      });
  });

  it('should render a title', () => {
    cy.window().then(win => {
      const { seoHeadline } = win.SIMORGH_DATA.pageData.promo.headlines;
      renderedTitle(`${seoHeadline} - BBC News فارسی`);
    });
  });
});
