import path from 'ramda/src/path';
import addIndexesToEmbeds from '.';

const textBlock = {
  type: 'text',
  model: {
    blocks: [
      {
        type: 'paragraph',
        model: {
          text: 'Comes estas? ',
          blocks: [
            {
              type: 'fragment',
              model: { text: 'Comes estas? ', attributes: [] },
            },
          ],
        },
      },
    ],
  },
};

const buildEmbedBlock = ({ provider, url }) => ({
  type: 'social',
  model: {
    blocks: [
      {
        model: {
          blocks: [
            {
              type: 'aresOEmbed',
              model: {
                oembed: {
                  provider_name: provider,
                  url,
                },
              },
            },
          ],
        },
      },
    ],
  },
});

const getOembed = path([
  'model',
  'blocks',
  0,
  'model',
  'blocks',
  0,
  'model',
  'oembed',
]);

it('should return enriched blocks with a new property "indexOfType" (indicates the position of the social embed block by provider) added to all embed blocks', () => {
  const fixture = {
    content: {
      model: {
        blocks: [
          textBlock,
          textBlock,
          buildEmbedBlock({
            provider: 'Twitter',
            url: 'https://twitter.com/bbcnews/status/151510212',
          }),
          textBlock,
          textBlock,
          textBlock,
          textBlock,
          buildEmbedBlock({
            provider: 'Twitter',
            url: 'https://twitter.com/bbcnews/status/0215154',
          }),
          textBlock,
          textBlock,
          buildEmbedBlock({
            provider: 'Twitter',
            url: 'https://twitter.com/bbcnews/status/020541541',
          }),
        ],
      },
    },
  };
  const enrichedArticleBlocks = addIndexesToEmbeds(fixture);

  expect(getOembed(enrichedArticleBlocks.content.model.blocks[2])).toEqual({
    indexOfType: 0,
    provider_name: 'Twitter',
    url: 'https://twitter.com/bbcnews/status/151510212',
  });
  expect(getOembed(enrichedArticleBlocks.content.model.blocks[7])).toEqual({
    indexOfType: 1,
    provider_name: 'Twitter',
    url: 'https://twitter.com/bbcnews/status/0215154',
  });
  expect(getOembed(enrichedArticleBlocks.content.model.blocks[10])).toEqual({
    indexOfType: 2,
    provider_name: 'Twitter',
    url: 'https://twitter.com/bbcnews/status/020541541',
  });
});

it('should return enriched blocks with a new property "indexOfType" (indicates the position of the social embed block by provider) to all embed blocks of any provider', () => {
  const fixture = {
    content: {
      model: {
        blocks: [
          buildEmbedBlock({
            provider: 'YouTube',
            url: 'https://youtube.com/watch/215151531',
          }),
          buildEmbedBlock({
            provider: 'Twitter',
            url: 'https://twitter.com/bbcnews/status/3543545',
          }),
          buildEmbedBlock({
            provider: 'YouTube',
            url: 'https://youtube.com/watch/545561451',
          }),
          buildEmbedBlock({
            provider: 'Instagram',
            url: 'https://instagram.com/bbcnews/55135135',
          }),
          buildEmbedBlock({
            provider: 'Twitter',
            url: 'https://twitter.com/bbcnews/status/2516546541351',
          }),
          buildEmbedBlock({
            provider: 'Twitter',
            url: 'https://twitter.com/bbcnews/status/354354545',
          }),
          buildEmbedBlock({
            provider: 'YouTube',
            url: 'https://youtube.com/watch/3202151240',
          }),
          buildEmbedBlock({
            provider: 'YouTube',
            url: 'https://youtube.com/watch/0021251521',
          }),
          buildEmbedBlock({
            provider: 'Instagram',
            url: 'https://instagram.com/bbcnews/status/02105151',
          }),
        ],
      },
    },
  };
  const enrichedArticleBlocks = addIndexesToEmbeds(fixture);
  const { blocks } = enrichedArticleBlocks.content.model;

  expect(getOembed(blocks[0])).toEqual({
    indexOfType: 0,
    provider_name: 'YouTube',
    url: 'https://youtube.com/watch/215151531',
  });
  expect(getOembed(blocks[2])).toEqual({
    indexOfType: 1,
    provider_name: 'YouTube',
    url: 'https://youtube.com/watch/545561451',
  });
  expect(getOembed(blocks[6])).toEqual({
    indexOfType: 2,
    provider_name: 'YouTube',
    url: 'https://youtube.com/watch/3202151240',
  });
  expect(getOembed(blocks[7])).toEqual({
    indexOfType: 3,
    provider_name: 'YouTube',
    url: 'https://youtube.com/watch/0021251521',
  });

  expect(getOembed(blocks[1])).toEqual({
    indexOfType: 0,
    provider_name: 'Twitter',
    url: 'https://twitter.com/bbcnews/status/3543545',
  });

  expect(getOembed(blocks[4])).toEqual({
    indexOfType: 1,
    provider_name: 'Twitter',
    url: 'https://twitter.com/bbcnews/status/2516546541351',
  });
  expect(getOembed(blocks[5])).toEqual({
    indexOfType: 2,
    provider_name: 'Twitter',
    url: 'https://twitter.com/bbcnews/status/354354545',
  });

  expect(getOembed(blocks[3])).toEqual({
    indexOfType: 0,
    provider_name: 'Instagram',
    url: 'https://instagram.com/bbcnews/55135135',
  });
  expect(getOembed(blocks[8])).toEqual({
    indexOfType: 1,
    provider_name: 'Instagram',
    url: 'https://instagram.com/bbcnews/status/02105151',
  });
});

