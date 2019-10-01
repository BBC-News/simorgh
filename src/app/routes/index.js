import Article from '../containers/Article';
import FrontPage from '../containers/FrontPage';
import RadioPage from '../containers/RadioPage';
import ErrorPage from '../containers/Error';
import getArticleInitialData from './getInitialData/article';
import getFrontpageInitialData from './getInitialData/frontpage';
import getRadioPageInitialData from './getInitialData/radioPage';
import getMediaAssetPageInitialData from './getInitialData/mediaAssetPage';
import {
  articleRegexPath,
  frontpageRegexPath,
  radioAndTvRegexPathsArray,
  mediaAssetPageRegexPath,
} from './regex';

const routes = [
  {
    path: articleRegexPath,
    exact: true,
    component: Article,
    getInitialData: getArticleInitialData,
    pageType: 'article',
  },
  {
    path: frontpageRegexPath,
    exact: true,
    component: FrontPage,
    getInitialData: getFrontpageInitialData,
    pageType: 'frontPage',
  },
  {
    path: radioAndTvRegexPathsArray,
    exact: true,
    component: RadioPage,
    getInitialData: getRadioPageInitialData,
    pageType: 'media',
  },
  {
    path: mediaAssetPageRegexPath,
    exact: true,
    component: RadioPage,
    getInitialData: getMediaAssetPageInitialData,
    pageType: 'MAP',
  },
  {
    component: ErrorPage,
    getInitialData: () => Promise.resolve({ status: 404 }),
    pageType: 'error',
  },
];

export default routes;
