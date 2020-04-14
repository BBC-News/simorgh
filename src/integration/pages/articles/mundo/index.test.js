/**
 * @service mundo
 * @pathname /mundo/articles/ce42wzqr2mko
 */

import runA11yTests from '../../../common/a11y';
import runHeaderTests from '../../../common/header';
import runFootertests from '../../../common/footer';
import runSEOtests from '../../../common/SEO';
import runPerformanceTests from '../../../common/performance';

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
    `"https://ichef.bbci.co.uk/news/640/cpsdevpb/ee58/test/4a2f4c00-e695-11e9-88d6-81aa2ccc6d4c.jpg"`,
  );

  expect(imageCaptionEl).toBeInTheDocument();
  expect(imageCaptionEl.textContent).toBeTruthy();
  expect(imageCaptionEl.textContent).toMatchInlineSnapshot(
    `"Pie de foto, Esta imagen de prueba, copyright BBC, muestra un mapa de Francia. La imagen está en los primeros tres bloques y tiene este título."`,
  );
});
