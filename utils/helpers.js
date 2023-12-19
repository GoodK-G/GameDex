const { DateTime } = require('luxon');

// Convert UNIX timestamp from database to readable full date
const formatReleaseDate = (timestamp) => {
  const dt = DateTime.fromSeconds(timestamp).toUTC();

  return dt.toLocaleString(DateTime.DATE_FULL);
};

// Check if user has game in their profile
const hasGame = (id, userGames) => {
  return userGames.includes(id);
};

module.exports = { formatReleaseDate, hasGame };