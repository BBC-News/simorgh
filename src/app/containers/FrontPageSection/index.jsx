import React, { useContext } from 'react';
import { bool, shape, number } from 'prop-types';
import styled from 'styled-components';
import { GEL_GROUP_CD_MIN_WIDTH } from '@bbc/gel-foundations/breakpoints';
import { GEL_SPACING } from '@bbc/gel-foundations/spacings';
import SectionLabel from '@bbc/psammead-section-label';
import { StoryPromoUl, StoryPromoLi } from '@bbc/psammead-story-promo-list';
import pathOr from 'ramda/src/pathOr';
import { ServiceContext } from '#contexts/ServiceContext';
import StoryPromo from '../StoryPromo';
import groupShape from '#models/propTypes/frontPageGroup';
import { storyItem } from '#models/propTypes/storyItem';
import idSanitiser from '#lib/utilities/idSanitiser';

const TopMargin = styled.div`
  margin-top: ${GEL_SPACING};
`;

// TODO this is a bodge until desktop width top stories get merged.
//  At that point, delete TopMarginSixHundred.
const TopMarginSixHundred = styled.div`
  @media (min-width: ${GEL_GROUP_CD_MIN_WIDTH}rem) {
    margin-top: ${GEL_SPACING};
  }
`;

// eslint-disable-next-line react/prop-types
const MarginWrapper = ({ addMargin, as, children }) => {
  // Conditionally add a `margin-top` to the `children`, mixing in
  // `as` if present.
  if (addMargin) {
    return <TopMargin as={as}>{children}</TopMargin>;
  }
  if (as) {
    // TODO this is a bodge until desktop width top stories get merged.
    //  At that point, delete the below return statement and uncomment the following.

    // const AsComponent = as;
    // return <AsComponent>{children}</AsComponent>;
    return <TopMarginSixHundred as={as}>{children}</TopMarginSixHundred>;
  }
  // TODO this is a bodge until desktop width top stories get merged.
  //  At that point, delete the below return statement and uncomment the following.

  // return children;
  return <TopMarginSixHundred>{children}</TopMarginSixHundred>;
};

const StoryPromoComponent = ({ item, sectionNumber, storyNumber }) => {
  const topStory = sectionNumber === 0 && storyNumber === 0;
  const lazyLoadImage = !topStory; // don't lazy load image if it is a top story

  return (
    <StoryPromo item={item} topStory={topStory} lazyLoadImage={lazyLoadImage} />
  );
};

StoryPromoComponent.propTypes = {
  item: shape(storyItem).isRequired,
  sectionNumber: number.isRequired,
  storyNumber: number.isRequired,
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

  // Don't render a section without any items.
  if (items.length === 0) {
    return null;
  }

  return (
    // jsx-a11y considers `role="region"` on a <section> to be redundant.
    // (<section> tags *should* imply `role="region"`)
    // While this may be true in a perfect world, we set it in order to get
    // the greatest possible support.
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <section role="region" aria-labelledby={sectionLabelId}>
      {/* The current implementation of SectionLabel *requires* a strapline to be
      present in order to render. It is currently *not possible* to render a
      section that does not have a strapline without breaking both the visual
      /*and especially* the screen reader UX. // If this group does not have a
      strapline; do not render! This may change in the future, if a way to
      avoid breaking UX is found. */}
      {strapline && (
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
      )}
      {items.length > 1 ? (
        <MarginWrapper addMargin={!isFirstSection} as={StoryPromoUl}>
          {items.map((item, index) => (
            <StoryPromoLi key={item.id}>
              <StoryPromoComponent
                item={item}
                sectionNumber={sectionNumber}
                storyNumber={index}
              />
            </StoryPromoLi>
          ))}
        </MarginWrapper>
      ) : (
        <MarginWrapper addMargin={!isFirstSection}>
          <StoryPromoComponent
            item={items[0]}
            sectionNumber={sectionNumber}
            storyNumber={0}
          />
        </MarginWrapper>
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
