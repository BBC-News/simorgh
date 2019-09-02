import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { latin } from '@bbc/gel-foundations/scripts';
import { amharic as brandSVG } from '@bbc/psammead-assets/svgs';
import {
  F_NOTO_SANS_ETHIOPIC_BOLD,
  F_NOTO_SANS_ETHIOPIC_REGULAR,
} from '@bbc/psammead-styles/fonts';
import '@bbc/moment-timezone-include/tz/Africa/Addis_Ababa';

const service = {
  lang: `am`,
  articleAuthor: `https://www.facebook.com/bbcnewsamharic`,
  articleTimestampPrefix: 'Updated',
  atiAnalyticsAppName: 'news-amharic',
  atiAnalyticsProducerId: '4',
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
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@bbcnewsamharic',
  twitterSite: '@bbcnewsamharic',
  noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
  publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
  script: latin,
  manifestPath: '/manifest.json',
  swPath: '/sw.js',
  frontPageTitle: 'ዜና',
  translations: {
    home: 'ዜና',
    currentPage: 'Current page',
    skipLinkText: 'ወደ ዋናው ይዘት ይለፉ',
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
        title: 'በፕራይቬሲና ኩኪዎችን በመጠቀም ፖሊሲዎቻችን ላይ ማሻሻያ አድርገናል።',
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
              'በፕራይቬሲና ኩኪዎችን በመጠቀም ፖሊሲዎቻችን ላይ ጠቃሚ ለውጦችን አድርገናል። ለርስዎም ሆን በመረጃዎች ላይ ለውጦቹ ምን ማለት እንደሆኑ እንዲያውቁ እንፈልጋለን።',
            linkText: null,
            last: null,
            linkUrl: null,
          },
        },
        accept: 'እሺ',
        reject: 'ምን እንደተቀየረ ይመልከቱ',
        rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
      },
      cookie: {
        title: 'ኩኪዎችን መጠቀም ላይ መስማማትዎን ያሳውቁን',
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
            first: 'እኛም ሆን ቴክኖሎጂያችንን የሚጠቀሙ አጋሮቻችን ለምሳሌም  ',
            linkText: 'ኩኪዎችን የምንጠቀመው',
            last:
              ', ና መረጃዎችንም የምንሰብስበው የሚፈልጓቸውን መረጃዎችና ማስታወቂያዎች ቅድሚያ እንዲያገኙዋቸው በማሰብና አግልግሎታችንም የተሻለ እንዲሆን ነው።እባክዎ መስማማትዎን ያሳውቁን።',
            linkUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
        },
        accept: 'እሺ፣ እስማማለሁ',
        reject: 'ወደ ማውጫ መመለስ እፈልጋለሁ',
        rejectUrl:
          'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
      },
    },
    media: {
      audio: 'ድምጽ',
      photogallery: 'የምስል ቋት',
      video: 'ተንቀሳቃሽ ምስል',
    },
  },
  brandSVG,
  footer: {
    externalLink: {
      href: 'https://www.bbc.co.uk/help/web/links/',
      text: 'ስለ ውጪ ሊንኮች ያለን አቀራረብ፡፡',
    },
    links: [
      {
        href: 'https://www.bbc.com/news/help-41670342',
        text: 'ቢቢሲን ለምን ማመን እንደሚገባዎ',
      },
      {
        href: 'https://www.bbc.com/terms',
        text: 'የአጠቃቀም ደንብ',
      },
      {
        href: 'https://www.bbc.com/privacy/',
        text: 'የፕራይቬሲ ፖሊሲ',
      },
      {
        href: 'https://www.bbc.com/usingthebbc/cookies/',
        text: 'ኩኪዎች',
      },
      {
        href: 'https://www.bbc.com/contact/',
        text: 'ቢቢሲን ያግኙ',
      },
    ],
    copyrightText: 'BBC፡፡ ቢቢሲ ከሌሎች ድረ-ገጾች ለሚመጡ መረጃዎች ሀላፊነት አይወስድም፡፡',
  },
  fonts: [F_NOTO_SANS_ETHIOPIC_BOLD, F_NOTO_SANS_ETHIOPIC_REGULAR],
  navigation: [
    {
      title: 'ዜና',
      url: '/amharic',
    },
    {
      title: 'ኢትዮጵያ',
      url: '/amharic/topics/e986aff5-6b26-4638-b468-371d1d9617b4',
    },
    {
      title: 'ቪዲዮ',
      url: '/amharic/media/video',
    },
    {
      title: 'በጣም የተወደዱ',
      url: '/amharic/popular/read',
    },
  ],
  timezone: 'Africa/Addis_Ababa',
};

export default service;
