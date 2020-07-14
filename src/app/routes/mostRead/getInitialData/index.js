import fetchPageData from '../../utils/fetchPageData';
import { getMostReadEndpoint } from '#lib/utilities/getMostReadUrls';
import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';

export default async ({ service, variant }) => {
  try {
    const mostReadUrl = getMostReadEndpoint({ service, variant }).split('.')[0];
    const { json, status } = await fetchPageData(mostReadUrl);
    const pageTypeMeta = { metadata: { type: 'mostRead' } };

    return {
      status,
      pageData: { ...json, ...pageTypeMeta },
    };
  } catch ({ message, status = getErrorStatusCode() }) {
    return { error: message, status };
  }
};
