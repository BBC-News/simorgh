/**
 * @service burmese
 * @pathname /burmese/bbc_burmese_radio/liveradio
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
  expect(h1El.textContent).toMatchInlineSnapshot(
    `"ဘီဘီစီ မြန်မာပိုင်း ရေဒီယို"`,
  );
});
it('Summary', () => {
  const summaryEl = document.querySelector('main p');
  expect(summaryEl).toBeInTheDocument();
  expect(summaryEl).toBeTruthy();
  expect(summaryEl.textContent).toMatchInlineSnapshot(
    `"နေ့စဉ် ပြည်တွင်း ပြည်ပ သတင်းနဲ့ သုံးသပ်ချက်များ၊ ပညာရေး၊ ကျန်းမာရေး၊ အားကစား၊ နည်းပညာ အစီအစဉ်များ နဲ့ မျက်မှောက်ရေးရာ ဆွေးနွေးခန်းများ"`,
  );
});
