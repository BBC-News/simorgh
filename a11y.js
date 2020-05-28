const { getPageUrls } = require('./cypress/support/helpers/getPageUrls');

// allPageWidths = [240, 360, 600, 1008, 1280];
// Run a11y on 360px only since designs are done in this width
// This functionality can be extended to allow for testing on all widths
const pageWidths = [360];
const environment = 'local';
const isSmoke = true;
const baseUrl = 'http://localhost:7080';

// '//div[@id='root']/main/div/div/div/div/iframe' Added to hide
// iframe errors to be fixed in https://github.com/bbc/bbc-a11y/issues/298

// '//div[@id='root']/header/nav/div/div[1]/div/ul' Added to hide
// errors in scrollable navigation for RTL languages to be fixed in
// https://github.com/bbc/simorgh/issues/5222

const pageTypes = {
  frontPage: ["//div[@id='root']/header/nav/div/div[1]/div/ul"],
  articles: ["//div[@id='root']/header/nav/div/div[1]/div/ul"],
  liveRadio: [
    "//div[@id='root']/main/div/div/div/iframe",
    "//div[@id='root']/header/nav/div/div[1]/div/ul",
  ],
  photoGalleryPage: ["//div[@id='root']/header/nav/div/div[1]/div/ul"],
  mostReadPage: ["//div[@id='root']/header/nav/div/div[1]/div/ul"],
  storyPage: [
    "//div[@id='root']/header/nav/div/div[1]/div/ul",
    '/iframe', // known issue above with iframes should be revisited once https://github.com/bbc/bbc-a11y/pull/313 gets merged.
    "//div[@id='root']/div/div[1]/main/div[37]/div/div/div", // issue with IDT2 includes
  ],
};

Object.keys(pageTypes).forEach(pageType => {
  getPageUrls({ pageType, environment, isSmoke }).forEach(url =>
    pageWidths.forEach(width =>
      // eslint-disable-next-line no-undef
      page(`${baseUrl}${url}`, { width, hide: pageTypes[pageType] }),
    ),
  );
});
