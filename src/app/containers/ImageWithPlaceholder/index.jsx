import React, { useContext, useState } from 'react';
import { string, number, bool, node } from 'prop-types';
import LazyLoad from 'react-lazyload';
import ImagePlaceholder from '@bbc/psammead-image-placeholder';
import Image, { AmpImg } from '@bbc/psammead-image';
import { Helmet } from 'react-helmet';
import { BBC_BLOCKS } from '@bbc/psammead-assets/svgs';
import { C_LUNAR } from '@bbc/psammead-styles/colours';
import { RequestContext } from '#contexts/RequestContext';

const LAZYLOAD_OFFSET = 250; // amount of pixels below the viewport to begin loading the image

const renderImage = (imageToRender, lazyLoad, fallback) =>
  lazyLoad ? (
    <>
      <LazyLoad offset={LAZYLOAD_OFFSET} once>
        {imageToRender}
      </LazyLoad>
      {fallback && <noscript>{imageToRender}</noscript>}
    </>
  ) : (
    imageToRender
  );

const ImageWithPlaceholder = ({
  alt,
  children,
  copyright,
  fade,
  height,
  fallback, // only has an effect when lazyLoad == true
  lazyLoad,
  preload,
  ratio,
  src,
  sizes,
  srcset,
  width,
}) => {
  const { isAmp } = useContext(RequestContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const imageProps = { alt, src, sizes, width, srcset, fade };
  const imageToRender = (
    <Image onLoad={() => setIsLoaded(true)} {...imageProps} />
  );

  const shouldPreload = !isAmp && preload;

  return (
    <>
      {shouldPreload && (
        <Helmet>
          <link
            rel="preload"
            as="image"
            href={src}
            imagesrcset={srcset}
            imagesizes={sizes}
          />
        </Helmet>
      )}
      {isAmp ? (
        <>
          <AmpImg
            alt={alt}
            attribution={copyright || ''}
            layout="responsive"
            src={src}
            srcset={srcset}
            height={height}
            width={width}
          >
            <div style={{ backgroundColor: C_LUNAR }} placeholder>
              <amp-img
                width="77px"
                height="22px"
                src={`data:image/svg+xml;base64,${BBC_BLOCKS}`}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            </div>
          </AmpImg>
          {children}
        </>
      ) : (
        <ImagePlaceholder
          style={{ background: isLoaded && 'none' }}
          ratio={ratio}
        >
          {renderImage(imageToRender, lazyLoad, fallback)}
          {children}
        </ImagePlaceholder>
      )}
    </>
  );
};

ImageWithPlaceholder.propTypes = {
  alt: string.isRequired,
  copyright: string,
  children: node,
  height: number,
  fade: bool,
  fallback: bool,
  lazyLoad: bool,
  preload: bool,
  ratio: number.isRequired,
  src: string.isRequired,
  srcset: string,
  sizes: string,
  width: number.isRequired,
};

ImageWithPlaceholder.defaultProps = {
  copyright: null,
  children: null,
  height: null,
  fade: false,
  fallback: true,
  lazyLoad: false,
  preload: false,
  srcset: null,
  sizes: null,
};

export default ImageWithPlaceholder;
