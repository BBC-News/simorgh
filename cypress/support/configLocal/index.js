export default {
  baseUrl: 'http://localhost:7080',
  baseUrlNonSTLD: 'http://localhost:7080',
  assetUrl: 'http://localhost:7080',
  assetOrigin: 'http://localhost:7080',
  atiAnalyticsWSBucket: '598343',
  services: {
    // Proof we can add all services in this config file, even without coding anything.
    mundo: {
      subDir: '/mundo',
      errorPages: undefined,
      manifestPath: undefined,
      serviceWorkerPath: undefined,
      attributes: {
        lang: undefined,
        dir: undefined,
      },
      pageTypes: {
        articles: undefined,
        frontPage: undefined,
      },
    },
    news: {
      subDir: '/news',
      errorPages: '/news/articles/cxvxrj8tvppo',
      manifestPath: '/news/articles/manifest.json',
      serviceWorkerPath: '/news/articles/sw.js',
      attributes: {
        lang: 'en_GB',
        dir: 'ltr',
      },
      pageTypes: {
        articles: {
          path: '/articles',
          basicAsset: '/c0g992jmmkko',
          fullyFeaturedAsset: undefined,
          nonExistent: '/cxvxrj8tvppo',
          // Special case
          threeSubheadlines: '/c6v11qzyv8po',
          featureFlags: {
            amp: true,
            atiAnalytics: true,
            cookieTests: true,
            dataEndpoint: true,
            header: true,
            footer: true,
            meta: true,
          },
        },
        frontPage: undefined,
      },
    },
    persian: {
      subDir: '/persian',
      errorPages: '/persian/articles/cxvxrj8tvppo',
      manifestPath: '/persian/articles/manifest.json',
      serviceWorkerPath: '/persian/articles/sw.js',
      attributes: {
        lang: 'fa',
        dir: 'rtl',
      },
      pageTypes: {
        articles: {
          path: '/articles',
          basicAsset: '/c4vlle3q337o',
          fullyFeaturedAsset: undefined,
          nonExistent: '/cxvxrj8tvppo',
          featureFlags: {
            amp: true,
            atiAnalytics: true,
            cookieTests: true,
            dataEndpoint: true,
            header: true,
            footer: true,
            meta: true,
          },
        },
        frontPage: undefined,
      },
    },
    igbo: {
      subDir: '/igbo',
      errorPages: undefined,
      manifestPath: '/igbo/manifest.json',
      serviceWorkerPath: '/igbo/sw.js',
      attributes: {
        lang: undefined,
        dir: undefined,
      },
      pageTypes: {
        articles: undefined,
        frontPage: {
          featureFlags: {
            amp: false,
            atiAnalytics: false,
            cookieTests: true,
            dataEndpoint: false,
            header: false,
            footer: false,
            meta: false,
          },
        },
      },
    },
    pidgin: {
      subDir: '/pidgin',
      errorPages: undefined,
      manifestPath: '/pidgin/manifest.json',
      serviceWorkerPath: '/pidgin/sw.js',
      attributes: {
        lang: undefined,
        dir: undefined,
      },
      pageTypes: {
        articles: undefined,
        frontPage: {
          featureFlags: {
            amp: false,
            atiAnalytics: false,
            cookieTests: true,
            dataEndpoint: false,
            header: false,
            footer: false,
            meta: false,
          },
        },
      },
    },
    yoruba: {
      subDir: '/yoruba',
      errorPages: undefined,
      manifestPath: '/yoruba/manifest.json',
      serviceWorkerPath: '/yoruba/sw.js',
      attributes: {
        lang: undefined,
        dir: undefined,
      },
      pageTypes: {
        articles: undefined,
        frontPage: {
          featureFlags: {
            amp: false,
            atiAnalytics: false,
            cookieTests: true,
            dataEndpoint: false,
            header: false,
            footer: false,
            meta: false,
          },
        },
      },
    },
  },
};
