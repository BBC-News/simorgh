export default () => {
  describe('Canonical analytics', () => {
    it('ATI', () => {
      const noscriptImage = document.querySelector('noscript img');

      expect(noscriptImage.tagName).toEqual('IMG');
      expect(noscriptImage.getAttribute('width')).toEqual('1px');
      expect(noscriptImage.getAttribute('height')).toEqual('1px');
      expect(noscriptImage.getAttribute('src')).toMatchSnapshot();
    });
  });
};
