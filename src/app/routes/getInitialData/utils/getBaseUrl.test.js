import getBaseUrl from './getBaseUrl';

describe('Client', () => {
  const logicMap = [
    ['https://www.bbc.com', 'https://www.bbc.com'],
    ['https://www.bbc.co.uk', 'https://www.bbc.co.uk'],
    ['https://simorgh.api.bbci.co.uk', 'https://www.bbc.co.uk'],
    [
      'https://my-routing-layer.cookieless-domain.co.uk/',
      'https://www.bbc.co.uk',
    ],
    ['https://www.stage.bbc.com', 'https://www.stage.bbc.com'],
    ['https://www.stage.bbc.co.uk', 'https://www.stage.bbc.co.uk'],
    ['https://www.test.bbc.com', 'https://www.test.bbc.com'],
    ['https://www.test.bbc.co.uk', 'https://www.test.bbc.co.uk'],
    ['https://simorgh.test.api.bbci.co.uk', 'https://www.test.bbc.co.uk'],
    [
      'https://my-routing-layer.test.cookieless-domain.co.uk/',
      'https://www.test.bbc.co.uk',
    ],
    ['http://localhost.bbc.com:7080', 'http://localhost.bbc.com:7080'],
    ['https://foobar.org', 'https://www.bbc.com'],
    ['http://foobar.org', 'https://www.bbc.com'],
    ['foobar.org', 'https://www.bbc.com'],
  ];

  logicMap.forEach(([location, expectedOutput]) => {
    it(`should should return correct basepath for ${location}`, () => {
      expect(getBaseUrl(location)).toEqual(expectedOutput);
    });
  });
});
