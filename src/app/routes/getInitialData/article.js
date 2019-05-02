import onClient from '../../helpers/onClient';
import getBaseUrl from './utils/getBaseUrl';
import fetchData from './utils/fetchData';

const getArticleInitialData = async ({ match }) => {
  const { id, service, amp } = match.params;
  const isAmp = !!amp;

  const baseUrl = onClient()
    ? getBaseUrl(window.location.origin)
    : process.env.SIMORGH_BASE_URL;

  const url = `${baseUrl}/${service}/articles/${id}.json`;

  const { data, status } = await fetchData({ url });

  return {
    isAmp,
    data,
    service,
    status,
  };
};

export default getArticleInitialData;
