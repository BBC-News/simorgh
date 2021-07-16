import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import WithTimeMachine from '../../../testHelpers/withTimeMachine';
import ArticleTimestamp from '.';
import { timestampGenerator } from './testHelpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';

const threeHoursAgo = timestampGenerator({ hours: 3 });
const fiveHoursAgo = timestampGenerator({ hours: 5 });
const elevenHoursAgo = timestampGenerator({ hours: 11 });
const twelveHoursAgo = timestampGenerator({ hours: 12 });
const twentyFourHoursAgo = timestampGenerator({
  hours: 24,
  seconds: 1,
});
const twoDaysAgo = timestampGenerator({ days: 2 });
const threeDaysAgo = timestampGenerator({ days: 3 });

// eslint-disable-next-line react/prop-types
const WrappedArticleTimestamp = ({ service, ...rest }) => (
  <ServiceContextProvider service={service || 'news'}>
    <ArticleTimestamp {...rest} />
  </ServiceContextProvider>
);

export default {
  Component: WrappedArticleTimestamp,
  title: 'Containers/Article/Article Timestamp',
  decorators: [
    withKnobs,
    withServicesKnob(),
    story => <WithTimeMachine>{story()}</WithTimeMachine>,
  ],
  parameters: { chromatic: { disable: true } },
};

export const A = props => (
  <WrappedArticleTimestamp
    firstPublished={threeHoursAgo}
    lastPublished={threeHoursAgo}
    {...props}
  />
);
A.storyName =
  'lastPublished === firstPublished and firstPublished < 10 hours ago';

export const B = props => (
  <WrappedArticleTimestamp
    firstPublished={elevenHoursAgo}
    lastPublished={elevenHoursAgo}
    {...props}
  />
);
B.storyName =
  'lastPublished === firstPublished and firstPublished today and > 10 hours ago';

export const C = props => (
  <WrappedArticleTimestamp
    firstPublished={twentyFourHoursAgo}
    lastPublished={twentyFourHoursAgo}
    {...props}
  />
);
C.storyName =
  'lastPublished === firstPublished and firstPublished before today';

export const D = props => (
  <WrappedArticleTimestamp
    firstPublished={fiveHoursAgo}
    lastPublished={threeHoursAgo}
    {...props}
  />
);
D.storyName =
  'lastPublished today < 10 hours ago and firstPublished today < 10 hours ago';

export const E = props => (
  <WrappedArticleTimestamp
    firstPublished={twelveHoursAgo}
    lastPublished={elevenHoursAgo}
    {...props}
  />
);
E.storyName =
  'lastPublished today more than 10 hours ago and firstPublished today more than 10 hours ago';

export const F = props => (
  <WrappedArticleTimestamp
    firstPublished={threeDaysAgo}
    lastPublished={threeDaysAgo}
    {...props}
  />
);
F.storyName =
  'lastPublished before today and firstPublished same day as lastPublished';

export const G = props => (
  <WrappedArticleTimestamp
    firstPublished={threeDaysAgo}
    lastPublished={twoDaysAgo}
    {...props}
  />
);
G.storyName =
  'lastPublished before today, !==firstPublished day and firstPublished before today';

export const H = props => (
  <WrappedArticleTimestamp
    firstPublished={threeDaysAgo}
    lastPublished={elevenHoursAgo}
    {...props}
  />
);
H.storyName =
  'lastPublished today and more than 10 hours ago and firstPublished before today';
