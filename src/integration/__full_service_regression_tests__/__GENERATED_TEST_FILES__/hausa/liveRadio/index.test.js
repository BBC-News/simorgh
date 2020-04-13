/**
 * @service hausa
 * @pathname /hausa/bbc_hausa_radio/liveradio
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
it('Headline', () => {
  const h1El = document.querySelector('h1');
  expect(h1El).toBeInTheDocument();
  expect(h1El).toBeTruthy();
  expect(h1El.textContent).toMatchInlineSnapshot(`"BBC Hausa Rediyo"`);
});
it('Summary', () => {
  const summaryEl = document.querySelector('main p');
  expect(summaryEl).toBeInTheDocument();
  expect(summaryEl).toBeTruthy();
  expect(summaryEl.textContent).toMatchInlineSnapshot(
    `"Labaran duniya da sharhi da kuma bayanai kan al'amuran yau da kullum daga sashin Hausa na BBC."`,
  );
});
