const toggles = {
  local: {
    chartbeatAnalytics: {
      enabled: false,
    },
    mediaPlayer: {
      enabled: true,
    },
    mpulse: {
      enabled: false,
    },
    navOnArticles: {
      enabled: true,
    },
    mostRead: {
      enabled: false,
    },
  },
  test: {
    chartbeatAnalytics: {
      enabled: false,
    },
    mediaPlayer: {
      enabled: true,
    },
    mpulse: {
      enabled: true,
    },
    navOnArticles: {
      enabled: true,
    },
    mostRead: {
      enabled: false,
    },
  },
  stage: {
    chartbeatAnalytics: {
      enabled: false,
    },
    mediaPlayer: {
      enabled: true,
    },
    mpulse: {
      enabled: true,
    },
    navOnArticles: {
      enabled: true,
    },
    mostRead: {
      enabled: false,
    },
  },
  live: {
    chartbeatAnalytics: {
      enabled: false,
    },
    mediaPlayer: {
      enabled: false,
    },
    mpulse: {
      enabled: true,
    },
    navOnArticles: {
      enabled: false,
    },
    mostRead: {
      enabled: false,
    },
  },
};

export default toggles;
