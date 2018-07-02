import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Text from './index';

const paragraphBlock = (blockId, text) => ({
  blockId,
  model: {
    text,
  },
});

const props = {
  blocks: [
    paragraphBlock('01', 'This is a paragraph.'),
    paragraphBlock('02', 'This is another paragraph.'),
    paragraphBlock('03', 'This is a final paragraph.'),
  ],
};

storiesOf('Text', module).add('default', () => <Text {...props} />);
