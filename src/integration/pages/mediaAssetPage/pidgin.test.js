/**
 * @pathname /pidgin/23248703
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

describe('Given I am on a Pidgin AMP Media Asset Page', () => {
  describe('When I am using the website', () => {
    runAmpUserTests({
      imageUrl: 'https://ichef.test.bbci.co.uk/images/ic/1024x576/p01kx435.jpg',
      mediaEmbedUrl:
        'https://polling.test.bbc.co.uk/ws/av-embeds/cps/pidgin/23248703/p01kx42v/pcm/amp',
    });
  });

  describe('When the application starts', () => {
    runCoreAmpTests({ service: 'pidgin' });
  });

  describe('When I am using assistive technology', () => {
    runAmpA11yTests({
      mediaPlayerTitle: 'Media player',
    });
  });
});

describe('Given I am on a Pidgin Canonical Media Asset Page', () => {
  describe('When I am using the website', () => {
    runCanonicalUserTests({
      mediaEmbedUrl:
        'https://polling.test.bbc.co.uk/ws/av-embeds/cps/pidgin/23248703/p01kx42v/pcm',
    });
  });

  describe('When I am analysing user/performance metrics', () => {
    runCommonCanonicalAnalyticsTests();
  });

  describe('When the application starts', () => {
    runCoreCanonicalTests({ service: 'pidgin' });
  });

  describe('When I am using assistive technology', () => {
    runCanonicalA11yTests({
      mediaPlayerTitle: 'Media player',
    });
  });
});

describe('Given I am on a Pidgin Media Asset Page', () => {
  describe('When I am using the website', () => {
    runHeaderTests({
      skipToContentText: 'Waka go wetin de inside',
    });

    runUserTests({
      headlineText:
        'Simorgh: Media Pod Build First CPS Media Asset Page in Simorgh with the Help of Drew & < >',
      timestamp: '13 September 2019',
      bulletedListItem:
        'sunt in culpa qui officia deserunt mollit anim id est laborum',
      relatedContentHeadline: 'BBC News Pidgin One Minute News',
    });

    runFooterTests({
      copyrightAndExternalLinkingText:
        '© 2020 BBC. De external site no concern BBC. De way wey we de take go external link.',
      brandingLink: '/pidgin',
    });
  });

  describe('When a search engine is crawling the website', () => {
    runCommonSeoTests({
      pageTitle:
        'Simorgh: Media Pod Build First CPS Media Asset Page in Simorgh with the Help of Drew & < > - BBC News Pidgin',
      canonicalUrl: 'http://localhost:7080/pidgin/23248703',
      readingDirection: 'ltr',
      language: 'pcm',
      fbAdmins: '100004154058350',
      fbAppId: '1609039196070050',
      fbPages:
        '285361880228,192168680794107,9432520138,347501767628,264572343581678,303522857815,166580710064489,592266607456680,260669183761,160817274042538,236659822607,237647452933504,10150118096995434,113097918700687,143048895744759,81395234664,207150596007088,167959249906191,64040652712,190992343324,103678496456574,367167334474,160894643929209,186742265162,1526071940947174,230299653821,124158667615790,126548377386804,298318986864908,1068750829805728,228458913833525,163571453661989,660673490805047,948946275170651,485274381864409,1633841096923106,654070648098812',
      ogImage:
        'http://ichef.test.bbci.co.uk/news/1024/branded_pidgin/6FC4/test/_63721682_p01kx435.jpg',
      ogImageAlt: 'connectionAltText',
      ogLocale: 'pcm',
      ogType: 'article',
      ogUrl: 'http://localhost:7080/pidgin/23248703',
      ogSiteName: 'BBC News Pidgin',
      twitterCard: 'summary_large_image',
      twitterCreator: '@BBCNews',
      twitterImageAlt: 'connectionAltText',
      twitterImageSrc:
        'http://ichef.test.bbci.co.uk/news/1024/branded_pidgin/6FC4/test/_63721682_p01kx435.jpg',
      twitterSite: '@BBCNews',
      ogDescription:
        'This week, CPS media assets were visible in Simorgh for the first time. The pages were built out in a matter of weeks using existing Psammead Components.',
      ogTitle:
        'Simorgh: Media Pod Build First CPS Media Asset Page in Simorgh with the Help of Drew & < > - BBC News Pidgin',
      twitterDescription:
        'This week, CPS media assets were visible in Simorgh for the first time. The pages were built out in a matter of weeks using existing Psammead Components.',
      twitterTitle:
        'Simorgh: Media Pod Build First CPS Media Asset Page in Simorgh with the Help of Drew & < > - BBC News Pidgin',
      linkedData:
        '{"@context":"http://schema.org","@type":"Article","url":"http://localhost:7080/pidgin/23248703","publisher":{"@type":"NewsMediaOrganization","name":"BBC News Pidgin","publishingPrinciples":"https://www.bbc.com/pidgin/institutional-48528766","logo":{"@type":"ImageObject","width":1024,"height":576,"url":"https://news.files.bbci.co.uk/ws/img/logos/og/pidgin.png"}},"image":{"@type":"ImageObject","width":1024,"height":576,"url":"https://news.files.bbci.co.uk/ws/img/logos/og/pidgin.png"},"thumbnailUrl":"https://news.files.bbci.co.uk/ws/img/logos/og/pidgin.png","mainEntityOfPage":{"@type":"WebPage","@id":"http://localhost:7080/pidgin/23248703","name":"Simorgh: Media Pod Build First CPS Media Asset Page in Simorgh with the Help of Drew & \\u003c >"},"headline":"Simorgh: Media Pod Build First CPS Media Asset Page in Simorgh with the Help of Drew & \\u003c >","datePublished":"2019-09-13T15:31:44.000Z","dateModified":"2019-11-20T12:24:25.000Z","author":{"@type":"NewsMediaOrganization","name":"BBC News Pidgin","logo":{"@type":"ImageObject","width":1024,"height":576,"url":"https://news.files.bbci.co.uk/ws/img/logos/og/pidgin.png"},"noBylinesPolicy":"https://www.bbc.com/pidgin/institutional-48528766#authorexpertise"}}',
    });
  });

  describe('When optimising the application performance', () => {
    runPerformanceTests();
  });

  describe('When I am using assistive technology', () => {
    runCommonA11yTests({
      skipToContentText: 'Waka go wetin de inside',
      headlineText:
        'Simorgh: Media Pod Build First CPS Media Asset Page in Simorgh with the Help of Drew & < >',
    });
  });

  describe('When I view the source code in the browser', () => {
    runSnapshotTests();
  });
});
