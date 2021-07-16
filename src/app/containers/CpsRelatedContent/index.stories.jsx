import React from 'react';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import CpsRelatedContent from '.';

import pidginData from '#data/pidgin/cpsAssets/tori-49450859.json';
import arabicData from '#data/arabic/cpsAssets/media-49580542.json';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { MEDIA_ASSET_PAGE } from '#app/routes/utils/pageTypes';

const pidginRelatedContentData = pidginData.relatedContent.groups[0].promos;
const arabicRelatedContentData = arabicData.relatedContent.groups[0].promos;

// eslint-disable-next-line react/prop-types
const Component = ({ isAmp, service, dir, data }) => (
  <div dir={dir}>
    {/* The above simulates dir being added at the page level */}
    <ServiceContextProvider service={service}>
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.com"
        isAmp={isAmp}
        pageType={MEDIA_ASSET_PAGE} /* Can also be one of other CPS pagetypes */
        pathname="/"
        service={service}
      >
        <ToggleContextProvider
          toggles={{
            eventTracking: { enabled: false },
          }}
        >
          <CpsRelatedContent content={data} />
        </ToggleContextProvider>
      </RequestContextProvider>
    </ServiceContextProvider>
  </div>
);

export default {
  Component,
  title: 'Containers/CPS Related Content',
  parameters: { chromatic: { disable: true } },
};

// Canonical
export const Pidgin = () => (
  <Component service="pidgin" dir="ltr" data={pidginRelatedContentData} />
);
export const Arabic = () => (
  <Component service="arabic" dir="rtl" data={arabicRelatedContentData} />
);
export const PidginOneItem = () => (
  <Component service="pidgin" dir="ltr" data={[pidginRelatedContentData[0]]} />
);
export const ArabicOneItem = () => (
  <Component service="arabic" dir="rtl" data={[arabicRelatedContentData[0]]} />
);

// Amp
export const PidginAmp = () => (
  <Component isAmp service="pidgin" dir="ltr" data={pidginRelatedContentData} />
);
PidginAmp.decorators = [AmpDecorator];

export const ArabicAmp = () => (
  <Component isAmp service="arabic" dir="rtl" data={arabicRelatedContentData} />
);
ArabicAmp.decorators = [AmpDecorator];

export const PidginOneItemAmp = () => (
  <Component
    isAmp
    service="pidgin"
    dir="ltr"
    data={[pidginRelatedContentData[0]]}
  />
);
PidginOneItemAmp.decorators = [AmpDecorator];

export const ArabicOneItemAmp = () => (
  <Component
    isAmp
    service="arabic"
    dir="rtl"
    data={[arabicRelatedContentData[0]]}
  />
);
ArabicOneItemAmp.decorators = [AmpDecorator];
