const router = require('express').Router();
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

module.exports = router;