import Cookie from 'js-cookie';
import onClient from '../../../helpers/onClient';
import {
  setWindowValue,
  resetWindowValue,
} from '../../../helpers/tests/setWindowValue';

let isOnClient = true;

jest.mock('../../../helpers/onClient', () => jest.fn());
onClient.mockImplementation(() => isOnClient);

const {
  getDestination,
  getScreenInfo,
  getBrowserViewPort,
  getCurrentTime,
  getDeviceLanguage,
  getAppType,
  getHref,
  getReferrer,
} = require('./index');

let locServeCookieValue;

const returnsNullWhenOffClient = func => {
  describe('returns null when not on client', () => {
    beforeEach(() => {
      isOnClient = false;
    });

    afterEach(() => {
      isOnClient = true;
    });

    it('should find value in good data', () => {
      expect(func()).toEqual(null);
    });
  });
};

describe('getDestination', () => {
  const getDestinationTestScenarios = [
    {
      isUK: true,
      env: 'live',
      expected: 598285,
      summary: 'should return for live uk',
    },
    {
      isUK: false,
      env: 'live',
      expected: 598287,
      summary: 'should return for live international',
    },
    {
      isUK: true,
      env: 'test',
      expected: 598286,
      summary: 'should return for test uk',
    },
    {
      isUK: false,
      env: 'test',
      expected: 598288,
      summary: 'should return for test international',
    },
    {
      isUK: true,
      env: 'foobar',
      expected: 598286,
      summary: 'should return for test uk when env unknown',
    },
    {
      isUK: true,
      env: null,
      expected: 598285,
      summary: 'should return for test uk when env null',
    },
    {
      isUK: true,
      env: undefined,
      expected: 598285,
      summary: 'should return for test uk when env undefined',
    },
    {
      isUK: null,
      env: 'live',
      expected: 598285,
      summary: 'should return for live uk when isUK is null',
    },
    {
      isUK: undefined,
      env: 'live',
      expected: 598285,
      summary: 'should return for live uk when isUK is undefined',
    },
  ];

  getDestinationTestScenarios.forEach(({ isUK, env, expected, summary }) => {
    it(summary, () => {
      const destination = getDestination(isUK, env);
      expect(destination).toEqual(expected);
    });
  });
});

describe('getAppType', () => {
  const getAppTypeScenarios = [
    {
      platform: 'amp',
      expected: 'amp',
      summary: 'should return amp for amp',
    },
    {
      platform: 'canonical',
      expected: 'responsive',
      summary: 'should return responsive for amp',
    },
    {
      platform: null,
      expected: 'responsive',
      summary: 'should return responsive for null',
    },
    {
      platform: undefined,
      expected: 'responsive',
      summary: 'should return responsive for undefined',
    },
  ];

  getAppTypeScenarios.forEach(({ platform, expected, summary }) => {
    it(summary, () => {
      const appType = getAppType(platform);
      expect(appType).toEqual(expected);
    });
  });
});

describe('getScreenInfo', () => {
  const windowScreen = window.screen;

  afterEach(() => {
    resetWindowValue('screen', windowScreen);
  });

  returnsNullWhenOffClient(getScreenInfo);

  it('should concat screen values, joined by "x"', () => {
    setWindowValue('screen', {
      width: 1,
      height: 2,
      colorDepth: 3,
      pixelDepth: 4,
    });

    const screenInfo = getScreenInfo();

    expect(screenInfo).toEqual('1x2x3x4');
  });

  it('should use 0 to fill unknown values', () => {
    setWindowValue('screen', {
      width: 1,
      height: 2,
      colorDepth: null,
      pixelDepth: null,
    });

    const screenInfo = getScreenInfo();

    expect(screenInfo).toEqual('1x2x0x0');
  });
});

