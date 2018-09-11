import React from 'react';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';
import ArticleContainer from './index';

// explicitly ignore console.log errors for Article/index:getInitialProps() error logging
global.console.log = jest.fn();

describe('ArticleContainer', () => {
  const articleData = {
    metadata: {
      id: 'urn:bbc:ares::article:c0000000001o',
      locators: {
        optimoUrn: 'urn:bbc:optimo:asset:c0000000001o',
      },
      type: 'article',
      createdBy: '',
      blockId: 'a-1',
      created: 1514808060000,
      firstPublished: 1514808060000,
      lastPublished: 1514811600000,
      lastUpdated: 1514811600000,
      passport: {
        language: 'en-gb',
        home: 'http://www.bbc.co.uk/ontologies/passport/home/News',
        category: 'news',
        genre: null,
      },
    },
    content: {
      model: {
        blocks: [
          {
            blockId: 'h-1',
            type: 'headline',
            model: {
              blocks: [
                {
                  blockId: 't-1',
                  type: 'text',
                  model: {
                    blocks: [
                      {
                        type: 'paragraph',
                        blockId: 'p-1',
                        model: {
                          text: 'Article Headline',
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            type: 'text',
            blockId: 't-2',
            model: {
              blocks: [
                {
                  blockId: 'p-2',
                  type: 'paragraph',
                  model: {
                    text: 'A paragraph.',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    promo: {
      id: 'urn:bbc:ares::article:c0000000001o',
      headlines: {
        seoHeadline: 'Article Headline for SEO',
        promoHeadline: 'Article Headline for Promo',
      },
      locators: {
        optimoUrn: 'urn:bbc:optimo:asset:c0000000001o',
      },
      summary: 'Article summary.',
      timestamp: 1514811600000,
    },
  };

  describe('Component', () => {
    shouldShallowMatchSnapshot(
      'should render correctly',
      <ArticleContainer data={articleData} />,
    );

    describe('no data', () => {
      shouldShallowMatchSnapshot(
        'should render correctly',
        <ArticleContainer />,
      );
    });
  });

  describe('getInitialProps', () => {
    const defaultIdParam = 'c0000000001o';
    const defaultServiceParam = 'news';
    const defaultContext = {
      match: {
        params: {
          id: defaultIdParam,
          service: defaultServiceParam,
        },
      },
    };
    const mockSuccessfulResponse = { data: '12345' };

    const mockFetchSuccess = () =>
      fetch.mockResponseOnce(JSON.stringify(mockSuccessfulResponse));

    const mockFetchFailure = () =>
      fetch.mockReject(JSON.stringify({ error: true }));

    const callGetInitialProps = async (
      context = defaultContext,
      mockFetch = mockFetchSuccess,
    ) => {
      mockFetch();
      const response = await ArticleContainer.getInitialProps(context);
      return response;
    };

    beforeEach(() => {
      fetch.resetMocks();
    });

    it('should return the fetch response', async () => {
      const response = await callGetInitialProps();
      expect(response).toEqual({ amp: false, data: mockSuccessfulResponse });
    });

    describe('On client', () => {
      it('should call fetch with a relative URL', () => {
        callGetInitialProps();
        expect(fetch.mock.calls[0][0]).toEqual(`/data/${defaultIdParam}.json`);
      });
    });

    describe('Validate route parameter ', () => {
      it('checks the id is invalid before returning an empty object', async () => {
        jest.spyOn(global.console, 'log');
        const invalidIdParam = 'route-21';
        const invalidContext = {
          match: {
            params: {
              id: invalidIdParam,
              service: defaultServiceParam,
            },
          },
        };
        const response = await callGetInitialProps(invalidContext);

        expect(fetch).not.toHaveBeenCalled();

        /* eslint-disable no-console */
        expect(console.log).toBeCalledWith(
          new Error(
            `Invalid route parameter: ${invalidIdParam}. ID parameter must be in format 'c[xxxxxxxxxx]o', where the middle part could be 0000000001 to 0000000027.`,
          ),
        );
        /* eslint-enable no-console */

        expect(response).toEqual({});
      });

      it('checks the service is invalid before returning an empty object', async () => {
        jest.spyOn(global.console, 'log');
        const invalidServiceParam = 'route-21';
        const invalidContext = {
          match: {
            params: { id: 'c0000000027o', service: invalidServiceParam },
          },
        };
        const response = await callGetInitialProps(invalidContext);

        expect(fetch).not.toHaveBeenCalled();

        /* eslint-disable no-console */
        expect(console.log).toBeCalledWith(
          new Error(
            `Invalid route parameter: ${invalidServiceParam}. Service parameter must be news or persian.`,
          ),
        );
        /* eslint-enable no-console */

        expect(response).toEqual({});
      });
    });

    describe('On Server', () => {
      const BASE_PATH = 'https://test.com';
      const serverContext = { req: { exists: true }, ...defaultContext };
      process.env.RAZZLE_BASE_PATH = BASE_PATH;

      it('should call fetch with an absolute URL using BASE_PATH environment variable', () => {
        callGetInitialProps(serverContext);
        expect(fetch.mock.calls[0][0]).toEqual(
          `${BASE_PATH}/data/${defaultIdParam}.json`,
        );
      });
    });

    describe('Rejected fetch', () => {
      it('should return an empty object', async () => {
        const response = await callGetInitialProps({}, mockFetchFailure);
        expect(response).toEqual({});
      });
    });
  });
});
