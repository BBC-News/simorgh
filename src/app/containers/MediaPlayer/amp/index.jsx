import React from 'react';
import Helmet from 'react-helmet';
import { string } from 'prop-types';

const AmpHead = () => {
  return (
    <Helmet>
      <script
        async
        custom-element="amp-iframe"
        src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"
      />
    </Helmet>
  );
};

const AmpMediaPlayer = ({ embedSrc, placeholderSrc }) => {
  return (
    <React.Fragment>
      <AmpHead />
      <amp-iframe
        sandbox="allow-scripts allow-same-origin"
        layout="fill"
        frameborder="0"
        src={embedSrc}
        allowfullscreen
      >
        <amp-img layout="fill" src={placeholderSrc} placeholder />
      </amp-iframe>
    </React.Fragment>
  );
};

AmpMediaPlayer.propTypes = {
  embedSrc: string.isRequired,
  placeholderSrc: string,
};

AmpMediaPlayer.defaultProps = {
  placeholderSrc: null,
};

export default AmpMediaPlayer;
