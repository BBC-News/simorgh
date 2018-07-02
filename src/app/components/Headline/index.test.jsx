import React from 'react';
import Headline from './index';
import { textBlock } from '../../models/blocks';
import {shouldMatchSnapshot} from '../../helpers/tests/testHelpers';

describe('Headline', () => {
  describe('with no data', () => {
    shouldMatchSnapshot(
      'should not render anything',
      <Headline />,
    );
  });

  describe('with data', () => {
    const data = textBlock('This is a headline!');

    shouldMatchSnapshot(
      'should render correctly',
      <Headline {...data} />,
    );
  });
});
