import pipe from 'ramda/src/pipe';
import fetchPageData from '../../utils/fetchPageData';
import {
  augmentWithTimestamp,
  addIdsToBlocks,
  applyBlockPositioning,
  addIndexesToEmbeds,
} from '../../utils/sharedDataTransformers';
import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';

const transformJson = pipe(
  augmentWithTimestamp,
  addIdsToBlocks,
  applyBlockPositioning,
  addIndexesToEmbeds,
);

export default async ({ path, pageType }) => {
  try {
    const { json, status } = await fetchPageData({
      path,
      pageType,
    });

    return {
      status,
      pageData: transformJson(json),
    };
  } catch ({ message, status = getErrorStatusCode() }) {
    return { error: message, status };
  }
};
