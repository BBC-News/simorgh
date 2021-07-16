import React from 'react';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
import pathOr from 'ramda/src/pathOr';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import BulletinContainer from '.';
import fixture from '#data/igbo/frontpage';
import ampDecorator from '../../../../.storybook/helpers/ampDecorator';
import { FRONT_PAGE } from '#app/routes/utils/pageTypes';

const bulletinFixture = type =>
  pathOr(null, ['content', 'groups'], fixture)
    .flatMap(group => pathOr(null, ['items'], group))
    .find(
      item =>
        pathOr(null, ['assetTypeCode'], item) === 'PRO' &&
        pathOr(null, ['contentType'], item) === type &&
        !pathOr(null, ['isLive'], item),
    );

const noImageBulletinFixture = type =>
  pathOr(null, ['content', 'groups'], fixture)
    .flatMap(group => pathOr(null, ['items'], group))
    .find(
      item =>
        pathOr(null, ['assetTypeCode'], item) === 'PRO' &&
        pathOr(null, ['contentType'], item) === type &&
        !pathOr(null, ['indexImage'], item),
    );

const liveBulletinFixture = type =>
  pathOr(null, ['content', 'groups'], fixture)
    .flatMap(group => pathOr(null, ['items'], group))
    .find(
      item =>
        pathOr(null, ['assetTypeCode'], item) === 'PRO' &&
        pathOr(null, ['contentType'], item) === type &&
        pathOr(null, ['isLive'], item) === true,
    );

const tvFixture = bulletinFixture('TVBulletin');
const audioFixture = bulletinFixture('RadioBulletin');
const noImageAudioFixture = noImageBulletinFixture('RadioBulletin');

const liveTvFixture = liveBulletinFixture('TVBulletin');
const audioLiveFixture = liveBulletinFixture('RadioBulletin');

// eslint-disable-next-line react/prop-types
const Component = ({ isAmp = false, service, item }) => (
  <ServiceContextProvider service={service}>
    <RequestContextProvider
      bbcOrigin="https://www.test.bbc.co.uk"
      isAmp={isAmp}
      pathname="/pathname"
      pageType={FRONT_PAGE}
      service={service}
    >
      <BulletinContainer item={item} />
    </RequestContextProvider>
  </ServiceContextProvider>
);

export default {
  Component,
  title: 'Containers/Bulletin',
  decorators: [withKnobs, withServicesKnob()],
  parameters: { chromatic: { disable: true } },
};

// Canonical
export const TVBulletin = props => <Component {...props} item={tvFixture} />;
export const LiveTVBulletin = props => (
  <Component {...props} item={liveTvFixture} />
);
export const RadioBulletin = props => (
  <Component {...props} item={audioFixture} />
);
export const LiveRadioBulletin = props => (
  <Component {...props} item={audioLiveFixture} />
);
export const RadioBulletinWithoutImage = props => (
  <Component {...props} item={noImageAudioFixture} />
);

// Amp
export const TVBulletinAmp = props => (
  <Component {...props} isAmp item={tvFixture} />
);
TVBulletinAmp.decorators = [ampDecorator];

export const LiveTVBulletinAmp = props => (
  <Component {...props} isAmp item={liveTvFixture} />
);
LiveTVBulletinAmp.decorators = [ampDecorator];

export const RadioBulletinAmp = props => (
  <Component {...props} isAmp item={audioFixture} />
);
RadioBulletinAmp.decorators = [ampDecorator];

export const LiveRadioBulletinAmp = props => (
  <Component {...props} isAmp item={audioLiveFixture} />
);
LiveRadioBulletinAmp.decorators = [ampDecorator];

export const RadioBulletinWithoutImageAmp = props => (
  <Component {...props} isAmp item={noImageAudioFixture} />
);
RadioBulletinWithoutImageAmp.decorators = [ampDecorator];
