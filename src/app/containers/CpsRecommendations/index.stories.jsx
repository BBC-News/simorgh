import React from 'react';

import CpsRecommendations from '.';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';

import mundoRecommendationsData from '#pages/StoryPage/fixtureData/recommendations.ltr.json';
import arabicRecommendationsData from '#pages/StoryPage/fixtureData/recommendations.rtl.json';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';

// eslint-disable-next-line react/prop-types
const Component = ({ items, service, dir }) => {
  const toggleState = {
    cpsRecommendations: {
      enabled: true,
    },
    eventTracking: {
      enabled: false,
    },
  };
  const parentGridCols = {
    group0: 8,
    group1: 8,
    group2: 8,
    group3: 8,
    group4: 8,
    group5: 8,
  };
  return (
    <div dir={dir}>
      <ServiceContextProvider service={service}>
        <RequestContextProvider
          isAmp={false}
          pageType={STORY_PAGE}
          service={service}
          pathname="/pathname"
        >
          <ToggleContext.Provider
            value={{ toggleState, toggleDispatch: () => {} }}
          >
            <CpsRecommendations items={items} parentColumns={parentGridCols} />
          </ToggleContext.Provider>
        </RequestContextProvider>
      </ServiceContextProvider>
    </div>
  );
};

export default {
  Component,
  title: 'Containers/CPS Recommendations',
  parameters: { chromatic: { disable: true } },
};

export const MultipleItems = () => (
  <Component items={mundoRecommendationsData} service="mundo" dir="ltr" />
);
export const SingleItem = () => (
  <Component items={[mundoRecommendationsData[0]]} service="mundo" dir="ltr" />
);
export const MultipleItemsRTL = () => (
  <Component items={arabicRecommendationsData} service="arabic" dir="rtl" />
);
export const SingleItemRTL = () => (
  <Component
    items={[arabicRecommendationsData[0]]}
    service="arabic"
    dir="rtl"
  />
);
