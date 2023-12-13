const router = require('express').Router();
const { User, Game, Review } = require('../models');

router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/games', async (req, res) => {
  try {
    const gameData = await Game.findAll({
      include: [{ model: Review }],
    });

    res.json(gameData);
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;