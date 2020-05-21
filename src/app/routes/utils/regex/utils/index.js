const idRegex = 'c[a-zA-Z0-9]{10}o';
const ampRegex = '.amp';
const assetUriRegex = '[a-z-_]{0,}[0-9]{8,}';
const legacyAssetUriRegex =
  '[a-z-_/]{1,}/[0-9]{4}/[0-9]{2}/[0-9]{6}[a-z0-9-_]{0,}';
const variantRegex = '/simp|/trad|/cyr|/lat';
const articleLocalRegex = 'articles|erthyglau|sgeulachdan';
const mediaIdRegex = '[a-z0-9]+';
const radioMasterBrandRegex = 'bbc_[a-z]+_radio';
const errorCodeRegex = '404|500';
const idxRegex = 'persian/afghanistan|ukrainian/ukraine_in_russian';

const getServiceRegex = services => services.join('|');

export const getArticleRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/:local(${articleLocalRegex})/:id(${idRegex}):variant(${variantRegex})?:amp(${ampRegex})?`;
};

export const getArticleSwRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/:local(${articleLocalRegex})/sw.js`;
};

export const getArticleManifestRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/:local(${articleLocalRegex})/manifest.json`;
};

export const getFrontPageRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex}):variant(${variantRegex})?:amp(${ampRegex})?`;
};

export const getSwRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/sw.js`;
};

export const getManifestRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/manifest.json`;
};

export const getCpsAssetRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex}):variant(${variantRegex})?/:assetUri(${assetUriRegex}):amp(${ampRegex})?`;
};

export const getLegacyAssetRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex}):variant(${variantRegex})?/:assetUri(${legacyAssetUriRegex})?:amp(${ampRegex})?`;
};

export const getLiveRadioRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/:serviceId(${radioMasterBrandRegex})/:mediaId(liveRadio):amp(${ampRegex})?`;
};

export const getOnDemandRadioRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/:serviceId(${radioMasterBrandRegex})(/programmes)?/:mediaId(${mediaIdRegex}):amp(${ampRegex})?`;
};

export const getErrorPageRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/:errorCode(${errorCodeRegex}):variant(${variantRegex})?`;
};

export const getMostReadPageRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex}):variant(${variantRegex})?/popular/read:amp(${ampRegex})?`;
};

export const getMostReadDataRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/mostread:variant(${variantRegex})?.json`;
};

export const getSecondaryColumnDataRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/sty-secondary-column:variant(${variantRegex})?.json`;
};

export const getIdxPageRegex = () => {
  return `/:idx(${idxRegex}):amp(${ampRegex})?`;
};
