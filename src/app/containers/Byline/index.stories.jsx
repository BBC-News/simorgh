import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import BylineContainer from '.';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';

// eslint-disable-next-line react/prop-types
const Component = ({ service }) => {
  const blocks = [
    { name: text('name', 'John Smith'), title: text('title', 'Art Editor') },
  ];
  return (
    <ServiceContextProvider service={service}>
      <RequestContextProvider
        isAmp={false}
        pageType={STORY_PAGE}
        service={service}
        statusCode={200}
        bbcOrigin="https://www.test.bbc.com"
        pathname="/pathname"
      >
        <BylineContainer service={service} blocks={blocks} />
      </RequestContextProvider>
    </ServiceContextProvider>
  );
};

export default {
  Component,
  title: 'Containers/Byline',
  decorators: [withKnobs, withServicesKnob()],
  parameters: {
    chromatic: { disable: true },
  },
};

export const Byline = Component;
