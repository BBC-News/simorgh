import React, { useContext } from 'react';
import Navigation, {
  NavigationUl,
  NavigationLi,
} from '@bbc/psammead-navigation';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import { EventContext } from '#contexts/EventContext';
import { sendEventBeacon } from '../ATIAnalytics/beacon';
import { buildATIClickParams } from '../ATIAnalytics/params';

const NavigationContainer = () => {
  const { script, translations, navigation, service, dir } = useContext(
    ServiceContext,
  );

  const { currentPage, skipLinkText } = translations;

  const { useClickTracker } = useContext(EventContext);
  const params = buildATIClickParams(
    useContext(RequestContext),
    useContext(ServiceContext),
  );

  useClickTracker('[data-navigation]', event => {
    const componentName = 'navigation';
    const eventData = event.srcElement.dataset[componentName];

    sendEventBeacon({
      ...params,
      element: event.target,
      componentName,
      type: 'click',
      componentInfo: `${componentName}-${eventData}`,
    });
  });

  if (!navigation || navigation.length === 0) {
    return null;
  }

  return (
    <Navigation
      script={script}
      skipLinkText={skipLinkText}
      service={service}
      dir={dir}
    >
      <NavigationUl>
        {navigation.map((item, index) => {
          const { title, url } = item;
          const active = index === 0;

          return (
            <NavigationLi
              key={title}
              url={url}
              script={script}
              active={active}
              currentPageText={currentPage}
              service={service}
              data-navigation={`${title.split(' ').join('-')}_${index}`}
            >
              {title}
            </NavigationLi>
          );
        })}
      </NavigationUl>
    </Navigation>
  );
};

export default NavigationContainer;
