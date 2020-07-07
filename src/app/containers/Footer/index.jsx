import React, { useContext } from 'react';
import SitewideLinks from '@bbc/psammead-sitewide-links';
import { ServiceContext } from '#contexts/ServiceContext';
import BrandContainer from '../Brand';

const currentYear = () => new Date().getFullYear();
const getCopyrightText = text => (
  <>
    <span lang="en-GB">{`\u00A9`} </span>
    {`${currentYear()} ${text}`}
  </>
);

const FooterContainer = () => {
  const { footer, service, headerFooterLang } = useContext(ServiceContext);

  if (!footer) {
    return null;
  }

  // 'headerFooterLang' value is only available in the ukrainian config as our ukraine_in_russian pages will have
  // a ukrainian text for header and footer but a russian text main element
  const footerLangAttribute = headerFooterLang && { lang: headerFooterLang };

  const { externalLink, links, copyrightText, trustProjectLink } = footer;

  return (
    <footer role="contentinfo" {...footerLangAttribute}>
      <BrandContainer borderTop />
      <SitewideLinks
        links={links}
        copyrightText={getCopyrightText(copyrightText)}
        externalLink={externalLink}
        service={service}
        trustProjectLink={trustProjectLink}
      />
    </footer>
  );
};

export default FooterContainer;
