export default () => {
  describe('Footer', () => {
    it('I can see the footer copyright and external linking text', () => {
      const footerCopyrightEl = document.querySelector('footer div p');
      expect(footerCopyrightEl).toBeInTheDocument();
      expect(footerCopyrightEl.textContent).toBeTruthy();
      expect(footerCopyrightEl.textContent).toMatchSnapshot();
    });

    it('I can see the BBC branding', () => {
      const brandingEl = document.querySelector('footer svg');

      expect(brandingEl).toBeInTheDocument();
    });

    it('I can click on the BBC branding and it would take me to the homepage', () => {
      const brandingEl = document.querySelector('footer svg');
      const brandingLinkEl = brandingEl.parentNode;
      const brandingImageEl = brandingLinkEl.querySelector('svg');

      expect(brandingLinkEl.tagName).toEqual('A');
      expect(brandingLinkEl.getAttribute('href')).toMatchSnapshot();
      expect(brandingImageEl).toBeInTheDocument();
    });

    const footerLinks = document.querySelectorAll('footer a');
    footerLinks.forEach(link => {
      it(`I can see a link: ${link.textContent}`, () => {
        expect(link).toBeInTheDocument();
        expect(link.textContent).toBeTruthy();
        expect(link.getAttribute('href')).toMatchSnapshot();
      });
    });
  });
};
