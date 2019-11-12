import React, { useContext } from 'react';
import { bool, shape, number, arrayOf, string } from 'prop-types';
import styled, { css } from 'styled-components';
import Grid from '@bbc/psammead-grid';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';
import SectionLabel from '@bbc/psammead-section-label';
import { StoryPromoUl, StoryPromoLi } from '@bbc/psammead-story-promo-list';
import pathOr from 'ramda/src/pathOr';
import UsefulLinksComponent from './UsefulLinks';
import { ServiceContext } from '#contexts/ServiceContext';
import StoryPromo from '../StoryPromo';
import groupShape from '#models/propTypes/frontPageGroup';
import { storyItem } from '#models/propTypes/storyItem';
import idSanitiser from '#lib/utilities/idSanitiser';

// Apply the right margin-top to the first section of the page when there is one or multiple items.
const FirstSectionTopMargin = styled.div`
  ${({ oneItem }) =>
    oneItem
      ? css`
          @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
            margin-top: ${GEL_SPACING_TRPL};
          }

          @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
            margin-top: ${GEL_SPACING_QUAD};
          }
        `
      : css`
          @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
            margin-top: ${GEL_SPACING};
          }
        `}
`;

// Apply the right margin-top between the section label and the promos
const TopMargin = styled.div`
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_DBL};
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_TRPL};
  }
`;

// eslint-disable-next-line react/prop-types
const MarginWrapper = ({ firstSection, oneItem, children }) => {
  // Conditionally add a `margin-top` to the `children`.
  if (firstSection) {
    return (
      <FirstSectionTopMargin oneItem={oneItem}>
        {children}
      </FirstSectionTopMargin>
    );
  }

  if (oneItem) {
    return <TopMargin>{children}</TopMargin>;
  }

  return children;
};

const StoryPromoComponent = ({ item, topStory, displayImage, isLeading }) => {
  const lazyLoadImage = !topStory; // don't lazy load image if it is a top story

  return (
    <StoryPromo
      item={item}
      topStory={topStory}
      lazyLoadImage={lazyLoadImage}
      displayImage={displayImage}
      isLeading={isLeading}
    />
  );
};

StoryPromoComponent.propTypes = {
  item: shape(storyItem).isRequired,
  topStory: bool.isRequired,
  displayImage: bool,
  isLeading: bool,
};

StoryPromoComponent.defaultProps = {
  displayImage: true,
  isLeading: false,
};

const defaultColumns = {
  group0: 6,
  group1: 6,
  group2: 6,
  group3: 6,
};

const fullWidthStoryPromoColumns = {
  ...defaultColumns,
  group4: 8,
  group5: 8,
};

const normalStoryPromoColumns = {
  ...defaultColumns,
  group4: 2,
  group5: 2,
};

const TopStories = ({ items }) => {
  const itemsToDisplay = items.length - ((items.length - 1) % 4);
  const imageDisplayThreshold = 9;

  return (
    <StoryPromoUl>
      <Grid enableGelGutters columns={fullWidthStoryPromoColumns}>
        {items.slice(0, itemsToDisplay).map((item, index) => (
          <Grid
            item
            columns={
              index === 0 ? fullWidthStoryPromoColumns : normalStoryPromoColumns
            }
            key={item.id}
          >
            <StoryPromoLi>
              <StoryPromoComponent
                item={item}
                topStory={index === 0}
                displayImage={index < imageDisplayThreshold}
              />
            </StoryPromoLi>
          </Grid>
        ))}
      </Grid>
    </StoryPromoUl>
  );
};

TopStories.propTypes = {
  items: arrayOf(shape(storyItem)).isRequired,
};

