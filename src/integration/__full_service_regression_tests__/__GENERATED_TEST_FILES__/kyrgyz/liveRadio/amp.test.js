/**
 * @service kyrgyz
 * @pathname /kyrgyz/bbc_kyrgyz_radio/liveradio
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
});
