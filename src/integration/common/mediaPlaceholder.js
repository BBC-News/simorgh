export default () => {
  describe('Media Placeholder', () => {
    it('I can see the placeholder loading image', () => {
      const loadingImageWrapper = document.querySelector(
        "div[class*='LoadingImageWrapper']",
      );
      expect(loadingImageWrapper).toBeInTheDocument();
    });

    it('outer iframe has z-index of 1', () => {
      const iframe = document.querySelector('iframe');
      expect(iframe).toBeInTheDocument();
      expect(
        window.getComputedStyle(iframe).getPropertyValue('z-index'),
      ).toEqual('1');
    });
  });
};
