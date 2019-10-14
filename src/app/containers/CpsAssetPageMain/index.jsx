import React from 'react';
import { string, shape, object, arrayOf } from 'prop-types';
import path from 'ramda/src/path';

import { Grid, GridItemConstrainedMedium } from '#lib/styledGrid';
import MetadataContainer from '../Metadata';
import LinkedData from '../LinkedData';
import ATIAnalytics from '../ATIAnalytics';

const CpsAssetPageMain = ({ pageData }) => {
  const title = path(['promo', 'headlines', 'headline'], pageData);
  const summary = path(['promo', 'summary'], pageData);
  const metadata = path(['metadata'], pageData);

  return (
    <>
      <MetadataContainer
        title={title}
        lang={metadata.language}
        description={summary}
        openGraphType="website"
      />
      <LinkedData type="Article" seoTitle={title} />
      <ATIAnalytics data={pageData} />
      <Grid as="main" role="main">
        <GridItemConstrainedMedium>
          <h1> Placeholder content for MAP page skeleton</h1>
        </GridItemConstrainedMedium>
      </Grid>
    </>
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
