/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/dom';
import useClickTracker from '.';
import pidginData from './fixtureData/tori-51745682.json';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';

const { location } = window;

beforeEach(() => {
  jest.clearAllMocks();
  delete window.location;
  window.location = {
    href: 'http://bbc.com/pidgin/tori-51745682',
    assign: jest.fn(),
  };
  console.error = jest.fn();
});

afterEach(() => {
  window.location = location;
});

const urlToObject = url => {
  const { origin, pathname, searchParams } = new URL(url);

  return {
    origin,
    pathname,
    searchParams: Object.fromEntries(searchParams),
  };
};

process.env.SIMORGH_ATI_BASE_URL = 'https://logws1363.ati-host.net?';

const defaultProps = {
  pageData: pidginData,
  componentName: 'brand',
  campaignName: 'cps_wsoj',
  format: 'CHD=promo::2',
};

const WithContexts = ({
  children,
  service = 'pidgin',
  pathname = '/pidgin/tori-51745682',
}) => (
  <RequestContextProvider
    bbcOrigin="https://www.test.bbc.com"
    pageType={STORY_PAGE}
    isAmp={false}
    pathname={pathname}
    service={service}
  >
    <ServiceContextProvider service={service}>
      {children}
    </ServiceContextProvider>
  </RequestContextProvider>
);

const TestComponentContainerContainer = () => {
  const clickRef = useClickTracker({
    pageData: pidginData,
    componentName: 'header',
    campaignName: 'cps_wsoj',
    format: 'CHD=promo::1',
  });

  return (
    <div ref={clickRef}>
      <TestComponentContainer hookProps={defaultProps} />
    </div>
  );
};

const TestComponentContainer = ({ hookProps }) => {
  const clickRef = useClickTracker(hookProps);
  return (
    <div>
      <TestComponent ref={clickRef} />
    </div>
  );
};

const TestComponent = React.forwardRef((_, ref) => {
  return (
    <div data-testid="test-component" ref={ref}>
      <a href="https://bbc.com/pidgin">Link</a>
      <button type="button">Button</button>
    </div>
  );
});

// eslint-disable-next-line react/prop-types
const wrapper = ({ children }) => <WithContexts>{children}</WithContexts>;

