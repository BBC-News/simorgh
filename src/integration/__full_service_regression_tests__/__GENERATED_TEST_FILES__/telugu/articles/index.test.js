/**
 * @service telugu
 * @pathname /telugu/articles/cq0y4008d4vo
 *
 * THIS TEST SUITE WAS GENERATED BY A BUILD SCRIPT. DO NOT EDIT THIS FILE.
 */

import runA11yTests from '../../../../common/a11y';
import runHeaderTests from '../../../../common/header';
import runFootertests from '../../../../common/footer';
import runSEOtests from '../../../../common/SEO';
import runPerformanceTests from '../../../../common/performance';
runA11yTests();
runHeaderTests();
runFootertests();
runSEOtests();
runPerformanceTests();
it('Image with caption', () => {
  const imageEl = document.querySelector(
    'main figure img, main figure amp-img',
  );
  const imageCaptionEl = document.querySelector('main figure figcaption');
  expect(imageEl).toBeInTheDocument();
  expect(imageEl).toBeTruthy();
  expect(imageEl.getAttribute('src')).toMatchInlineSnapshot(
    `"https://ichef.bbci.co.uk/news/640/cpsdevpb/b931/test/574551d0-fcbd-11e9-9afe-1371928331c5.jpg"`,
  );
  expect(imageCaptionEl).toBeInTheDocument();
  expect(imageCaptionEl.textContent).toBeTruthy();
  expect(imageCaptionEl.textContent).toMatchInlineSnapshot(
    `"ఫొటో క్యాప్షన్, ఈ పరీక్ష చిత్రం, కాపీరైట్ BBC, ఫ్రాన్స్ యొక్క మ్యాప్‌ను చూపిస్తుంది. చిత్రం మొదటి మూడు బ్లాకులలో ఉంది మరియు ఈ శీర్షిక ఉంది."`,
  );
});
