/**
 * @service korean
 * @pathname /korean/articles/c3mn1lvz65xo
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
    `"https://ichef.bbci.co.uk/news/640/cpsdevpb/4017/test/ba378f90-110a-11ea-acaa-cd607a38aea4.jpg"`,
  );
  expect(imageCaptionEl).toBeInTheDocument();
  expect(imageCaptionEl.textContent).toBeTruthy();
  expect(imageCaptionEl.textContent).toMatchInlineSnapshot(
    `"사진 설명 이 테스트 이미지 인 저작권 는 프랑스지도를 보여줍니다. 이미지는 처음 세 블록에 있으며이 캡션이 있습니다."`,
  );
});
