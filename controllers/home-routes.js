const router = require('express').Router();
require('dotenv').config();
const { User, Game, Review } = require('../models');

// Get route for homepage
router.get('/', (req, res) => {
  res.render('homepage');
});

// Get route for games in database
router.get('/games', async (req, res) => {
  try {
    const gameData = await Game.findAll();

    res.json(gameData);
  } catch (err) {
    res.status(500).json(err);
  };
});

// Get route for specific game
router.get('/games/:gameID', async (req, res) => {
  try {
    const gameData = await Game.findByPk(req.params.gameID, {
      include: [{
        model: Review,
        attributes: ['id', 'content', 'rating', 'createdAt'],
        include: [{
          model: User,
          attributes: ['id', 'username'],
        }],
      }],
    });

    res.json(gameData);
  } catch (err) {
    res.status(500).json(err);
  };
})

// Get route for all reviews
router.get('/reviews', async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      attributes: ['id', 'content', 'rating', 'createdAt'],
      include: [{
        model: Game,
        attributes: ['id', 'name', 'platform'],
      }]
    });

    res.json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  };
});

// Get route for game searches
// Searches will be requested with name query (e.g., /search?name=Halo)
router.get('/search', async (req, res) => {
  try {
    // Fetch game based on search query
    const response = await fetch('https://api.igdb.com/v4/games', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Client-ID': process.env.API_ID,
        'Authorization': `Bearer ${process.env.API_TOKEN}`,
      },
      body: `fields id,name,cover,first_release_date; search "${req.query.name}"; limit 15;`
    });

    const gameData = await response.json();

    // Set empty game array variable
    let gameArr = [];

    for (let i = 0; i < gameData.length; i++) {
      const id = gameData[i].id;
      const name = gameData[i].name;
      const releaseDate = gameData[i].first_release_date;

      // Fetch cover art for each game in search results
      const response = await fetch('https://api.igdb.com/v4/covers', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Client-ID': process.env.API_ID,
          'Authorization': `Bearer ${process.env.API_TOKEN}`,
        },
        body: `fields url; where id = ${gameData[i].cover};`
      });

      const coverData = await response.json();

      // Compile image link
      const coverLink = `https://${coverData[0].url}`
      // Set size of image by replacing part of url link
      const cover = coverLink.replace('thumb', 'cover_big');

      // Add the array with game info into gameArr array to be used to populate search results
      gameArr.push({ id, name, cover, releaseDate });
    };

    res.json(gameArr);
  } catch (err) {
    res.status(500).json(err);
  };
})


module.exports = router;