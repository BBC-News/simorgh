/**
 * @service igbo
 * @pathname /igbo/articles/cr1lw620ygjo
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
    `"https://ichef.bbci.co.uk/news/640/cpsdevpb/5c5e/test/f45b4520-de21-11e9-b23c-f1ac9644bb55.jpg"`,
  );
  expect(imageCaptionEl).toBeInTheDocument();
  expect(imageCaptionEl.textContent).toBeTruthy();
  expect(imageCaptionEl.textContent).toMatchInlineSnapshot(
    `"Nkọwa foto Foto nnwale a, BBC nwebisiinka, na-egosi maapụ France. Ihe onyonyo a dị na ngalaba atọ nke mbụ nwere isi okwu a."`,
  );
});
