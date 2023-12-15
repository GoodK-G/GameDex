const searchForGame = async (e) => {
  e.preventDefault();
  const searchInput = document.querySelector('#gameSearch').value;
  const searchURL = `/search?name=${searchInput}`;

  location.assign(searchURL);
};

document.querySelector('#searchBtn').addEventListener('click', searchForGame);