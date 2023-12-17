const { DateTime } = require('luxon');

const formatReleaseDate = (timestamp) => {
  const dt = DateTime.fromSeconds(timestamp).toUTC();

  return dt.toLocaleString(DateTime.DATE_FULL);
};

module.exports = { formatReleaseDate };