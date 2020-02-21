import React, { useEffect, useState, useContext } from 'react';
import 'isomorphic-fetch';
import { bool, string } from 'prop-types';
import styled from 'styled-components';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MAX,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_MARGIN_ABOVE_400PX,
  GEL_MARGIN_BELOW_400PX,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '@bbc/gel-foundations/spacings';
import {
  MostReadList,
  MostReadItemWrapper,
  MostReadRank,
  MostReadLink,
} from '@bbc/psammead-most-read';
import SectionLabel from '@bbc/psammead-section-label';
import { ServiceContext } from '#contexts/ServiceContext';
import webLogger from '#lib/logger.web';
import { mostReadRecordIsFresh, shouldRenderLastUpdated } from '../utilities';
import LastUpdated from './LastUpdated';

const logger = webLogger();

const MarginWrapper = styled.div`
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_DBL};
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_TRPL};
  }
`;

const MaxWidthWrapper = styled.div`
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    margin: 0 ${GEL_MARGIN_ABOVE_400PX};
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    margin: 0 auto;
    max-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN};
  }
  margin: 0 ${GEL_MARGIN_BELOW_400PX};
`;

const CanonicalMostRead = ({ endpoint, constrainMaxWidth, maxTwoColumns }) => {
  const [items, setItems] = useState([]);
  const {
    service,
    script,
    dir,
    datetimeLocale,
    timezone,
    mostRead: { header, lastUpdated, numberOfItems },
  } = useContext(ServiceContext);

  useEffect(() => {
    const handleResponse = async response => {
      const mostReadData = await response.json();

      // The ARES test endpoint for most read renders fixture data, so the data is stale
      const isTest = process.env.SIMORGH_APP_ENV === 'test';

      // Do not show most read if lastRecordUpdated is greater than 35min as this means PopAPI has failed twice
      // in succession. This suggests ATI may be having issues, hence risk of stale data.
      if (isTest || mostReadRecordIsFresh(mostReadData.lastRecordTimeStamp)) {
        const mostReadItems = mostReadData.records
          .slice(0, numberOfItems)
          .map(({ id, promo: { headlines, locators, timestamp } }) => ({
            id,
            title: headlines.shortHeadline,
            href: locators.assetUri,
            timestamp: shouldRenderLastUpdated(timestamp) && (
              <LastUpdated
                prefix={lastUpdated}
                script={script}
                service={service}
                timestamp={timestamp}
                locale={datetimeLocale}
                timezone={timezone}
              />
            ),
          }));
        setItems(mostReadItems);
      }
    };
    const fetchMostReadData = pathname =>
      fetch(pathname, { mode: 'no-cors' })
        .then(handleResponse)
        .catch(e => logger.error(`HTTP Error: "${e}"`));
    fetchMostReadData(endpoint);
  }, [
    endpoint,
    numberOfItems,
    datetimeLocale,
    lastUpdated,
    script,
    service,
    timezone,
  ]);

  if (!items.length) {
    return null;
  }

  const MostReadSection = () => (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <section role="region" aria-labelledby="Most-Read">
      <SectionLabel
        script={script}
        labelId="Most-Read"
        service={service}
        dir={dir}
      >
        {header}
      </SectionLabel>
      <MarginWrapper>
        <MostReadList
          numberOfItems={items.length}
          dir={dir}
          maxTwoColumns={maxTwoColumns}
        >
          {items.map((item, i) => (
            <MostReadItemWrapper dir={dir} key={item.id}>
              <MostReadRank
                service={service}
                script={script}
                listIndex={i + 1}
                numberOfItems={items.length}
                dir={dir}
                maxTwoColumns={maxTwoColumns}
              />
              <MostReadLink
                dir={dir}
                service={service}
                script={script}
                title={item.title}
                href={item.href}
              >
                {item.timestamp}
              </MostReadLink>
            </MostReadItemWrapper>
          ))}
        </MostReadList>
      </MarginWrapper>
    </section>
  );

  return constrainMaxWidth ? (
    <MaxWidthWrapper>
      <MostReadSection />
    </MaxWidthWrapper>
  ) : (
    <MostReadSection />
  );
};

CanonicalMostRead.propTypes = {
  endpoint: string.isRequired,
  constrainMaxWidth: bool.isRequired,
  maxTwoColumns: bool.isRequired,
};

export default CanonicalMostRead;
