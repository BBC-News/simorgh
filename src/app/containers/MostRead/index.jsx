import React, { useContext } from 'react';
import { oneOf, string, elementType } from 'prop-types';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '#hooks/useToggle';
import Canonical from './Canonical';
import mostReadShape from './utilities/mostReadShape';
import { getMostReadEndpoint } from '#lib/utilities/getMostReadUrls';

const MostReadContainer = ({
  mostReadEndpointOverride,
  initialData,
  columnLayout,
  size,
  wrapper,
}) => {
  const { variant, isAmp } = useContext(RequestContext);
  const {
    service,
    mostRead: { hasMostRead },
  } = useContext(ServiceContext);

  const { enabled } = useToggle('mostRead');

  const mostReadEnabled = !isAmp && enabled && hasMostRead;

  if (!mostReadEnabled) {
    return null;
  }

  const endpoint =
    mostReadEndpointOverride || getMostReadEndpoint({ service, variant });

  return (
    <Canonical
      initialData={initialData}
      endpoint={endpoint}
      wrapper={wrapper}
      columnLayout={columnLayout}
      size={size}
    />
  );
};

MostReadContainer.propTypes = {
  mostReadEndpointOverride: string,
  columnLayout: oneOf(['oneColumn', 'twoColumn', 'multiColumn']),
  size: oneOf(['default', 'small']),
  initialData: mostReadShape,
  wrapper: elementType,
};

MostReadContainer.defaultProps = {
  mostReadEndpointOverride: undefined,
  columnLayout: 'multiColumn',
  size: 'default',
  initialData: undefined,
  wrapper: undefined,
};

export default MostReadContainer;
