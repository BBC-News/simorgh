import React, { useContext } from 'react';
import Helmet from 'react-helmet';
import { string, shape, arrayOf, bool } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import getAboutTagsContent from './getAboutTagsContent';

const LinkedData = ({
  showAuthor,
  type,
  seoTitle,
  headline,
  datePublished,
  dateModified,
  aboutTags,
}) => {
  const {
    brandName,
    publishingPrinciples,
    defaultImage,
    noBylinesPolicy,
  } = useContext(ServiceContext);
  const { canonicalNonUkLink } = useContext(RequestContext);
  const IMG_TYPE = 'ImageObject';
  const ORG_TYPE = 'NewsMediaOrganization';
  const WEB_PAGE_TYPE = 'WebPage';

  const logo = {
    '@type': IMG_TYPE,
    width: 1024,
    height: 576,
    url: defaultImage,
  };

  const image = {
    '@type': IMG_TYPE,
    width: 1024,
    height: 576,
    url: defaultImage,
  };

  const publisher = {
    '@type': ORG_TYPE,
    name: brandName,
    publishingPrinciples,
    logo,
  };
  const mainEntityOfPage = {
    '@type': WEB_PAGE_TYPE,
    '@id': canonicalNonUkLink,
    name: seoTitle,
  };

  const linkedData = {
    '@context': 'http://schema.org',
    '@type': type,
    url: canonicalNonUkLink,
    publisher,
    image,
    thumbnailUrl: defaultImage,
    mainEntityOfPage,
    headline,
    datePublished,
    dateModified,
    ...(aboutTags && { about: getAboutTagsContent(aboutTags) }),
    ...(showAuthor && {
      author: {
        '@type': ORG_TYPE,
        name: brandName,
        logo: {
          '@type': 'ImageObject',
          width: 1024,
          height: 576,
          url: defaultImage,
        },
        noBylinesPolicy,
      },
    }),
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          // spread to a new object to remove undefined properties
          ...linkedData,
        })}
      </script>
    </Helmet>
  );
};

LinkedData.propTypes = {
  showAuthor: bool,
  type: string.isRequired,
  seoTitle: string.isRequired,
  headline: string,
  datePublished: string,
  dateModified: string,
  aboutTags: arrayOf(
    shape({
      '@type': string,
      name: string,
      sameAs: arrayOf(string),
    }),
  ),
};

LinkedData.defaultProps = {
  showAuthor: false,
  headline: undefined,
  datePublished: undefined,
  dateModified: undefined,
  aboutTags: undefined,
};

export default LinkedData;
