import React from 'react';
import { render, screen } from '@testing-library/react';
import path from 'ramda/src/path';

import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';

import CpsRelatedContent from '.';
import pidginPageData from '#data/pidgin/cpsAssets/tori-49450859';

import getInitialData from '#app/routes/cpsAsset/getInitialData';
import { MEDIA_ASSET_PAGE, STORY_PAGE } from '#app/routes/utils/pageTypes';

const promos = path(['relatedContent', 'groups', 0, 'promos'], pidginPageData);

// eslint-disable-next-line react/prop-types
const renderRelatedContent = ({
  content = promos,
  bbcOrigin = 'https://www.test.bbc.co.uk',
} = {}) => {
  return render(
    <ServiceContextProvider service="pidgin">
      <RequestContextProvider
        bbcOrigin={bbcOrigin}
        isAmp={false}
        pageType={MEDIA_ASSET_PAGE}
        pathname="/pidgin/tori-49450859"
        service="pidgin"
        statusCode={200}
      >
        <CpsRelatedContent content={content} enableGridWrapper />
      </RequestContextProvider>
    </ServiceContextProvider>,
  );
};

const renderRelatedContentNoTitle = ({
  content = promos,
  bbcOrigin = 'https://www.test.bbc.co.uk',
} = {}) => {
  return render(
    <ServiceContextProvider service="news">
      <RequestContextProvider
        bbcOrigin={bbcOrigin}
        isAmp={false}
        pageType={STORY_PAGE}
        pathname="/pidgin/tori-49450859"
        service="pidgin"
        statusCode={200}
      >
        <CpsRelatedContent content={content} enableGridWrapper />
      </RequestContextProvider>
    </ServiceContextProvider>,
  );
};

describe('CpsRelatedContent', () => {
  it('should render Story Promo components when given appropriate data', () => {
    // Ensure fixture still has promos
    expect(promos.length).toBe(3);

    const { asFragment } = renderRelatedContent();

    expect(document.querySelectorAll(`li[class*='StoryPromoLi']`).length).toBe(
      promos.length,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render Story Promo components without <ul> when given single item in collection', () => {
    const topRelatedContentsOneItem = [promos[0]];

    expect(promos[0]).toBeTruthy();

    const { asFragment } = renderRelatedContent({
      content: topRelatedContentsOneItem,
    });

    expect(document.querySelector("li[class*='StoryPromoLi']")).toBeNull();

    expect(document.querySelector('ul')).toBeNull();

    expect(asFragment()).toMatchSnapshot();
  });

  it('should have a "region" role (a11y)', () => {
    renderRelatedContent();
    expect(document.querySelectorAll(`[role='region']`).length).toBe(1);
  });

  it('should render timestamps in milliseconds when page data has timestamps in seconds', async () => {
    const initialPromo = [
      {
        ...promos[0],
        timestamp: 1234567890,
      },
    ];

    fetch.mockResponse(
      JSON.stringify({
        ...pidginPageData,
        relatedContent: { groups: [{ promos: initialPromo }] },
      }),
    );

    const { pageData } = await getInitialData({
      path: 'some-cps-path',
      service: 'pidgin',
    });

    const transformedPromos = path(
      ['relatedContent', 'groups', 0, 'promos'],
      pageData,
    );

    const { getByText } = renderRelatedContent({
      content: transformedPromos,
    });

    expect(getByText('February 2009', { exact: false })).not.toBeNull();
  });
  it('should render a default title if translations are not available', () => {
    renderRelatedContentNoTitle();
    expect(screen.getByText(`Related content`)).toBeTruthy();
  });
});
