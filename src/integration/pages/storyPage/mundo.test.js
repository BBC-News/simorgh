/**
 * @pathname /mundo/noticias-internacional-51266689
 */

import runCanonicalUserTests from './user.canonical';
import runAmpUserTests from './user.amp';
import {
  runFooterTests,
  runHeaderTests,
  runCommonSeoTests,
  runCommonCanonicalAnalyticsTests,
  runCommonAmpAnalyticsTests,
  runCommonA11yTests,
  runCoreAmpTests,
  runCoreCanonicalTests,
  runPerformanceTests,
  runSnapshotTests,
} from '../../common';

describe('Given I am on a Mundo story AMP page', () => {
  describe('When I am using the website', () => {
    runAmpUserTests();
  });

  describe('When the application starts', () => {
    runCoreAmpTests();
  });

  describe('When I am analysing user/performance metrics', () => {
    runCommonAmpAnalyticsTests();
  });
});

describe('Given I am on a Mundo story Canonical page', () => {
  describe('When I am using the website', () => {
    runCanonicalUserTests({
      imageAltText:
        'A person holding a union jack umbrella in front of Big Ben',
      imageCaptionText: 'Llegó el día de la salida de Reino Unido de la UE.',
    });
  });

  describe('When I am analysing user/performance metrics', () => {
    runCommonCanonicalAnalyticsTests();
  });

  describe('When the application starts', () => {
    runCoreCanonicalTests({ service: 'mundo' });
  });
});

describe('Given I am on a Mundo story AMP/Canonical page', () => {
  describe('When I am using the website', () => {
    runHeaderTests({
      skipToContentText: 'Ir al contenido',
    });

    runFooterTests({
      copyrightAndExternalLinkingText:
        '© 2020 BBC. La BBC no se hace responsable del contenido de sitios externos. Lee sobre nuestra postura acerca de enlaces externos.',
      brandingLink: '/mundo',
    });
  });

  describe('When a search engine is crawling the website', () => {
    runCommonSeoTests({
      pageTitle:
        'Brexit: qué cambiará para visitar, trabajar y estudiar en Reino Unido tras la salida del país de la Unión Europea - BBC News Mundo',
      canonicalUrl:
        'http://localhost:7080/mundo/noticias-internacional-51266689',
      readingDirection: 'ltr',
      language: 'es',
      fbAdmins: '100004154058350',
      fbAppId: '1609039196070050',
      fbPages:
        '285361880228,192168680794107,9432520138,347501767628,264572343581678,303522857815,166580710064489,592266607456680,260669183761,160817274042538,236659822607,237647452933504,10150118096995434,113097918700687,143048895744759,81395234664,207150596007088,167959249906191,64040652712,190992343324,103678496456574,367167334474,160894643929209,186742265162,1526071940947174,230299653821,124158667615790,126548377386804,298318986864908,1068750829805728,228458913833525,163571453661989,660673490805047,948946275170651,485274381864409,1633841096923106,654070648098812',
      ogImage:
        'http://ichef.test.bbci.co.uk/news/1024/branded_mundo/17D42/production/_110620679_gettyimages-542984918.jpg',
      ogImageAlt: 'A person holding a union jack umbrella in front of Big Ben',
      ogLocale: 'es-005',
      ogType: 'article',
      ogUrl: 'http://localhost:7080/mundo/noticias-internacional-51266689',
      ogSiteName: 'BBC News Mundo',
      twitterCard: 'summary_large_image',
      twitterCreator: '@bbcmundo',
      twitterImageAlt:
        'A person holding a union jack umbrella in front of Big Ben',
      twitterImageSrc:
        'http://ichef.test.bbci.co.uk/news/1024/branded_mundo/17D42/production/_110620679_gettyimages-542984918.jpg',
      twitterSite: '@bbcmundo',
      ogDescription:
        'Tras casi cuatro años de desacuerdos y negociaciones, este viernes Reino Unido dejará formalmente la Unión Europea. ¿Qué cambios supone esto para quienes quieran hacer turismo, estudiar o trabajar en Reino Unido?',
      ogTitle:
        'Brexit: qué cambiará para visitar, trabajar y estudiar en Reino Unido tras la salida del país de la Unión Europea - BBC News Mundo',
      twitterDescription:
        'Tras casi cuatro años de desacuerdos y negociaciones, este viernes Reino Unido dejará formalmente la Unión Europea. ¿Qué cambios supone esto para quienes quieran hacer turismo, estudiar o trabajar en Reino Unido?',
      twitterTitle:
        'Brexit: qué cambiará para visitar, trabajar y estudiar en Reino Unido tras la salida del país de la Unión Europea - BBC News Mundo',
      linkedData:
        '{"@context":"http://schema.org","@type":"BackgroundNewsArticle","url":"http://localhost:7080/mundo/noticias-internacional-51266689","publisher":{"@type":"NewsMediaOrganization","name":"BBC News Mundo","publishingPrinciples":"https://www.bbc.com/mundo/institucional-51359666","logo":{"@type":"ImageObject","width":1024,"height":576,"url":"https://news.files.bbci.co.uk/ws/img/logos/og/mundo.png"}},"image":{"@type":"ImageObject","width":1024,"height":576,"url":"https://news.files.bbci.co.uk/ws/img/logos/og/mundo.png"},"thumbnailUrl":"https://news.files.bbci.co.uk/ws/img/logos/og/mundo.png","mainEntityOfPage":{"@type":"WebPage","@id":"http://localhost:7080/mundo/noticias-internacional-51266689","name":"Brexit: qué cambiará para visitar, trabajar y estudiar en Reino Unido tras la salida del país de la Unión Europea"},"headline":"Brexit: qué cambiará para visitar, trabajar y estudiar en Reino Unido tras la salida del país de la Unión Europea","description":"Tras casi cuatro años de desacuerdos y negociaciones, este viernes Reino Unido dejará formalmente la Unión Europea. ¿Qué cambios supone esto para quienes quieran hacer turismo, estudiar o trabajar en Reino Unido?","datePublished":"2020-01-30T06:35:49.000Z","dateModified":"2020-01-31T23:08:08.000Z","about":[{"@type":"Thing","name":"Europe","sameAs":["http://dbpedia.org/resource/Europe"]},{"@type":"Thing","name":"United Kingdom"},{"@type":"Thing","name":"Culture","sameAs":["http://dbpedia.org/resource/Culture"]},{"@type":"Thing","name":"European Union","sameAs":["http://dbpedia.org/resource/European_Union"]},{"@type":"Thing","name":"Economics","sameAs":["http://dbpedia.org/resource/Economy"]},{"@type":"Thing","name":"Brexit","sameAs":["http://dbpedia.org/resource/Brexit"]}],"author":{"@type":"NewsMediaOrganization","name":"BBC News Mundo","logo":{"@type":"ImageObject","width":1024,"height":576,"url":"https://news.files.bbci.co.uk/ws/img/logos/og/mundo.png"},"noBylinesPolicy":"https://www.bbc.com/mundo/institucional-51359666#authorexpertise"}}',
    });

    describe('When optimising the application performance', () => {
      runPerformanceTests();
    });
  });

  describe('When I am using assistive technology', () => {
    runCommonA11yTests({
      skipToContentText: 'Ir al contenido',
      headlineText:
        'Brexit: qué cambiará para visitar, trabajar y estudiar en Reino Unido tras la salida del país de la Unión Europea',
    });
  });

  describe('When I view the source code in the browser', () => {
    runSnapshotTests();
  });
});
