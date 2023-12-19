const router = require('express').Router();
require('dotenv').config();
const { User, Game, Review } = require('../models');
const { createGameArray, gameFetch } = require('../utils/game-fetch');
const withAuth = require('../utils/auth');

// Get route for homepage
router.get('/', async (req, res) => {
  try {
    // Fetch highest rated games with at least 150 ratings
    const fetchBody = 'fields id,name,cover,first_release_date,url,rating,summary; where rating_count > 149; sort rating desc; limit 10;'
    const response = await gameFetch(fetchBody);

    const gameData = await response.json();

    // Create new game array from game data
    const gameArr = await createGameArray(gameData);

    // Add search results to game database and update fields if game
    // already exists in database
    await Game.bulkCreate(gameArr, {
      updateOnDuplicate: ['name', 'cover', 'release_date', 'url', 'igdb_rating', 'summary']
    });
    
    res.render('homepage', { gameArr, loggedIn: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  };  
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
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
router.get("/games/:gameID", withAuth, async (req, res) => {
  try {
    console.log("req.params.gameID:", req.params.gameID);
    const gameData = await Game.findByPk(req.params.gameID, {
      include: [
        {
          model: Review,
          attributes: ["id", "content", "rating", "createdAt"],
          include: [
            {
              model: User,
              attributes: ["id", "username"],
            },
          ],
        },
      ],
    });

    /* if (!gameData) {
      res.status(404).json({ message: "Game not found" });
      return;
    } */

    const game = gameData.get({ plain: true });
    console.log("req.session.user_id", req.session.user_id);

    res.render("game", {
      game,
      userGames: req.session.user_games,
      loggedIn: req.session.logged_in,
      sessionID: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/review/:gameID", withAuth, async (req, res) => {
  res.render(
    "new-review" /* {
    user_id: req.session.user_id,
    game_id: req.params.gameID,
  } */
  );
});

// Get route for all reviews
router.get('/reviews', withAuth, async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      attributes: ['id', 'content', 'rating', 'createdAt'],
      include: [{
        model: Game,
        attributes: ['id', 'name', 'cover', 'release_date', 'url', 'igdb_rating', 'summary'],
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
    const fetchBody = `fields id,name,cover,first_release_date,url,rating,summary; search "${req.query.name}"; limit 10;`
    const response = await gameFetch(fetchBody);

    const gameData = await response.json();

    // Create new game array from game data
    const gameArr = await createGameArray(gameData);

    // Add search results to game database and update fields if game
    // already exists in database
    await Game.bulkCreate(gameArr, {
      updateOnDuplicate: ['name', 'cover', 'release_date', 'url', 'igdb_rating', 'summary']
    });

    res.render('search-results', { gameArr, loggedIn: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  };
})


module.exports = router;