/**
 * @service japanese
 * @pathname /japanese
 *
 * THIS TEST SUITE WAS GENERATED BY A BUILD SCRIPT. DO NOT EDIT THIS FILE.
 */

import runCrossPlatformTests from '../../../../pages/frontPage/crossPlatformTests';
import runAmpTests from '../../../../pages/frontPage/ampTests';
describe(platform.toUpperCase(), () => {
  describe(pageType, () => {
    runCrossPlatformTests();
    runAmpTests();
  });
});
