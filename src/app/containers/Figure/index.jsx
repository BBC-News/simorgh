import React from 'react';
import { string, number, objectOf, any } from 'prop-types';
import Figure from '../../components/Figure';
import Image from '../../components/Figure/Image';
import AmpImg from '../../components/Figure/Image/index.amp';
import ImagePlaceholder from '../../components/Figure/ImagePlaceholder';
import Copyright from '../Copyright';
import Caption from '../Caption';

const renderCopyright = copyright =>
  copyright ? <Copyright>{copyright}</Copyright> : null;

const renderCaption = block => (block ? <Caption block={block} /> : null);

const renderImage = (platform, alt, src, height, width) => {
  if (platform === 'amp') {
    return <AmpImg alt={alt} src={src} height={height} width={width} />;
  }

  return <Image alt={alt} src={src} height={height} width={width} />;
};

const FigureContainer = ({
  src,
  alt,
  ratio,
  copyright,
  captionBlock,
  height,
  width,
}) => (
  <Figure>
    <ImagePlaceholder ratio={ratio}>
      {renderImage('canonical', alt, src, height, width)}
      {renderCopyright(copyright)}
    </ImagePlaceholder>
    {renderCaption(captionBlock)}
  </Figure>
);

FigureContainer.propTypes = {
  alt: string.isRequired,
  height: number.isRequired,
  width: number.isRequired,
  src: string.isRequired,
  ratio: number.isRequired,
  copyright: string,
  captionBlock: objectOf(any),
};

FigureContainer.defaultProps = {
  copyright: null,
  captionBlock: null,
};

export default FigureContainer;
