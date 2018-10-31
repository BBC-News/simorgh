import React from 'react';
import { string, number } from 'prop-types';
import Figure from '../../components/Figure';
import Image from '../../components/Figure/Image';
import AmpImage from '../../components/Figure/Image/amp';
import ImagePlaceholder from '../../components/Figure/ImagePlaceholder';
import Copyright from '../../components/Figure/Copyright';
import Caption from '../../components/Figure/Caption';
import Text from '../../components/Text';

const renderCopyright = copyright =>
  copyright ? <Copyright>{copyright}</Copyright> : null;

const renderCaption = captionValue =>
  captionValue ? (
    <Text text={captionValue} paragraphOverride={Caption} />
  ) : null;

const FigureContainer = ({ src, alt, ratio, copyright, caption, platform }) => (
  <Figure>
    <ImagePlaceholder ratio={ratio}>
      {platform === 'amp' ? (
        <AmpImage alt={alt} src={src} ratio={ratio} />
      ) : (
        <Image alt={alt} src={src} />
      )}
      {renderCopyright(copyright)}
    </ImagePlaceholder>
    {renderCaption(caption)}
  </Figure>
);

FigureContainer.propTypes = {
  alt: string.isRequired,
  src: string.isRequired,
  ratio: number.isRequired,
  copyright: string,
  caption: string,
  platform: string.isRequired,
};

FigureContainer.defaultProps = {
  copyright: null,
  caption: null,
};

export default FigureContainer;
