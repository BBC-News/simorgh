import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';

import {
  twitterBlock,
  twitterBlockNoEmbed,
  cpsTwitterBlock,
  cpsTwitterBlockNoEmbed,
} from './common/fixtures';
import withContexts from './common/testHelper';
import SocialEmbed from '.';
import CpsSocialEmbed from './Cps';

storiesOf('Containers/Optimo Social Embed/Canonical', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add('default', ({ service }) =>
    withContexts(SocialEmbed, {
      isAmp: false,
      isEnabled: true,
      service,
    })({
      blocks: [twitterBlock],
      source: 'https://twitter.com/BBCNews/status/1384138850478346243?s=20',
    }),
  )
  .add('no embed', ({ service }) =>
    withContexts(SocialEmbed, {
      isAmp: false,
      isEnabled: true,
      service,
    })({
      blocks: [twitterBlockNoEmbed],
      source: 'https://twitter.com/BBCNews/status/1384138850478346243?s=20',
    }),
  );

storiesOf('Containers/Optimo Social Embed/AMP', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .addDecorator(AmpDecorator)
  .add('default', ({ service }) =>
    withContexts(SocialEmbed, {
      isAmp: true,
      isEnabled: true,
      service,
    })({
      blocks: [twitterBlock],
      source: 'https://twitter.com/BBCNews/status/1384138850478346243?s=20',
    }),
  );

storiesOf('Containers/CPS Social Embed/Canonical', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add('default', ({ service }) =>
    withContexts(CpsSocialEmbed, {
      isAmp: false,
      isEnabled: true,
      service,
    })({
      blocks: [cpsTwitterBlock],
      source: 'https://twitter.com/MileyCyrus/status/1237210910835392512',
    }),
  )
  .add('no embed', ({ service }) =>
    withContexts(CpsSocialEmbed, {
      isAmp: false,
      isEnabled: true,
      service,
    })({
      blocks: [cpsTwitterBlockNoEmbed],
      source: 'https://twitter.com/MileyCyrus/status/1237210910835392512',
    }),
  );

storiesOf('Containers/CPS Social Embed/AMP', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .addDecorator(AmpDecorator)
  .add('default', ({ service }) =>
    withContexts(CpsSocialEmbed, {
      isAmp: true,
      isEnabled: true,
      service,
    })({
      blocks: [cpsTwitterBlock],
      source: 'https://twitter.com/MileyCyrus/status/1237210910835392512',
    }),
  );
