/**
 * @service afrique
 * @pathname /afrique
 *
 * THIS TEST SUITE WAS GENERATED BY A BUILD SCRIPT. DO NOT EDIT THIS FILE.
 */

import runCrossPlatformTests from '../../../../pages/frontPage/crossPlatformTests';
import runCanonicalTests from '../../../../pages/frontPage/canonicalTests';
describe(platform.toUpperCase(), () => {
  describe(pageType, () => {
    runCrossPlatformTests();
    runCanonicalTests();
  });
});
