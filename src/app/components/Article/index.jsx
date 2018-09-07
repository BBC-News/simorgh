import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { bool, string, node } from 'prop-types';
import Header from '../Header';
import Footer from '../../containers/Footer';
import GlobalStyle from '../../lib/globalStyles';

const Article = ({ amp, lang, title, id, children }) => {
  const canonicalLink = `https://www.bbc.com/news/articles/${id}`;
  const htmlAttributes = { lang };

  if (amp) {
    htmlAttributes.amp = amp;
  }

  return (
    <Fragment>
      <Helmet htmlAttributes={htmlAttributes}>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1"
        />
        <title>{title}</title>
        <link rel="canonical" href={canonicalLink} />
      </Helmet>
      <GlobalStyle />
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
};

Article.propTypes = {
  amp: bool.isRequired,
  children: node.isRequired,
  id: string.isRequired,
  lang: string.isRequired,
  title: string.isRequired,
};

export default Article;
