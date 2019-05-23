import React from 'react';
import FrontPageMain from '.';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';
import frontPageDataPidgin from '../../../../data/prod/pidgin/frontpage';

describe('FrontPageMain', () => {
  shouldShallowMatchSnapshot(
    'should render a pidgin article correctly',
    <FrontPageMain service="pidgin" frontPageData={frontPageDataPidgin} />,
  );
});