describe('getBrowserViewPort', () => {
  const windowInnerWidth = window.innerWidth;
  const windowInnerHeight = window.innerHeight;

  afterEach(() => {
    resetWindowValue('innerWidth', windowInnerWidth);
    resetWindowValue('innerHeight', windowInnerHeight);
  });

  returnsNullWhenOffClient(getBrowserViewPort);

  it('should concat values, joined by "x"', () => {
    setWindowValue('innerWidth', 1234);
    setWindowValue('innerHeight', 4321);

    const browserViewPort = getBrowserViewPort();

    expect(browserViewPort).toEqual('1234x4321');
  });

  it('should use 0 to fill unknown values', () => {
    setWindowValue('innerWidth', null);
    setWindowValue('innerHeight', 4321);

    const browserViewPort = getBrowserViewPort();

    expect(browserViewPort).toEqual('0x4321');
  });
});

describe('getCurrentTime', () => {
  const originalDate = global.Date;

  afterEach(() => {
    global.Date = originalDate;
  });

  returnsNullWhenOffClient(getCurrentTime);

  it('should return hours, mins and seconds joined by "x"', () => {
    const mockDate = {
      getHours: jest.fn().mockReturnValue('12'),
      getMinutes: jest.fn().mockReturnValue('23'),
      getSeconds: jest.fn().mockReturnValue('45'),
    };
    global.Date = jest.fn(() => mockDate);

    const ATITime = getCurrentTime();

    expect(ATITime).toEqual('12x23x45');
  });
});

describe('getDeviceLanguage', () => {
  const windowNavigator = window.navigator;

  afterEach(() => {
    resetWindowValue('navigator', windowNavigator);
  });

  returnsNullWhenOffClient(getDeviceLanguage);

  it('should return navigator language', () => {
    setWindowValue('navigator', {
      language: 'abc',
    });

    const deviceLanguage = getDeviceLanguage();

    expect(deviceLanguage).toEqual('abc');
  });

  it('should return null if langage isnt set', () => {
    setWindowValue('navigator', {
      language: null,
    });

    const deviceLanguage = getDeviceLanguage();

    expect(deviceLanguage).toEqual(null);
  });
});

describe('getLocServeCookie', () => {
  beforeEach(() => {
    jest.mock('js-cookie', () => jest.fn());
    Cookie.get = jest.fn();
    Cookie.get.mockImplementation(() => locServeCookieValue);
  });

  // eslint-disable-next-line global-require
  returnsNullWhenOffClient(require('./index').getLocServeCookie);

  it('should return true if cookie is set', () => {
    const { getLocServeCookie } = require('./index'); // eslint-disable-line global-require

    locServeCookieValue = 'value';

    const locServeCookie = getLocServeCookie();

    expect(locServeCookie).toEqual(true);
  });

  it('should return false if cookie is not set', () => {
    const { getLocServeCookie } = require('./index'); // eslint-disable-line global-require

    locServeCookieValue = null;

    const locServeCookie = getLocServeCookie();

    expect(locServeCookie).toEqual(false);
  });
});

describe('getHref', () => {
  const windowLocation = window.location;

  afterEach(() => {
    resetWindowValue('location', windowLocation);
  });

  returnsNullWhenOffClient(getHref);

  it('should return location href', () => {
    setWindowValue('location', {
      href: 'https://href.com',
    });

    const href = getHref();

    expect(href).toEqual('https://href.com');
  });

  it('should return null if href isnt set', () => {
    setWindowValue('location', {
      href: null,
    });

    const href = getHref();

    expect(href).toEqual(null);
  });
});

describe('getReferrer', () => {
  returnsNullWhenOffClient(getHref);

  it('should return document referrer', () => {
    Object.defineProperty(window.document, 'referrer', {
      configurable: true,
      value: 'https://referrer.com',
    });

    const referrer = getReferrer();

    expect(referrer).toEqual('https://referrer.com');
  });

  it('should return null if referrer isnt set', () => {
    Object.defineProperty(window.document, 'referrer', {
      configurable: true,
      value: null,
    });

    const referrer = getReferrer();

    expect(referrer).toEqual(null);
  });
});
