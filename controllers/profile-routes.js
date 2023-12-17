const router = require('express').Router();
const { User, Game, Review } = require('../models');

// Get route for user profile
router.get('/', async (req, res) => {
  try {
    const gameData = await User.findOne({
      where: {
        id: req.session.user_id,
      },
      attributes: ['id', 'username'],
      include: [{
        model: Game,
        attributes: ['id', 'name', 'cover', 'release_date', 'url'],
        through: {
          attributes: [],
        }
      }],
    });

    res.json(gameData);    
  } catch (err) {
    res.status(500).json(err);
  };
});

// Get route for individual game belonging to user through their profile
router.get('/games/:gameID', async (req, res) => {
  try {
    const gameData = await Game.findByPk(req.params.gameID);

    res.json(gameData);
  } catch (err) {
    res.status(500).json(err)
  };
})

module.exports = router;