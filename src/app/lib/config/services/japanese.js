import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { noAscendersOrDescenders } from '@bbc/gel-foundations/scripts';
import { japanese as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/Asia/Tokyo';

const service = {
  default: {
    lang: `ja`,
    articleAuthor: `https://www.facebook.com/bbcnewsjapan/`,
    articleTimestampPrefix: 'Updated',
    atiAnalyticsAppName: 'news-japanese',
    atiAnalyticsProducerId: '56',
    brandName: 'BBCニュース',
    product: 'BBC',
    serviceLocalizedName: 'ニュース',
    defaultImage:
      'https://news.files.bbci.co.uk/ws/img/logos/twitter/bbc_japan_1024.png',
    defaultImageAltText: 'BBCニュース',
    dir: `ltr`,
    externalLinkText: ', external',
    imageCaptionOffscreenText: 'Image caption, ',
    videoCaptionOffscreenText: 'Video caption, ',
    audioCaptionOffscreenText: 'Audio caption',
    defaultCaptionOffscreenText: 'Caption, ',
    imageCopyrightOffscreenText: 'Image source, ',
    locale: `ja-JP`,
    datetimeLocale: `ja-jp`,
    service: 'japanese',
    serviceName: 'ニュース',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcnewsjapan',
    twitterSite: '@bbcnewsjapan',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    script: noAscendersOrDescenders,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'ホーム',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: 'See all',
      home: 'ホーム',
      currentPage: 'Current page',
      skipLinkText: 'コンテンツへ移動',
      relatedContent: 'Related content',
      error: {
        404: {
          statusCode: '404',
          title: '404 - ページが見つかりません',
          message: 'URLが正しいか確認してください。',
          solutions: [
            'Double checking the url',
            'Hitting the refresh button in your browser',
            'Searching for this page using the BBC search bar',
          ],
          callToActionFirst: 'Alternatively, please visit the ',
          callToActionLinkText: 'BBCニュース　ホームページ',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/japanese',
        },
        500: {
          statusCode: '500',
          title: '500 - エラー',
          message: 'エラーが起きました。ページを読み込み直してください',
          solutions: [
            'Hitting the refresh button in your browser',
            'Coming back again later',
          ],
          callToActionFirst: 'Alternatively, please visit the ',
          callToActionLinkText: 'BBCニュース　ホームページ',
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/japanese',
        },
      },
      consentBanner: {
        privacy: {
          title: "We've updated our Privacy and Cookies Policy",
          description: {
            uk: {
              first:
                "We've made some important changes to our Privacy and Cookies Policy and we want you to know what this means for you and your data.",
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                "We've made some important changes to our Privacy and Cookies Policy and we want you to know what this means for you and your data.",
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'OK',
          reject: "Find out what's changed",
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
        },
        cookie: {
          title: 'Let us know you agree to cookies',
          description: {
            uk: {
              first: 'We use ',
              linkText: 'cookies',
              last:
                ' to give you the best online experience. Please let us know if you agree to all of these cookies.',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first: 'We and our partners use technologies, such as ',
              linkText: 'cookies',
              last:
                ', and collect browsing data to give you the best online experience and to personalise the content and advertising shown to you. Please let us know if you agree.',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
          },
          accept: 'Yes, I agree',
          reject: 'No, take me to settings',
          rejectUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
        },
      },
      media: {
        audio: 'Audio',
        photogallery: '写真ギャラリー',
        video: 'Video',
      },
    },
    brandSVG,
    mostRead: {
      header: 'Most read',
      lastUpdated: 'Last updated: ',
    },
    footer: {
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text: 'Read about our approach to external linking.',
      },
      links: [
        {
          href: 'https://www.bbc.com/news/help-41670342',
          text: 'Why you can trust the BBC',
        },
        {
          href: 'https://www.bbc.com/terms',
          text: 'Terms of Use',
        },
        {
          href: 'https://www.bbc.com/privacy/',
          text: 'Privacy Policy',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.com/contact/',
          text: 'Contact the BBC',
        },
      ],
      copyrightText: 'BBC。BBCは外部サイトの内容に責任を負いません',
    },
    fonts: [],
    timezone: 'Asia/Tokyo',
    navigation: [
      {
        title: 'ホーム',
        url: '/japanese',
      },
      {
        title: '読み物・解説',
        url: '/japanese/features_and_analysis',
      },
      {
        title: 'ビデオ',
        url: '/japanese/video',
      },
      {
        title: 'ワールドニュースTV',
        url: 'https://www.bbcworldnews-japan.com/',
      },
      {
        title: 'BBC News',
        url: '/news',
      },
    ],
  },
};

export default service;
