import React, { Fragment } from 'react';
import { node, string, bool } from 'prop-types';
import Helmet from 'react-helmet';
import HeaderContainer from '../containers/Header';
import FooterContainer from '../containers/Footer';
import { ServiceContextProvider } from '../contexts/ServiceContext';
import { RequestContextProvider } from '../contexts/RequestContext';
import GlobalStyle from '../lib/globalStyles';
import ConsentBanner from '../containers/ConsentBanner';

const PageWrapper = ({ bbcOrigin, children, service, isAmp }) => (
  <Fragment>
    <GlobalStyle />
    <RequestContextProvider
      platform={isAmp ? 'amp' : 'canonical'}
      bbcOrigin={bbcOrigin}
    >
      <ServiceContextProvider service={service}>
        <Helmet>
          <link rel="manifest" href={`/${service}/articles/manifest.json`} />
        </Helmet>
        <ConsentBanner />
        <HeaderContainer />
        {children}
        <FooterContainer />
      </ServiceContextProvider>
    </RequestContextProvider>
  </Fragment>
);

PageWrapper.propTypes = {
  bbcOrigin: string,
  children: node.isRequired,
  service: string.isRequired,
  isAmp: bool.isRequired,
};

PageWrapper.defaultProps = {
  bbcOrigin: null,
};

PageWrapper.defaultProps = {};

export default PageWrapper;
