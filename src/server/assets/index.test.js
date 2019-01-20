import path from 'path';
import getAssetsArray from '.';

describe('getAssetsArray', () => {
  describe('no assets manifest', () => {
    it('should console log an error', async () => {
      delete process.env.SIMORGH_ASSETS_MANIFEST_PATH;
      global.console.log = jest.fn();
      getAssetsArray();
      expect(global.console.log).toHaveBeenCalledWith(
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
      expect(getAssetsArray()).toEqual(['one.js']);
    });
  });

  describe('assets manifest corrupted', () => {
    it('should return all assets including those without a key', async () => {
      process.env.SIMORGH_ASSETS_MANIFEST_PATH = path.resolve(
        __dirname,
        'fixtureMissingKey.json',
      );
      expect(getAssetsArray()).toEqual(['foo.js', 'bar.js']);
    });
  });
});
