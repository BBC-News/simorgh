import React, { useContext } from 'react';
import { string } from 'prop-types';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '../Toggle/useToggle';
import Canonical from './Canonical';

const getMostReadEndpoint = ({ service, variant }) =>
  variant
    ? `/${service}/most_read/${variant}.json`
    : `/${service}/most_read.json`;

const MostReadContainer = ({ endpointOverride }) => {
  const { variant } = useContext(RequestContext);
  const { service } = useContext(ServiceContext);

  const { enabled } = useToggle('mostRead');
  if (!enabled) {
    return null;
  }

  const endpoint =
    endpointOverride || getMostReadEndpoint({ service, variant });

  return <Canonical endpoint={endpoint} />;
};

MostReadContainer.propTypes = {
  endpointOverride: string,
};

MostReadContainer.defaultProps = {
  endpointOverride: null,
};

export default MostReadContainer;
