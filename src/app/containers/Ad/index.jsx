import React, { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';
import useToggle from '#hooks/useToggle';
import { RequestContext } from '../../contexts/RequestContext';
import { ServiceContext } from '../../contexts/ServiceContext';
import Amp from './Amp';
import Canonical from './Canonical';

const AdContainer = () => {
  const { isAmp } = useContext(RequestContext);
  const { service, ads } = useContext(ServiceContext);
  const hasAds = pathOr(false, ['hasAds'], ads);
  const { enabled: adsEnabled } = useToggle('ads');

  if (!hasAds || !adsEnabled) {
    return null;
  }

  const Ad = isAmp ? Amp : Canonical;
  return <Ad service={service} />;
};

export default AdContainer;
