import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import Grid, { CPSGrid } from '.';

const outerGridProps = {
  columns: {
    group0: 6,
    group1: 6,
    group2: 6,
    group3: 6,
    group4: 6,
    group5: 6,
  },
};

const gridItemProps = {
  item: true,
  columns: {
    group0: 2,
    group1: 2,
    group2: 2,
    group3: 2,
    group4: 2,
    group5: 2,
  },
};

describe('Grid', () => {
  shouldMatchSnapshot(
    'should render Grid with columns',
    <Grid {...outerGridProps}>
      <Grid {...gridItemProps}>
        <p>item spanning 2 out of 6 columns</p>
      </Grid>
    </Grid>,
  );

  shouldMatchSnapshot(
    'should render CPSGrid',
    <CPSGrid>
      <Grid {...gridItemProps}>
        <p>CPS page grid</p>
      </Grid>
    </CPSGrid>,
  );

  shouldMatchSnapshot(
    'should render CPSGrid with additional props',
    <CPSGrid forwardedAs="main" role="main" enableMargins>
      <Grid {...gridItemProps}>
        <p>CPS grid</p>
      </Grid>
    </CPSGrid>,
  );
});
