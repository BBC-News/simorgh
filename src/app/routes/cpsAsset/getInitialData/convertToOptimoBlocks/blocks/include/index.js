import 'isomorphic-fetch';
import Url from 'url-parse';
import {
  INCLUDE_ERROR,
  INCLUDE_FETCH_ERROR,
  INCLUDE_MISSING_URL,
  INCLUDE_REQUEST_RECEIVED,
  INCLUDE_UNSUPPORTED,
  INCLUDE_IFRAME_REQUEST_RECEIVED,
} from '#lib/logger.const';
import nodeLogger from '#lib/logger.node';
import { addOverrideQuery } from '#app/routes/utils/overrideRendererOnTest';
import ampSrcBuilder from './ampSrcBuilder';
import includeClassifier from './includeClassifier';
import getImageBlock from './getImageBlock';

const logger = nodeLogger(__filename);

const buildIncludeUrl = (href, type, pathname) => {
  const resolvers = {
    idt1: '',
    idt2: '/html',
    vj: '',
  };

  const withTrailingHref = href.startsWith('/') ? href : `/${href}`;

  const includeUrl = `${process.env.SIMORGH_INCLUDES_BASE_URL}${withTrailingHref}${resolvers[type]}`;

  const currentRendererEnv = new Url(pathname, true).query.renderer_env;

  let includeUrlWithParam = '';

  switch (currentRendererEnv) {
    case 'test':
      includeUrlWithParam = addOverrideQuery(includeUrl, 'test');
      break;
    case 'live':
      includeUrlWithParam = addOverrideQuery(includeUrl, 'live');
      break;
    default:
      return includeUrl;
  }
  return includeUrlWithParam;
};

const fetchMarkup = async url => {
  try {
    /* The timeout value here is arbitrary and subject to change. It's purpose is to ensure that pending promises do not delay page rendering on the server.
      Using isomorphic-fetch means we use window.fetch, which does not have a timeout option, on the client and node-fetch, which does, on the server.
    */
    const res = await fetch(url, { timeout: 3000 });
    if (res.status !== 200) {
      logger.error(INCLUDE_FETCH_ERROR, {
        status: res.status,
        url,
      });
      return null;
    }
    const html = await res.text();
    return html;
  } catch (error) {
    logger.error(INCLUDE_ERROR, {
      error: error.toString(),
      url,
    });
    return null;
  }
};

const convertInclude = async (includeBlock, ...restParams) => {
  const { href, type } = includeBlock;

  // Here pathname is passed as a prop specifically for CPS includes
  // This will most likely change in issue #6784 so it is temporary for now
  const pathname = restParams[2];

  const ampRegex = /\.amp$/;
  const isAmp = ampRegex.test(pathname);

  if (!href) {
    logger.error(INCLUDE_MISSING_URL, includeBlock);
    return null;
  }

  const { includeType, classification } = includeClassifier({ href, pathname });

  if (classification === 'not-supported') {
    logger.info(INCLUDE_UNSUPPORTED, {
      type,
      classification,
      url: href,
    });
    return null;
  }

  let ampSrc;
  let html;
  if (classification === 'vj-supports-amp') {
    ampSrc = ampSrcBuilder(href);
    logger.info(INCLUDE_IFRAME_REQUEST_RECEIVED, {
      url: ampSrc,
    });
  }
  if (!isAmp) {
    const url = buildIncludeUrl(href, includeType, pathname);
    logger.info(INCLUDE_REQUEST_RECEIVED, {
      url,
    });
    html = await fetchMarkup(buildIncludeUrl(href, includeType, pathname));
  }
  const imageBlock = getImageBlock(includeType, includeBlock, isAmp);

  return {
    type,
    model: {
      href,
      type: includeType,
      ...(ampSrc && { ampSrc }),
      ...(html && { html }),
      ...(imageBlock && { imageBlock }),
    },
  };
};

export default convertInclude;
