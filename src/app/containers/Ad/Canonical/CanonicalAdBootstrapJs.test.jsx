import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import '@testing-library/jest-dom/extend-expect';
import CanonicalAdBootstrapJs from './CanonicalAdBootstrapJs';

describe('CanonicalAds Ads', () => {
  describe('Snapshots', () => {
    shouldMatchSnapshot(
      'should push dotcom bootstrap and configuration to a head script',
      <CanonicalAdBootstrapJs />,
    );
  });
});
