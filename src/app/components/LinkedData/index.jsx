import React from 'react';
import Helmet from 'react-helmet';
import { string } from 'prop-types';

const LinkedData = ({
  type,
  seoHeadline,
  firstPublished,
  lastUpdated,
  optimoId,
  service,
  logoUrl,
  publishingPrinciples,
  noBylinesPolicy,
}) => {
  const imgObject = 'ImageObject';
  const newsMediaOrg = 'NewsMediaOrganization';

  const logo = {
    '@type': imgObject,
    width: 1024,
    height: 576,
    url: logoUrl,
  };

  const image = {
    '@type': imgObject,
    width: 1024,
    height: 576,
    url: logoUrl,
  };

  const publisher = {
    '@type': newsMediaOrg,
    name: service,
    publishingPrinciples,
    logo,
  };

  const author = {
    '@type': newsMediaOrg,
    name: service,
    logo,
    noBylinesPolicy,
  };

  const linkMetadata = {
    '@context': 'http://schema.org',
    '@type': type,
    url: `https://www.bbc.com/${service}/articles/${optimoId}`,
    publisher,
    datePublished: firstPublished,
    dateModified: lastUpdated,
    headline: seoHeadline,
    image,
    thumbnailUrl: logoUrl,
    author,
  };

  return (
    <Helmet>
      {/* eslint-disable react/no-danger */}
      <script type="application/ld+json">{JSON.stringify(linkMetadata)}</script>
    </Helmet>
  );
};

LinkedData.propTypes = {
  type: string.isRequired,
  seoHeadline: string.isRequired,
  firstPublished: string.isRequired,
  lastUpdated: string.isRequired,
  optimoId: string.isRequired,
  service: string.isRequired,
  publishingPrinciples: string.isRequired,
  noBylinesPolicy: string.isRequired,
  logoUrl: string.isRequired,
};

export default LinkedData;
