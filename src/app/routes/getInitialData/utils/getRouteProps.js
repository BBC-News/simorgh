import { matchRoutes } from 'react-router-config';

const getRouteProps = (routes, url) => {
  const matchedRoutes = matchRoutes(routes, url);

  if (matchedRoutes.length <= 0) {
    throw new Error(`No route was found for ${url}.`);
  }

  const { route, match } = matchedRoutes[0];
  const { amp, service } = match.params;
  const isAmp = amp ? true : false; // eslint-disable-line no-unneeded-ternary

  return { isAmp, service, route, match };
};

export default getRouteProps;
