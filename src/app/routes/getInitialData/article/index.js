import onClient from '#lib/utilities/onClient';
import getBaseUrl from '../utils/getBaseUrl';
import fetchData from '../utils/fetchData';
import { variantSanitiser } from '#lib/utilities/variantHandler';
import applyTimestampRules from '#lib/utilities/preprocessor/rules/optimoArticle/timestamp';
import addIdsToBlocks from '#lib/utilities/preprocessor/rules/optimoArticle/addIdsToBlocks';
import applyBlockPositioning from '#lib/utilities/preprocessor/rules/optimoArticle/blockPositioning';

const getArticleInitialData = async ({ id, service, variant }) => {
  const baseUrl = onClient()
    ? getBaseUrl(window.location.origin)
    : process.env.SIMORGH_BASE_URL;

  const processedVariant = variantSanitiser(variant);

  const url = processedVariant
    ? `${baseUrl}/${service}/articles/${id}/${processedVariant}.json`
    : `${baseUrl}/${service}/articles/${id}.json`;

  return fetchData({
    url,
    preprocessorRules: [
      applyTimestampRules,
      addIdsToBlocks,
      applyBlockPositioning,
    ],
  });
};

export default getArticleInitialData;
