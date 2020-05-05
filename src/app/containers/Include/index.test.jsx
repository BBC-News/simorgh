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

const fakeMarkup = `<div>Visual Journalism Markup</div><script type="text/javascript" src="localhost/vj.js"></script>`;
/* eslint-disable react/prop-types */
const IncludeContainerWithMockContext = ({
  toggleState,
  html,
  type,
  isAmp,
}) => (
  <RequestContextProvider
    bbcOrigin="https://www.test.bbc.com"
    isAmp={isAmp || false}
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

  it('should not render any HTML when its an amp page', async () => {
    const { container } = render(
      <IncludeContainerWithMockContext
        toggleState={toggleStateFalse}
        html={fakeMarkup}
        type="idt2"
        isAmp
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
