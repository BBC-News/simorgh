// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; // eslint-disable-line

// if the date is invalid return false - https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript#answer-1353711
export const isValidDateTime = dateTime => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(dateTime) || dateTime === null) {
    return false;
  }
  return !isNaN(new Date(dateTime)); // eslint-disable-line no-restricted-globals
};

export const leadingZero = val => (val < 10 ? `0${val}` : `${val}`);

// 2019-03-22
export const longNumeric = {
  day: date => leadingZero(date.getDate()),
  month: date => leadingZero(date.getMonth() + 1),
  year: date => date.getFullYear(),
  format: (d, m, y) => [y, m, d].join('-'),
};

// 22 March 2019
export const shortAlphaNumeric = {
  day: date => date.getDate(),
  month: date => months[date.getMonth()],
  year: date => date.getFullYear(),
  format: (d, m, y) => [d, m, y].join(' '),
};

export const formatUnixTimestamp = (milliseconds, formatType) => {
  const dateObj = new Date(milliseconds);
  const day = formatType.day(dateObj);
  const month = formatType.month(dateObj);
  const year = formatType.year(dateObj);
  return formatType.format(day, month, year);
};

export const isTenHoursAgoOrLess = milliseconds => {
  const now = Date.now();
  return now - milliseconds <= 10 * 60 * 60 * 1000;
};
