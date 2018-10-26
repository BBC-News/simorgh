import React from 'react';
import styled from 'styled-components';
import { number } from 'prop-types';
import { T_BREVIER } from '../../lib/constants/typography';
import {
  C_RHINO,
  GEL_SPACING_DBL,
  FF_NEWS_SANS_REG,
} from '../../lib/constants/styles';

// if the date is invalid return null - https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript#answer-1353711
const isValidDateTime = dateTime => !isNaN(dateTime); // eslint-disable-line no-restricted-globals

const formatDateTime = dateObj => {
  const fullYear = dateObj.getFullYear();
  const monthTwoDigit = dateObj.toLocaleDateString('en-GB', {
    month: '2-digit',
  });
  const dayTwoDigit = dateObj.toLocaleDateString('en-GB', {
    day: '2-digit',
  });

  return `${fullYear}-${monthTwoDigit}-${dayTwoDigit}`;
};

const formatTimestamp = dateObj =>
  dateObj.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

const StyledTimestamp = styled.span`
  ${T_BREVIER};
  color: ${C_RHINO};
  font-family: ${FF_NEWS_SANS_REG};
  padding-bottom: ${GEL_SPACING_DBL};
`;

const Timestamp = ({ timestamp }) => {
  const dateObj = new Date(timestamp * 1000);

  if (!isValidDateTime(dateObj)) {
    return null;
  }

  return (
    <StyledTimestamp>
      <time dateTime={formatDateTime(dateObj)}>{formatTimestamp(dateObj)}</time>
    </StyledTimestamp>
  );
};

Timestamp.propTypes = {
  timestamp: number.isRequired,
};

export default Timestamp;
