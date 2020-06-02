/* eslint-disable jsx-a11y/aria-role */
import React, { Fragment, useContext } from 'react';
import { string, node } from 'prop-types';
import path from 'ramda/src/path';
import findIndex from 'ramda/src/findIndex';
import styled from 'styled-components';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import SectionLabel from '@bbc/psammead-section-label';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { frontPageDataPropTypes } from '#models/propTypes/frontPage';
import { RequestContext } from '../../contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import FrontPageSection from '#containers/FrontPageSection';
import MetadataContainer from '#containers/Metadata';
import MostReadContainer from '#containers/MostRead';
import RadioScheduleContainer from '#containers/RadioSchedule';
import AdContainer from '#containers/Ad';
import CanonicalAdBootstrapJs from '#containers/Ad/Canonical/CanonicalAdBootstrapJs';
import LinkedData from '#containers/LinkedData';
import ATIAnalytics from '#containers/ATIAnalytics';
import ChartbeatAnalytics from '#containers/ChartbeatAnalytics';
import PageContainer from '#lib/pageStyles/PageContainer';

const MostReadSection = styled.section.attrs(() => ({
  role: 'region',
  'aria-labelledby': 'Most-Read',
  'data-e2e': 'most-read',
}))`
  /* To centre page layout for Group 4+ */
  margin: 0 auto;
  width: 100%; /* Needed for IE11 */
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
  }
`;

const FrontPage = ({ pageData, mostReadEndpointOverride }) => {
  const {
    product,
    serviceLocalizedName,
    translations,
    frontPageTitle,
    radioSchedule,
    service,
    script,
    dir,
    mostRead: { header },
  } = useContext(ServiceContext);

  const home = path(['home'], translations);
  const groups = path(['content', 'groups'], pageData);
  const lang = path(['metadata', 'language'], pageData);
  const description = path(['metadata', 'summary'], pageData);
  const seoTitle = path(['promo', 'name'], pageData);
  const radioScheduleData = path(['radioScheduleData'], pageData);
  const radioScheduleOnPage = path(['onFrontPage'], radioSchedule);
  const radioSchedulePosition = path(['frontPagePosition'], radioSchedule);

  // eslint-disable-next-line jsx-a11y/aria-role
  const offScreenText = (
    <span role="text">
      <span lang="en-GB">{product}</span>, {serviceLocalizedName} - {home}
    </span>
  );

  // Most Read is required to render above useful-links if it exists
  const hasUsefulLinks =
    findIndex(group => group.type === 'useful-links')(groups) > -1;

  const MostReadWrapper = ({ children }) => (
    <MostReadSection>
      <SectionLabel
        script={script}
        labelId="Most-Read"
        service={service}
        dir={dir}
      >
        {header}
      </SectionLabel>
      {children}
    </MostReadSection>
  );

  MostReadWrapper.propTypes = {
    children: node.isRequired,
  };

  const renderMostRead = () => (
    <MostReadContainer
      mostReadEndpointOverride={mostReadEndpointOverride}
      columnLayout="twoColumn"
      wrapper={MostReadWrapper}
    />
  );

  const { isAmp } = useContext(RequestContext);

  return (
    <>
      {!isAmp && <CanonicalAdBootstrapJs />}
      <ATIAnalytics data={pageData} />
      <ChartbeatAnalytics data={pageData} />
      <MetadataContainer
        title={frontPageTitle}
        lang={lang}
        description={description}
        openGraphType="website"
      />
      <LinkedData type="WebPage" seoTitle={seoTitle} />
      <main role="main">
        <VisuallyHiddenText id="content" tabIndex="-1" as="h1">
          {offScreenText}
        </VisuallyHiddenText>
        <AdContainer />
        <PageContainer>
          {groups.map((group, index) => (
            <Fragment key={group.title}>
              {group.type === 'useful-links' && renderMostRead()}
              {radioScheduleOnPage &&
                radioSchedulePosition === group.semanticGroupName && (
                  <RadioScheduleContainer initialData={radioScheduleData} />
                )}
              <FrontPageSection group={group} sectionNumber={index} />
            </Fragment>
          ))}
          {!hasUsefulLinks && renderMostRead()}
        </PageContainer>
      </main>
    </>
  );
};

FrontPage.propTypes = {
  pageData: frontPageDataPropTypes.isRequired,
  mostReadEndpointOverride: string,
};

FrontPage.defaultProps = {
  mostReadEndpointOverride: null,
};

export default FrontPage;