it('should return original json input if the data structure is not as expected', () => {
  /* eslint-disable no-console */
  const { error } = console;
  console.error = jest.fn();

  const fixture = {
    blah: 'hello',
  };
  const actual = addIndexesToEmbeds(fixture);
  const expected = fixture;

  expect(actual).toEqual(expected);
  expect(console.error).toHaveBeenCalled();

  console.error = error;
  /* eslint-enable no-console */
});

it('should return original json input if the embed is missing url or provider props', () => {
  const embedWithMissingUrl = {
    type: 'social',
    model: {
      blocks: [
        {
          model: {
            blocks: [
              {
                type: 'aresOEmbed',
                model: {
                  oembed: {
                    provider_name: 'Twitter',
                  },
                },
              },
            ],
          },
        },
      ],
    },
  };
  const embedWithMissingProvider = {
    type: 'social',
    model: {
      blocks: [
        {
          model: {
            blocks: [
              {
                type: 'aresOEmbed',
                model: {
                  oembed: {
                    url: 'https://twitter.com/bbcnews/status/354354545',
                  },
                },
              },
            ],
          },
        },
      ],
    },
  };
  const fixture = {
    content: {
      model: {
        blocks: [textBlock, embedWithMissingUrl, embedWithMissingProvider],
      },
    },
  };
  const actual = addIndexesToEmbeds(fixture);
  const expected = fixture;

  expect(actual).toEqual(expected);
});

it('should return enriched blocks correctly incremented "indexOfType" for duplicate embeds in article', () => {
  const fixture = {
    content: {
      model: {
        blocks: [
          buildEmbedBlock({
            provider: 'Twitter',
            url: 'https://twitter.com/bbcnews/status/3543545',
          }),
          buildEmbedBlock({
            provider: 'Twitter',
            url: 'https://twitter.com/bbcnews/status/3543545',
          }),
          buildEmbedBlock({
            provider: 'Twitter',
            url: 'https://twitter.com/bbcnews/status/3543545',
          }),
        ],
      },
    },
  };
  const enrichedArticleBlocks = addIndexesToEmbeds(fixture);
  const { blocks } = enrichedArticleBlocks.content.model;

  expect(getOembed(blocks[0])).toEqual({
    indexOfType: 0,
    provider_name: 'Twitter',
    url: 'https://twitter.com/bbcnews/status/3543545',
  });
  expect(getOembed(blocks[1])).toEqual({
    indexOfType: 1,
    provider_name: 'Twitter',
    url: 'https://twitter.com/bbcnews/status/3543545',
  });
  expect(getOembed(blocks[2])).toEqual({
    indexOfType: 2,
    provider_name: 'Twitter',
    url: 'https://twitter.com/bbcnews/status/3543545',
  });
});
