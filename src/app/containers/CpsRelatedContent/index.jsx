import React, { useContext } from 'react';
import { arrayOf, shape, number, bool } from 'prop-types';
import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';
import { pathOr } from 'ramda';

import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import StoryPromo from '../StoryPromo';
import Grid from '../../components/Grid';
import CpsOnwardJourney from '../CpsOnwardJourney';

const CpsRelatedContent = ({ content, parentColumns, isMapContent }) => {
  const { dir, translations } = useContext(ServiceContext);

  const title = pathOr('Related Content', ['relatedContent'], translations);

  const singleTransform = promo => (
    <Grid
      columns={{
        group0: 1,
        group1: 1,
        group2: 1,
        group3: 1,
        group4: 2,
        group5: 2,
      }}
      enableGelGutters
      dir={dir}
    >
      <StoryPromo item={promo} dir={dir} />
    </Grid>
  );

  const listTransform = items => (
    <Grid
      columns={{
        group0: 6,
        group1: 6,
        group2: 6,
        group3: 6,
        group4: 8,
        group5: 8,
      }}
      as={StoryPromoUl}
      enableGelGutters
      dir={dir}
    >
      {items.map(item => (
        <Grid
          item
          columns={{
            group0: 6,
            group1: 6,
            group2: 6,
            group3: 6,
            group4: isMapContent ? 8 : 4,
            group5: isMapContent ? 8 : 4,
          }}
          as={StoryPromoLi}
          key={item.id || item.uri}
          dir={dir}
        >
          <StoryPromo
            item={item}
            dir={dir}
            displaySummary={false}
            isSingleColumnLayout={isMapContent}
          />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <CpsOnwardJourney
      labelId="related-content-heading"
      title={title}
      content={content}
      parentColumns={parentColumns}
      singleTransform={singleTransform}
      listTransform={listTransform}
      columnType="secondary"
    />
  );
};

CpsRelatedContent.propTypes = {
  // We Reuse the front page story item blocks
  // Both pages use CPS, so the data schema is the same
  // This can be found under CPS ARES payloads: relatedContent.groups[0].promos
  content: arrayOf(shape(storyItem)),
  parentColumns: shape({
    group0: number,
    group1: number,
    group2: number,
    group3: number,
    group4: number,
    group5: number,
  }),
  isMapContent: bool,
};

CpsRelatedContent.defaultProps = {
  content: [],
  parentColumns: null,
  isMapContent: false,
};

export default CpsRelatedContent;
