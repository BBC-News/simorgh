import React, { useContext } from 'react';
import path from 'ramda/src/path';
import styled from 'styled-components';
import { articleDataPropTypes } from '#models/propTypes/article';
import ArticleMetadata from '../ArticleMetadata';
import { ServiceContext } from '#contexts/ServiceContext';
import headings from '../Headings';
import text from '../Text';
import image from '../Image';
import Blocks from '../Blocks';
import timestamp from '../ArticleTimestamp';
import { GhostGrid } from '#lib/styledGrid';
import ATIAnalytics from '../ATIAnalytics';
import ChartbeatAnalytics from '../ChartbeatAnalytics';
import articleMediaPlayer from '../ArticleMediaPlayer';
import LinkedData from '../LinkedData';
import MostReadContainer from '../MostRead';

import {
  getArticleId,
  getHeadline,
  getSummary,
  getFirstPublished,
  getLastPublished,
  getAboutTags,
  getArticleSection,
  getMentions,
  getLang,
} from '#lib/utilities/parseAssetData';

const componentsToRender = {
  headline: headings,
  subheadline: headings,
  audio: articleMediaPlayer,
  video: articleMediaPlayer,
  text,
  image,
  timestamp,
};

const StyledMain = styled.main`
  flex-grow: 1;
`;

const ArticleMain = ({ articleData: data }) => {
  const { articleAuthor } = useContext(ServiceContext);
  const headline = getHeadline(data);
  const description = getSummary(data) || getHeadline(data);
  const firstPublished = getFirstPublished(data);
  const lastPublished = getLastPublished(data);
  const aboutTags = getAboutTags(data);

  return (
    <>
      <ATIAnalytics data={data} />
      <ChartbeatAnalytics data={data} />
      <ArticleMetadata
        articleId={getArticleId(data)}
        title={headline}
        author={articleAuthor}
        firstPublished={firstPublished}
        lastPublished={lastPublished}
        section={getArticleSection(data)}
        aboutTags={aboutTags}
        mentionsTags={getMentions(data)}
        lang={getLang(data)}
        description={description}
      />
      <LinkedData
        showAuthor
        type="Article"
        seoTitle={headline}
        headline={headline}
        datePublished={firstPublished}
        dateModified={lastPublished}
        aboutTags={aboutTags}
      />
      <StyledMain role="main">
        <GhostGrid>
          <Blocks
            blocks={path(['content', 'model', 'blocks'], data)}
            componentsToRender={componentsToRender}
          />
        </GhostGrid>
        <MostReadContainer constrainMaxWidth />
      </StyledMain>
    </>
  );
};
ArticleMain.propTypes = {
  articleData: articleDataPropTypes.isRequired,
};
export default ArticleMain;
