/**
 * @pathname /persian/iran/2016/09/160907_tc2_testmap1
 */

import runCanonicalUserTests from './user.canonical';
import runAmpUserTests from './user.amp';
import runUserTests from './user';
import runCanonicalA11yTests from './a11y.canonical';
import runAmpA11yTests from './a11y.amp';

import {
  runHeaderTests,
  runFooterTests,
  runCommonSeoTests,
  runCommonCanonicalAnalyticsTests,
  runCoreCanonicalTests,
  runCoreAmpTests,
  runCommonA11yTests,
  runPerformanceTests,
  runSnapshotTests,
} from '../../common';

describe('Given I am on a Persian TC2 AMP Media Asset Page', () => {
  describe('When I am using the website', () => {
    runAmpUserTests({
      imageUrl: 'http://localhost:7080/images/media_placeholder.png',
      mediaEmbedUrl:
        'https://polling.test.bbc.co.uk/ws/av-embeds/legacy/persian/iran/2016/09/160907_tc2_testmap1/17698244/fa/amp',
    });
  });

  describe('When the application starts', () => {
    runCoreAmpTests({ service: 'persian' });
  });

  describe('When I am using assistive technology', () => {
    runAmpA11yTests({
      mediaPlayerTitle: 'پخش صدا و تصویر',
    });
  });
});

describe('Given I am on a Persian TC2 Canonical Media Asset Page', () => {
  describe('When I am using the website', () => {
    runCanonicalUserTests({
      mediaEmbedUrl:
        'https://polling.test.bbc.co.uk/ws/av-embeds/legacy/persian/iran/2016/09/160907_tc2_testmap1/17698244/fa',
    });
  });

  describe('When I am analysing user/performance metrics', () => {
    runCommonCanonicalAnalyticsTests();
  });

  describe('When the application starts', () => {
    runCoreCanonicalTests({ service: 'persian' });
  });

  describe('When I am using assistive technology', () => {
    runCanonicalA11yTests({
      mediaPlayerTitle: 'پخش صدا و تصویر',
    });
  });
});

