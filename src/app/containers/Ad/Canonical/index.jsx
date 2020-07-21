import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { oneOf } from 'prop-types';
import styled, { css } from 'styled-components';
import { C_LUNAR_LIGHT } from '@bbc/psammead-styles/colours';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import pathOr from 'ramda/src/pathOr';
import { ServiceContext } from '#contexts/ServiceContext';
import isLive from '#lib/utilities/isLive';
import getAdsAriaLabel from '../utilities/getAdsAriaLabel';

const LEADERBOARD_HEIGHT = '5.5rem';
const LEADERBOARD_HEIGHT_GROUP_4_5 = '9rem';
const MPU_HEIGHT = '15.625rem';

const leaderboardStyles = css`
  min-height: ${LEADERBOARD_HEIGHT};

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    min-height: ${LEADERBOARD_HEIGHT_GROUP_4_5};
  }
`;

const mpuStyles = css`
  min-height: ${MPU_HEIGHT};
`;

const AdContainer = styled.section`
  background-color: ${C_LUNAR_LIGHT};
  ${({ slotType }) => (slotType === 'mpu' ? mpuStyles : leaderboardStyles)}
`;

export const getBootsrapSrc = queryString => {
  const useLiveSrc = isLive() || queryString.includes('ads-js-env=live');
  const params = useLiveSrc ? '' : 'test/';
  return `https://gn-web-assets.api.bbc.com/ngas/${params}dotcom-bootstrap.js`;
};

const CanonicalAd = ({ slotType }) => {
  const location = useLocation();
  const queryString = location.search;
  const { translations, dir } = useContext(ServiceContext);
  const label = pathOr(
    'Advertisement',
    ['ads', 'advertisementLabel'],
    translations,
  );
  const ariaLabel = getAdsAriaLabel(label, dir, slotType);

  useEffect(() => {
    if (window.dotcom) {
      window.dotcom.cmd.push(() => {
        window.dotcom.ads.registerSlot(slotType);
      });
    }

    return () => {
      if (window.dotcom) {
        window.dotcom.cmd.push(() => {
          window.dotcom.ads.destroySlot(slotType);
        });
      }
    };
  }, [slotType, location]);

  return (
    <>
      {/* Loading dotcom-bootstrap.js here instead of CanonicalAdBootstrapJs to avoid it loading on live */}
      {/* This can be moved once we allow the script to load on live */}
      <Helmet>
        <script src={getBootsrapSrc(queryString)} />
      </Helmet>
      <AdContainer
        slotType={slotType}
        aria-label={ariaLabel}
        aria-hidden="true"
        role="region"
      >
        <div id={`dotcom-${slotType}`} className="dotcom-ad" />
      </AdContainer>
    </>
  );
};

CanonicalAd.propTypes = {
  slotType: oneOf(['leaderboard', 'mpu']).isRequired,
};

export default CanonicalAd;
