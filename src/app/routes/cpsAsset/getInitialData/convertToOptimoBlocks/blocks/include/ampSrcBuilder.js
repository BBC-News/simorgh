import Url from 'url-parse';

const ampSrcBuilder = href => {
  const ampSrcPrefix = process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN;
  const includePathname = new Url(href, true).pathname;
  const includeQueryString = new Url(href, false).query;

  return `${ampSrcPrefix + includePathname}/amp${includeQueryString}`;
};

export default ampSrcBuilder;
