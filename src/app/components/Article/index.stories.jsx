import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Article from './index';
import { textBlock } from '../../models/blocks';

const id = 'c0000000001o';
const title = 'This is a title!';
const lang = 'en-GB';

const blocks = [
  {
    type: 'headline',
    blockId: '1',
    model: textBlock('This is a headline!'),
  },
  {
    type: 'text',
    blockId: '2',
    model: {
      blocks: [
        {
          blockId: '2-1',
          type: 'paragraph',
          model: {
            text: 'This is some text content!',
          },
        },
        {
          blockId: '2-2',
          type: 'paragraph',
          model: {
            text: 'More text content!',
          },
        },
      ],
    },
  },
  {
    type: 'test',
    blockId: '3',
    model: {
      blocks: [
        {
          blockId: '3-1',
          type: 'test-something',
          model: {
            text: 'This is some test content!',
          },
        },
      ],
    },
  },
];

storiesOf('Article', module)
  .add('with just a headline', () => {
    const blocksOnlyHeadline = blocks.filter(({ type }) => type === 'headline');

    return (
      <Article id={id} title={title} lang={lang} blocks={blocksOnlyHeadline} />
    );
  })
  .add('with a headline and text', () => {
    const blocksOnlyHeadlineText = blocks.filter(
      ({ type }) => type === 'headline' || type === 'text',
    );

    return (
      <Article
        id={id}
        title={title}
        lang={lang}
        blocks={blocksOnlyHeadlineText}
      />
    );
  })
  .add('with a headline, text, and other blocks', () => (
    <Article id={id} title={title} lang={lang} blocks={blocks} />
  ));
