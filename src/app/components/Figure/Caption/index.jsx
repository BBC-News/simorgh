import React from 'react';
import { node } from 'prop-types';
import styled from 'styled-components';
import {
  FF_NEWS_SANS_REG,
  C_STORM,
  GEL_SPACING,
} from '../../../lib/constants/styles';
import VisuallyHiddenText from '../../VisuallyHiddenText';
import mediaQuery from '../../../helpers/mediaQueries';

const captionOffscreenText = 'Image caption, ';

const StyledCaption = styled.figcaption`
  background-color: #d5d0cd;
  color: ${C_STORM};
  font-family: ${FF_NEWS_SANS_REG};
  padding: ${GEL_SPACING};

  // Font styling below is a subset of BBC GEL Typography "Long Primer"
  font-size: 0.9375em;
  line-height: 1.125rem;
  ${mediaQuery.laptopAndLarger} {
    font-size: 0.875em;
  }
`;

const Caption = ({ children }) => (
  <StyledCaption>
    <VisuallyHiddenText>{captionOffscreenText}</VisuallyHiddenText>
    {children}
  </StyledCaption>
);

Caption.propTypes = {
  // children will be "element.isRequired" in the future to support embedded <lang> and markdown
  children: node.isRequired,
};

export default Caption;
