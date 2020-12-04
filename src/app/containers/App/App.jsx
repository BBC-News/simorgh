/* eslint-disable react/prop-types */
import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import pipe from 'ramda/src/pipe';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router';
import pick from 'ramda/src/pick';
import mergeAll from 'ramda/src/mergeAll';
import path from 'ramda/src/path';
import getRouteProps from '#app/routes/utils/fetchPageData/utils/getRouteProps';
import usePrevious from '#lib/utilities/usePrevious';
import getToggles from '#lib/utilities/getToggles';
import routes from '#app/routes';
import withContexts from '#containers/PageHandlers/withContexts';
import withPageWrapper from '#containers/PageHandlers/withPageWrapper';
import withLoading from '#containers/PageHandlers/withLoading';

const mapToState = ({ pathname, initialData, routeProps, toggles }) => {
  const pageType = path(['route', 'pageType'], routeProps);

  return mergeAll([
    pick(
      ['service', 'isAmp', 'variant', 'id', 'assetUri', 'errorCode'],
      routeProps,
    ),
    pick(
      ['pageData', 'status', 'error', 'timeOnServer', 'errorCode'],
      initialData,
    ),
    {
      pathname,
      pageType,
      toggles,
    },
  ]);
};

const getNextPageState = async pathname => {
  const routeProps = getRouteProps(pathname);
  const { service, variant, route } = routeProps;
  const { pageType, getInitialData } = route;
  const toggles = await getToggles(service);
  const initialData = await getInitialData({
    path: pathname,
    service,
    variant,
    pageType,
    toggles,
  });

  return mapToState({ pathname, initialData, routeProps, toggles });
};

const setFocusOnMainHeading = () => {
  const mainHeadingEl = document.querySelector('h1#content');

  if (mainHeadingEl) {
    mainHeadingEl.focus();
  }
};

const Routes = pipe(
  withLoading,
  withPageWrapper,
  withContexts,
)(props => renderRoutes(routes, props));

export const App = ({ location, initialData, bbcOrigin, history }) => {
  const { pathname } = location;
  const hasMounted = useRef(false);
  const routeProps = getRouteProps(pathname);
  const previousLocationPath = usePrevious(pathname);
  const previousPath = history.action === 'POP' ? null : previousLocationPath; // clear the previous path on back clicks
  const { showAdsBasedOnLocation, toggles } = initialData;
  const [state, setState] = useState(
    mapToState({
      pathname,
      initialData,
      routeProps,
      toggles,
    }),
  );
  const routeHasChanged = state.pathname !== pathname;

  useEffect(() => {
    if (hasMounted.current) {
      getNextPageState(pathname).then(setState);
    } else {
      hasMounted.current = true;
    }
  }, [pathname]);

  useLayoutEffect(() => {
    if (hasMounted.current) {
      if (routeHasChanged) {
        window.scrollTo(0, 0);
      } else {
        setFocusOnMainHeading();
      }
    }
  }, [routeHasChanged]);

  return (
    <Routes
      {...state}
      bbcOrigin={bbcOrigin}
      previousPath={previousPath}
      loading={routeHasChanged}
      showAdsBasedOnLocation={showAdsBasedOnLocation}
    />
  );
};

export default withRouter(App);
