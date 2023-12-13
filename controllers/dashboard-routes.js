const router = require('express').Router();
const { User, Game, Review } = require('../models');

// Get route for user dashboard
router.get('/', async (req, res) => {
  try {
    const gameData = await User.findOne({
      where: {
        id: req.session.userID,
      },
      attributes: ['id', 'username'],
      include: [{
        model: Game,
        attributes: ['id', 'name', 'platform'],
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

// Get route for individual game belonging to user through their dashboard
router.get('/games/:gameID', async (req, res) => {
  try {
    const gameData = await Game.findByPk(req.params.gameID);

    res.json(gameData);
  } catch (err) {
    res.status(500).json(err)
  };
})

module.exports = router;