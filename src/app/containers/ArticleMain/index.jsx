import React, { Fragment, useContext } from 'react';
import { DialContext } from '../../contexts/DialContext';
import { articleDataPropTypes } from '../../models/propTypes/article';
import MetadataContainer from '../Metadata';
import headings from '../Headings';
import text from '../Text';
import image from '../Image';
import Blocks from '../Blocks';
import timestamp from '../ArticleTimestamp';
import { GhostGrid } from '../../lib/styledGrid';
import ATIAnalytics from '../ATIAnalytics';
import audioVideo from '../AudioVideo';
import AudioVideoHead from '../../components/AudioVideoHead';
import { RequestContext } from '../../contexts/RequestContext';
import generateAVSettings from '../../lib/utilities/audioVideo/generateAVSettings';
import chartbeat from '../Chartbeat';

const componentsToRender = {
  headline: headings,
  subheadline: headings,
  text,
  image,
  timestamp,
  chartbeat,
};

const avEnabledComment = (
  // eslint-disable-next-line react/no-danger
  <div dangerouslySetInnerHTML={{ __html: '<!-- av-enabled -->' }} />
);

const ArticleMain = ({ articleData }) => {
  const {
    env,
    platform,
    statsDestination,
    statsPageIdentifier,
  } = React.useContext(RequestContext);
  const { content, metadata, promo } = articleData;
  const { blocks } = content.model;

  const audioVideoBlocks = blocks.filter(
    block => block.type === 'audio' || block.type === 'video',
  );
  const hasAV = audioVideoBlocks.length > 0;
  const {
    audiovideo: audioVideoEnabled,
    chartbeat: chartbeatEnabled,
  } = useContext(DialContext);

  if (audioVideoEnabled) {
    componentsToRender.audio = audioVideo;
    componentsToRender.video = audioVideo;
  }

  if (chartbeatEnabled) {
    componentsToRender.chartbeat = chartbeat;
  }

  return (
    <Fragment>
      <ATIAnalytics data={articleData} />
      <MetadataContainer metadata={metadata} promo={promo} />
      {audioVideoEnabled && hasAV && platform === 'canonical' ? (
        <AudioVideoHead
          audioVideoAssets={generateAVSettings({
            audioVideoBlocks,
            env,
            platform,
            statsDestination,
            statsPageIdentifier,
          })}
        />
      ) : null}
      <main role="main">
        {audioVideoEnabled && avEnabledComment}
        <GhostGrid>
          <Blocks blocks={blocks} componentsToRender={componentsToRender} />
        </GhostGrid>
      </main>
    </Fragment>
  );
};

ArticleMain.propTypes = {
  articleData: articleDataPropTypes.isRequired,
};

export default ArticleMain;
