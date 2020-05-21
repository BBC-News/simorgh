import React, { useContext } from 'react';
import { arrayOf, shape, number } from 'prop-types';
import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';

import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import StoryPromo from '../StoryPromo';
import CpsOnwardJourney from '../CpsOnwardJourney';

const TopStories = ({ content, parentColumns }) => {
  const { dir } = useContext(ServiceContext);

  const singleTransform = promo => (
    <StoryPromo item={promo} dir={dir} displayImage={false} />
  );

  const listTransform = items => (
    <StoryPromoUl>
      {items.map(item => (
        <StoryPromoLi key={item.id || item.uri}>
          {singleTransform(item)}
        </StoryPromoLi>
      ))}
    </StoryPromoUl>
  );

  return (
    <CpsOnwardJourney
      labelId="top-stories-heading"
      title="Top Stories"
      content={content}
      parentColumns={parentColumns}
      singleTransform={singleTransform}
      listTransform={listTransform}
    />
  );
};

TopStories.propTypes = {
  content: arrayOf(shape(storyItem)),
  parentColumns: shape({
    group0: number,
    group1: number,
    group2: number,
    group3: number,
    group4: number,
    group5: number,
  }),
};

TopStories.defaultProps = {
  content: [],
  parentColumns: null,
};

export default TopStories;