const SectionStories = ({ items }) => {
  let remainder = items.length % 4;
  let itemsToDisplay = items.length;
  if (remainder > 2) {
    itemsToDisplay = items.length - 1;
    remainder = 2;
  }

  const topColumns = {
    2: { ...defaultColumns, group4: 6, group5: 6 },
    1: fullWidthStoryPromoColumns,
    0: normalStoryPromoColumns,
  };

  return (
    <StoryPromoUl>
      <Grid enableGelGutters columns={fullWidthStoryPromoColumns}>
        {items.slice(0, itemsToDisplay).map((item, index) => (
          <Grid
            item
            columns={
              index === 0 ? topColumns[remainder] : normalStoryPromoColumns
            }
            key={item.id}
          >
            <StoryPromoLi>
              <StoryPromoComponent
                item={item}
                topStory={index === 0 && remainder === 1}
                isLeading={index === 0 && remainder === 2}
              />
            </StoryPromoLi>
          </Grid>
        ))}
      </Grid>
    </StoryPromoUl>
  );
};

SectionStories.propTypes = {
  items: arrayOf(shape(storyItem)).isRequired,
};

const StoryPromoRenderer = ({ items, firstSection, groupType }) => {
  if (items.length === 1) {
    return (
      <MarginWrapper firstSection={firstSection} oneItem>
        <Grid enableGelGutters columns={fullWidthStoryPromoColumns}>
          <Grid item columns={fullWidthStoryPromoColumns}>
            <StoryPromoComponent item={items[0]} topStory />
          </Grid>
        </Grid>
      </MarginWrapper>
    );
  }

  const Components = {
    'top-stories': TopStories,
  };

  let Component;
  if (groupType in Components) {
    Component = Components[groupType];
  } else {
    Component = SectionStories;
  }

  return (
    <MarginWrapper firstSection={firstSection}>
      <Component items={items} />
    </MarginWrapper>
  );
};

StoryPromoRenderer.propTypes = {
  items: arrayOf(shape(storyItem)).isRequired,
  firstSection: bool.isRequired,
  groupType: string.isRequired,
};

const FrontPageSection = ({ bar, group, sectionNumber }) => {
  const { script, service, dir, translations } = useContext(ServiceContext);
  const sectionLabelId = idSanitiser(group.title);

  const strapline = pathOr(null, ['strapline', 'name'], group);
  const isLink = pathOr(null, ['strapline', 'type'], group) === 'LINK';
  const href = pathOr(null, ['strapline', 'links', 'mobile'], group);
  const items = pathOr(null, ['items'], group);
  const seeAll = pathOr(null, ['seeAll'], translations);
  const isFirstSection = sectionNumber === 0;

  // The current implementation of SectionLabel *requires* a strapline to be
  // present in order to render. It is currently *not possible* to render a
  // section that does not have a strapline without breaking both the visual
  // *and especially* the screen reader UX.
  // If this group does not have a strapline; do not render!
  // This may change in the future, if a way to avoid breaking UX is found.
  // Also, don't render a section without any items.
  if (!(strapline && items) || items.length === 0) {
    return null;
  }

  return (
    // jsx-a11y considers `role="region"` on a <section> to be redundant.
    // (<section> tags *should* imply `role="region"`)
    // While this may be true in a perfect world, we set it in order to get
    // the greatest possible support.
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <section role="region" aria-labelledby={sectionLabelId}>
      <SectionLabel
        script={script}
        labelId={sectionLabelId}
        bar={bar}
        visuallyHidden={isFirstSection}
        service={service}
        dir={dir}
        linkText={isLink ? seeAll : null}
        href={href}
      >
        {group.strapline.name}
      </SectionLabel>
      {group.semanticGroupName === 'Useful links' ? (
        <UsefulLinksComponent items={items} script={script} service={service} />
      ) : (
        <StoryPromoRenderer
          items={items}
          firstSection={isFirstSection}
          groupType={group.type}
        />
      )}
    </section>
  );
};

FrontPageSection.defaultProps = {
  bar: true,
};

FrontPageSection.propTypes = {
  bar: bool,
  group: shape(groupShape).isRequired,
  sectionNumber: number.isRequired,
};

export default FrontPageSection;
