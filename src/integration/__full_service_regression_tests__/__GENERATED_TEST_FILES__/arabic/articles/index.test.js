/**
 * @service arabic
 * @pathname /arabic/articles/c1er5mjnznzo
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
    `"https://ichef.bbci.co.uk/news/640/cpsdevpb/6eab/test/c2696670-e68f-11e9-88d6-81aa2ccc6d4c.jpg"`,
  );
  expect(imageCaptionEl).toBeInTheDocument();
  expect(imageCaptionEl.textContent).toBeTruthy();
  expect(imageCaptionEl.textContent).toMatchInlineSnapshot(
    `"التعليق على الصورة، تعرض هذه الصورة التجريبية ، حقوق الطبع والنشر لهيئة الإذاعة البريطانية ، خريطة لفرنسا. الصورة في الكتل الثلاثة الأولى وتحتوي على هذا التعليق."`,
  );
});
