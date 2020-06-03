import React, { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';
import useToggle from '#hooks/useToggle';
import { RequestContext } from '../../contexts/RequestContext';
import { ServiceContext } from '../../contexts/ServiceContext';
import AmpAd from './Amp';
import CanonicalAd from './Canonical';
import CanonicalAdBootstrap from './Canonical/CanonicalAdBootstrapJs';

const AdContainer = () => {
  const { isAmp } = useContext(RequestContext);
  const { ads } = useContext(ServiceContext);
  const hasAds = pathOr(false, ['hasAds'], ads);
  const { enabled: adsEnabled } = useToggle('ads');

  if (!hasAds || !adsEnabled) {
    return null;
  }

  if (isAmp) {
    return <AmpAd />;
  }

  return (
    <>
      <CanonicalAdBootstrap />
      <CanonicalAd />
    </>
  );
};

export default AdContainer;
