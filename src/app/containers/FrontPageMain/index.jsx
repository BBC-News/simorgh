/* eslint-disable jsx-a11y/aria-role */
import React, { Fragment, useContext } from 'react';
import { shape } from 'prop-types';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { frontPageDataPropTypes } from '../../models/propTypes/frontPage';
import { GhostWrapper, GridItemConstrainedLarge } from '../../lib/styledGrid';
import { ServiceContext } from '../../contexts/ServiceContext';
import FrontPageSection from '../FrontPageSection';
import MetadataContainer from '../Metadata';
import deepGet from '../../lib/utilities/deepGet';

const FrontPageMain = ({ frontPageData }) => {
  const { product, serviceLocalizedName, translations } = useContext(
    ServiceContext,
  );
  const { home } = translations;

  const groups = deepGet(['content', 'groups'], frontPageData);
  const { metadata, promo } = frontPageData;

  // eslint-disable-next-line jsx-a11y/aria-role
  const offScreenText = (
    <Fragment>
      <span role="text">
        <span lang="en-GB">{product}</span>, {serviceLocalizedName} - {home}
      </span>
    </Fragment>
  );

  return (
    <Fragment>
      <MetadataContainer metadata={metadata} promo={promo} />
      <main role="main">
        <VisuallyHiddenText id="content" tabIndex="-1" as="h1">
          {offScreenText}
        </VisuallyHiddenText>
        <GhostWrapper>
          <GridItemConstrainedLarge>
            {groups.map((group, index) => (
              <FrontPageSection
                key={group.title}
                group={group}
                sectionNumber={index}
              />
            ))}
          </GridItemConstrainedLarge>
        </GhostWrapper>
      </main>
    </Fragment>
  );
};

FrontPageMain.propTypes = {
  frontPageData: shape(frontPageDataPropTypes).isRequired,
};

export default FrontPageMain;
