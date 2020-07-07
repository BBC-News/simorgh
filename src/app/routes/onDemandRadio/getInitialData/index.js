import path from 'ramda/src/path';
import fetchPageData from '../../utils/fetchPageData';
import overrideRendererOnTest from '../../utils/overrideRendererOnTest';
import getPlaceholderImageUrlUtil from '../../utils/getPlaceholderImageUrl';
import pathWithLogging, {
  LOG_LEVELS,
} from '../../../lib/utilities/logging/pathWithLogging';
import { RADIO_MISSING_FIELD } from '#lib/logger.const';
import getEpisodeAvailability, {
  getUrl,
} from '#lib/utilities/episodeAvailability';

export default async ({ path: pathname }) => {
  const onDemandRadioDataPath = overrideRendererOnTest(pathname);
  const { json, ...rest } = await fetchPageData(onDemandRadioDataPath);

  // If no data was returned by fetchPageData, we can just skip all the data processing
  // This scenario will almost always be the result of an HTTP error (eg, 404 / 202)
  // We don't need to handle the error here, we just pass along the the rest of the
  // paremeters - the withError HOC will inspect these params and act accordingly
  if (!json) return rest;

  const episodeIsAvailable = getEpisodeAvailability(json);

  const withLogging = pathWithLogging(getUrl(json), RADIO_MISSING_FIELD, json);
  const get = (fieldPath, logLevel) =>
    logLevel ? withLogging(fieldPath, { logLevel }) : path(fieldPath, json);

  return {
    ...rest,
    pageData: {
      metadata: { type: 'onDemandRadio' },
      language: get(['metadata', 'language'], LOG_LEVELS.INFO),
      brandTitle: get(['metadata', 'title'], LOG_LEVELS.INFO),
      episodeTitle: get(['content', 'blocks', 0, 'title']),
      headline: get(['promo', 'headlines', 'headline'], LOG_LEVELS.WARN),
      shortSynopsis: get(['promo', 'media', 'synopses', 'short']),
      id: get(['metadata', 'id']),
      summary: get(
        ['content', 'blocks', 0, 'synopses', 'short'],
        LOG_LEVELS.INFO,
      ),
      contentType: get(
        ['metadata', 'analyticsLabels', 'contentType'],
        LOG_LEVELS.INFO,
      ),
      episodeId: get(['content', 'blocks', 0, 'id'], LOG_LEVELS.ERROR),
      masterBrand: get(['metadata', 'createdBy'], LOG_LEVELS.ERROR),
      releaseDateTimeStamp: get(
        ['metadata', 'releaseDateTimeStamp'],
        LOG_LEVELS.WARN,
      ),
      pageTitle: get(['metadata', 'analyticsLabels', 'pageTitle']),
      pageIdentifier: get(['metadata', 'analyticsLabels', 'pageIdentifier']),
      imageUrl: get(['content', 'blocks', 0, 'imageUrl'], LOG_LEVELS.INFO),
      promoBrandTitle: get(['promo', 'brand', 'title']),
      durationISO8601: get(
        ['promo', 'media', 'versions', 0, 'durationISO8601'],
        LOG_LEVELS.INFO,
      ),
      thumbnailImageUrl: getPlaceholderImageUrlUtil(
        get(['promo', 'media', 'imageUrl'], LOG_LEVELS.INFO),
      ),
      episodeIsAvailable,
    },
  };
};
