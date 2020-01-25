import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import RadioScheduleContainer from '.';

// Currently, only these services have radio schedule data
const validServices = [
  'arabic',
  'gahuza',
  'hausa',
  'korean',
  'pashto',
  'persian',
  'somali',
  'urdu',
];

const staticRadioScheduleURL = service =>
  `/data/${service}/bbc_${service}_radio/radioschedule.json`;

const renderRadioScheduleContainer = service => (
  <RadioScheduleContainer endpoint={staticRadioScheduleURL(service)} />
);

const stories = storiesOf('Containers|RadioSchedule', module)
  .addDecorator(withKnobs)
  .addDecorator(
    withServicesKnob({
      defaultService: 'arabic',
      services: validServices,
    }),
  )
  .addParameters({
    chromatic: { disable: true },
  });

stories.add('Radio schedules', ({ service }) => {
  return renderRadioScheduleContainer(service);
});
