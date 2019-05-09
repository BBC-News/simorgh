import React, { useContext } from 'react';
import { objectOf, any, string } from 'prop-types';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import Caption from '@bbc/psammead-caption';
import Paragraph from '@bbc/psammead-paragraph';
import deepGet from '../../helpers/json/deepGet';
import { ServiceContext } from '../../contexts/ServiceContext';
import Blocks from '../Blocks';
import Fragment from '../Fragment';
import InlineLink from '../InlineLink';

const componentsToRender = { fragment: Fragment, urlLink: InlineLink };

const chooseOffscreenText = (
  mediaType,
  videoCaption,
  imageCaption,
  defaultText,
) => {
  switch (mediaType) {
    case 'video':
      return videoCaption;
    case 'image':
      return imageCaption;
    default:
      return defaultText;
  }
};
const renderParagraph = paragraphBlock => (
  <Paragraph key={deepGet([0, 'model', 'text'], paragraphBlock)}>
    <Blocks blocks={paragraphBlock} componentsToRender={componentsToRender} />
  </Paragraph>
);

const renderCaption = (paragraphBlocks, offscreenText, script) => (
  <Caption script={script}>
    {offscreenText ? (
      <VisuallyHiddenText>{offscreenText}</VisuallyHiddenText>
    ) : null}
    {paragraphBlocks.map(block => {
      const paragraphBlock = deepGet(['model', 'blocks'], block);
      return renderParagraph(paragraphBlock);
    })}
  </Caption>
);

const CaptionContainer = ({ block, type }) => {
  const {
    script,
    imageCaptionOffscreenText,
    videoCaptionOffscreenText,
    defaultCaptionOffscreenText,
  } = useContext(ServiceContext);
  const offscreenText = chooseOffscreenText(
    type,
    videoCaptionOffscreenText,
    imageCaptionOffscreenText,
    defaultCaptionOffscreenText,
  );

  const paragraphBlocks = deepGet(
    ['model', 'blocks', 0, 'model', 'blocks'],
    block,
  );

  return renderCaption(paragraphBlocks, offscreenText, script);
};

CaptionContainer.propTypes = {
  block: objectOf(any).isRequired,
  type: string,
};

CaptionContainer.defaultProps = {
  type: '',
};

export default CaptionContainer;
