import React, { useContext } from 'react';
import { shape, bool, oneOf, oneOfType } from 'prop-types';
import styled from 'styled-components';
import StoryPromo, { Headline, Summary, Link } from '@bbc/psammead-story-promo';
import { GEL_SPACING, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import Timestamp from '@bbc/psammead-timestamp-container';
import pathOr from 'ramda/src/pathOr';
import LiveLabel from '@bbc/psammead-live-label';
import ImagePlaceholder from '@bbc/psammead-image-placeholder';
import ImageWithPlaceholder from '../ImageWithPlaceholder';
import { storyItem, linkPromo } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import { createSrcset } from '#lib/utilities/srcSet';
import getOriginCode from '#lib/utilities/imageSrcHelpers/originCode';
import getLocator from '#lib/utilities/imageSrcHelpers/locator';
import {
  getAssetTypeCode,
  getHeadlineUrlAndLive,
} from '#lib/utilities/getStoryPromoInfo';
import LinkContents from './LinkContents';
import MediaIndicatorContainer from './MediaIndicator';
import isTenHoursAgo from '#lib/utilities/isTenHoursAgo';
import IndexAlsosContainer from './IndexAlsos';
import loggerNode from '#lib/logger.node';
import { MEDIA_MISSING } from '#lib/logger.const';

const logger = loggerNode(__filename);

const PROMO_TYPES = ['top', 'regular', 'leading'];

const SingleColumnStoryPromo = styled(StoryPromo)`
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    display: grid;
  }
`;

const StoryPromoImage = ({ useLargeImages, imageValues, lazyLoad }) => {
  if (!imageValues) {
    const landscapeRatio = (9 / 16) * 100;
    return <ImagePlaceholder ratio={landscapeRatio} />;
  }

  const { height, width, path } = imageValues;

  const ratio = (height / width) * 100;
  const originCode = getOriginCode(path);
  const locator = getLocator(path);
  const imageResolutions = [70, 95, 144, 183, 240, 320, 660];
  const srcset = createSrcset(originCode, locator, width, imageResolutions);
  const sizes = useLargeImages
    ? '(max-width: 600px) 100vw, (max-width: 1008px) 50vw, 496px'
    : '(max-width: 1008px) 33vw, 321px';
  const DEFAULT_IMAGE_RES = 660;
  const src = `https://ichef.bbci.co.uk/news/${DEFAULT_IMAGE_RES}${path}`;

  return (
    <ImageWithPlaceholder
      alt={imageValues.altText}
      ratio={ratio}
      src={src}
      fallback={false}
      {...imageValues}
      lazyLoad={lazyLoad}
      copyright={imageValues.copyrightHolder}
      srcset={srcset}
      sizes={sizes}
    />
  );
};

StoryPromoImage.propTypes = {
  useLargeImages: bool.isRequired,
  lazyLoad: bool,
  imageValues: storyItem.indexImage,
};

StoryPromoImage.defaultProps = {
  lazyLoad: false,
  imageValues: shape({
    path: '',
    altText: '',
    height: '',
    width: '',
  }),
};

const StoryPromoContainer = ({
  item,
  promoType,
  lazyLoadImage,
  dir,
  displayImage,
  displaySummary,
  isRecommendation,
  isSingleColumnLayout,
}) => {
  const {
    altCalendar,
    script,
    datetimeLocale,
    service,
    translations,
    timezone,
  } = useContext(ServiceContext);

  const liveLabel = pathOr('LIVE', ['media', 'liveLabel'], translations);

  // As screenreaders mispronounce the word 'LIVE', we use visually hidden
  // text to read 'Live' instead, which screenreaders pronounce correctly.
  const liveLabelIsEnglish = liveLabel === 'LIVE';

  const isAssetTypeCode = getAssetTypeCode(item);
  const isStoryPromoPodcast =
    isAssetTypeCode === 'PRO' &&
    pathOr(null, ['contentType'], item) === 'Podcast';
  const isContentTypeGuide =
    isAssetTypeCode === 'PRO' &&
    pathOr(null, ['contentType'], item) === 'Guide';
  const isLtr = dir === 'ltr';

  const { headline, url, isLive } = getHeadlineUrlAndLive(
    item,
    isAssetTypeCode,
  );

  const overtypedSummary = pathOr(null, ['overtypedSummary'], item);
  const hasWhiteSpaces = overtypedSummary && !overtypedSummary.trim().length;

  let promoSummary;
  if (overtypedSummary && !hasWhiteSpaces) {
    promoSummary = overtypedSummary;
  } else {
    const summary = pathOr(null, ['summary'], item);
    promoSummary = summary;
  }

  const timestamp = pathOr(null, ['timestamp'], item);
  const relatedItems = pathOr(null, ['relatedItems'], item);
  const cpsType = pathOr(null, ['cpsType'], item);
  // If mediaStatusCode is visible, there is an error in rendering the block
  const mediaStatuscode = pathOr(null, ['media', 'statusCode'], item);

  const displayTimestamp =
    timestamp &&
    !isStoryPromoPodcast &&
    !isContentTypeGuide &&
    !isRecommendation &&
    !isLive;

  if (cpsType === 'MAP' && mediaStatuscode) {
    logger.warn(MEDIA_MISSING, {
      url: pathOr(null, ['section', 'uri'], item),
      mediaStatuscode,
      mediaBlock: item.media,
    });
  }

  const linkcontents = <LinkContents item={item} isInline={!displayImage} />;

  if (!headline || !url) {
    return null;
  }

  const useLargeImages = promoType === 'top' || promoType === 'leading';

  const headingTagOverride =
    isRecommendation || isContentTypeGuide ? 'div' : null;

  const StyledHeadline = styled(Headline)`
    ${() =>
      isRecommendation &&
      `
      padding: ${GEL_SPACING} ${isLtr ? GEL_SPACING : 0} ${GEL_SPACING} ${
        isLtr ? 0 : GEL_SPACING
      };

      @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
        padding: ${GEL_SPACING} ${
        isLtr ? GEL_SPACING_DBL : 0
      } ${GEL_SPACING_DBL} ${isLtr ? 0 : GEL_SPACING_DBL};
      }
    `}
  `;

  const Info = (
    <>
      {headline && (
        <StyledHeadline
          script={script}
          service={service}
          promoType={promoType}
          promoHasImage={displayImage}
          as={headingTagOverride}
        >
          <Link href={url}>
            {isLive ? (
              <LiveLabel
                service={service}
                dir={dir}
                liveText={liveLabel}
                ariaHidden={liveLabelIsEnglish}
                offScreenText={liveLabelIsEnglish ? 'Live' : null}
              >
                {linkcontents}
              </LiveLabel>
            ) : (
              linkcontents
            )}
          </Link>
        </StyledHeadline>
      )}
      {promoSummary && displaySummary && !isRecommendation && (
        <Summary
          script={script}
          service={service}
          promoType={promoType}
          promoHasImage={displayImage}
        >
          {promoSummary}
        </Summary>
      )}
      {displayTimestamp && (
        <Timestamp
          altCalendar={altCalendar}
          locale={datetimeLocale}
          timestamp={timestamp}
          dateTimeFormat="YYYY-MM-DD"
          format="LL"
          script={script}
          padding={false}
          service={service}
          timezone={timezone}
          isRelative={isTenHoursAgo(timestamp)}
        />
      )}
      {promoType === 'top' && relatedItems && (
        <IndexAlsosContainer
          alsoItems={relatedItems}
          script={script}
          service={service}
          dir={dir}
        />
      )}
    </>
  );

  const imageValues = pathOr(null, ['indexImage'], item);
  const Image = (
    <StoryPromoImage
      useLargeImages={useLargeImages}
      lazyLoad={lazyLoadImage}
      imageValues={imageValues}
    />
  );

  const MediaIndicator = (
    <MediaIndicatorContainer
      item={item}
      script={script}
      service={service}
      dir={dir}
      isInline={!displayImage}
    />
  );

  const StoryPromoComponent = isSingleColumnLayout
    ? SingleColumnStoryPromo
    : StoryPromo;

  return (
    <StoryPromoComponent
      image={Image}
      info={Info}
      mediaIndicator={MediaIndicator}
      promoType={promoType}
      dir={dir}
      displayImage={displayImage}
    />
  );
};

StoryPromoContainer.propTypes = {
  item: oneOfType([shape(storyItem), shape(linkPromo)]).isRequired,
  promoType: oneOf(PROMO_TYPES),
  lazyLoadImage: bool,
  dir: oneOf(['ltr', 'rtl']),
  displayImage: bool,
  displaySummary: bool,
  isRecommendation: bool,
  isSingleColumnLayout: bool,
};

StoryPromoContainer.defaultProps = {
  promoType: 'regular',
  lazyLoadImage: true,
  dir: 'ltr',
  displayImage: true,
  displaySummary: true,
  isRecommendation: false,
  isSingleColumnLayout: false,
};

export default StoryPromoContainer;
