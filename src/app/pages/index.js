import pipe from 'ramda/src/pipe';
import _ArticlePage from './ArticlePage';
import _ErrorPage from './ErrorPage';
import _FrontPage from './FrontPage';
import _MediaAssetPage from './MediaAssetPage';
import _MostReadPage from './MostReadPage';
import _PhotoGalleryPage from './PhotoGalleryPage';
import _LiveRadioPage from './LiveRadioPage';
import _OnDemandRadioPage from './OnDemandRadioPage';
import _OnDemandTvPage from './OnDemandTvPage';
import _StoryPage from './StoryPage';
import _IdxPage from './IdxPage';
import withContexts from '#containers/PageHandlers/withContexts';
import withPageWrapper from '#containers/PageHandlers/withPageWrapper';
import withError from '#containers/PageHandlers/withError';
import withLoading from '#containers/PageHandlers/withLoading';
import withData from '#containers/PageHandlers/withData';
import withVariant from '#containers/PageHandlers/withVariant';

const applyBasicPageHandlers = pipe(
  withData,
  withError,
  withLoading,
  withPageWrapper,
  withContexts,
);
const applyErrorPageHandlers = pipe(withLoading, withPageWrapper, withContexts);

export const ArticlePage = pipe(
  applyBasicPageHandlers,
  withVariant,
)(_ArticlePage);
export const ErrorPage = applyErrorPageHandlers(_ErrorPage);
export const FrontPage = pipe(applyBasicPageHandlers, withVariant)(_FrontPage);
export const MediaAssetPage = applyBasicPageHandlers(_MediaAssetPage);
export const MostReadPage = applyBasicPageHandlers(_MostReadPage);
export const PhotoGalleryPage = applyBasicPageHandlers(_PhotoGalleryPage);
export const LiveRadioPage = applyBasicPageHandlers(_LiveRadioPage);
export const OnDemandRadioPage = applyBasicPageHandlers(_OnDemandRadioPage);
export const OnDemandTvPage = applyBasicPageHandlers(_OnDemandTvPage);
export const StoryPage = applyBasicPageHandlers(_StoryPage);
export const IdxPage = applyBasicPageHandlers(_IdxPage);
