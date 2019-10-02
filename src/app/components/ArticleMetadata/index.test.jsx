import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import ArticleMetadata from './index';
import {
  articleDataNews,
  articleDataPersian,
} from '../../containers/Article/fixtureData';

const getISOStringDate = date => new Date(date).toISOString();

// eslint-disable-next-line react/prop-types
const Context = ({ service, children }) => (
  <ServiceContextProvider service={service}>
    <RequestContextProvider
      bbcOrigin="https://www.test.bbc.co.uk"
      id="c0000000000o"
      isAmp={false}
      pageType="article"
      pathname="/pathname"
      service={service}
      statusCode={200}
    >
      {children}
    </RequestContextProvider>
  </ServiceContextProvider>
);

describe('ArticleMetadata', () => {
  shouldMatchSnapshot(
    'should match snapshot for News & International',
    <Context service="news">
      <ArticleMetadata
        author="https://www.facebook.com/bbcnews"
        firstPublished={getISOStringDate(
          articleDataNews.metadata.firstPublished,
        )}
        lastPublished={getISOStringDate(articleDataNews.metadata.lastPublished)}
        section={articleDataNews.metadata.passport.genre}
        aboutTags={articleDataNews.metadata.tags.about}
        mentionsTags={articleDataNews.metadata.tags.mentions}
        lang={articleDataNews.metadata.passport.language}
        title={articleDataNews.promo.headlines.seoHeadline}
        seoHeadline={articleDataNews.promo.headlines.seoHeadline}
        description={articleDataNews.promo.headlines.seoHeadline}
        linkedData={{
          headline: 'Article Headline for SEO',
          datePublished: '2018-01-01T12:01:00.000Z',
          dateModified: '2018-01-01T13:00:00.000Z',
          about: [
            {
              '@type': 'Thing',
              name: 'Royal Wedding 2018',
              sameAs: ['http://dbpedia.org/resource/Queen_Victoria'],
            },
            { '@type': 'Person', name: 'Duchess of Sussex' },
          ],
          author: {
            '@type': 'NewsMediaOrganization',
            logo: {
              '@type': 'ImageObject',
              width: 1024,
              height: 576,
              url:
                'https://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png',
            },
            name: 'BBC News',
            noBylinesPolicy:
              'https://www.bbc.com/news/help-41670342#authorexpertise',
          },
        }}
      />
    </Context>,
  );

  shouldMatchSnapshot(
    'should match snapshot for Persian News & UK origin',
    <Context service="persian">
      <ArticleMetadata
        author="https://www.facebook.com/bbcnews"
        firstPublished={getISOStringDate(
          articleDataPersian.metadata.firstPublished,
        )}
        lastPublished={getISOStringDate(
          articleDataPersian.metadata.lastPublished,
        )}
        section={articleDataPersian.metadata.passport.genre}
        aboutTags={articleDataPersian.metadata.tags.about}
        mentionsTags={articleDataPersian.metadata.tags.mentions}
        lang={articleDataPersian.metadata.passport.language}
        title={articleDataPersian.promo.headlines.seoHeadline}
        seoHeadline={articleDataPersian.promo.headlines.seoHeadline}
        description={articleDataPersian.promo.headlines.seoHeadline}
      />
    </Context>,
  );
});
