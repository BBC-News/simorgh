import React, { useContext } from 'react';
import styled from 'styled-components';
import { shape, string, number } from 'prop-types';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { formatUnixTimestamp } from '@bbc/psammead-timestamp-container/utilities';
import { GEL_SPACING_TRPL } from '@bbc/gel-foundations/spacings';
import ChartbeatAnalytics from '../../containers/ChartbeatAnalytics';
import ATIAnalytics from '../../containers/ATIAnalytics';
import Grid, { GelPageGrid } from '#app/components/Grid';
import MetadataContainer from '../../containers/Metadata';
import { ServiceContext } from '../../contexts/ServiceContext';
import OnDemandHeadingBlock from '#containers/RadioPageBlocks/Blocks/OnDemandHeading';
import ParagraphBlock from '#containers/RadioPageBlocks/Blocks/Paragraph';
import VideoPlayer from './VideoPlayer';

const EPISODE_IS_AVAILABLE = 'available';
const EPISODE_IS_EXPIRED = 'expired';
const EPISODE_IS_NOT_YET_AVAILABLE = 'not-yet-available';
const StyledGelWrapperGrid = styled.div`
  padding-top: ${GEL_SPACING_TRPL};
`;

const getGroups = (zero, one, two, three, four, five) => ({
  group0: zero,
  group1: one,
  group2: two,
  group3: three,
  group4: four,
  group5: five,
});

const getEpisodeAvailability = (availableFrom, availableUntil) => {
  const timeNow = Date.now();

  if (!availableUntil) return EPISODE_IS_EXPIRED;
  if (timeNow < availableFrom) return EPISODE_IS_NOT_YET_AVAILABLE;

  return EPISODE_IS_AVAILABLE;
};

const StyledGelPageGrid = styled(GelPageGrid)`
  width: 100%;
  flex-grow: 1; /* needed to ensure footer positions at bottom of viewport */
`;

/* eslint-disable react/prop-types */
const renderEpisode = ({
  masterBrand,
  episodeId,
  episodeAvailableFrom,
  episodeAvailableUntil,
  imageUrl,
}) => {
  const episodeAvailability = getEpisodeAvailability(
    episodeAvailableFrom,
    episodeAvailableUntil,
  );
  switch (episodeAvailability) {
    case EPISODE_IS_AVAILABLE:
      return (
        <VideoPlayer
          masterBrand={masterBrand}
          assetId={episodeId}
          imageUrl={imageUrl}
        />
      );
    case EPISODE_IS_EXPIRED:
      return <VideoPlayer isExpired />;
    case EPISODE_IS_NOT_YET_AVAILABLE:
    default:
      return null;
  }
};
/* eslint-enable react/prop-types */

const OnDemandTvPage = ({ pageData }) => {
  const {
    language,
    headline,
    shortSynopsis,
    brandTitle,
    episodeAvailableFrom,
    episodeAvailableUntil,
    releaseDateTimeStamp,
    masterBrand,
    episodeId,
    imageUrl,
  } = pageData;

  const { timezone, locale, dir } = useContext(ServiceContext);

  const formattedTimestamp = formatUnixTimestamp({
    timestamp: releaseDateTimeStamp,
    format: 'LL',
    timezone,
    locale,
    isRelative: false,
  });

  return (
    <>
      <ChartbeatAnalytics data={pageData} />
      <ATIAnalytics data={pageData} />
      <MetadataContainer
        title={headline}
        lang={language}
        description={shortSynopsis}
        openGraphType="website"
      />

      <StyledGelPageGrid
        forwardedAs="main"
        role="main"
        dir={dir}
        columns={getGroups(6, 6, 6, 6, 8, 20)}
        enableGelGutters
      >
        <Grid
          item
          dir={dir}
          startOffset={getGroups(1, 1, 1, 1, 2, 5)}
          columns={getGroups(6, 6, 6, 6, 6, 12)}
          margins={getGroups(true, true, true, true, false, false)}
        >
          <VisuallyHiddenText as="h1" tabIndex="-1" id="content">
            {brandTitle}, {formattedTimestamp}
          </VisuallyHiddenText>
          <StyledGelWrapperGrid
            columns={getGroups(6, 6, 6, 6, 6, 6)}
            enableGelGutters
          >
            {renderEpisode({
              masterBrand,
              episodeId,
              episodeAvailableFrom,
              episodeAvailableUntil,
              imageUrl,
            })}
          </StyledGelWrapperGrid>
          <OnDemandHeadingBlock
            brandTitle={brandTitle}
            releaseDateTimeStamp={releaseDateTimeStamp}
            ariaHidden
          />
          <ParagraphBlock text={shortSynopsis} />
        </Grid>
      </StyledGelPageGrid>
    </>
  );
};

OnDemandTvPage.propTypes = {
  pageData: shape({
    language: string,
    headline: string,
    shortSynopsis: string,
    brandTitle: string,
    releaseDateTimeStamp: number,
    masterBrand: string,
    episodeId: string,
    imageUrl: string,
  }).isRequired,
};

export default OnDemandTvPage;
