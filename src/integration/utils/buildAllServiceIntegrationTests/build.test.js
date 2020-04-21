import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import build from './build';

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  writeFileSync: jest.fn(),
  mkdirSync: jest.fn(),
}));

const prettierConfig = prettier.resolveConfig.sync(
  path.join(__dirname, __filename),
);

const format = fileContent =>
  prettier.format(fileContent, { parser: 'babel', ...prettierConfig });

afterEach(() => {
  fs.writeFileSync.mockClear();
  fs.mkdirSync.mockClear();
});

describe('should generate test files from a given test example', () => {
  beforeEach(async () => {
    await build({
      service: 'persian',
      pageType: 'liveRadio',
      pathname: '/persian/bbc_persian_radio/liveradio',
    });
  });

  describe('AMP platform', () => {
    it('should create the directory for the generated AMP tests to go in', () => {
      const [dirPath] = fs.mkdirSync.mock.calls[0];

      expect(dirPath).toMatch(
        '/simorgh/src/integration/__full_service_regression_tests__/__GENERATED_TEST_FILES__/persian/liveRadio',
      );
    });

    it('should write the generated test file in the new directory', () => {
      const [filePath, fileContent, encoding] = fs.writeFileSync.mock.calls[0];

      expect(encoding).toEqual('utf8');

      expect(filePath).toMatch(
        `/simorgh/src/integration/__full_service_regression_tests__/__GENERATED_TEST_FILES__/persian/liveRadio/amp.test.js`,
      );

      expect(fileContent).toEqual(
        format(
          `/**
          * @service persian
          * @pathname /persian/bbc_persian_radio/liveradio
          *
          * THIS TEST SUITE WAS GENERATED BY A BUILD SCRIPT. DO NOT EDIT THIS FILE.
          */
         
         import runCrossPlatformTests from '../../../../pages/liveRadio/crossPlatformTests';
         import runAmpTests from '../../../../pages/liveRadio/ampTests';
         describe(platform.toUpperCase(), () => {
           describe(pageType, () => {
             runCrossPlatformTests();
             runAmpTests();
           });
         });`,
        ),
      );
    });
  });

  describe('canonical platform', () => {
    it('should create the directory for the generated canonical tests to go in', () => {
      const [dirPath] = fs.mkdirSync.mock.calls[1];

      expect(dirPath).toMatch(
        '/simorgh/src/integration/__full_service_regression_tests__/__GENERATED_TEST_FILES__/persian/liveRadio',
      );
    });

    it('should write the generated test file in the new directory', () => {
      const [filePath, fileContent, encoding] = fs.writeFileSync.mock.calls[1];

      expect(encoding).toEqual('utf8');

      expect(filePath).toMatch(
        `/simorgh/src/integration/__full_service_regression_tests__/__GENERATED_TEST_FILES__/persian/liveRadio/canonical.test.js`,
      );

      expect(fileContent).toEqual(
        format(
          `/**
        * @service persian
        * @pathname /persian/bbc_persian_radio/liveradio
        *
        * THIS TEST SUITE WAS GENERATED BY A BUILD SCRIPT. DO NOT EDIT THIS FILE.
        */
       
       import runCrossPlatformTests from '../../../../pages/liveRadio/crossPlatformTests';
       import runCanonicalTests from '../../../../pages/liveRadio/canonicalTests';
       describe(platform.toUpperCase(), () => {
         describe(pageType, () => {
           runCrossPlatformTests();
           runCanonicalTests();
         });
       });
       `,
        ),
      );
    });
  });
});

describe('should generate test files from a given test example for services with variants', () => {
  beforeEach(async () => {
    await build({
      service: 'zhongwen',
      pageType: 'articles',
      pathname: '/zhongwen/articles/c3xd4x9prgyo/simp',
      variant: 'simp',
    });
  });

  describe('AMP platform', () => {
    it('should create the directory for the generated AMP tests to go in', () => {
      const [dirPath] = fs.mkdirSync.mock.calls[0];

      expect(dirPath).toMatch(
        '/simorgh/src/integration/__full_service_regression_tests__/__GENERATED_TEST_FILES__/zhongwen/simp/articles',
      );
    });

    it('should write the generated test file in the new directory', () => {
      const [filePath, fileContent, encoding] = fs.writeFileSync.mock.calls[0];

      expect(encoding).toEqual('utf8');

      expect(filePath).toMatch(
        `/simorgh/src/integration/__full_service_regression_tests__/__GENERATED_TEST_FILES__/zhongwen/simp/articles/amp.test.js`,
      );

      expect(fileContent).toEqual(
        format(
          `/**
          * @service zhongwen
          * @pathname /zhongwen/articles/c3xd4x9prgyo/simp
          *
          * THIS TEST SUITE WAS GENERATED BY A BUILD SCRIPT. DO NOT EDIT THIS FILE.
          */
         
         import runCrossPlatformTests from "../../../../../pages/articles/crossPlatformTests"
         import runAmpTests from "../../../../../pages/articles/ampTests"
         describe(platform.toUpperCase(), () => {
           describe(pageType, () => {
             runCrossPlatformTests();
             runAmpTests();
           });
         });`,
        ),
      );
    });
  });

  describe('canonical platform', () => {
    it('should create the directory for the generated canonical tests to go in', () => {
      const [dirPath] = fs.mkdirSync.mock.calls[1];

      expect(dirPath).toMatch(
        '/simorgh/src/integration/__full_service_regression_tests__/__GENERATED_TEST_FILES__/zhongwen/simp/articles',
      );
    });

    it('should write the generated test file in the new directory', () => {
      const [filePath, fileContent, encoding] = fs.writeFileSync.mock.calls[1];

      expect(encoding).toEqual('utf8');

      expect(filePath).toMatch(
        `/simorgh/src/integration/__full_service_regression_tests__/__GENERATED_TEST_FILES__/zhongwen/simp/articles/canonical.test.js`,
      );

      expect(fileContent).toEqual(
        format(
          `/**
          * @service zhongwen
          * @pathname /zhongwen/articles/c3xd4x9prgyo/simp
        *
        * THIS TEST SUITE WAS GENERATED BY A BUILD SCRIPT. DO NOT EDIT THIS FILE.
        */
       
       import runCrossPlatformTests from "../../../../../pages/articles/crossPlatformTests"
       import runCanonicalTests from "../../../../../pages/articles/canonicalTests"
       describe(platform.toUpperCase(), () => {
         describe(pageType, () => {
           runCrossPlatformTests();
           runCanonicalTests();
         });
       });
       `,
        ),
      );
    });
  });
});
