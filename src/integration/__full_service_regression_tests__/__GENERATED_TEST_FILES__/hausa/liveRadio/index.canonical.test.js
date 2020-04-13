/**
 * @service hausa
 * @pathname /hausa/bbc_hausa_radio/liveradio
 *
 * THIS TEST SUITE WAS GENERATED BY A BUILD SCRIPT. DO NOT EDIT THIS FILE.
 */

import runCoreTests from '../../../../common/core.canonical';
import runAnalyticsTests from '../../../../common/analytics.canonical';
runCoreTests();
runAnalyticsTests();
it('Audio player embed', () => {
  const audioPlayerIframe = document.querySelector('iframe');
  expect(audioPlayerIframe).toBeInTheDocument();
  expect(audioPlayerIframe.getAttribute('src')).toMatchInlineSnapshot(
    `"https://polling.test.bbc.co.uk/ws/av-embeds/media/bbc_hausa_radio/liveradio/ha"`,
  );
});
