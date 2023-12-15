const formatReleaseDate = (timestamp) => {
  const date = new Date(timestamp * 1000);

  return `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getUTCFullYear()}`
};

module.exports = { formatReleaseDate };