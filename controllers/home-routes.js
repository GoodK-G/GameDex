const router = require('express').Router();
const { User, Game, Review } = require('../models');

router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/games', async (req, res) => {
  try {
    const gameData = await Game.findAll();

    res.json(gameData);
  } catch (err) {
    res.status(500).json(err);
  };
});

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
})

module.exports = router;