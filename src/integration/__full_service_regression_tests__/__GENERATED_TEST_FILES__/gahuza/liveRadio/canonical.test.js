/**
 * @service gahuza
 * @pathname /gahuza/bbc_gahuza_radio/liveradio
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
