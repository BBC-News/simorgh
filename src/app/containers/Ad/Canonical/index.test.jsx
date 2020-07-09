import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import '@testing-library/jest-dom/extend-expect';
import isLive from '#lib/utilities/isLive';
import CanonicalAd, { getBootsrapSrc } from '.';

describe('CanonicalAds Ads', () => {
  beforeEach(() => {
    window.dotcom = {
      bootstrap: jest.fn(),
      cmd: { push: jest.fn() },
    };
  });

  afterEach(() => {
    window.dotcom = undefined;
  });

  describe('Snapshots', () => {
    shouldMatchSnapshot(
      'should correctly render an Canonical leaderboard ad with dotcom-bootstrap script',
      <BrowserRouter>
        <CanonicalAd slotType="leaderboard" />
      </BrowserRouter>,
    );

    shouldMatchSnapshot(
      'should correctly render a Canonical mpu ad with dotcom-bootstrap script',
      <BrowserRouter>
        <CanonicalAd slotType="mpu" />
      </BrowserRouter>,
    );
  });
});

jest.mock('#lib/utilities/isLive', () => jest.fn());

describe('getBootsrapSrc', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  [
    {
      queryString: '?ads-js-env=live',
      isLiveValue: false,
      bootstrapSrc:
        'https://gn-web-assets.api.bbc.com/ngas/dotcom-bootstrap.js',
    },
    {
      queryString: '?invalid-string',
      isLiveValue: true,
      bootstrapSrc:
        'https://gn-web-assets.api.bbc.com/ngas/dotcom-bootstrap.js',
    },
    {
      queryString: '',
      isLiveValue: false,
      bootstrapSrc:
        'https://gn-web-assets.api.bbc.com/ngas/test/dotcom-bootstrap.js',
    },
  ].forEach(({ queryString, isLiveValue, bootstrapSrc }) => {
    it(`should return ${bootstrapSrc} when queryString=${queryString} and isLive=${isLiveValue}`, () => {
      isLive.mockImplementationOnce(() => isLiveValue);
      expect(getBootsrapSrc(queryString)).toEqual(bootstrapSrc);
    });
  });
});
