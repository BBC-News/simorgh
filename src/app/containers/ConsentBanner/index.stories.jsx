import React from 'react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import ConsentBanner from '.';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';

const Component = platform => (
  <ServiceContextProvider service="news">
    <RequestContextProvider
      platform={platform}
      isUK
      isAmp={platform === 'amp'}
      origin="https://www.bbc.co.uk"
      pageType={ARTICLE_PAGE}
      id="c0000000000o"
      service="news"
      statsDestination="NEWS_PS_TEST"
      statsPageIdentifier="news.articles.c0000000000o"
    >
      <ConsentBanner />
      This container uses cookies to conditionally render. If you can not see
      the banner above please clear your cookies or view in incognito mode.
    </RequestContextProvider>
  </ServiceContextProvider>
);

export default {
  Component,
  title: 'Containers/Consent Banner',
  parameters: {
    chromatic: { disable: true },
  },
};

export const Canonical = () => <Component platform="canonical" />;

export const Amp = () => <Component platform="amp" />;
Amp.decorators = [AmpDecorator];
