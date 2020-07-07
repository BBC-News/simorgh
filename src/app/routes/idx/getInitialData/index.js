import pathOr from 'ramda/src/pathOr';
import pipe from 'ramda/src/pipe';
import fetchPageData from '#app/routes/utils/fetchPageData';
import filterUnknownContentTypes from '#app/routes/utils/sharedDataTransformers/filterUnknownContentTypes';
import filterEmptyGroupItems from '#app/routes/utils/sharedDataTransformers/filterEmptyGroupItems';
import squashTopStories from '#app/routes/utils/sharedDataTransformers/squashTopStories';
import addIdsToItems from '#app/routes/utils/sharedDataTransformers/addIdsToItems';
import filterGroupsWithoutStraplines from '#app/routes/utils/sharedDataTransformers/filterGroupsWithoutStraplines';
import getConfig from '#app/routes/utils/getConfig';
import withRadioSchedule from '#app/routes/utils/withRadioSchedule';

const transformJson = pipe(
  filterUnknownContentTypes,
  filterEmptyGroupItems,
  addIdsToItems,
  squashTopStories,
  filterGroupsWithoutStraplines,
);

export const hasRadioSchedule = async (service, variant) => {
  const config = await getConfig(service, variant);

  const serviceHasRadioSchedule = pathOr(
    false,
    ['radioSchedule', 'hasRadioSchedule'],
    config,
  );

  const radioScheduleOnIdx = pathOr(
    false,
    ['radioSchedule', 'onIdxPage'],
    config,
  );

  return serviceHasRadioSchedule && radioScheduleOnIdx;
};

export default async ({ path, service, variant }) => {
  const pageHasRadioSchedule = await hasRadioSchedule(service, variant);
  const pageDataPromise = fetchPageData(path);

  const { json, ...rest } = pageHasRadioSchedule
    ? await withRadioSchedule({
        pageDataPromise,
        service,
        path,
        radioService: 'dari',
      })
    : await pageDataPromise;

  return {
    ...rest,
    ...(json && {
      pageData: transformJson(json),
    }),
  };
};
