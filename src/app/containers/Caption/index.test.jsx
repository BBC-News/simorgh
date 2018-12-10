import React from 'react';
import Caption from './index';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import { ServiceContext } from '../../contexts/ServiceContext';

const newsServiceContextStub = {
  imageCaptionOffscreenText: 'Image caption, ',
};
const persianServiceContextStub = {
  imageCaptionOffscreenText: ' ، عنوان تصویر',
};

const CaptionWithContext = contextStub => (
  <ServiceContext.Provider value={contextStub}>
    <Caption captionValue="Some caption text..." />
  </ServiceContext.Provider>
);

shouldMatchSnapshot(
  'should render caption text with example News offscreen text',
  CaptionWithContext(newsServiceContextStub),
);

shouldMatchSnapshot(
  'should render caption text with example Farsi offscreen text',
  CaptionWithContext(persianServiceContextStub),
);

shouldMatchSnapshot(
  'should render caption text with no VisuallyHiddenText component when no imageCaptionOffscreenText is defined in ServiceContext',
  CaptionWithContext({ imageCaptionOffscreenText: undefined }),
);
