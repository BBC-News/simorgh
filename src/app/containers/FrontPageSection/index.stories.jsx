import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import FrontPageSection from '.';

import igboData from '../../../../data/test/igbo/frontpage/index.json';
import pidginData from '../../../../data/test/pidgin/frontpage/index.json';
import AmpDecorator from '../../helpers/storybook/ampDecorator';
import { RequestContextProvider } from '../../contexts/RequestContext';

const getSection = platform => (service, data) => (
  <ServiceContextProvider service={service}>
    <RequestContextProvider platform={platform}>
      <FrontPageSection group={data} />
    </RequestContextProvider>
  </ServiceContextProvider>
);

const getCanonicalSection = getSection('canonical');
const getAmpSection = getSection('amp');

storiesOf('Front Page Section container', module)
  .add('igbo', () => getCanonicalSection('igbo', igboData.content.groups[0]))
  .add('pidgin', () =>
    getCanonicalSection('pidgin', pidginData.content.groups[0]),
  );

storiesOf('Front Page Section container', module)
  .addDecorator(AmpDecorator)
  .add('igbo - amp', () => getAmpSection('igbo', igboData.content.groups[0]))
  .add('pidgin - amp', () =>
    getAmpSection('pidgin', pidginData.content.groups[0]),
  );
