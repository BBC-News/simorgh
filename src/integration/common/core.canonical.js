export default () => {
  it('Bundle scripts', () => {
    const bundleScriptMatcher = new RegExp(
      `(\\/static\\/js\\/(main|vendor|${global.service})-\\w+\\.\\w+\\.js)`,
      'g',
    );
    const bbcOriginScripts = Array.from(
      document.querySelectorAll('script[src]'),
    ).filter(script =>
      script.getAttribute('src').startsWith('http://localhost:7080'),
    );

    bbcOriginScripts.forEach(bbcOriginScript => {
      expect(bbcOriginScript.getAttribute('src')).toMatch(bundleScriptMatcher);
    });
  });

  it('Service bundle is loaded', () => {
    const bundleScriptMatcher = new RegExp(
      `(\\/static\\/js\\/(${global.service})-\\w+\\.\\w+\\.js)`,
      'g',
    );
    const bbcOriginScripts = Array.from(
      document.querySelectorAll('script[src]'),
    ).filter(script =>
      script.getAttribute('src').startsWith('http://localhost:7080'),
    );
    const serviceScripts = bbcOriginScripts.filter(script =>
      bundleScriptMatcher.test(script.getAttribute('src')),
    );

    expect(serviceScripts.length).toBe(1);
  });

  it('AMP attribute is not set', () => {
    const htmlEl = document.querySelector('html');

    expect(htmlEl.getAttribute('amp')).toBeNull();
  });
};
