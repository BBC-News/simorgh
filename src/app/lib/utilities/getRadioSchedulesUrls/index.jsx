export const getRadioScheduleEndpoint = ({
  service,
  radioService = service,
  env,
  queryString,
}) => {
  const query = env !== 'live' && queryString ? queryString : '';

  return `/${service}/bbc_${radioService}_radio/schedule.json${query}`;
};

export const getLocalRadioScheduleEndpoint = ({
  service,
  radioService = service,
}) => `./data/${service}/bbc_${radioService}_radio/schedule.json`;
