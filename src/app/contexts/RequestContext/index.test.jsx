import React, { useContext } from 'react';
import { render } from '@testing-library/react';
import { suppressPropWarnings } from '@bbc/psammead-test-helpers';
import * as getStatsDestination from './getStatsDestination';
import * as getStatsPageIdentifier from './getStatsPageIdentifier';
import * as getOriginContext from './getOriginContext';
import * as getEnv from './getEnv';
import * as getMetaUrls from './getMetaUrls';
import fixtureData from '../../../../data/news/frontpage/index.json'

const { RequestContextProvider, RequestContext } = require('./index');

const Component = () => {
  useContext(RequestContext);
  return null;
};

jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    useContext: jest.fn().mockImplementation(original.useContext),
  };
});

jest.mock('./getStatsDestination');
jest.mock('./getStatsPageIdentifier');
jest.mock('./getOriginContext');
jest.mock('./getEnv');
jest.mock('./getMetaUrls');

getStatsDestination.default.mockReturnValue('getStatsDestination');
getStatsPageIdentifier.default.mockReturnValue('getStatsPageIdentifier');
getOriginContext.default.mockReturnValue({ isUK: true, origin: 'origin' });
getEnv.default.mockReturnValue('getEnv');
getMetaUrls.default.mockReturnValue({
  canonicalLink: 'canonicalLink',
  ampLink: 'ampLink',
  canonicalUkLink: 'canonicalUkLink',
  ampUkLink: 'ampUkLink',
  canonicalNonUkLink: 'canonicalNonUkLink',
  ampNonUkLink: 'ampNonUkLink',
});

const input = {
  bbcOrigin: 'bbcOrigin',
  data: { status: 200, pageData: fixtureData },
  id: 'id',
  isAmp: true,
  pageType: 'frontPage',
  service: 'service',
  pathname: '/current-path',
  previousPath: '/previous-path',
  variant: 'simp',
};

const expectedOutput = {
  env: 'getEnv',
  id: input.id,
  isUK: true,
  origin: 'origin',
  pageType: input.pageType,
  platform: 'amp',
  variant: 'simp',
  statsDestination: 'getStatsDestination',
  statsPageIdentifier: 'getStatsPageIdentifier',
  statusCode: 200,
  previousPath: '/previous-path',
  canonicalLink: 'canonicalLink',
  ampLink: 'ampLink',
  canonicalUkLink: 'canonicalUkLink',
  ampUkLink: 'ampUkLink',
  canonicalNonUkLink: 'canonicalNonUkLink',
  ampNonUkLink: 'ampNonUkLink',
};

describe('RequestContext', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return expected values', () => {
    render(
      <RequestContextProvider {...input}>
        <Component />
      </RequestContextProvider>,
    );

    expect(getStatsDestination.default).toHaveBeenCalledWith({
      env: 'getEnv',
      isUK: true,
      service: 'service',
    });

    expect(getStatsPageIdentifier.default).toHaveBeenCalledWith({
      id: 'id',
      pageType: 'frontPage',
      service: 'service',
    });

    expect(getOriginContext.default).toHaveBeenCalledWith('bbcOrigin');

    expect(getEnv.default).toHaveBeenCalledWith('origin');

    expect(getMetaUrls.default).toHaveBeenCalledWith('origin', '/current-path');

    expect(React.useContext).toHaveReturnedWith(expectedOutput);
  });

  describe('platform', () => {
    it('should be "amp" when isAmp is true', () => {
      render(
        <RequestContextProvider {...input} isAmp>
          <Component />
        </RequestContextProvider>,
      );

      expect(React.useContext).toHaveReturnedWith({
        ...expectedOutput,
        platform: 'amp',
      });
    });

    it('should be "canonical" when isAmp is false', () => {
      render(
        <RequestContextProvider {...input} isAmp={false}>
          <Component />
        </RequestContextProvider>,
      );

      expect(React.useContext).toHaveReturnedWith({
        ...expectedOutput,
        platform: 'canonical',
      });
    });
  });

  describe('statusCode', () => {
    it('should default to 500 when not set in data', () => {
      suppressPropWarnings(['data.status', 'undefined']);

      const data = { pageData: fixtureData };

      render(
        <RequestContextProvider {...input} data={data}>
          <Component />
        </RequestContextProvider>,
      );

      expect(React.useContext).toHaveReturnedWith({
        ...expectedOutput,
        statusCode: 500,
      });
    });
  });
});
