/**
 * @service korean
 * @pathname /korean/articles/c3mn1lvz65xo
 *
 * THIS TEST SUITE WAS GENERATED BY A BUILD SCRIPT. DO NOT EDIT THIS FILE.
 */

import runCrossPlatformTests from '../../../../pages/articles/crossPlatformTests';
import runAmpTests from '../../../../pages/articles/ampTests';
describe(platform.toUpperCase(), () => {
  describe(pageType, () => {
    runCrossPlatformTests();
    runAmpTests();
  });
});