describe('Click tracking', () => {
  it('should return a ref', () => {
    const { result } = renderHook(() => useClickTracker(defaultProps), {
      wrapper,
    });

    const { getByTestId } = render(
      <WithContexts>
        <TestComponent ref={result.current} />
      </WithContexts>,
    );

    expect(result.current.current).toBe(getByTestId('test-component'));
  });

  it('should send a single tracking request on click', async () => {
    const spyFetch = jest.spyOn(global, 'fetch');
    const { getByTestId } = render(
      <WithContexts>
        <TestComponentContainer hookProps={defaultProps} />
      </WithContexts>,
    );

    expect(spyFetch).toHaveBeenCalledTimes(0);

    act(() => userEvent.click(getByTestId('test-component')));

    expect(spyFetch).toHaveBeenCalledTimes(1);

    act(() => userEvent.click(getByTestId('test-component')));

    expect(spyFetch).toHaveBeenCalledTimes(1);

    const [[viewEventUrl]] = spyFetch.mock.calls;

    expect(urlToObject(viewEventUrl)).toEqual({
      origin: 'https://logws1363.ati-host.net',
      pathname: '/',
      searchParams: {
        atc:
          'PUB-[cps_wsoj]-[brand]-[]-[CHD=promo::2]-[news::pidgin.news.story.51745682.page]-[]-[]-[http://bbc.com/pidgin/tori-51745682]',
        hl: expect.stringMatching(/^.+?x.+?x.+?$/),
        idclient: expect.stringMatching(/^.+?-.+?-.+?-.+?$/),
        lng: 'en-US',
        p: 'news::pidgin.news.story.51745682.page',
        r: '0x0x24x24',
        re: '1024x768',
        s: '598343',
        s2: '70',
        type: 'AT',
      },
    });
  });

  it('should send tracking request on click of child element (button)', async () => {
    const { getByText } = render(
      <WithContexts>
        <TestComponentContainer hookProps={defaultProps} />
      </WithContexts>,
    );

    act(() => userEvent.click(getByText('Button')));

    const [[viewEventUrl]] = global.fetch.mock.calls;

    expect(urlToObject(viewEventUrl)).toEqual({
      origin: 'https://logws1363.ati-host.net',
      pathname: '/',
      searchParams: {
        atc:
          'PUB-[cps_wsoj]-[brand]-[]-[CHD=promo::2]-[news::pidgin.news.story.51745682.page]-[]-[]-[http://bbc.com/pidgin/tori-51745682]',
        hl: expect.stringMatching(/^.+?x.+?x.+?$/),
        idclient: expect.stringMatching(/^.+?-.+?-.+?-.+?$/),
        lng: 'en-US',
        p: 'news::pidgin.news.story.51745682.page',
        r: '0x0x24x24',
        re: '1024x768',
        s: '598343',
        s2: '70',
        type: 'AT',
      },
    });

    jest.restoreAllMocks();
  });

  it('should only track clicks on the child component if clicks are tracked on both a parent and child', async () => {
    const { getByText } = render(
      <WithContexts>
        <TestComponentContainerContainer />
      </WithContexts>,
    );

    act(() => userEvent.click(getByText('Button')));

    expect(global.fetch).toHaveBeenCalledTimes(1);

    const [[viewEventUrl]] = global.fetch.mock.calls;

    expect(urlToObject(viewEventUrl)).toEqual({
      origin: 'https://logws1363.ati-host.net',
      pathname: '/',
      searchParams: {
        atc:
          'PUB-[cps_wsoj]-[brand]-[]-[CHD=promo::2]-[news::pidgin.news.story.51745682.page]-[]-[]-[http://bbc.com/pidgin/tori-51745682]',
        hl: expect.stringMatching(/^.+?x.+?x.+?$/),
        idclient: expect.stringMatching(/^.+?-.+?-.+?-.+?$/),
        lng: 'en-US',
        p: 'news::pidgin.news.story.51745682.page',
        r: '0x0x24x24',
        re: '1024x768',
        s: '598343',
        s2: '70',
        type: 'AT',
      },
    });

    jest.restoreAllMocks();
  });

  it('should allow the user to navigate after clicking on a tracked link even if the tracking request fails', async () => {
    const url = 'https://bbc.com/pidgin';

    global.fetch = jest.fn(() => {
      throw new Error('Failed to fetch');
    });

    const { getByText } = render(
      <WithContexts>
        <TestComponentContainer hookProps={{ ...defaultProps, href: url }} />
      </WithContexts>,
    );

    act(() => userEvent.click(getByText('Link')));

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toThrow('Failed to fetch');

    await waitFor(() => {
      expect(window.location.assign).toHaveBeenCalledTimes(1);
      expect(window.location.assign).toHaveBeenCalledWith(url);
    });
  });

  it('should not send tracking request on right click', () => {
    const { getByText } = render(
      <WithContexts>
        <TestComponentContainer hookProps={defaultProps} />
      </WithContexts>,
    );

    act(() => fireEvent.contextMenu(getByText('Button')));

    expect(global.fetch).toHaveBeenCalledTimes(0);
  });
});

describe('Error handling', () => {
  it('should not throw error and not send event to ATI when no tracking data passed into hook', async () => {
    const trackingData = undefined;

    const { container, getByText } = render(
      <WithContexts>
        <TestComponentContainer hookProps={trackingData} />
      </WithContexts>,
    );

    act(() => userEvent.click(getByText('Button')));

    expect(container.error).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      expect.stringMatching(
        'ATI Event Tracking Error: Could not parse tracking values from page data:',
      ),
    );
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should not throw error and not send event to ATI when no pageData passed into hook', async () => {
    const { container, getByText } = render(
      <WithContexts>
        <TestComponentContainer hookProps={{ ...defaultProps, pageData: {} }} />
      </WithContexts>,
    );

    act(() => userEvent.click(getByText('Button')));

    expect(container.error).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      expect.stringMatching(
        'ATI Event Tracking Error: Could not parse tracking values from page data:',
      ),
    );
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should not throw error and not send event to ATI when unexpected data passed into hook', async () => {
    const trackingData = {
      foo: 'bar',
    };

    const { container, getByText } = render(
      <WithContexts>
        <TestComponentContainer hookProps={trackingData} />
      </WithContexts>,
    );

    act(() => userEvent.click(getByText('Button')));

    expect(container.error).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      expect.stringMatching(
        'ATI Event Tracking Error: Could not parse tracking values from page data:',
      ),
    );
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should not throw error and not send event to ATI when unexpected data type passed into hook', async () => {
    const trackingData = ['unexpected data type'];

    const { container, getByText } = render(
      <WithContexts>
        <TestComponentContainer hookProps={trackingData} />
      </WithContexts>,
    );

    act(() => userEvent.click(getByText('Button')));

    expect(container.error).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      expect.stringMatching(
        'ATI Event Tracking Error: Could not parse tracking values from page data:',
      ),
    );
    expect(global.fetch).not.toHaveBeenCalled();
  });
});