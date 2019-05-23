import React from 'react';
import { shape } from 'prop-types';
import compose from '../../helpers/compose';
import articlePropTypes from '../../models/propTypes/article';
import ArticleMain from '../ArticleMain';

import withPageWrapper from '../PageHandlers/withPageWrapper';
import withError from '../PageHandlers/withError';
import withLoading from '../PageHandlers/withLoading';
import withData from '../PageHandlers/withData';

const ArticleContainer = ({ pageData }) => (
  <ArticleMain articleData={pageData} />
);

ArticleContainer.propTypes = {
  pageData: shape(articlePropTypes),
};

ArticleContainer.defaultProps = {
  pageData: null,
};

const EnhancedArticleContainer = compose(
  withPageWrapper,
  withLoading,
  withError,
  withData,
)(ArticleContainer);

export default EnhancedArticleContainer;
