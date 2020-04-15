const { within } = require('@testing-library/dom');

export default ({ skipToContentText, headlineText }) => {
  [amp, canonical].forEach((page) => {
    describe(`And using ${page.platform}`, () => {
      it('I can see a skip to content link that links to the main content of the page', () => {
        const skipToContentEl = page.getByText(skipToContentText);
        expect(skipToContentEl.getAttribute('href')).toBe('#content');
      });

      if (headlineText) {
        it('I can see a headline in the main content of the page', () => {
          const { getByText } = within(
            page.document.querySelector('h1[id="content"]'),
          );
          const mainContentEl = getByText(headlineText);

          expect(mainContentEl.getAttribute('tabindex')).toBe('-1');
        });
      }
    });
  });
};
