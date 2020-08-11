import React from 'react';
import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';
import { arrayOf, shape, bool, string, number } from 'prop-types';
import StoryPromo from '#containers/StoryPromo';
import { storyItem } from '#models/propTypes/storyItem';
import Grid from '../Grid';

export const SinglePromoItem = ({
  promo,
  displayImage,
  displaySummary,
  dir,
}) => {
  return (
    <StoryPromo
      item={promo}
      dir={dir}
      displayImage={displayImage}
      displaySummary={displaySummary}
    />
  );
};

// related content grid: (different to recommendations - TODO pass down)
export const SinglePromoItemGrid = (props, { dir }) => (
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
    {SinglePromoItem(props)}
  </Grid>
);

export const MultiplePromoItems = ({
  content,
  dir,
  displayImage,
  displaySummary,
}) => {
  return (
    <StoryPromoUl>
      {content.map(item => (
        <StoryPromoLi key={item.id || item.uri}>
          {SinglePromoItem({
            promo: item,
            dir,
            displayImage,
            displaySummary,
          })}
        </StoryPromoLi>
      ))}
    </StoryPromoUl>
  );
};

export const MultiplePromoItemsGrid = ({
  dir,
  content,
  storyPromoLiGridColumns,
  storyPromoUlGridColumns,
}) => {
  return (
    <Grid
      columns={storyPromoUlGridColumns}
      as={StoryPromoUl}
      enableGelGutters
      dir={dir}
    >
      {content.map(item => (
        <Grid
          item
          columns={storyPromoLiGridColumns}
          as={StoryPromoLi}
          key={item.id || item.uri}
          dir={dir}
        >
          <StoryPromo item={item} dir={dir} displaySummary={false} />
        </Grid>
      ))}
    </Grid>
  );
};

SinglePromoItem.propTypes = {
  dir: string,
  promo: shape({ storyItem }).isRequired,
  displayImage: bool,
  displaySummary: bool,
};

MultiplePromoItems.propTypes = {
  content: arrayOf(shape(storyItem)).isRequired,
  dir: string.isRequired,
  displayImage: bool,
  displaySummary: bool,
};

MultiplePromoItemsGrid.propTypes = {
  dir: string,
  content: arrayOf(shape(storyItem)).isRequired,
  storyPromoLiGridColumns: shape({
    group0: number,
    group1: number,
    group2: number,
    group3: number,
    group4: number,
    group5: number,
  }).isRequired,
  storyPromoUlGridColumns: shape({
    group0: number,
    group1: number,
    group2: number,
    group3: number,
    group4: number,
    group5: number,
  }).isRequired,
};

MultiplePromoItems.defaultProps = {
  displayImage: true,
  displaySummary: true,
};

MultiplePromoItemsGrid.defaultProps = {
  dir: 'ltr',
};

SinglePromoItem.defaultProps = {
  dir: string,
  displayImage: true,
  displaySummary: true,
};
