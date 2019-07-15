import React, { Fragment, useContext } from 'react';
import { shape, bool } from 'prop-types';
import StoryPromoComponent, {
  Headline,
  Summary,
  Link,
} from '@bbc/psammead-story-promo';
import Timestamp from '@bbc/psammead-timestamp-container';
import { storyItem } from '../../models/propTypes/storyItem';
import ImageWithPlaceholder from '../ImageWithPlaceholder';

import { ServiceContext } from '../../contexts/ServiceContext';
import deepGet from '../../lib/utilities/deepGet';
import createSrcset from '../Image/helpers/srcSet';
import getOriginCode from './imageSrcHelpers/originCode';
import getLocator from './imageSrcHelpers/locator';

import LinkContents from './LinkContents';
import MediaIndicator from './MediaIndicator';

const StoryPromoImage = ({ imageValues, lazyLoad }) => {
  if (!imageValues) {
    return null;
  }

  const { height, width, path } = imageValues;

  const ratio = (height / width) * 100;
  const originCode = getOriginCode(path);
  const locator = getLocator(path);
  const srcset = createSrcset(originCode, locator, width);

  const DEFAULT_IMAGE_RES = 660;
  const src = `https://ichef.bbci.co.uk/news/${DEFAULT_IMAGE_RES}${path}`;

  return (
    <ImageWithPlaceholder
      alt={imageValues.altText}
      ratio={ratio}
      src={src}
      {...imageValues}
      lazyLoad={lazyLoad}
      copyright={imageValues.copyrightHolder}
      srcset={srcset}
    />
  );
};

StoryPromoImage.propTypes = {
  lazyLoad: bool.isRequired,
  imageValues: shape(storyItem.indexImage).isRequired,
};

const StoryPromo = ({ item, lazyLoadImage, topStory }) => {
  const { script, datetimeLocale, service } = useContext(ServiceContext);
  const headline = deepGet(['headlines', 'headline'], item);
  const url = deepGet(['locators', 'assetUri'], item);
  const summary = deepGet(['summary'], item);
  const timestamp = deepGet(['timestamp'], item);

  if (!headline || !url) {
    return null;
  }

  const Info = (
    <Fragment>
      {headline && (
        <Headline script={script} service={service} topStory={topStory}>
          <Link href={url}>
            <LinkContents item={item} />
          </Link>
        </Headline>
      )}
      {summary && (
        <Summary script={script} service={service} topStory={topStory}>
          {summary}
        </Summary>
      )}
      {timestamp && (
        <Timestamp
          locale={datetimeLocale}
          timestamp={timestamp * 1000}
          dateTimeFormat="YYYY-MM-DD"
          format="D MMMM YYYY"
          script={script}
          padding={false}
          service={service}
        />
      )}
    </Fragment>
  );

  const imageValues = deepGet(['indexImage'], item);
  const Image = (
    <StoryPromoImage lazyLoad={lazyLoadImage} imageValues={imageValues} />
  );

  return (
    <StoryPromoComponent
      image={Image}
      info={Info}
      mediaIndicator={
        <MediaIndicator item={item} topStory={topStory} service={service} />
      }
      topStory={topStory}
    />
  );
};

StoryPromo.propTypes = {
  item: shape(storyItem).isRequired,
  lazyLoadImage: bool,
  topStory: bool,
};

StoryPromo.defaultProps = {
  lazyLoadImage: true,
  topStory: false,
};

export default StoryPromo;
