import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
} from '../../common';
import runCrossPlatformTests from './crossPlatformTests';

export default service => {
  runCrossPlatformTests(service);
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();

  describe('Lead image', () => {
    it('I can see an image with a caption', () => {
      // This selects either a img tag or a noscript tag in the case of a
      // lazy loaded image
      const imageEl = document.querySelector(
        'main figure img, main figure noscript',
      );
      expect(imageEl).toBeInTheDocument();

      const imageCaptionEl = document.querySelector('main figure figcaption');
      expect(imageCaptionEl).toBeInTheDocument();
      expect(imageCaptionEl.innerText).toBeTruthy();
      expect(imageCaptionEl.innerText).toMatchSnapshot();
    });
  });
};
