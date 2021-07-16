import React from 'react';
import { latin } from '@bbc/gel-foundations/scripts';

import { ServiceContext } from '#contexts/ServiceContext';

import CpsTable from '.';
import fixtures from './fixtures';

// eslint-disable-next-line react/prop-types
const Component = ({ fixture }) => (
  <ServiceContext.Provider
    value={{ script: latin, service: 'sport', dir: 'ltr' }}
  >
    <CpsTable supportedServices={['sport']} blocks={fixture} />
  </ServiceContext.Provider>
);

export default {
  Component,
  title: 'Containers/CPS Table',
};

// Storybook's does not have a modern way to programmatically generate stores, so we
// need to make this static rather than looping over the array
// https://github.com/storybookjs/storybook/issues/9828#issuecomment-780969082
const [
  defaultTableFixture,
  tableWithEmptyCell,
  tableWithMultipleLinesOfText,
] = fixtures;

export const Table = () => <Component fixture={defaultTableFixture} />;
export const TableWithEmptyCell = () => (
  <Component fixture={tableWithEmptyCell} />
);
export const TableWithMultipleLinesOfText = () => (
  <Component fixture={tableWithMultipleLinesOfText} />
);
