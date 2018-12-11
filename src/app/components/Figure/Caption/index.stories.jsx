import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Caption from './index';

storiesOf('Caption', module).add('default', () => (
  <Caption>This is a caption.</Caption>
));
