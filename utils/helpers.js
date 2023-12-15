const formatReleaseDate = (timestamp) => {
  const date = new Date(timestamp * 1000);

  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
};

module.exports = { formatReleaseDate };