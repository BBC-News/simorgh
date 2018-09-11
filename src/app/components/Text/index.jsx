import React from 'react';
import styled from 'styled-components';
import { string, node, func } from 'prop-types';
import Markdown from 'markdown-to-jsx';
import InlineLink from '../../containers/InlineLink';
import {
  C_STORM,
  FF_NEWS_SANS_REG,
  GEL_SPACING_DBL,
} from '../../lib/constants/styles';
import { T_BODY_COPY } from '../../lib/constants/typography';

const StyledParagraph = styled.p`
  color: ${C_STORM};
  font-family: ${FF_NEWS_SANS_REG};
  padding-bottom: ${GEL_SPACING_DBL};
  margin: 0;
  ${T_BODY_COPY};
`;
const Italic = ({ children }) => <i>{children}</i>;
const Bold = ({ children }) => <b>{children}</b>;

const Text = ({ text, paragraphOverride }) => {
  if (!text) return null;

  const options = {
    forceBlock: true,
    overrides: {
      p: {
        component: paragraphOverride,
      },
      em: {
        component: Italic,
      },
      strong: {
        component: Bold,
      },
      a: {
        component: InlineLink,
      },
    },
  };

  return <Markdown options={options}>{text}</Markdown>;
};

Italic.propTypes = {
  children: node.isRequired,
};

Bold.propTypes = {
  children: node.isRequired,
};

Text.propTypes = {
  text: string.isRequired,
  paragraphOverride: func,
};

Text.defaultProps = {
  paragraphOverride: StyledParagraph,
};

export default Text;