describe('Given I am on a Persian TC2 Media Asset Page', () => {
  describe('When I am using the website', () => {
    runHeaderTests({
      skipToContentText: 'مشاهده محتوا',
    });

    runUserTests({
      headlineText:
        "جامعه بهایی خواستار رفع 'بی عدالتی های اقتصادی' علیه بهاییان ایران شد",
      timestamp: '۱۷ شهریور ۱۳۹۵ - ۷ سپتامبر ۲۰۱۶',
    });

    runFooterTests({
      copyrightAndExternalLinkingText:
        '© 2020 بی بی سی. بی بی سی مسئول محتوای سایت های دیگر نیست. سیاست ما درباره لینک دادن به سایت های دیگر.',
      brandingLink: '/persian',
    });
  });

  describe('When a search engine is crawling the website', () => {
    runCommonSeoTests({
      pageTitle:
        "جامعه بهایی خواستار رفع 'بی عدالتی های اقتصادی' علیه بهاییان ایران شد - BBC News فارسی",
      canonicalUrl:
        'http://localhost:7080/persian/iran/2016/09/160907_tc2_testmap1',
      readingDirection: 'rtl',
      language: 'fa',
      fbAdmins: '100004154058350',
      fbAppId: '1609039196070050',
      fbPages:
        '285361880228,192168680794107,9432520138,347501767628,264572343581678,303522857815,166580710064489,592266607456680,260669183761,160817274042538,236659822607,237647452933504,10150118096995434,113097918700687,143048895744759,81395234664,207150596007088,167959249906191,64040652712,190992343324,103678496456574,367167334474,160894643929209,186742265162,1526071940947174,230299653821,124158667615790,126548377386804,298318986864908,1068750829805728,228458913833525,163571453661989,660673490805047,948946275170651,485274381864409,1633841096923106,654070648098812',
      ogImage:
        'http://ichef.test.bbci.co.uk/news/1024/branded_persian/worldservice/test/assets/images/2014/11/27/141127145732_scotland_tax_144x81_getty.jpg',
      ogImageAlt: 'BBC News فارسی',
      ogLocale: 'fa',
      ogType: 'article',
      ogUrl: 'http://localhost:7080/persian/iran/2016/09/160907_tc2_testmap1',
      ogSiteName: 'BBC News فارسی',
      twitterCard: 'summary_large_image',
      twitterCreator: '@bbcpersian',
      twitterImageAlt: 'BBC News فارسی',
      twitterImageSrc:
        'http://ichef.test.bbci.co.uk/news/1024/branded_persian/worldservice/test/assets/images/2014/11/27/141127145732_scotland_tax_144x81_getty.jpg',
      twitterSite: '@bbcpersian',
      ogDescription:
        'دفتر جامعه جهانی بهایی در سازمان ملل متحد، با انتشار نامه ای سرگشاده خطاب به حسن روحانی رئیس جمهور ایران خواستار رسیدگی به "بی عدالتی های اقتصادی وارده بر بهاییان" در ایرن کشور شد.',
      ogTitle:
        "جامعه بهایی خواستار رفع 'بی عدالتی های اقتصادی' علیه بهاییان ایران شد - BBC News فارسی",
      twitterDescription:
        'دفتر جامعه جهانی بهایی در سازمان ملل متحد، با انتشار نامه ای سرگشاده خطاب به حسن روحانی رئیس جمهور ایران خواستار رسیدگی به "بی عدالتی های اقتصادی وارده بر بهاییان" در ایرن کشور شد.',
      twitterTitle:
        "جامعه بهایی خواستار رفع 'بی عدالتی های اقتصادی' علیه بهاییان ایران شد - BBC News فارسی",
      linkedData:
        '{"@context":"http://schema.org","@type":"Article","url":"http://localhost:7080/persian/iran/2016/09/160907_tc2_testmap1","publisher":{"@type":"NewsMediaOrganization","name":"BBC News فارسی","publishingPrinciples":"https://www.bbc.com/persian/institutional-49283091","logo":{"@type":"ImageObject","width":1024,"height":576,"url":"https://news.files.bbci.co.uk/ws/img/logos/og/persian.png"}},"image":{"@type":"ImageObject","width":1024,"height":576,"url":"https://news.files.bbci.co.uk/ws/img/logos/og/persian.png"},"thumbnailUrl":"https://news.files.bbci.co.uk/ws/img/logos/og/persian.png","mainEntityOfPage":{"@type":"WebPage","@id":"http://localhost:7080/persian/iran/2016/09/160907_tc2_testmap1","name":"جامعه بهایی خواستار رفع \'بی عدالتی های اقتصادی\' علیه بهاییان ایران شد"},"headline":"جامعه بهایی خواستار رفع \'بی عدالتی های اقتصادی\' علیه بهاییان ایران شد","datePublished":"2016-09-07T09:53:39.000Z","dateModified":"2016-09-07T09:53:39.000Z","author":{"@type":"NewsMediaOrganization","name":"BBC News فارسی","logo":{"@type":"ImageObject","width":1024,"height":576,"url":"https://news.files.bbci.co.uk/ws/img/logos/og/persian.png"},"noBylinesPolicy":"https://www.bbc.com/persian/institutional-49283091#authorexpertise"}}',
    });
  });

  describe('When optimising the application performance', () => {
    runPerformanceTests();
  });

  describe('When I am using assistive technology', () => {
    runCommonA11yTests({
      skipToContentText: 'مشاهده محتوا',
      headlineText:
        "جامعه بهایی خواستار رفع 'بی عدالتی های اقتصادی' علیه بهاییان ایران شد",
    });
  });

  describe('When I view the source code in the browser', () => {
    runSnapshotTests();
  });
});
