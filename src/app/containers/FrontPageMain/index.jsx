/* eslint-disable jsx-a11y/aria-role */
import React, { useContext } from 'react';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import path from 'ramda/src/path';
import Grid from '#app/components/Grid';
import { frontPageDataPropTypes } from '#models/propTypes/frontPage';
import { ServiceContext } from '#contexts/ServiceContext';
import FrontPageSection from '../FrontPageSection';
import MetadataContainer from '../Metadata';
import LinkedData from '../LinkedData';
import ATIAnalytics from '../ATIAnalytics';
import ChartbeatAnalytics from '../ChartbeatAnalytics';

const FrontPageMain = ({ frontPageData }) => {
  const {
    product,
    serviceLocalizedName,
    translations,
    frontPageTitle,
  } = useContext(ServiceContext);
  const home = path(['home'], translations);
  const groups = path(['content', 'groups'], frontPageData);
  const lang = path(['metadata', 'language'], frontPageData);
  const description = path(['metadata', 'summary'], frontPageData);
  const seoTitle = path(['promo', 'name'], frontPageData);

  // eslint-disable-next-line jsx-a11y/aria-role
  const offScreenText = (
    <>
      <span role="text">
        <span lang="en-GB">{product}</span>, {serviceLocalizedName} - {home}
      </span>
    </>
  );

  return (
    <>
      <ATIAnalytics data={frontPageData} />
      <ChartbeatAnalytics data={frontPageData} />
      <MetadataContainer
        title={frontPageTitle}
        lang={lang}
        description={description}
        openGraphType="website"
      />
      <LinkedData type="WebPage" seoTitle={seoTitle} />
      <Grid
        as="main"
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
          columns={{
            group0: 6,
            group1: 6,
            group2: 6,
            group3: 6,
            group4: 6,
            group5: 12,
          }}
          startOffset={{
            group0: 1,
            group1: 1,
            group2: 1,
            group3: 1,
            group4: 2,
            group5: 5,
          }}
        >
          <VisuallyHiddenText id="content" tabIndex="-1" as="h1">
            {offScreenText}
          </VisuallyHiddenText>
          {groups.map((group, index) => (
            <FrontPageSection
              key={group.title}
              group={group}
              sectionNumber={index}
            />
          ))}
        </Grid>
      </Grid>
    </>
  );
};

FrontPageMain.propTypes = {
  frontPageData: frontPageDataPropTypes.isRequired,
};

export default FrontPageMain;
