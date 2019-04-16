import loggerMock from '../../helpers/tests/loggerMock'; // Must be imported before getInitialData
import baseUrl from './getBaseUrl';
import {
  setWindowValue,
  resetWindowValue,
} from '../../helpers/tests/setWindowValue';

const getBaseUrlMockOrigin = 'https://www.mockSite.com';
jest.mock('./getBaseUrl', () => jest.fn());
baseUrl.mockImplementation(() => getBaseUrlMockOrigin);

const getInitialData = require('./index').default;

describe('getInitialData', () => {
  const defaultIdParam = 'c0000000001o';
  const defaultServiceParam = 'news';
  const defaultAmpParam = '';
  const defaultContext = {
    match: {
      params: {
        id: defaultIdParam,
        service: defaultServiceParam,
        amp: defaultAmpParam,
      },
    },
  };
  const mockSuccessfulResponse = { data: '12345' };

  const mockFetchSuccess = () =>
    fetch.mockResponseOnce(JSON.stringify(mockSuccessfulResponse));

  const mockFetchFailure = () =>
    fetch.mockReject(JSON.stringify({ error: true }));

  const mockFetchInvalidJSON = () =>
    fetch.mockResponseOnce('Some Invalid: { JSON');

  const mockFetchNotFoundStatus = () =>
    fetch.mockResponseOnce(JSON.stringify({}), { status: 404 });

  const mockFetchTeapotStatus = () =>
    fetch.mockResponseOnce(JSON.stringify({}), { status: 418 });

  const callGetInitialData = async (
    context = defaultContext,
    mockFetch = mockFetchSuccess,
  ) => {
    mockFetch();
    const response = await getInitialData(context);
    return response;
  };

  const windowLocation = window.location;

  afterEach(() => {
    resetWindowValue('location', windowLocation);
    fetch.resetMocks();
  });

  it('should return the fetch response', async () => {
    const response = await callGetInitialData();
    expect(response).toEqual({
      isAmp: false,
      data: mockSuccessfulResponse,
      service: 'news',
      status: 200,
    });
  });

  it('should return an amp value of true, when .amp passed in context params', async () => {
    const contextWithAmp = {
      match: {
        params: {
          id: defaultIdParam,
          service: defaultServiceParam,
          amp: '.amp',
        },
      },
    };

    const response = await callGetInitialData(contextWithAmp);
    expect(response).toEqual({
      isAmp: true,
      data: mockSuccessfulResponse,
      service: 'news',
      status: 200,
    });
  });

  describe('using correct baseUrl', () => {
    const BASE_PATH = 'https://www.test.com';
    beforeEach(() => {
      process.env.SIMORGH_BASE_URL = BASE_PATH;
    });

    it('should call fetch with an absolute URL using BASE_PATH environment variable when window location origin is undefined', () => {
      setWindowValue('location', {
        origin: undefined,
      });
      callGetInitialData();
      expect(fetch.mock.calls[0][0]).toEqual(
        `${BASE_PATH}/${defaultServiceParam}/articles/${defaultIdParam}.json`,
      );
    });

    it('should call fetch with an absolute URL using getBaseUrl() value when window location origin is available', () => {
      setWindowValue('location', {
        origin: 'https://website.com',
      });
      callGetInitialData();
      expect(fetch.mock.calls[0][0]).toEqual(
        `${getBaseUrlMockOrigin}/${defaultServiceParam}/articles/${defaultIdParam}.json`,
      );
    });
  });

  describe('Rejected fetch', () => {
    it('should return an empty object', async () => {
      const response = await callGetInitialData(
        defaultContext,
        mockFetchFailure,
      );
      expect(response).toEqual({
        data: undefined,
        isAmp: false,
        service: 'news',
        status: 502,
      });
    });
  });

  describe('Ares returns 200 status code, but invalid JSON', () => {
    it('should return a 502 error code', async () => {
      const response = await callGetInitialData(
        defaultContext,
        mockFetchInvalidJSON,
      );

      expect(response).toEqual({
        data: undefined,
        isAmp: false,
        service: 'news',
        status: 502,
      });
    });
  });

  describe('Ares returns a 404 status code', () => {
    it('should return the status code as 404', async () => {
      const response = await callGetInitialData(
        defaultContext,
        mockFetchNotFoundStatus,
      );

      expect(response).toEqual({
        data: undefined,
        isAmp: false,
        service: 'news',
        status: 404,
      });
    });
  });

  describe('Ares returns a non-200, non-404 status code', () => {
    it('should log, and return the status code as 502', async () => {
      const response = await callGetInitialData(
        defaultContext,
        mockFetchTeapotStatus,
      );

      expect(loggerMock.warn).toBeCalledWith(
        `Unexpected upstream response (HTTP status code 418) when requesting ${getBaseUrlMockOrigin}/news/articles/c0000000001o.json`,
      );

      expect(response).toEqual({
        data: undefined,
        isAmp: false,
        service: 'news',
        status: 502,
      });
    });
  });
});
