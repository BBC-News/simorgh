import React from 'react';
import { string, node } from 'prop-types';
import ArticleMain from '.';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ToggleContextProvider } from '../../contexts/ToggleContext';
import { shouldShallowMatchSnapshot } from '../../../testHelpers';
import {
  articleDataNews,
  articleDataPersian,
  articleDataPidgin,
} from '../Article/fixtureData';

// temporary: will be removed with https://github.com/bbc/simorgh/issues/836
const articleDataNewsNoHeadline = JSON.parse(JSON.stringify(articleDataNews));
articleDataNewsNoHeadline.content.model.blocks.shift();

const Context = ({ service, children }) => (
  <ToggleContextProvider>
    <RequestContextProvider
      bbcOrigin="https://www.test.bbc.co.uk"
      id="c0000000000o"
      isAmp={false}
      pageType="article"
      service={service}
    >
      {children}
    </RequestContextProvider>
  </ToggleContextProvider>
);
Context.propTypes = {
  children: node.isRequired,
  service: string.isRequired,
};

describe('ArticleMain', () => {
  shouldShallowMatchSnapshot(
    'should render a news article correctly',
    <Context service="news">
      <ArticleMain articleData={articleDataNews} />
    </Context>,
  );

  shouldShallowMatchSnapshot(
    'should render a persian article correctly',
    <Context service="persian">
      <ArticleMain articleData={articleDataPersian} />
    </Context>,
  );

  shouldShallowMatchSnapshot(
    'should render a pidgin article correctly (with navigation)',
    <Context service="pidgin">
      <ArticleMain articleData={articleDataPidgin} />
    </Context>,
  );
});
