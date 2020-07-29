/* eslint-disable react/prop-types */
import React from 'react';
import { StaticRouter } from 'react-router-dom';

// test helpers
import { render } from '@testing-library/react';
import assocPath from 'ramda/src/assocPath';
import '@testing-library/jest-dom/extend-expect';
import fetchMock from 'fetch-mock';
import { matchSnapshotAsync } from '@bbc/psammead-test-helpers';

// contexts
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';

// components to test
import { StoryPage } from '..';
import getInitialData from '#app/routes/cpsAsset/getInitialData';

// mock data
import pidginPageData from '#data/pidgin/cpsAssets/world-23252817';
import pidginMostReadData from '#data/pidgin/mostRead/index.json';
import pidginSecondaryColumnData from '#data/pidgin/secondaryColumn/index.json';
import igboPageData from '#data/igbo/cpsAssets/afirika-23252735';
import igboMostReadData from '#data/igbo/mostRead/index.json';
import igboSecondaryColumnData from '#data/igbo/secondaryColumn/index.json';

fetchMock.config.overwriteRoutes = false; // http://www.wheresrhys.co.uk/fetch-mock/#usageconfiguration allows us to mock the same endpoint multiple times

const toggleState = {
  mediaPlayer: {
    enabled: true,
  },
};

jest.mock('#containers/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

const createAssetPage = ({ pageData }, service) => (
  <StaticRouter>
    <ToggleContext.Provider value={{ toggleState, toggleDispatch: jest.fn() }}>
      <ServiceContextProvider service={service}>
        <RequestContextProvider
          bbcOrigin="https://www.test.bbc.co.uk"
          isAmp={false}
          pageType={pageData.metadata.type}
          pathname={pageData.metadata.locators.assetUri}
          service={service}
          statusCode={200}
        >
          <StoryPage service={service} pageData={pageData} />
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContext.Provider>
  </StaticRouter>
);

jest.mock('#containers/PageHandlers/withPageWrapper', () => Component => {
  const PageWrapperContainer = props => (
    <div id="PageWrapperContainer">
      <Component {...props} />
    </div>
  );

  return PageWrapperContainer;
});

jest.mock('#containers/PageHandlers/withLoading', () => Component => {
  const LoadingContainer = props => (
    <div id="LoadingContainer">
      <Component {...props} />
    </div>
  );

  return LoadingContainer;
});

jest.mock('#containers/PageHandlers/withError', () => Component => {
  const ErrorContainer = props => (
    <div id="ErrorContainer">
      <Component {...props} />
    </div>
  );

  return ErrorContainer;
});

jest.mock('#containers/PageHandlers/withData', () => Component => {
  const DataContainer = props => (
    <div id="DataContainer">
      <Component {...props} />
    </div>
  );

  return DataContainer;
});

jest.mock('#containers/PageHandlers/withContexts', () => Component => {
  const ContextsContainer = props => (
    <div id="ContextsContainer">
      <Component {...props} />
    </div>
  );

  return ContextsContainer;
});

const pageType = 'cpsAsset';

describe('Story Page', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe('snapshots', () => {
    it('should match snapshot for STY', async () => {
      fetchMock.mock('http://localhost/some-cps-sty-path.json', pidginPageData);
      fetchMock.mock(
        'http://localhost/pidgin/mostread.json',
        pidginMostReadData,
      );
      fetchMock.mock(
        'http://localhost/pidgin/sty-secondary-column.json',
        pidginSecondaryColumnData,
      );

      const { pageData } = await getInitialData({
        path: '/some-cps-sty-path',
        service: 'pidgin',
        pageType,
      });

      const page = createAssetPage({ pageData }, 'pidgin');
      await matchSnapshotAsync(page);
    });
  });

  it('should only render firstPublished timestamp for Igbo when lastPublished is less than 1 min later', async () => {
    fetchMock.mock('http://localhost/some-cps-sty-path.json', igboPageData);
    fetchMock.mock('http://localhost/igbo/mostread.json', igboMostReadData);
    fetchMock.mock(
      'http://localhost/igbo/sty-secondary-column.json',
      igboSecondaryColumnData,
    );

    const { pageData } = await getInitialData({
      path: '/some-cps-sty-path',
      service: 'igbo',
      pageType,
    });

    const { getByText } = render(createAssetPage({ pageData }, 'igbo'));
    expect(getByText('23 Ọktọba 2019')).toBeInTheDocument();
  });

  it('should not show the pop-out timestamp when allowDateStamp is false', async () => {
    fetchMock.mock('http://localhost/some-cps-sty-path.json', igboPageData);
    fetchMock.mock('http://localhost/igbo/mostread.json', igboMostReadData);
    fetchMock.mock(
      'http://localhost/igbo/sty-secondary-column.json',
      igboSecondaryColumnData,
    );

    const { pageData } = await getInitialData({
      path: '/some-cps-sty-path',
      service: 'igbo',
      pageType,
    });

    const pageDataWithHiddenTimestamp = assocPath(
      ['metadata', 'options', 'allowDateStamp'],
      false,
      pageData,
    );

    const { asFragment } = render(
      createAssetPage({ pageData: pageDataWithHiddenTimestamp }, 'pidgin'),
    );

    expect(document.querySelector('main time')).toBeNull();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when the secondary column data is not available', async () => {
    fetchMock.mock('http://localhost/some-cps-sty-path.json', pidginPageData);
    fetchMock.mock('http://localhost/pidgin/mostread.json', pidginMostReadData);
    fetchMock.mock('http://localhost/pidgin/sty-secondary-column.json', {});

    const { pageData } = await getInitialData({
      path: '/some-cps-sty-path',
      service: 'pidgin',
      pageType,
    });

    const page = createAssetPage({ pageData }, 'pidgin');
    await matchSnapshotAsync(page);
  });
});
