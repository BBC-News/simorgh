import fs from 'fs';
import nodeLogger from '#lib/logger.node';
import assetsFilter from './assetsFilter';

const logger = nodeLogger(__filename);

const IMAGES_ORIGIN = 'https://ichef.bbci.co.uk';
const FONTS_ORIGINS = [
  'https://gel.files.bbci.co.uk',
  'https://ws-downloads.files.bbci.co.uk',
];

const getAssetsArray = service => {
  const assets = [];
  const assetsManifestEnv = 'SIMORGH_ASSETS_MANIFEST_PATH';
  try {
    const assetManifest = JSON.parse(
      fs.readFileSync(process.env[assetsManifestEnv]),
    );
    const assetsManifestKeys = Object.keys(assetManifest);

    for (let i = assetsManifestKeys.length - 1; i >= 0; i -= 1) {
      const key = assetsManifestKeys[i];
      if (key.length > 0) {
        assets.push(assetManifest[key].js);
      }
    }
  } catch (error) {
    logger.error(
      `Error parsing assets manifest. ${assetsManifestEnv} = ${process.env[assetsManifestEnv]}`,
    );
  }

  return assetsFilter(assets, service);
};

const getAssetOrigins = () => {
  const assetOrigins = [
    ...FONTS_ORIGINS,
    IMAGES_ORIGIN,
    process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN,
    process.env.SIMORGH_ATI_BASE_URL,
  ];

  return assetOrigins;
};

export { getAssetsArray, getAssetOrigins };
