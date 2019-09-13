import React from 'react';
import { StoryPromoImage } from '../../StoryPromo';

// eslint-disable-next-line react/prop-types
const ImageContainer = ({ uuid, path, height, width }) => {
  const imageValues = { height, width, path };
  return (
    <StoryPromoImage
      key={uuid}
      topStory="false"
      imageValues={imageValues}
      lazyLoad="true"
    />
  );
};

export default ImageContainer;
