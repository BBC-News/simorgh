import React from 'react';
import { string, shape, object, arrayOf } from 'prop-types';
import path from 'ramda/src/path';
import Grid, { GelPageGrid } from '#app/components/Grid';
import ATIAnalytics from '../ATIAnalytics';
import MetadataContainer from '../Metadata';
import LinkedData from '../LinkedData';
import RadioPageBlocks from '../RadioPageBlocks';

const RadioPageMain = ({ pageData }) => {
  const blocks = path(['content', 'blocks'], pageData);
  const promo = path(['promo'], pageData);
  const metadata = path(['metadata'], pageData);

  return (
    <>
      <ATIAnalytics data={pageData} />
      <MetadataContainer
        title={promo.name}
        lang={metadata.language}
        description={promo.summary}
        openGraphType="website"
      />
      <LinkedData type="RadioChannel" seoTitle={promo.name} />

      <GelPageGrid
        forwardedAs="main"
        role="main"
        columns={{
          group0: 6,
          group1: 6,
          group2: 6,
          group3: 6,
          group4: 8,
          group5: 20,
        }}
        enableGelGutters
        enableGelMargins
      >
        <Grid
          item
          startOffset={{
            group0: 1,
            group1: 1,
            group2: 1,
            group3: 1,
            group4: 2,
            group5: 5,
          }}
          columns={{
            group0: 6,
            group1: 6,
            group2: 6,
            group3: 6,
            group4: 6,
            group5: 12,
          }}
        >
          <RadioPageBlocks blocks={blocks} />
        </Grid>
      </GelPageGrid>
    </>
  );
};

RadioPageMain.propTypes = {
  pageData: shape({
    metadata: shape({
      id: string,
      tags: object,
    }),
    promo: shape({
      subtype: string,
      name: string,
    }),
    content: shape({
      blocks: arrayOf(
        shape({
          uuid: string,
          id: string,
          externalId: string,
          text: string,
          type: string,
        }),
      ),
    }),
  }).isRequired,
};

export default RadioPageMain;
