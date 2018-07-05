import React from 'react';
import { extractText } from '../../helpers/blockHandlers';
import { textPropTypes, textDefaultPropTypes } from '../../models/proptypes';

const SubHeading = ({ blocks }) => {
  const { text } = extractText(blocks);

  if (!text) {
    return null;
  }

  return <h2>{text}</h2>;
};

SubHeading.propTypes = textPropTypes;

SubHeading.defaultProps = textDefaultPropTypes;

export default SubHeading;
