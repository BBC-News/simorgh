const service = {
  lang: `am-ET`,
  articleAuthor: `https://www.facebook.com/bbcnewsamharic`,
  articleTimestampPrefix: 'Updated',
  atiAnalyticsAppName: 'news-amharic',
  brandName: 'BBC News አማርኛ',
  product: 'BBC News አማርኛ',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/amharic.png',
  defaultImageAltText: 'BBC News አማርኛ',
  dir: `ltr`,
  externalLinkText: ', external',
  imageCaptionOffscreenText: 'Image caption, ',
  videoCaptionOffscreenText: 'Video caption, ',
  audioCaptionOffscreenText: 'Audio caption',
  defaultCaptionOffscreenText: 'Caption, ',
  imageCopyrightOffscreenText: 'Image source, ',
  locale: `am-ET`,
  datetimeLocale: `am-ET`.toLowerCase(),
  service: 'amharic',
  serviceName: 'News አማርኛ',
  themeColor: `#B80000`,
  twitterCreator: '@bbcnewsamharic',
  twitterSite: '@bbcnewsamharic',
  noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
  publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
  script: {
    atlas: {
      groupA: {
        fontSize: '78',
        lineHeight: '84',
      },
      groupB: {
        fontSize: '96',
        lineHeight: '104',
      },
      groupD: {
        fontSize: '140',
        lineHeight: '148',
      },
    },
    elephant: {
      groupA: {
        fontSize: '60',
        lineHeight: '64',
      },
      groupB: {
        fontSize: '78',
        lineHeight: '84',
      },
      groupD: {
        fontSize: '116',
        lineHeight: '124',
      },
    },
    imperial: {
      groupA: {
        fontSize: '50',
        lineHeight: '54',
      },
      groupB: {
        fontSize: '64',
        lineHeight: '72',
      },
      groupD: {
        fontSize: '96',
        lineHeight: '104',
      },
    },
    royal: {
      groupA: {
        fontSize: '40',
        lineHeight: '44',
      },
      groupB: {
        fontSize: '52',
        lineHeight: '60',
      },
      groupD: {
        fontSize: '76',
        lineHeight: '84',
      },
    },
    foolscap: {
      groupA: {
        fontSize: '32',
        lineHeight: '36',
      },
      groupB: {
        fontSize: '40',
        lineHeight: '44',
      },
      groupD: {
        fontSize: '56',
        lineHeight: '60',
      },
    },
    canon: {
      groupA: {
        fontSize: '28',
        lineHeight: '32',
      },
      groupB: {
        fontSize: '32',
        lineHeight: '36',
      },
      groupD: {
        fontSize: '44',
        lineHeight: '48',
      },
    },
    trafalgar: {
      groupA: {
        fontSize: '20',
        lineHeight: '24',
      },
      groupB: {
        fontSize: '24',
        lineHeight: '28',
      },
      groupD: {
        fontSize: '32',
        lineHeight: '36',
      },
    },
    paragon: {
      groupA: {
        fontSize: '20',
        lineHeight: '24',
      },
      groupB: {
        fontSize: '22',
        lineHeight: '26',
      },
      groupD: {
        fontSize: '28',
        lineHeight: '32',
      },
    },
    doublePica: {
      groupA: {
        fontSize: '18',
        lineHeight: '22',
      },
      groupB: {
        fontSize: '20',
        lineHeight: '24',
      },
      groupD: {
        fontSize: '24',
        lineHeight: '28',
      },
    },
    greatPrimer: {
      groupA: {
        fontSize: '18',
        lineHeight: '22',
      },
      groupB: {
        fontSize: '18',
        lineHeight: '22',
      },
      groupD: {
        fontSize: '20',
        lineHeight: '24',
      },
    },
    bodyCopy: {
      groupA: {
        fontSize: '15',
        lineHeight: '20',
      },
      groupB: {
        fontSize: '16',
        lineHeight: '22',
      },
      groupD: {
        fontSize: '16',
        lineHeight: '22',
      },
    },
    pica: {
      groupA: {
        fontSize: '15',
        lineHeight: '20',
      },
      groupB: {
        fontSize: '16',
        lineHeight: '20',
      },
      groupD: {
        fontSize: '16',
        lineHeight: '20',
      },
    },
    longPrimer: {
      groupA: {
        fontSize: '15',
        lineHeight: '18',
      },
      groupB: {
        fontSize: '15',
        lineHeight: '18',
      },
      groupD: {
        fontSize: '14',
        lineHeight: '18',
      },
    },
    brevier: {
      groupA: {
        fontSize: '14',
        lineHeight: '18',
      },
      groupB: {
        fontSize: '14',
        lineHeight: '18',
      },
      groupD: {
        fontSize: '13',
        lineHeight: '16',
      },
    },
    minion: {
      groupA: {
        fontSize: '12',
        lineHeight: '16',
      },
      groupB: {
        fontSize: '12',
        lineHeight: '16',
      },
      groupD: {
        fontSize: '12',
        lineHeight: '16',
      },
    },
  },
  manifestPath: '/articles/manifest.json',
  swPath: '/articles/sw.js',
  translations: {
    error: {
      404: {
        statusCode: '404',
        title: '404 - ገጹ አልተገኘም',
        message:
          'ይህ የድረገጽ አድራሻውን በትክክል ስላላስገቡ ሊሆን ይችላል፡፡ እባክዎትን አድራሻውን እና ፊደላቱን ያረጋግጡ፡፡',
        solutions: [
          'Double checking the url',
          'Hitting the refresh button in your browser',
          'Searching for this page using the BBC search bar',
        ],
        callToActionFirst: 'Alternatively, please visit the ',
        callToActionLinkText: 'የቢቢሲ ዜና መነሻ ገጽ',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/amharic',
      },
      500: {
        statusCode: '500',
        title: '500 - ስህተት',
        message: 'ስህተት ተፈጥሯል ፡ እባክዎን ገጽዎን ያድሱ',
        solutions: [
          'Hitting the refresh button in your browser',
          'Coming back again later',
        ],
        callToActionFirst: 'Alternatively, please visit the ',
        callToActionLinkText: 'የቢቢሲ ዜና መነሻ ገጽ',
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/amharic',
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
      audio: 'ድምጽ',
      photogallery: 'የምስል ቋት',
      video: 'ተንቀሳቃሽ ምስል',
      bbc_amharic_radio: {
        title: 'ያድምጡ',
        subtitle: 'ዝግጅቶቻችንን',
      },
    },
  },
  brandSVG: 'brandSVG',
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
        href: 'https://www.bbc.co.uk/aboutthebbc/',
        text: 'About the BBC',
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
        href: 'https://www.bbc.com/accessibility/',
        text: 'Accessibility Help',
      },
      {
        href: 'https://www.bbc.com/contact/',
        text: 'Contact the BBC',
      },
    ],
    copyrightText: 'ቢቢሲ፡፡ ቢቢሲ ለሌሎች የኢንተርኔት ገጾች ኃላፊነት አይወስድም',
  },
  fonts: [],
};

export default service;
