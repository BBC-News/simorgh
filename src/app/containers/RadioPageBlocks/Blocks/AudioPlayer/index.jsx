import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';
import { GEL_GROUP_2_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import { string, bool } from 'prop-types';
import {
  CanonicalMediaPlayer,
  AmpMediaPlayer,
  MediaMessage,
} from '@bbc/psammead-media-player';
import pathOr from 'ramda/src/pathOr';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import getEmbedUrl from '#lib/utilities/getEmbedUrl';

const staticAssetsPath = `${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH}`;

const audioPlaceholderImageSrc = `${staticAssetsPath}images/amp_audio_placeholder.png`;

const LIVE_RADIO_ASSET_ID = 'liveradio';

const isLiveRadio = assetId => assetId === LIVE_RADIO_ASSET_ID;

const getMediaInfo = assetId => ({
  title: isLiveRadio(assetId) ? 'Live radio' : 'On-demand radio',
  type: 'audio',
});

const getMasterBrand = (masterBrand, liveRadioIdOverrides) =>
  pathOr(masterBrand, ['masterBrand', masterBrand], liveRadioIdOverrides);

const AudioPlayerWrapper = styled.div`
  width: calc(100% + ${GEL_SPACING_DBL});
  margin: 0 -${GEL_SPACING};
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    width: calc(100% + ${GEL_SPACING_QUAD});
    margin: 0 -${GEL_SPACING_DBL};
  }
`;

const MediaMessageWrapper = styled.div`
  position: relative;
  min-height: 165px;
  margin-bottom: ${GEL_SPACING_QUAD};
`;

const AudioPlayer = ({
  externalId: _masterBrand,
  id: assetId,
  idAttr,
  isExpired,
}) => {
  const { liveRadioOverrides, lang, translations, service } = useContext(
    ServiceContext,
  );
  const masterBrand = getMasterBrand(_masterBrand, liveRadioOverrides);
  const { isAmp, platform } = useContext(RequestContext);
  const location = useLocation();
  const isValidPlatform = ['amp', 'canonical'].includes(platform);
  const mediaInfo = getMediaInfo(assetId);
  const noJsMessage = pathOr(
    `This ${mediaInfo.type} cannot play in your browser. Please enable JavaScript or try a different browser.`,
    ['media', 'noJs'],
    translations,
  );

  if (isExpired) {
    const expiredContentMessage = pathOr(
      'This content is no longer available',
      ['media', 'contentExpired'],
      translations,
    );

    return (
      <MediaMessageWrapper>
        <MediaMessage service={service} message={expiredContentMessage} />
      </MediaMessageWrapper>
    );
  }

  if (!isValidPlatform || !masterBrand || !assetId) return null; // potential for logging here

  const mediaId = isLiveRadio(assetId)
    ? `${masterBrand}/${assetId}/${lang}` // liveradio
    : `${service}/${masterBrand}/${assetId}/${lang}`; // ondemand

  const embedUrl = getEmbedUrl({
    mediaId,
    type: 'media',
    isAmp,
    queryString: location.search,
  });

  const iframeTitle = pathOr(
    'Media player',
    ['mediaAssetPage', 'audioPlayer'],
    translations,
  );

  return (
    <AudioPlayerWrapper>
      {isAmp ? (
        <AmpMediaPlayer
          placeholderSrc={audioPlaceholderImageSrc}
          src={embedUrl}
          title={iframeTitle}
          id={idAttr}
          skin="audio"
          noJsMessage={noJsMessage}
          service={service}
        />
      ) : (
        <CanonicalMediaPlayer
          showPlaceholder={false}
          src={embedUrl}
          title={iframeTitle}
          id={idAttr}
          skin="audio"
          service={service}
          mediaInfo={mediaInfo}
          noJsMessage={noJsMessage}
          noJsClassName="no-js"
        />
      )}
    </AudioPlayerWrapper>
  );
};

AudioPlayer.propTypes = {
  externalId: string,
  id: string,
  idAttr: string,
  isExpired: bool,
};

AudioPlayer.defaultProps = {
  externalId: '',
  id: '',
  idAttr: null,
  isExpired: false,
};

export default AudioPlayer;
