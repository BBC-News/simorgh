import React from 'react';
import { render } from '@testing-library/react';
import path from 'ramda/src/path';

import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';

import CpsRelatedContent from '.';
import pidginPageData from '#data/pidgin/cpsAssets/tori-49450859';

// eslint-disable-next-line react/prop-types
const renderRelatedContent = ({
  content,
  bbcOrigin = 'https://www.test.bbc.co.uk',
}) => {
  return render(
    <ServiceContextProvider service="pidgin">
      <RequestContextProvider
        bbcOrigin={bbcOrigin}
        isAmp={false}
        pageType="MAP"
        pathname="/pidgin/tori-49450859"
        service="pidgin"
        statusCode={200}
      >
        <CpsRelatedContent content={content} />
      </RequestContextProvider>
    </ServiceContextProvider>,
  );
};

const promos = path(['relatedContent', 'groups', 0, 'promos'], pidginPageData);

describe('CpsRelatedContent', () => {
  it('should render Story Promo components when given appropriate data', () => {
    // Ensure fixture still has promos
    expect(promos.length).toBe(3);

    const { asFragment } = renderRelatedContent({ content: promos });

    expect(document.querySelectorAll(`li[class^='StoryPromoLi']`).length).toBe(
      promos.length,
    );

    // All related content links should have the x_candy_override querystring in the test environment
    expect(document.querySelectorAll(`[href*='x_candy_override']`).length).toBe(
      promos.length,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render Story Promo components in Live environment', () => {
    const { asFragment } = renderRelatedContent({
      content: promos,
      bbcOrigin: 'https://www.bbc.co.uk',
    });

    // x_candy_override should not be used in the live environment
    expect(document.querySelector(`[href*='x_candy_override']`)).toBeNull();
    expect(asFragment()).toMatchSnapshot();
  });
});
