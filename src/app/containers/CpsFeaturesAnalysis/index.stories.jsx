import React from 'react';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import FeaturesAnalysis from '.';
import features from '#pages/StoryPage/featuresAnalysis.json';
import featuresRtl from '#pages/StoryPage/featuresAnalysisRtl.json';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';

/* eslint-disable react/prop-types */
const Component = ({
  isAmp = false,
  service = 'igbo',
  dir = 'ltr',
  data = features,
}) => (
  <div dir={dir}>
    {/* The above simulates dir being added at the page level */}
    <ServiceContextProvider service={service}>
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.com"
        isAmp={isAmp}
        pageType={STORY_PAGE}
        pathname="/"
        service={service}
      >
        <ToggleContextProvider
          toggles={{
            eventTracking: { enabled: false },
          }}
        >
          <FeaturesAnalysis content={data} />
        </ToggleContextProvider>
      </RequestContextProvider>
    </ServiceContextProvider>
  </div>
);

export default {
  Component,
  title: 'Containers/CPS Features & Analysis',
  parameters: { chromatic: { disable: true } },
};

// Canonical
export const Igbo = () => <Component data={features} />;
export const Arabic = () => (
  <Component data={featuresRtl} service="arabic" dir="rtl" />
);
export const IgboWithOneItem = () => <Component data={[features[0]]} />;
export const ArabicWithOneItem = () => (
  <Component data={[featuresRtl[0]]} service="arabic" dir="rtl" />
);

// Amp
export const IgboAmp = () => <Component isAmp data={features} />;
IgboAmp.decorators = [AmpDecorator];

export const ArabicAmp = () => (
  <Component isAmp data={featuresRtl} service="arabic" dir="rtl" />
);
ArabicAmp.decorators = [AmpDecorator];

export const IgboWithOneItemAmp = () => (
  <Component isAmp data={[features[0]]} />
);
IgboWithOneItemAmp.decorators = [AmpDecorator];

export const ArabicWithOneItemAmp = () => (
  <Component isAmp data={[featuresRtl[0]]} service="arabic" dir="rtl" />
);
ArabicWithOneItemAmp.decorators = [AmpDecorator];
