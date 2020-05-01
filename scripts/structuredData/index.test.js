const fetch = require('node-fetch');
const { Google, SocialMedia } = require('structured-data-testing-tool/presets');
const { structuredDataTest } = require('structured-data-testing-tool');

jest.mock('node-fetch');
jest.mock('structured-data-testing-tool/presets', () => ({
  Google: jest.fn(),
  SocialMedia: jest.fn(),
}));
jest.mock('structured-data-testing-tool', () => ({
  structuredDataTest: jest.fn(() => ({})),
}));

require('./mocks/services');
const { expectedUrls } = require('./mocks/fixtures');
const {
  getUrls,
  // printResults,
  validate,
  // checkStructuredData,
} = require('./index');

describe('Structured Data Test', () => {
  describe('getUrls', () => {
    it('get the expected urls', () => {
      const urls = getUrls();
      expect(urls).toEqual(expectedUrls);
    });
  });

  describe('printResults', () => {
    it('should do something', () => {
      expect(false).toBeTruthy();
    });
  });

  describe('validate', async () => {
    const mockUrl = 'mock-url';
    const sdttOptionArgs = {
      presets: [Google, SocialMedia],
    };

    it('run tool with video MAP schema', async () => {
      const videoMapJson = {
        metadata: {
          type: 'MAP',
        },
        promo: {
          media: {
            format: 'video',
          },
        },
      };
      const schemas = ['Article', 'VideoObject'];
      fetch.mockImplementation(() => ({ json: () => videoMapJson }));
      await validate(mockUrl);
      expect(structuredDataTest).toBeCalledWith(mockUrl, {
        ...sdttOptionArgs,
        schemas,
      });
    });

    it('run tool with audio MAP schema', async () => {
      const audioMapJson = {
        metadata: {
          type: 'MAP',
        },
        promo: {
          media: {
            format: 'audio',
          },
        },
      };
      const schemas = ['Article', 'AudioObject'];
      fetch.mockImplementation(() => ({ json: () => audioMapJson }));
      await validate(mockUrl);
      expect(structuredDataTest).toBeCalledWith(mockUrl, {
        ...sdttOptionArgs,
        schemas,
      });
    });

    it('run tool with video STY schema', async () => {
      const styVideoJson = {
        metadata: {
          type: 'STY',
          blockTypes: ['media', 'paragraph'],
        },
        promo: {
          media: {
            format: 'video',
          },
        },
        content: {
          blocks: [
            {
              type: 'media',
              format: 'video',
            },
            {
              type: 'paragraph',
            },
          ],
        },
      };
      const schemas = ['ReportageNewsArticle', 'VideoObject'];
      fetch.mockImplementation(() => ({ json: () => styVideoJson }));
      await validate(mockUrl);
      expect(structuredDataTest).toBeCalledWith(mockUrl, {
        ...sdttOptionArgs,
        schemas,
      });
    });

    it('run tool with audio STY schema', async () => {
      const styAudioJson = {
        metadata: {
          type: 'STY',
          blockTypes: ['media', 'paragraph'],
        },
        promo: {
          media: {
            format: 'video',
          },
        },
        content: {
          blocks: [
            {
              type: 'media',
              format: 'audio',
            },
            {
              type: 'paragraph',
            },
          ],
        },
      };
      const schemas = ['ReportageNewsArticle', 'AudioObject'];
      fetch.mockImplementation(() => ({ json: () => styAudioJson }));
      await validate(mockUrl);
      expect(structuredDataTest).toBeCalledWith(mockUrl, {
        ...sdttOptionArgs,
        schemas,
      });
    });

    it('run tool with PGL schema', async () => {
      const pglJson = { metadata: { type: 'PGL' } };
      const schemas = ['Article'];
      fetch.mockImplementation(() => ({ json: () => pglJson }));
      await validate(mockUrl);
      expect(structuredDataTest).toBeCalledWith(mockUrl, {
        ...sdttOptionArgs,
        schemas,
      });
    });

    it('run tool with live radio schema', async () => {
      const liveRadioJson = { metadata: { type: 'WS-LIVE' } };
      const schemas = ['RadioChannel'];
      fetch.mockImplementation(() => ({ json: () => liveRadioJson }));
      await validate(mockUrl);
      expect(structuredDataTest).toBeCalledWith(mockUrl, {
        ...sdttOptionArgs,
        schemas,
      });
    });

    it('run tool with IDX schema', async () => {
      const idxJson = { metadata: { type: 'IDX' } };
      const schemas = ['WebPage'];
      fetch.mockImplementation(() => ({ json: () => idxJson }));
      await validate(mockUrl);
      expect(structuredDataTest).toBeCalledWith(mockUrl, {
        ...sdttOptionArgs,
        schemas,
      });
    });

    it('run tool with article schema', async () => {
      const articleJson = { metadata: { type: 'article' } };
      const schemas = ['Article'];
      fetch.mockImplementation(() => ({ json: () => articleJson }));
      await validate(mockUrl);
      expect(structuredDataTest).toBeCalledWith(mockUrl, {
        ...sdttOptionArgs,
        schemas,
      });
    });

    it('run tool with on demand radio schema', async () => {
      const odRadioJson = { metadata: { type: 'WSRADIO' } };
      const schemas = [];
      fetch.mockImplementation(() => ({ json: () => odRadioJson }));
      await validate(mockUrl);
      expect(structuredDataTest).toBeCalledWith(mockUrl, {
        ...sdttOptionArgs,
        schemas,
      });
    });
  });

  describe('checkStructuredData', () => {
    // checkStructuredData();

    it('should do something', () => {
      expect(false).toBeTruthy();
    });
  });
});
