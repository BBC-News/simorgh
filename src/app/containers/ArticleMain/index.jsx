import React, { Fragment } from 'react';
import { shape } from 'prop-types';
import { articleDataPropTypes } from '../../models/propTypes/article';
import MetadataContainer from '../Metadata';
import headings from '../Headings';
import text from '../Text';
import image from '../Image';
import Blocks from '../Blocks';
import timestamp from '../ArticleTimestamp';
import { GhostWrapper } from '../../lib/styledGrid';

const componentsToRender = {
  headline: headings,
  subheadline: headings,
  text,
  image,
  timestamp,
};

const ArticleMain = ({ articleData }) => {
  const { content, metadata, promo } = articleData;
  const { blocks } = content.model;
  return (
    <Fragment>
      <MetadataContainer metadata={metadata} promo={promo} />
      <main role="main">
        <GhostWrapper>
          <Blocks
            id={metadata.id}
            blocks={blocks}
            componentsToRender={componentsToRender}
          />
        </GhostWrapper>
      </main>
    </Fragment>
  );
};

ArticleMain.propTypes = {
  articleData: shape(articleDataPropTypes).isRequired,
};

export default ArticleMain;
