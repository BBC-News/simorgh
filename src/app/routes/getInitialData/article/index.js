import applyTimestampRules from '#lib/utilities/preprocessor/rules/timestamp';
import addIdsToBlocks from '#lib/utilities/preprocessor/rules/addIdsToBlocks';
import applyBlockPositioning from '#lib/utilities/preprocessor/rules/blockPositioning';
import fetchData from '../utils/fetchData';

const preprocessorRules = [
  applyTimestampRules,
  addIdsToBlocks,
  applyBlockPositioning,
];

const getArticleInitialData = async pathname => {
  return fetchData({
    pathname,
    preprocessorRules,
  });
};

export default getArticleInitialData;
