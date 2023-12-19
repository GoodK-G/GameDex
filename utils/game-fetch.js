require('dotenv').config();

// Function for fetching cover art for game
const retrieveGameCover = async (coverID) => {
  const response = await fetch('https://api.igdb.com/v4/covers', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': process.env.API_ID,
      'Authorization': `Bearer ${process.env.API_TOKEN}`,
    },
    body: `fields url; where id = ${coverID};`
  });

  const coverData = await response.json();

  let cover;

  // Create the image link if URL property is not undefined
  if (coverData[0].url) {
    // Compile image link
    const coverLink = `https://${coverData[0].url}`
    // Set size of image by replacing part of url link
    cover = coverLink.replace('thumb', 'cover_big');
  };

  return cover;
};

// Function for creating game array
const createGameArray = async (gameData) => {
  let gameArr = [];

  for (let i = 0; i < gameData.length; i++) {
    // Destructure game object
    const { id, name, url, first_release_date: release_date, rating: igdb_rating, summary } = gameData[i];

    // Fetch cover art for each game in search results
    const cover = await retrieveGameCover(gameData[i].cover);

    // Add object with game info into gameArr array to be used to populate search results
    gameArr.push({ id, name, cover, release_date, url, igdb_rating, summary });
  };

  return gameArr;
};

// Fetch game list from IGDB API
const gameFetch = async (fetchBody) => {
  const response = await fetch('https://api.igdb.com/v4/games', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': process.env.API_ID,
      'Authorization': `Bearer ${process.env.API_TOKEN}`,
    },
    body: fetchBody
  });

  return response;
}

module.exports = { createGameArray, gameFetch };