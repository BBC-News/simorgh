/* eslint-disable global-require */
import path from 'path';
import nodeLogger from '../../app/helpers/logger.node';

const mockLogError = jest.fn();

jest.mock('../../app/helpers/logger.node', () => jest.fn());

nodeLogger.mockImplementation(() => ({ error: mockLogError }));

describe('getAssetsArray', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('no assets manifest', () => {
    it('should log an error', async () => {
      delete process.env.SIMORGH_ASSETS_MANIFEST_PATH;
      const { getAssetsArray } = require('./index.js');
      getAssetsArray();
      expect(mockLogError).toHaveBeenCalledWith(
        `Error parsing assets manifest. SIMORGH_ASSETS_MANIFEST_PATH = ${
          process.env.SIMORGH_ASSETS_MANIFEST_PATH
        }`,
      );
    });
  });

  describe('assets manifest exists', () => {
    it('should return the manifest contents as key-value pairs', async () => {
      process.env.SIMORGH_ASSETS_MANIFEST_PATH = path.resolve(
        __dirname,
        'fixture.json',
      );
      const { getAssetsArray } = require('./index.js');
      expect(getAssetsArray()).toEqual(['one.js']);
      expect(mockLogError).not.toHaveBeenCalled();
    });
  });

  describe('assets manifest corrupted', () => {
    it('should return only assets which have a key', async () => {
      process.env.SIMORGH_ASSETS_MANIFEST_PATH = path.resolve(
        __dirname,
        'fixtureMissingKey.json',
      );
      const { getAssetsArray } = require('./index.js');
      expect(getAssetsArray()).toEqual(['foo.js']);
      expect(mockLogError).not.toHaveBeenCalled();
    });
  });

  describe('getAssetDomains', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return the asset domains as an array', async () => {
      const defaultDomains = ['ichef.bbci.co.uk', 'gel.files.bbci.co.uk'];
      process.env.SIMORGH_PUBLIC_STATIC_ASSETS_HOST = 'some.statichost.net';
      const { getAssetDomains } = require('./index.js');
      expect(getAssetDomains()).toEqual([
        ...defaultDomains,
        'some.statichost.net',
      ]);
    });
  });
});
