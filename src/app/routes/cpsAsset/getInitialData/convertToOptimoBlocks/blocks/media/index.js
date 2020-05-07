import pick from 'ramda/src/pick';
import path from 'ramda/src/path';
import is from 'ramda/src/is';

import nodeLogger from '#lib/logger.node';
import { MEDIA_MISSING_FIELD } from '#lib/logger.const';

const logger = nodeLogger(__filename);

const FALLBACK_PLACEHOLDER_IMAGE_URL = `${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH}images/media_placeholder.png`;

const generateVideoBlock = block => {
  const generatedBlock = {
    type: 'aresMediaMetadata',
    blockId: `urn:bbc:ares::${block.subType}:${block.id}`,
    model: {
      ...pick(
        [
          'advertising',
          'embedding',
          'format',
          'id',
          'imageCopyright',
          'imageUrl',
          'subType',
          'synopses',
          'title',
          'versions',
        ],
        block,
      ),
      available: true,
    },
  };

  if (generatedBlock.model.format === 'video') {
    generatedBlock.model.format = 'audio_video';
  }

  // Some media blocks do not have an image url defined, so we fall back to this default
  if (!generatedBlock.model.imageUrl) {
    generatedBlock.model.imageUrl = FALLBACK_PLACEHOLDER_IMAGE_URL;
  }

  return generatedBlock;
};

const generatePlaceholderImageUrl = imageUrl => {
  if (imageUrl && is(String, imageUrl)) {
    return `https://${imageUrl.replace('$recipe', '1024x576')}`;
  }

  return FALLBACK_PLACEHOLDER_IMAGE_URL;
};

const generateImageBlock = block => ({
  type: 'image',
  model: {
    blocks: [
      {
        type: 'rawImage',
        model: {
          copyrightHolder: block.imageCopyright,
          locator: generatePlaceholderImageUrl(block.imageUrl),
          originCode: 'pips',
        },
      },
    ],
  },
});

const withValidationCheck = convertedBlock => {
  const aresMediaMetadata = path(
    ['model', 'blocks', 0, 'model', 'blocks', 0, 'model'],
    convertedBlock,
  );

  const imageBlock = path(
    ['model', 'blocks', 0, 'model', 'blocks', 1, 'model', 'blocks', 0, 'model'],
    convertedBlock,
  );

  const checks = [
    path(['type'], convertedBlock),
    aresMediaMetadata,
    path(['format'], aresMediaMetadata),
    path(['id'], aresMediaMetadata),
    path(['imageUrl'], aresMediaMetadata),
    path(['versions', 0, 'versionId'], aresMediaMetadata),
    imageBlock,
    path(['locator'], imageBlock),
  ];

  return checks.every(Boolean) && convertedBlock;
};

const validateInputBlock = (block, aresResponse) => {
  const log = missingField =>
    logger.warn(MEDIA_MISSING_FIELD, {
      id: path(['metadata', 'id'], aresResponse),
      url: path(['metadata', 'locators', 'assetUri'], aresResponse),
      missingField,
    });

  [
    ['imageUrl', block.imageUrl],
    ['id', block.id],
    ['format', block.format],
    ['versionId', path(['versions', 0, 'versionId'], block)],
  ]
    .filter(([, checkSucceeded]) => !checkSucceeded)
    .forEach(([issue]) => log(issue));
};

const convertMedia = (block, aresResponse) => {
  validateInputBlock(block, aresResponse);
  const convertedBlock = {
    type: 'video',
    model: {
      locator: `urn:bbc:pips:pid:${block.id}`,
      blocks: [
        {
          type: 'aresMedia',
          model: {
            blocks: [generateVideoBlock(block), generateImageBlock(block)],
          },
        },
      ],
    },
  };

  return withValidationCheck(convertedBlock);
};

export default convertMedia;
