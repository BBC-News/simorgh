import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { shouldShallowMatchSnapshot } from '@bbc/psammead-test-helpers';
import FrontPageMain from '.';
import frontPageDataPidgin from '../../../../data/pidgin/frontpage';
import igboConfig from '../../lib/config/services/igbo';
import preprocessor from '../../lib/utilities/preprocessor';
import filterUnknownCpsTypes from '../../lib/utilities/preprocessor/rules/cpstypes';
import { RequestContext } from '../../contexts/RequestContext';
import { ServiceContext } from '../../contexts/ServiceContext';

const processedPidgin = preprocessor(frontPageDataPidgin, [
  filterUnknownCpsTypes,
]);

jest.mock('../ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

const requestContextData = {
  pageType: 'frontPage',
};

const FrontPageMainWithContext = props => (
  <RequestContext.Provider value={requestContextData}>
    <ServiceContext.Provider value={igboConfig}>
      <FrontPageMain {...props} />
    </ServiceContext.Provider>
  </RequestContext.Provider>
);

describe('FrontPageMain', () => {
  describe('snapshots', () => {
    shouldShallowMatchSnapshot(
      'should render a pidgin frontpage correctly',
      <FrontPageMainWithContext frontPageData={processedPidgin} />,
    );
  });

  describe('assertions', () => {
    afterEach(cleanup);

    it('should render visually hidden text as h1', () => {
      const { container } = render(
        <FrontPageMainWithContext frontPageData={processedPidgin} />,
      );
      const h1 = container.querySelector('h1');
      const content = h1.getAttribute('id');
      const tabIndex = h1.getAttribute('tabIndex');

      expect(content).toEqual('content');
      expect(tabIndex).toBe('-1');

      const span = h1.querySelector('span');
      expect(span.getAttribute('role')).toEqual('text');
      expect(span.textContent).toEqual('BBC News, Ìgbò - Akụkọ');

      const langSpan = span.querySelector('span');
      expect(langSpan.getAttribute('lang')).toEqual('en-GB');
      expect(langSpan.textContent).toEqual('BBC News');
    });

    it('should render front page sections', () => {
      const { container } = render(
        <FrontPageMainWithContext frontPageData={processedPidgin} />,
      );
      const sections = container.querySelectorAll('section');

      expect(sections).toHaveLength(6);
      sections.forEach(section => {
        expect(section.getAttribute('role')).toEqual('region');
      });
    });
  });
});
