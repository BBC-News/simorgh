/**
 * @service punjabi
 * @pathname /punjabi/articles/c0l79lr39qyo
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
    `"https://ichef.bbci.co.uk/news/640/cpsdevpb/4d4a/test/5143a9a0-fcc0-11e9-9afe-1371928331c5.jpg"`,
  );
  expect(imageCaptionEl).toBeInTheDocument();
  expect(imageCaptionEl.textContent).toBeTruthy();
  expect(imageCaptionEl.textContent).toMatchInlineSnapshot(
    `"ਤਸਵੀਰ ਕੈਪਸ਼ਨ, ਇਹ ਪਰੀਖਿਆ ਚਿੱਤਰ, ਕਾਪੀਰਾਈਟ ਬੀਬੀਸੀ, ਫਰਾਂਸ ਦਾ ਨਕਸ਼ਾ ਦਰਸਾਉਂਦਾ ਹੈ. ਚਿੱਤਰ ਪਹਿਲੇ ਤਿੰਨ ਬਲਾਕਾਂ ਵਿੱਚ ਹੈ ਅਤੇ ਇਸਦਾ ਸਿਰਲੇਖ ਹੈ."`,
  );
});
