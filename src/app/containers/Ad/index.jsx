import React, { useContext } from 'react';
import styled from 'styled-components';
import pathOr from 'ramda/src/pathOr';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';
import { RequestContext } from '../../contexts/RequestContext';
import { ServiceContext } from '../../contexts/ServiceContext';

import Amp from './Amp';
import useToggle from '#hooks/useToggle';

const StyledAd = styled.div`
  /* To centre page layout for Group 4+ */
  margin: 0 auto;
  width: 100%; /* Needed for IE11 */
  text-align: center;

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_TRPL};
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_QUAD};
    max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
  }
`;

const AdContainer = () => {
  const { isAmp } = useContext(RequestContext);
  const { service, ads } = useContext(ServiceContext);
  const hasAds = pathOr(false, ['hasAds'], ads);
  const { enabled: adsEnabled } = useToggle('ads');

  if (!adsEnabled || !hasAds) {
    return null;
  }

  //   const Ad = isAmp ? Amp : Canonical;
  if (isAmp) {
    return (
      <StyledAd>
        <Amp service={service} />
      </StyledAd>
    );
  }

  return null;
};

export default AdContainer;
