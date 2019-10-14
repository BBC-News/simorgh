const IMAGES_ORIGIN = 'https://ichef.bbci.co.uk';
const FONTS_ORIGINS = [
  'https://gel.files.bbci.co.uk',
  'https://ws-downloads.files.bbci.co.uk',
];

const getAssetOrigins = () => {
  const assetOrigins = {
    fontsOrigins: [...FONTS_ORIGINS],
    imagesOrigin: [IMAGES_ORIGIN],
    staticAssetsOrigins: [
      process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN,
      process.env.SIMORGH_ATI_BASE_URL,
    ],
  };

  return assetOrigins;
};

export default getAssetOrigins;
