import React from 'react';
import { string, shape, object, arrayOf } from 'prop-types';
import { Grid, GridItemConstrainedMedium } from '#lib/styledGrid';

const CpsAssetPageMain = () => {
  return (
    <Grid as="main" role="main">
      <GridItemConstrainedMedium>
        <h1> Placeholder content for MAP page skeleton</h1>
      </GridItemConstrainedMedium>
    </Grid>
  );
};

CpsAssetPageMain.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  pageData: shape({
    metadata: shape({
      id: string,
      tags: object,
      type: string,
    }),
    promo: shape({
      id: string,
      type: string,
    }),
    content: shape({
      blocks: arrayOf(
        shape({
          uuid: string,
          id: string,
          text: string,
          type: string,
        }),
      ),
    }),
  }).isRequired,
};

export default CpsAssetPageMain;
