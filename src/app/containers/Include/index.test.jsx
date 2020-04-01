import React from 'react';
import { render } from '@testing-library/react';
import IncludeContainer from '.';
import { ToggleContext } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';

const defaultToggleState = {
  include: {
    enabled: true,
  },
};

const toggleStateFalse = {
  include: {
    enabled: true,
  },
};

const fakeMarkup = `&lt;div&gt;Visual Journalism Markup&lt;/div&gt;&lt;script type=&quot;text/javascript&quot; src=&quot;localhost/vj.js&quot;&gt;&lt;/script&gt;`;
// eslint-disable-next-line react/prop-types
const IncludeContainerWithMockContext = ({ toggleState, html, type }) => (
  <RequestContextProvider
    bbcOrigin="https://www.test.bbc.com"
    isAmp={false}
    pageType="STY"
    service="news"
    statusCode={200}
    pathname="/pathname"
  >
    <ToggleContext.Provider value={{ toggleState, toggleDispatch: jest.fn() }}>
      <IncludeContainer html={html} type={type} />
    </ToggleContext.Provider>
  </RequestContextProvider>
);

describe('IncludeContainer', () => {
  it('should render HTML when include toggle is enabled', async () => {
    const { container } = render(
      <IncludeContainerWithMockContext
        toggleState={defaultToggleState}
        html={fakeMarkup}
        type="idt2"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should not render any HTML when html prop is null', async () => {
    const { container } = render(
      <IncludeContainerWithMockContext
        toggleState={defaultToggleState}
        type="idt2"
        html={null}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should not render any HTML for an unsupported include type', async () => {
    const { container } = render(
      <IncludeContainerWithMockContext
        toggleState={defaultToggleState}
        html={fakeMarkup}
        type="idt20"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should not render any HTML when include toggle is disabled', async () => {
    const { container } = render(
      <IncludeContainerWithMockContext
        toggleState={toggleStateFalse}
        html={fakeMarkup}
        type="idt2"
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
