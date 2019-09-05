import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { latin } from '@bbc/gel-foundations/scripts';
import { afrique as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/Europe/London';

const service = {
  lang: `fr`,
  articleAuthor: `https://facebook.com/bbcnewsafrique`,
  articleTimestampPrefix: 'Updated',
  atiAnalyticsAppName: 'news-afrique',
  atiAnalyticsProducerId: '3',
  brandName: 'BBC News Afrique',
  product: 'BBC News Afrique',
  defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/afrique.png',
  defaultImageAltText: 'BBC News Afrique',
  dir: `ltr`,
  externalLinkText: ', lien externe',
  imageCaptionOffscreenText: 'Image caption, ',
  videoCaptionOffscreenText: 'Video caption, ',
  audioCaptionOffscreenText: 'Audio caption',
  defaultCaptionOffscreenText: 'Caption, ',
  imageCopyrightOffscreenText: 'Image source, ',
  locale: `fr`,
  datetimeLocale: `fr`,
  service: 'afrique',
  serviceName: 'News Afrique',
  themeColor: `${C_POSTBOX}`,
  twitterCreator: '@bbcafrique',
  twitterSite: '@bbcafrique',
  noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
  publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
  script: latin,
  manifestPath: '/manifest.json',
  swPath: '/sw.js',
  frontPageTitle: 'Accueil',
  translations: {
    seeAll: 'Tout voir',
    home: 'Accueil',
    currentPage: 'Current page',
    skipLinkText: 'Aller au contenu',
    error: {
      404: {
        statusCode: '404',
        title: '404 - Page non trouvée',
        message:
          "Vous avez peut-être mal entré l'adresse internet. Veuillez vérifier l'adresse.",
        solutions: [
          'Double checking the url',
          'Hitting the refresh button in your browser',
          'Searching for this page using the BBC search bar',
        ],
        callToActionFirst: 'Alternatively, please visit the ',
        callToActionLinkText: "Page d'accueil BBC",
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/afrique',
      },
      500: {
        statusCode: '500',
        title: '500 - Erreur',
        message: "Une erreur s'est produite. Veuillez rafraichir la page.",
        solutions: [
          'Hitting the refresh button in your browser',
          'Coming back again later',
        ],
        callToActionFirst: 'Alternatively, please visit the ',
        callToActionLinkText: "Page d'accueil BBC",
        callToActionLast: '',
        callToActionLinkUrl: 'https://www.bbc.com/afrique',
      },
    },
    consentBanner: {
      privacy: {
        title:
          'Nous avons mis à jour nos politiques de confidentialité et de cookies',
        description: {
          uk: {
            first:
              "Nous avons apporté d'importants changements à notre politique de confidentialité et de cookies et nous voulons que vous sachiez ce que cela signifie pour vous et vos données.",
            linkText: null,
            last: null,
            linkUrl: null,
          },
          international: {
            first:
              "Nous avons apporté d'importants changements à notre politique de confidentialité et de cookies et nous voulons que vous sachiez ce que cela signifie pour vous et vos données.",
            linkText: null,
            last: null,
            linkUrl: null,
          },
        },
        accept: 'OK',
        reject: 'Découvrez ce qui a changé',
        rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
      },
      cookie: {
        title: 'Faites-nous savoir que vous acceptez les cookies',
        description: {
          uk: {
            first: 'Nous utilisons ',
            linkText: 'cookies',
            last:
              ' pour vous offrir la meilleur expérience en ligne. Veuillez nous faire savoir si vous acceptez tous ces cookies.',
            linkUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
          international: {
            first: 'Nous et nos partenaires utilisons des technologies, comme ',
            linkText: 'cookies',
            last:
              ", et collectons des données de navigation pour vous offrir la meilleure expérience en ligne et pour personnaliser le contenu et la publicité qui vous sont présentés. Veuillez nous faire savoir si vous êtes d'accord.",
            linkUrl:
              'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
          },
        },
        accept: "Oui, j'accepte",
        reject: 'Non, dirigez-moi vers les réglages',
        rejectUrl:
          'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
      },
    },
    media: {
      audio: 'Audio',
      photogallery: 'En images',
      video: 'Video',
      bbc_afrique_radio: {
        title: 'BBC Afrique Radio',
        subtitle: 'Infos, musique et sports',
      },
      bbc_afrique_tv: {
        title: 'Cash Éco',
        subtitle:
          'Cash éco vous propose chaque jour un résumé de l’actualité économique et financière.',
      },
    },
  },
  brandSVG,
  mostRead: {
    header: 'Les plus lus',
    lastUpdated: 'Dernière mise à jour: ',
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
    copyrightText:
      "BBC. La BBC n'est pas responsable du contenu de sites externes",
  },
  fonts: [],
  timezone: 'Europe/London',
};

export default service;
