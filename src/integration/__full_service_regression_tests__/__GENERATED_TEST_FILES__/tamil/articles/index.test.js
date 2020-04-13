/**
 * @service tamil
 * @pathname /tamil/articles/cwl08ll3me8o
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
    `"https://ichef.bbci.co.uk/news/640/cpsdevpb/d6d7/test/0eb95930-fcbc-11e9-9afe-1371928331c5.jpg"`,
  );
  expect(imageCaptionEl).toBeInTheDocument();
  expect(imageCaptionEl.textContent).toBeTruthy();
  expect(imageCaptionEl.textContent).toMatchInlineSnapshot(
    `"படக்குறிப்பு, இந்த சோதனை படம், பதிப்புரிமை பிபிசி, பிரான்சின் வரைபடத்தைக் காட்டுகிறது. படம் முதல் மூன்று தொகுதிகளில் உள்ளது மற்றும் இந்த தலைப்பைக் கொண்டுள்ளது."`,
  );
});
